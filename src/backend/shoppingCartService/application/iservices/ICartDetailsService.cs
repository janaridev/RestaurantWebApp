using domain.dtos;
using domain.entities;

namespace application.iservices;

public interface ICartDetailsService
{
    Task<CartDetails> FindProductByCartHeaderId(Guid cartHeaderId,
        string productId, bool trackChanges);
    Task<CartDetails> CreateCartDetail(CartDetailsDto cartDetails);
    Task UpdateCartDetail(CartDetails cartDetails, CartDetailsDto cartDetailsDto);
}