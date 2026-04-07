// Data/BillingDbContext.cs
using Microsoft.EntityFrameworkCore;

public class BillingDbContext : DbContext
{
    public BillingDbContext(DbContextOptions<BillingDbContext> options) : base(options) { }

    public DbSet<CatalogItem> CatalogItems { get; set; }
    public DbSet<Bill> Bills { get; set; }
    public DbSet<BillItem> BillItems { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Seed initial catalog data
        modelBuilder.Entity<CatalogItem>().HasData(
            new CatalogItem { Id = 1, Name = "Adult Ticket", CatalogCategory = "Entrance", DefaultPrice = 50.00m },
            new CatalogItem { Id = 2, Name = "Child Ticket", CatalogCategory = "Entrance", DefaultPrice = 25.00m },
            new CatalogItem { Id = 3, Name = "General Donation", CatalogCategory = "Donation", DefaultPrice = 0.00m, IsVariablePrice = true },
            new CatalogItem { Id = 4, Name = "Event T-Shirt", CatalogCategory = "SellingPrice", DefaultPrice = 20.00m }
        );
    }
}