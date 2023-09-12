using AutoMapper;
using domain.dtos;
using domain.entities;
using domain.irepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using presentation.services.coupon;
using presentation.services.product;

namespace presentation.controllers;

[ApiController]
[Route("api/cart")]
public class ShoppingCartController : ControllerBase
{
    private readonly IRepositoryManager _repositoryManager;
    private readonly IProductService _productService;
    private readonly ICouponService _couponService;
    private readonly IMapper _mapper;

    public ShoppingCartController(IRepositoryManager repositoryManager,
        IProductService productService,
        ICouponService couponService,
        IMapper mapper)
    {
        _repositoryManager = repositoryManager;
        _productService = productService;
        _couponService = couponService;
        _mapper = mapper;
    }


    [HttpGet("{userId}", Name = "GetCart")]
    [Authorize]
    public async Task<IActionResult> GetCart(string userId)
    {
        try
        {
            if (userId is null)
                return BadRequest(ApiResponseHandler.SendErrorResponse(400, "User id is null"));

            var cartHeader = await _repositoryManager.CartHeader.GetCartHeaderByUserId(userId,
                trackChanges: false);
            if (cartHeader is null)
                return Ok(ApiResponseHandler.SendSuccessResponse(200, null));

            CartDto cart = new()
            {
                CartHeader = _mapper.Map<CartHeaderDto>(cartHeader)
            };

            var cartDetails = await _repositoryManager.CartDetails.FindCartDetailsByCartHeaderId(
                cart.CartHeader.CartHeaderId, trackChanges: false);
            cart.CartDetails = _mapper.Map<IEnumerable<CartDetailsDto>>(cartDetails);

            IEnumerable<ProductDto> products = await _productService.GetProducts();

            foreach (var item in cart.CartDetails)
            {
                var product = products.FirstOrDefault(u => u._id == item.ProductId);

                item.Product = product;
                cart.CartHeader.CartTotal += item.Count * item.Product.Price;
            }

            //apply coupon if any
            if (!string.IsNullOrEmpty(cart.CartHeader.CouponCode))
            {
                CouponDto coupon = await _couponService.GetCoupons(cart.CartHeader.CouponCode);
                if (coupon != null && cart.CartHeader.CartTotal > coupon.MinAmount)
                {
                    cart.CartHeader.CartTotal -= coupon.DiscountAmount;
                    cart.CartHeader.Discount = coupon.DiscountAmount;
                }
            }

            return Ok(ApiResponseHandler.SendSuccessResponse(200, cart));
        }
        catch (Exception e)
        {
            Console.WriteLine($"--> Error while getting cart : {e.Message}");
            return StatusCode(500, ApiResponseHandler.SendErrorResponse(500, "Something went wrong"));
        }
    }


    [HttpPost("upsert")]
    [Authorize]
    public async Task<IActionResult> Upsert(CartDto cartDto)
    {
        try
        {
            if (cartDto.CartHeader.UserId is null || cartDto.CartDetails.First().Count is 0 ||
                cartDto.CartDetails.First().ProductId is null)
            {
                return BadRequest(ApiResponseHandler.SendErrorResponse(400, "Provide more information."));
            }

            var product = await _productService.GetProductById(cartDto.CartDetails
                .First().ProductId);
            if (product.Name is null)
                return NotFound(ApiResponseHandler.SendErrorResponse(404, "Seems like product was deleted."));

            var cartHeaderFromDb = await _repositoryManager.CartHeader.GetCartHeaderByUserId(
                cartDto.CartHeader.UserId, trackChanges: false);

            if (cartHeaderFromDb is null)
            {
                var cartHeader = _mapper.Map<CartHeader>(cartDto.CartHeader);
                _repositoryManager.CartHeader.CreateCartHeader(cartHeader);
                await _repositoryManager.SaveAsync();

                cartDto.CartDetails.First().CartHeaderId = cartHeader.CartHeaderId;

                var cartDetail = _mapper.Map<CartDetails>(cartDto.CartDetails.First());
                _repositoryManager.CartDetails.CreteCartDetails(cartDetail);
                await _repositoryManager.SaveAsync();
            }
            else
            {
                var cartDetailsFromDb = await _repositoryManager.CartDetails.FindProductByCartHeaderId(
                    cartHeaderFromDb.CartHeaderId, cartDto.CartDetails.First().ProductId,
                    trackChanges: true);

                if (cartDetailsFromDb is null)
                {
                    cartDto.CartDetails.First().CartHeaderId = cartHeaderFromDb.CartHeaderId;

                    var cartDetail = _mapper.Map<CartDetails>(cartDto.CartDetails.First());
                    _repositoryManager.CartDetails.CreteCartDetails(cartDetail);
                    await _repositoryManager.SaveAsync();
                }
                else
                {
                    cartDto.CartDetails.First().Count += cartDetailsFromDb.Count;
                    cartDto.CartDetails.First().CartHeaderId = cartDetailsFromDb.CartHeaderId;
                    cartDto.CartDetails.First().CartDetailsId = cartDetailsFromDb.CartDetailsId;

                    _mapper.Map(cartDto.CartDetails.First(), cartDetailsFromDb);
                    await _repositoryManager.SaveAsync();
                }
            }

            return Created("GetCart", ApiResponseHandler.SendSuccessResponse(201, "Created"));
        }
        catch (Exception e)
        {
            Console.WriteLine($"--> Error while upserting to shopping cart : {e.Message}");
            return StatusCode(500, ApiResponseHandler.SendErrorResponse(500, "Something went wrong"));
        }
    }


    [HttpPost("applyCoupon")]
    [Authorize]
    public async Task<IActionResult> ApplyCoupon([FromBody] CartDto cartDto)
    {
        try
        {
            if (cartDto.CartHeader.UserId is null || cartDto.CartHeader.CouponCode is null)
            {
                return BadRequest(ApiResponseHandler.SendErrorResponse(400, "Provide more information."));
            }

            var coupon = await _couponService.GetCoupons(cartDto.CartHeader.CouponCode);
            if (coupon.DiscountAmount is 0)
            {
                return BadRequest(ApiResponseHandler.SendErrorResponse(400, "Coupon was not found"));
            }

            var cartHeaderFromDb = await _repositoryManager.CartHeader.GetCartHeaderByUserId(
                cartDto.CartHeader.UserId, trackChanges: false);
            if (cartHeaderFromDb is null)
            {
                return BadRequest(ApiResponseHandler.SendErrorResponse(400, "User was not found"));
            }

            cartHeaderFromDb.CouponCode = cartDto.CartHeader.CouponCode;
            _repositoryManager.CartHeader.UpdateCartHeader(cartHeaderFromDb);

            await _repositoryManager.SaveAsync();

            return Ok(ApiResponseHandler.SendSuccessResponse(200, "Coupon was applied"));
        }
        catch (Exception e)
        {
            Console.WriteLine($"--> Error while applying coupon code : {e.Message}");
            return StatusCode(500, ApiResponseHandler.SendErrorResponse(500, "Something went wrong"));
        }
    }


    [HttpDelete("{cartDetailId}")]
    [Authorize]
    public async Task<IActionResult> Remove(Guid cartDetailId)
    {
        try
        {
            var cartDetail = await _repositoryManager.CartDetails.FindCartDetailById(cartDetailId,
                trackChanges: false);
            if (cartDetail is null)
            {
                return NotFound(ApiResponseHandler.SendErrorResponse(404, "Cart Detail was not found."));
            }

            int totalCountOfCartItem = await _repositoryManager.CartDetails.TotalCountOfCartItem(cartDetail.CartHeaderId,
                trackChanges: false);
            _repositoryManager.CartDetails.DeleteCartDetails(cartDetail);

            if (totalCountOfCartItem == 1)
            {
                var cartHeaderToRemove = await _repositoryManager.CartHeader
                    .GetCartHeaderById(cartDetail.CartHeaderId, trackChanges: false);
                _repositoryManager.CartHeader.DeleteCartHeader(cartHeaderToRemove);
            }
            await _repositoryManager.SaveAsync();

            return Ok(ApiResponseHandler.SendSuccessResponse(200, "Product was removed from cart"));
        }
        catch (Exception e)
        {
            Console.WriteLine($"--> Error while deleting shopping cart : {e.Message}");
            return StatusCode(500, ApiResponseHandler.SendErrorResponse(500, "Something went wrong"));
        }
    }
}