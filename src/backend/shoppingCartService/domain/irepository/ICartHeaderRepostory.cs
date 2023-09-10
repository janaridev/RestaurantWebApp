using domain.entities;

namespace domain.irepository;

public interface ICartHeaderRepository
{
    Task<CartHeader> GetCartHeaderById(Guid cartHeaderId, bool trackChanges);
    Task<CartHeader> GetCartHeaderByUserId(string userId, bool trackChanges);
    void CreateCartHeader(CartHeader cartHeader);
    void DeleteCartHeader(CartHeader cartHeader);
    void UpdateCartHeader(CartHeader cartHeader);
}