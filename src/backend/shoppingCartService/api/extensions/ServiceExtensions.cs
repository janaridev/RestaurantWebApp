using System.Text;
using domain.irepository;
using infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using presentation.services.coupon;
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
        services.AddScoped<ICouponService, CouponService>();
    }

    public static void ConfigureHttpClients(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddHttpClient("Product", u => u.BaseAddress =
            new Uri(configuration["Services:ProductService"]));
        services.AddHttpClient("Coupon", u => u.BaseAddress =
            new Uri(configuration["Services:CouponService"]));
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

    public static void ConfigureJWT(this IServiceCollection services, IConfiguration configuration)
    {
        var secretKey = configuration["SECRET_KEY"];

        services.AddAuthentication(opt =>
        {
            opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
            };

            options.Events = new JwtBearerEvents
            {
                OnAuthenticationFailed = context =>
                {
                    Console.WriteLine("Authentication failed: " + context.Exception);
                    return Task.CompletedTask;
                },
                // Add more event handlers as needed
            };
        });
    }
}