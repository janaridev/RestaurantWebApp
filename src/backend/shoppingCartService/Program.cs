using Db;
using Microsoft.EntityFrameworkCore;
using shoppingCartService.Services.Product;

var builder = WebApplication.CreateBuilder(args);
{
    builder.Services.AddDbContext<RepositoryContext>(opts =>
    {
        opts.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
            ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection")));
        Console.WriteLine("Connected to DB");
    });
    builder.Services.AddScoped<IProductService, ProductService>();
    builder.Services.AddHttpClient("Product", u => u.BaseAddress =
        new Uri(builder.Configuration["ServiceUrls:ProductService"]));
    builder.Services.AddAutoMapper(typeof(Program));
    builder.Services.AddControllers();
}

var app = builder.Build();
{
    app.UseAuthorization();

    app.MapControllers();

    app.Run();
}

