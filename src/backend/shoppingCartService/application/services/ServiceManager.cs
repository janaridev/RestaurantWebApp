using application.iservices;
using AutoMapper;
using domain.irepository;

namespace application.services;

public class ServiceManager : IServiceManager
{
    private readonly Lazy<ICartHeaderService> _cartHeaderService;
    private readonly Lazy<ICartDetailsService> _cartDetailsService;

    public ServiceManager(IRepositoryManager repositoryManager, IMapper mapper)
    {
        _cartHeaderService = new Lazy<ICartHeaderService>(() => new
            CartHeaderService(repositoryManager, mapper));

        _cartDetailsService = new Lazy<ICartDetailsService>(() => new
            CartDetailsService(repositoryManager, mapper));
    }

    public ICartHeaderService CartHeaderService => _cartHeaderService.Value;

    public ICartDetailsService CartDetailsService => _cartDetailsService.Value;
}
