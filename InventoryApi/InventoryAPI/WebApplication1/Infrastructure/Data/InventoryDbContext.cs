using Microsoft.EntityFrameworkCore;
using InventoryApi.Core.Entities;
using InventoryApi.Models;

namespace InventoryApi.Infrastructure.Data
{
    public class InventoryDbContext : DbContext
    {
        public InventoryDbContext(DbContextOptions<InventoryDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<Users> Users { get; set; }

    }
}
