namespace application.iservices;

public interface IServiceManager
{
    ICartHeaderService CartHeaderService { get; }
    ICartDetailsService CartDetailsService { get; }
}