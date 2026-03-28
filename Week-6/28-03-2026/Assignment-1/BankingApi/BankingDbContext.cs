using BankingApi.Models;
using Microsoft.EntityFrameworkCore;

namespace BankingApi.Data
{
    public class BankingDbContext : DbContext
    {
        public BankingDbContext(DbContextOptions<BankingDbContext> options)
            : base(options) { }

        public DbSet<Transaction> Transactions => Set<Transaction>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed initial transactions
            modelBuilder.Entity<Transaction>().HasData(
                new Transaction { Id = 1,  Date = "2019-12-03", Description = "HACKERBANK INC. DES:CCD+ ID: 33375894749",     Type = 0, Amount = 1985.40m, Balance = "$12,234.45" },
                new Transaction { Id = 2,  Date = "2019-12-02", Description = "AMAZON.COM*MT1TA4IQ0 AMZN.COM/BILLWA",         Type = 1, Amount = 42.99m,   Balance = "$10,249.05" },
                new Transaction { Id = 3,  Date = "2019-12-02", Description = "WHOLE FOODS MARKET #10432 SAN FRANCISCO CA",   Type = 1, Amount = 87.34m,   Balance = "$10,292.04" },
                new Transaction { Id = 4,  Date = "2019-12-01", Description = "PAYROLL DIRECT DEPOSIT TECHCORP INC",          Type = 0, Amount = 3500.00m, Balance = "$10,379.38" },
                new Transaction { Id = 5,  Date = "2019-11-29", Description = "NETFLIX.COM LOS GATOS CA",                     Type = 1, Amount = 13.99m,   Balance = "$6,879.38"  },
                new Transaction { Id = 6,  Date = "2019-11-28", Description = "STARBUCKS STORE #08765 SAN JOSE CA",           Type = 1, Amount = 6.75m,    Balance = "$6,893.37"  },
                new Transaction { Id = 7,  Date = "2019-11-28", Description = "VENMO CASHOUT DES:TRANSFER ID: 99887766",      Type = 0, Amount = 250.00m,  Balance = "$6,900.12"  },
                new Transaction { Id = 8,  Date = "2019-11-27", Description = "SHELL OIL 12345678 SAN FRANCISCO CA",          Type = 1, Amount = 55.20m,   Balance = "$6,650.12"  },
                new Transaction { Id = 9,  Date = "2019-11-26", Description = "ATM WITHDRAWAL 123 MAIN ST SAN FRANCISCO CA",  Type = 1, Amount = 200.00m,  Balance = "$6,705.32"  },
                new Transaction { Id = 10, Date = "2019-11-25", Description = "DIVIDEND REINVESTMENT PLAN",                   Type = 0, Amount = 125.50m,  Balance = "$6,905.32"  },
                new Transaction { Id = 11, Date = "2019-11-24", Description = "TRADER JOE'S #455 SAN FRANCISCO CA",           Type = 1, Amount = 63.18m,   Balance = "$6,779.82"  },
                new Transaction { Id = 12, Date = "2019-11-22", Description = "APPLE.COM/BILL CUPERTINO CA",                  Type = 1, Amount = 9.99m,    Balance = "$6,843.00"  },
                new Transaction { Id = 13, Date = "2019-11-21", Description = "UBER *TRIP HELP.UBER.COM CA",                  Type = 1, Amount = 18.50m,   Balance = "$6,852.99"  },
                new Transaction { Id = 14, Date = "2019-11-20", Description = "INTEREST CREDIT HACKERBANK CHECKING",          Type = 0, Amount = 3.45m,    Balance = "$6,871.49"  },
                new Transaction { Id = 15, Date = "2019-11-19", Description = "COMCAST XFINITY DES:AUTOPAY ID: 4482991",      Type = 1, Amount = 89.99m,   Balance = "$6,868.04"  },
                new Transaction { Id = 16, Date = "2019-11-18", Description = "PG&E DES:ELECTRIC ID: 5839201",                Type = 1, Amount = 134.22m,  Balance = "$6,958.03"  },
                new Transaction { Id = 17, Date = "2019-11-15", Description = "PAYROLL DIRECT DEPOSIT TECHCORP INC",          Type = 0, Amount = 3500.00m, Balance = "$7,092.25"  },
                new Transaction { Id = 18, Date = "2019-11-14", Description = "ZELLE TRANSFER FROM MIKE J.",                  Type = 0, Amount = 450.00m,  Balance = "$3,592.25"  },
                new Transaction { Id = 19, Date = "2019-11-13", Description = "SAFEWAY #1234 SAN FRANCISCO CA",               Type = 1, Amount = 47.83m,   Balance = "$3,142.25"  },
                new Transaction { Id = 20, Date = "2019-11-12", Description = "WALGREENS #9876 SAN FRANCISCO CA",             Type = 1, Amount = 22.16m,   Balance = "$3,190.08"  }
            );
        }
    }
}
