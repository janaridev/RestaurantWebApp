using AutoMapper;
using domain.dtos;
using domain.entities;
using domain.irepository;
using domain.responses;
using Microsoft.AspNetCore.Mvc;
using presentation.services.product;

namespace presentation.controllers;

[ApiController]
[Route("api/cart")]
public class ShoppingCartController : ControllerBase
{
    private readonly IRepositoryManager _repositoryManager;
    private readonly IProductService _productService;
    private readonly IMapper _mapper;

    public ShoppingCartController(IRepositoryManager repositoryManager,
        IProductService productService,
        IMapper mapper)
    {
        _repositoryManager = repositoryManager;
        _productService = productService;
        _mapper = mapper;
    }


    [HttpPost("upsert")]
    public async Task<CustomResponse> Upsert(CartDto cartDto)
    {
        try
        {
            if (cartDto.CartHeader.UserId is null || cartDto.CartDetails.First().Count is 0 ||
                cartDto.CartDetails.First().ProductId is null)
            {
                return ApiResponseHandler.SendErrorResponse(400, "Provide more information.");
            }

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

            return ApiResponseHandler.SendSuccessResponse(201, "Created");
        }
        catch (Exception e)
        {
            Console.WriteLine($"--> Error while upserting to shopping cart : {e.Message}");
            return ApiResponseHandler.SendErrorResponse(500, "Something went wrong");
        }
    }


    [HttpPost("applyCoupon")]
    public async Task<CustomResponse> ApplyCoupon([FromBody] CartDto cartDto)
    {
        try
        {
            if (cartDto.CartHeader.UserId is null || cartDto.CartHeader.CouponCode is null)
            {
                return ApiResponseHandler.SendErrorResponse(400, "Provide more information.");
            }

            var cartHeaderFromDb = await _repositoryManager.CartHeader.GetCartHeaderByUserId(
                cartDto.CartHeader.UserId, trackChanges: false);
            if (cartHeaderFromDb is null)
            {
                return ApiResponseHandler.SendErrorResponse(400, "User was not found");
            }

            cartHeaderFromDb.CouponCode = cartDto.CartHeader.CouponCode;
            _repositoryManager.CartHeader.UpdateCartHeader(cartHeaderFromDb);

            await _repositoryManager.SaveAsync();

            return ApiResponseHandler.SendSuccessResponse(200, "Coupon was applied");
        }
        catch (Exception e)
        {
            Console.WriteLine($"--> Error while applying coupon code : {e.Message}");
            return ApiResponseHandler.SendErrorResponse(500, "Something went wrong");
        }
    }


    [HttpDelete("{cartDetailId}")]
    public async Task<CustomResponse> Remove(Guid cartDetailId)
    {
        try
        {
            var cartDetail = await _repositoryManager.CartDetails.FindCartDetailById(cartDetailId,
                trackChanges: false);
            if (cartDetail is null)
            {
                return ApiResponseHandler.SendErrorResponse(404, "Cart Detail was not found.");
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

            return ApiResponseHandler.SendSuccessResponse(200, "Product was removed from cart");
        }
        catch (Exception e)
        {
            Console.WriteLine($"--> Error while deleting shopping cart : {e.Message}");
            return ApiResponseHandler.SendErrorResponse(500, "Something went wrong");
        }
    }
}