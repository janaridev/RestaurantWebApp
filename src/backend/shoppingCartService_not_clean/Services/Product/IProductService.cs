using Dtos;

namespace shoppingCartService.Services.Product;

public interface IProductService
{
    Task<IEnumerable<ProductDto>> GetProducts();
}