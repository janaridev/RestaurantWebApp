using application.iservices;
using domain.dtos;
using domain.responses;
using Microsoft.AspNetCore.Mvc;
using shoppingCartService.Models.Responses;

namespace presentation.controllers;

[ApiController]
[Route("api/cart")]
public class ShoppingCartController : ControllerBase
{
    private readonly IServiceManager _serviceManager;

    public ShoppingCartController(IServiceManager serviceManager) => _serviceManager = serviceManager;


    [HttpPost("upsert")]
    public async Task<CustomResponse> Upsert(CartDto cartDto)
    {
        try
        {
            if (cartDto.CartHeader.UserId is null || cartDto.CartHeader is null ||
                cartDto.CartDetails is null)
            {
                return ApiResponseHandler.SendErrorResponse(400, "Provide more information.");
            }

            var cartHeaderFromDb = await _serviceManager.CartHeaderService.GetCartHeaderByUserId(
                cartDto.CartHeader.UserId, trackChanges: false);

            if (cartHeaderFromDb is null)
            {
                var cartHeader = await _serviceManager.CartHeaderService.CreateCartHeader(cartDto.CartHeader);

                cartDto.CartDetails.First().CartHeaderId = cartHeader.CartHeaderId;

                var cartDetail = await _serviceManager.CartDetailsService.CreateCartDetail(
                    cartDto.CartDetails.First());
            }
            else
            {
                var cartDetailsFromDb = await _serviceManager.CartDetailsService
                    .FindProductByCartHeaderId(cartHeaderFromDb.CartHeaderId,
                    cartDto.CartDetails.First().ProductId,
                    trackChanges: true);

                if (cartDetailsFromDb is null)
                {
                    cartDto.CartDetails.First().CartHeaderId = cartHeaderFromDb.CartHeaderId;
                    var createdDetail = await _serviceManager.CartDetailsService.CreateCartDetail(
                        cartDto.CartDetails.First());
                }
                else
                {
                    cartDto.CartDetails.First().Count += cartDetailsFromDb.Count;
                    cartDto.CartDetails.First().CartHeaderId = cartDetailsFromDb.CartHeaderId;
                    cartDto.CartDetails.First().CartHeaderId = cartDetailsFromDb.CartDetailsId;

                    await _serviceManager.CartDetailsService.UpdateCartDetail(
                        cartDetailsFromDb, cartDto.CartDetails.First());
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
}