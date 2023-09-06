namespace domain.irepository;

public interface IRepositoryManager
{
    ICartHeaderRepository CartHeader { get; }
    ICartDetailsRepository CartDetails { get; }

    Task SaveAsync();
}