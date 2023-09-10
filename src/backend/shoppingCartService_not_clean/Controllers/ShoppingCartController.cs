using AutoMapper;
using Db;
using Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using shoppingCartService.Models.Responses;
using shoppingCartService.Services.Coupon;
using shoppingCartService.Services.Product;

namespace shoppingCartService.Controllers;

[ApiController]
[Route("api/cart")]
public class ShoppingCartController : ControllerBase
{
    private readonly RepositoryContext _db;
    private readonly IMapper _mapper;
    private readonly IProductService _productService;
    private readonly ICouponService _couponService;

    public ShoppingCartController(RepositoryContext db, IMapper mapper, IProductService productService,
        ICouponService couponService)
    {
        _db = db;
        _mapper = mapper;
        _productService = productService;
        _couponService = couponService;
    }


    [HttpGet("{userId}")]
    public async Task<object> GetCart(string userId)
    {
        try
        {
            CartDto cart = new()
            {
                CartHeader = _mapper.Map<CartHeaderDto>(_db.CartHeaders.First(u => u.UserId == userId))
            };
            Console.WriteLine(cart);
            cart.CartDetails = _mapper.Map<IEnumerable<CartDetailsDto>>(_db.CartDetails
                .Where(u => u.CartHeaderId == cart.CartHeader.CartHeaderId));
            Console.WriteLine(cart);

            IEnumerable<ProductDto> productDtos = await _productService.GetProducts();

            foreach (var item in cart.CartDetails)
            {
                Console.WriteLine(item.Product);
                item.Product = productDtos.FirstOrDefault(u => u._id == item.ProductId);
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

            return ApiResponseHandler.SendSuccessResponse(200, cart);
        }
        catch (Exception e)
        {
            Console.WriteLine($"--> Error while getting shopping cart : {e.Message}");
            return ApiResponseHandler.SendErrorResponse(500, "Something went wrong");
        }
    }


    [HttpPost("applyCoupon")]
    public async Task<object> ApplyCoupon([FromBody] CartDto cartDto)
    {
        try
        {
            var cartFromDb = await _db.CartHeaders.FirstAsync(u => u.UserId == cartDto.CartHeader.UserId);
            cartFromDb.CouponCode = cartDto.CartHeader.CouponCode;
            _db.CartHeaders.Update(cartFromDb);
            await _db.SaveChangesAsync();

            return ApiResponseHandler.SendSuccessResponse(200, cartFromDb);
        }
        catch (Exception e)
        {
            Console.WriteLine($"--> Error while getting shopping cart : {e.Message}");
            return ApiResponseHandler.SendErrorResponse(500, "Something went wrong");
        }
    }


    [HttpPost("upsert")]
    public async Task<object> Upsert(CartDto cartDto)
    {
        try
        {
            var cartHeaderFromDb = await _db.CartHeaders.FirstOrDefaultAsync(u =>
                u.UserId == cartDto.CartHeader.UserId);

            if (cartHeaderFromDb is null)
            {
                var cartHeader = _mapper.Map<CartHeader>(cartDto.CartHeader);
                _db.CartHeaders.Add(cartHeader);
                await _db.SaveChangesAsync();

                cartDto.CartDetails.First().CartHeaderId = cartHeader.CartHeaderId;

                var cartDetail = _mapper.Map<CartDetails>(cartDto.CartDetails.First());
                _db.CartDetails.Add(cartDetail);
                await _db.SaveChangesAsync();
            }
            else
            {
                var cartDetailsFromDb = await _db.CartDetails.AsNoTracking().FirstOrDefaultAsync(
                    u => u.ProductId == cartDto.CartDetails.First().ProductId &&
                    u.CartHeaderId == cartHeaderFromDb.CartHeaderId);

                if (cartDetailsFromDb == null)
                {
                    //create cartdetails
                    cartDto.CartDetails.First().CartHeaderId = cartHeaderFromDb.CartHeaderId;

                    _db.CartDetails.Add(_mapper.Map<CartDetails>(cartDto.CartDetails.First()));
                    await _db.SaveChangesAsync();
                }
                else
                {
                    //update count in cart details
                    cartDto.CartDetails.First().Count += cartDetailsFromDb.Count;
                    cartDto.CartDetails.First().CartHeaderId = cartDetailsFromDb.CartHeaderId;
                    cartDto.CartDetails.First().CartDetailsId = cartDetailsFromDb.CartDetailsId;

                    _db.CartDetails.Update(_mapper.Map<CartDetails>(cartDto.CartDetails.First()));
                    await _db.SaveChangesAsync();
                }
            }

            return ApiResponseHandler.SendSuccessResponse(201, "Created");
        }
        catch (Exception e)
        {
            Console.WriteLine($"--> Error while upserting shopping cart : {e.Message}");
            return ApiResponseHandler.SendErrorResponse(500, "Something went wrong");
        }
    }


    [HttpPost("remove")]
    public async Task<object> RemoveCart([FromBody] Guid cartDetailsId)
    {
        try
        {
            CartDetails cartDetails = _db.CartDetails
               .First(u => u.CartDetailsId == cartDetailsId);

            int totalCountofCartItem = _db.CartDetails.Where(u => u.CartHeaderId == cartDetails.CartHeaderId).Count();
            _db.CartDetails.Remove(cartDetails);
            if (totalCountofCartItem == 1)
            {
                var cartHeaderToRemove = await _db.CartHeaders
                   .FirstOrDefaultAsync(u => u.CartHeaderId == cartDetails.CartHeaderId);

                _db.CartHeaders.Remove(cartHeaderToRemove);
            }
            await _db.SaveChangesAsync();

            return ApiResponseHandler.SendSuccessResponse(200, "Product was removed from cart!");
        }
        catch (Exception e)
        {
            Console.WriteLine($"--> Error while deleting shopping cart : {e.Message}");
            return ApiResponseHandler.SendErrorResponse(500, "Something went wrong");
        }
    }
}