using application.iservices;
using AutoMapper;
using domain.dtos;
using domain.entities;
using domain.irepository;
using Microsoft.VisualBasic;

namespace application.services;

public class CartDetailsService : ICartDetailsService
{
    private readonly IRepositoryManager _repositoryManager;
    private readonly IMapper _mapper;

    public CartDetailsService(IRepositoryManager repositoryManager, IMapper mapper)
    {
        _repositoryManager = repositoryManager;
        _mapper = mapper;
    }

    public async Task<CartDetails> FindProductByCartHeaderId(Guid cartHeaderId,
        IEnumerable<CartDetails> cartDetails, bool trackChanges)
    {
        if (cartDetails is null)
        {
            return null;
        }

        var cartDetail = await _repositoryManager.CartDetails.FindProductByCartHeaderId(cartHeaderId,
            cartDetails, trackChanges);

        return cartDetail is null ? null : cartDetail;
    }

    public async Task<CartDetails> CreateCartDetail(CartDetailsDto cartDetailsDto)
    {
        if (cartDetailsDto is null)
        {
            return null;
        }

        var cartDetails = _mapper.Map<CartDetails>(cartDetailsDto);

        _repositoryManager.CartDetails.CreteCartDetails(cartDetails);
        await _repositoryManager.SaveAsync();

        return cartDetails;
    }
}
