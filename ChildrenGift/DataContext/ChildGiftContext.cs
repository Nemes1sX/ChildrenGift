using ChildrenGift.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace ChildrenGift.DatContext
{
    public class ChildGiftContext : DbContext
    {
        public ChildGiftContext(DbContextOptions<ChildGiftContext> contextOptions) : base(contextOptions) 
        { 
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            ChildrenGiftSeeding.SeedData(modelBuilder);
        }

        public DbSet<Child> Children { get; set; }
        public DbSet<Gift> Gifts { get; set; }
    }
}
