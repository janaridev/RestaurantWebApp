using domain.entities;

namespace domain.irepository;

public interface ICartDetailsRepository
{
    Task<CartDetails> FindProductByCartHeaderId(Guid cartHeaderId,
        IEnumerable<CartDetails> cartDetails, bool trackChanges);
    void CreteCartDetails(CartDetails cartDetails);
}