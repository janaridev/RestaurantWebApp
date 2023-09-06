using domain.entities;
using domain.irepository;
using Microsoft.EntityFrameworkCore;

namespace infrastructure;

public class CartDetailsRepository : RepositoryBase<CartDetails>, ICartDetailsRepository
{
    public async Task<CartDetails> FindProductByCartHeaderId(string productId, Guid cartHeaderId,
        CartDetails[] cartDetails, bool trackChanges) =>
            await FindByCondition(u => u.ProductId == cartDetails.First().ProductId &&
            u.CartHeaderId == cartHeaderId, trackChanges).SingleOrDefaultAsync();

    public void CreteCartDetails(CartDetails cartDetails) => Create(cartDetails);
}
