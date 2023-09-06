using AutoMapper;
using Dtos;
using Models;

namespace shoppingCartService;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<CartHeader, CartHeaderDto>().ReverseMap();
        CreateMap<CartDetails, CartDetailsDto>().ReverseMap();
    }
}