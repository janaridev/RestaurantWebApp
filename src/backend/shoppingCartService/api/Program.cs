using api.extensions;

var builder = WebApplication.CreateBuilder(args);
{
    // CUSTOM EXTENSIONS
    builder.Services.ConfigureSqlContext(builder.Configuration);

    builder.Services.AddAutoMapper(typeof(Program));
    builder.Services.AddControllers()
        .AddApplicationPart(typeof(presentation.AssemblyReference).Assembly);
}


var app = builder.Build();
{
    app.UseAuthorization();

    app.MapControllers();

    app.Run();
}

