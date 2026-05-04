using EMPSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace EMPSystem.Data
{
    public class AppDbContext :DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Employees> Employees { get; set; }
    }
}
