using domain.entities;

namespace domain.irepository;

public interface ICartDetailsRepository
{
    Task<CartDetails> FindProductByCartHeaderId(Guid cartHeaderId,
        string productId, bool trackChanges);
    void CreteCartDetails(CartDetails cartDetails);
}