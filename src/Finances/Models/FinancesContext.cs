using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Data.Entity;

namespace Finances.Models
{
    public class FinancesContext : IdentityDbContext<User>
    {
        public FinancesContext()
        {
            Database.EnsureCreated();
        }

        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Saving> Savings { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string connStr = Startup.Configuration["Data:FinancesContexConnection"];
            optionsBuilder.UseSqlServer(connStr);
            base.OnConfiguring(optionsBuilder);
        }
    }
}
