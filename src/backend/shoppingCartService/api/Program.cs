using api.extensions;

var builder = WebApplication.CreateBuilder(args);
{
    // CUSTOM EXTENSIONS
    builder.Services.ConfigureSqlContext(builder.Configuration);

    builder.Services.AddControllers();
}


var app = builder.Build();
{
    app.UseAuthorization();

    app.MapControllers();

    app.Run();
}

