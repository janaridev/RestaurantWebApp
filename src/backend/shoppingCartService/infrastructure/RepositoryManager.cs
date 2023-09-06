using domain.irepository;

namespace infrastructure;

public sealed class RepositoryManager : IRepositoryManager
{
    private readonly Lazy<ICartHeaderRepository> _cartHeaderRepository;
    private readonly Lazy<ICartDetailsRepository> _cartDetailsRepository;
    private readonly RepositoryContext _repositoryContext;

    public RepositoryManager(RepositoryContext repositoryContext)
    {
        _repositoryContext = repositoryContext;

        _cartHeaderRepository = new Lazy<ICartHeaderRepository>(() =>
            new CartHeaderRepository(_repositoryContext));
        _cartDetailsRepository = new Lazy<ICartDetailsRepository>(() =>
            new CartDetailsRepository(_repositoryContext));
    }

    public ICartHeaderRepository CartHeader => _cartHeaderRepository.Value;
    public ICartDetailsRepository CartDetails => _cartDetailsRepository.Value;

    public async Task SaveAsync() => await _repositoryContext.SaveChangesAsync();
}