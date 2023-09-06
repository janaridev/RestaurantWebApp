using domain.entities;

namespace domain.irepository;

public interface ICartDetailsRepository
{
    Task<CartDetails> FindProductByCartHeaderId(string productId, Guid cartHeaderId,
        CartDetails[] cartDetails, bool trackChanges);
    void CreteCartDetails(CartDetails cartDetails);
}