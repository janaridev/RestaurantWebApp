using domain.irepository;
using infrastructure;
using Microsoft.EntityFrameworkCore;
using presentation.services.product;

namespace api.extensions;

public static class ServiceExtensions
{
    public static void ConfigureCors(this IServiceCollection services) =>
        services.AddCors(options =>
        {
            options.AddPolicy("CorsPolicy", builder =>
            {
                builder.WithOrigins("http://localhost", "http://localhost:3000", "http://127.0.0.1")
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            });
        });


    public static void ConfigureRepositoryManager(this IServiceCollection services) =>
        services.AddScoped<IRepositoryManager, RepositoryManager>();

    public static void InjectServices(this IServiceCollection services)
    {
        services.AddScoped<IProductService, ProductService>();
    }

    public static void ConfigureHttpClients(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddHttpClient("Product", u => u.BaseAddress =
            new Uri(configuration["Services:ProductService"]));
    }

    public static void ConfigureSqlContext(this IServiceCollection services, IConfiguration configuration)
    {
        var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENV");

        var mySqlConnection = env == "Development" ?
            configuration.GetConnectionString("MySqlConnectionDevelopment") :
            configuration.GetConnectionString("MySqlConnectionProduction");

        services.AddDbContext<RepositoryContext>(opts =>
            opts.UseMySql(mySqlConnection,
                ServerVersion.AutoDetect(mySqlConnection)
            ));
    }
}