using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using SmartCourseAPI.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// .NET 10 built-in OpenAPI (no Swashbuckle needed)
builder.Services.AddOpenApi();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}

// Built-in OpenAPI JSON endpoint
app.MapOpenApi();

// Scalar UI (replaces Swagger UI in .NET 10)
app.MapScalarApiReference();

app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();

app.Run();