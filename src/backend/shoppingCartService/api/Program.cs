using api.extensions;

var builder = WebApplication.CreateBuilder(args);
{
    // CUSTOM EXTENSIONS
    builder.Services.ConfigureCors();
    builder.Services.ConfigureRepositoryManager();
    builder.Services.InjectServices();
    builder.Services.ConfigureHttpClients(builder.Configuration);
    builder.Services.ConfigureSqlContext(builder.Configuration);
    builder.Services.ConfigureJWT(builder.Configuration);


    builder.Services.AddAutoMapper(typeof(Program));
    builder.Services.AddControllers()
        .AddApplicationPart(typeof(presentation.AssemblyReference).Assembly);
}


var app = builder.Build();
{
    app.UseCors("CorsPolicy");

    app.UseAuthentication();

    app.UseAuthorization();

    app.MapControllers();

    Console.WriteLine("Test ci for shopping cart");

    app.Run();
}

