using AutoMapper;
using domain.dtos;
using domain.entities;

namespace api;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<CartHeader, CartHeaderDto>().ReverseMap();
        CreateMap<CartDetails, CartDetailsDto>().ReverseMap();
    }
}