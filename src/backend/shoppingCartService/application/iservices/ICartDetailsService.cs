using domain.dtos;
using domain.entities;

namespace application.iservices;

public interface ICartDetailsService
{
    Task<CartDetails> FindProductByCartHeaderId(Guid cartHeaderId,
        IEnumerable<CartDetails> cartDetails, bool trackChanges);
    Task<CartDetails> CreateCartDetail(CartDetailsDto cartDetails);

}