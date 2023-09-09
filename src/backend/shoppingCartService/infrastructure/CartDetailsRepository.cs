using domain.entities;
using domain.irepository;
using Microsoft.EntityFrameworkCore;

namespace infrastructure;

public class CartDetailsRepository : RepositoryBase<CartDetails>, ICartDetailsRepository
{
    public CartDetailsRepository(RepositoryContext repositoryContext) : base(repositoryContext)
    { }

    public async Task<CartDetails> FindProductByCartHeaderId(Guid cartHeaderId,
        string productId, bool trackChanges) =>
            await FindByCondition(u => u.ProductId == productId &&
            u.CartHeaderId == cartHeaderId, trackChanges).SingleOrDefaultAsync();

    public async Task<CartDetails> FindCartDetailById(Guid id, bool trackChanges) =>
        await FindByCondition(u => u.CartDetailsId == id, trackChanges).SingleOrDefaultAsync();

    public void CreteCartDetails(CartDetails cartDetails) => Create(cartDetails);

    public void DeleteCartDetails(CartDetails cartDetails) => Delete(cartDetails);

    public async Task<int> TotalCountOfCartItem(Guid cartHeaderId, bool trackChanges) =>
        await FindByCondition(u => u.CartHeaderId == cartHeaderId, trackChanges).CountAsync();
}
