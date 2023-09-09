using api.extensions;

var builder = WebApplication.CreateBuilder(args);
{
    // CUSTOM EXTENSIONS
    builder.Services.ConfigureCors();
    builder.Services.ConfigureRepositoryManager();
    builder.Services.InjectServices();
    builder.Services.ConfigureHttpClients(builder.Configuration);
    builder.Services.ConfigureSqlContext(builder.Configuration);

    builder.Services.AddAutoMapper(typeof(Program));
    builder.Services.AddControllers()
        .AddApplicationPart(typeof(presentation.AssemblyReference).Assembly);
}


var app = builder.Build();
{
    app.UseCors("CorsPolicy");

    app.UseAuthorization();

    app.MapControllers();

    app.Run();
}

