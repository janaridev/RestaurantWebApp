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

    public void CreteCartDetails(CartDetails cartDetails) => Create(cartDetails);
}
