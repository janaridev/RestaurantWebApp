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
        string productId, bool trackChanges)
    {
        if (productId is null)
        {
            return null;
        }

        var cartDetail = await _repositoryManager.CartDetails.FindProductByCartHeaderId(cartHeaderId,
            productId, trackChanges);

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

    public async Task UpdateCartDetail(CartDetails cartDetails, CartDetailsDto cartDetailsDto)
    {
        _mapper.Map(cartDetailsDto, cartDetails);
        await _repositoryManager.SaveAsync();
    }
}
