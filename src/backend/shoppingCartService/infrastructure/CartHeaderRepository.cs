using domain.entities;
using domain.irepository;
using Microsoft.EntityFrameworkCore;

namespace infrastructure;

public class CartHeaderRepository : RepositoryBase<CartHeader>, ICartHeaderRepository
{
    public async Task<CartHeader> GetCartHeaderByUserId(string userId, bool trackChanges) =>
        await FindByCondition(c => c.UserId.Equals(userId), trackChanges)
            .SingleOrDefaultAsync();

    public void CreateCartHeader(CartHeader cartHeader) => Create(cartHeader);
}