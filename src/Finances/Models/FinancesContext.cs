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
        public DbSet<Tag> Tags { get; set; }
        public DbSet<Settings> Settings { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string connStr = Startup.Configuration["Data:FinancesContexConnection"];
            optionsBuilder.UseSqlServer(connStr);
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<TransactionTagMap>()
                .HasKey(t => new { t.TransactionId, t.TagId });

            modelBuilder.Entity<TransactionTagMap>()
                .HasOne(pt => pt.Transaction)
                .WithMany(p => p.TransactionTagMaps)
                .HasForeignKey(pt => pt.TransactionId);

            modelBuilder.Entity<TransactionTagMap>()
                .HasOne(pt => pt.Tag)
                .WithMany(t => t.TransactionTagMaps)
                .HasForeignKey(pt => pt.TagId);
        }
    }
}
