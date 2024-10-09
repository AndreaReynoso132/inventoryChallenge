using System.Collections.Generic;
using System.Threading.Tasks;
using InventoryApi.Core.Entities;
using InventoryApi.Models;

namespace InventoryApi.Core.Interfaces
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetAllProductsAsync();
        Task<Product> GetProductByIdAsync(int id);
        Task AddProductAsync(Product product);
        Task UpdateProductAsync(Product product);
        Task DeleteProductAsync(int id);
    }
}
