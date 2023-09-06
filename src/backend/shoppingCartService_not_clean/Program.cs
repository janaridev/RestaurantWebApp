using Db;
using Microsoft.EntityFrameworkCore;
using shoppingCartService.Services.Coupon;
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
    builder.Services.AddScoped<ICouponService, CouponService>();
    builder.Services.AddHttpClient("Product", u => u.BaseAddress =
        new Uri(builder.Configuration["ServiceUrls:ProductService"]));
    builder.Services.AddHttpClient("Coupon", u => u.BaseAddress =
        new Uri(builder.Configuration["ServiceUrls:CouponService"]));
    builder.Services.AddAutoMapper(typeof(Program));
    builder.Services.AddControllers();
}

var app = builder.Build();
{
    app.UseAuthorization();

    app.MapControllers();

    app.Run();
}

