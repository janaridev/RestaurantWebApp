using domain.dtos;
using domain.entities;

namespace application.iservices;

public interface ICartHeaderService
{
    Task<CartHeader> GetCartHeaderByUserId(string userId, bool trackChanges);
    Task<CartHeader> CreateCartHeader(CartHeaderDto cartHeader);
}