using domain.entities;

namespace domain.irepository;

public interface ICartHeaderRepository
{
    Task<CartHeader> GetCartHeaderByUserId(string userId, bool trackChanges);
    void CreateCartHeader(CartHeader cartHeader);
}