using Microsoft.EntityFrameworkCore;
using JwtRoleAuthApi.Models;

namespace JwtRoleAuthApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        public DbSet<User> Users { get; set; }
    }
}