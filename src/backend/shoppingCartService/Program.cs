using Db;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
{
    builder.Services.AddDbContext<RepositoryContext>(opts =>
    {
        opts.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
            ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection")));
        Console.WriteLine("Connected to DB");
    });
    builder.Services.AddControllers();
}

var app = builder.Build();
{
    app.UseAuthorization();

    app.MapControllers();

    app.MapGet("/", () =>
    {
        return "Hello World";
    });

    app.Run();
}

