using domain.entities;

namespace domain.irepository;

public interface ICartHeaderRepository
{
    Task<CartHeader> GetCartHeader(Guid userId, bool trackChanges);
}