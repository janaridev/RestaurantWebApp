using infrastructure;
using Microsoft.EntityFrameworkCore;

namespace api.extensions;

public static class ServiceExtensions
{
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