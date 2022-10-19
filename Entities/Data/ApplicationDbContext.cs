using Microsoft.EntityFrameworkCore;
using Entities.Models;

namespace Entities.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> SalaryUsers { get; set; }

        public DbSet<SystemParameter> SystemParameters { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new SystemParameterConfiguration());
        }
    }
}