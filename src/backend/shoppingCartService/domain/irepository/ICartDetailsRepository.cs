using domain.entities;

namespace domain.irepository;

public interface ICartDetailsRepository
{
    Task<CartDetails> FindCartDetailById(Guid id, bool trackChanges);
    Task<CartDetails> FindProductByCartHeaderId(Guid cartHeaderId,
        string productId, bool trackChanges);
    Task<IEnumerable<CartDetails>> FindCartDetailsByCartHeaderId(Guid cartHeaderId, bool trackChanges);

    void CreteCartDetails(CartDetails cartDetails);
    void DeleteCartDetails(CartDetails cartDetails);

    Task<int> TotalCountOfCartItem(Guid cartHeaderId, bool trackChanges);
}