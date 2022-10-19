using Microsoft.EntityFrameworkCore;
using Models.Models;

namespace Models.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new SystemParameterConfiguration());
        }

        public DbSet<User> SalaryUsers { get; set; }

        public DbSet<SystemParameter> SystemParameters { get; set; }

    }
}