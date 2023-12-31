using domain.dtos;

namespace presentation.services.product;

public interface IProductService
{
    Task<IEnumerable<ProductDto>> GetProducts();
    Task<ProductDto> GetProductById(string productId);
}