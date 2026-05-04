using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ProductManagement.Data;
using ProductManagement.Repositories.Implementations;
using ProductManagement.Repositories.Interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

var appConnectionString = builder.Configuration.GetConnectionString("AppConnection");
var identityConnectionString = builder.Configuration.GetConnectionString("IdentityConnection");

// App data DB
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(appConnectionString));

// Identity DB
builder.Services.AddDbContext<ProductManagementContext>(options =>
    options.UseSqlServer(identityConnectionString));

// Identity
builder.Services.AddDefaultIdentity<ApplicationUser>(options =>
{
    options.SignIn.RequireConfirmedAccount = true;
})
.AddEntityFrameworkStores<ProductManagementContext>();

builder.Services.AddRazorPages();

// Repositories
builder.Services.AddScoped<IProductRepository, ProductRepository>();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapStaticAssets();
app.MapControllers();
app.MapRazorPages();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();

using (var scope = app.Services.CreateScope())
{
    var appDb = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    var identityDb = scope.ServiceProvider.GetRequiredService<ProductManagementContext>();

    appDb.Database.EnsureCreated();
    identityDb.Database.EnsureCreated();
}

app.Run();