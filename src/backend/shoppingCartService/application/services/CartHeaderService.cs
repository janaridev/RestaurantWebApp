using application.iservices;
using AutoMapper;
using domain.dtos;
using domain.entities;
using domain.irepository;

namespace application.services;

public class CartHeaderService : ICartHeaderService
{
    private readonly IRepositoryManager _repositoryManager;
    private readonly IMapper _mapper;

    public CartHeaderService(IRepositoryManager repositoryManager, IMapper mapper)
    {
        _repositoryManager = repositoryManager;
        _mapper = mapper;
    }

    public async Task<CartHeader> GetCartHeaderByUserId(string userId, bool trackChanges)
    {
        var cartHeaderFromDb = await _repositoryManager.CartHeader.GetCartHeaderByUserId(userId, trackChanges);
        if (cartHeaderFromDb is null)
        {
            return null;
        }

        return cartHeaderFromDb;
    }

    public async Task<CartHeader> CreateCartHeader(CartHeaderDto cartHeaderDto)
    {
        if (cartHeaderDto is null)
        {
            return null;
        }

        var cartHeader = _mapper.Map<CartHeader>(cartHeaderDto);

        _repositoryManager.CartHeader.CreateCartHeader(cartHeader);
        await _repositoryManager.SaveAsync();

        return cartHeader;
    }
}
