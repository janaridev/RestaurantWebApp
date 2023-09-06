using Dtos;
using Newtonsoft.Json;
using shoppingCartService.Models.Responses;

namespace shoppingCartService.Services.Product;

public class ProductService : IProductService
{
    private readonly IHttpClientFactory _httpClientFactory;

    public ProductService(IHttpClientFactory clientFactory)
    {
        _httpClientFactory = clientFactory;
    }
    public async Task<IEnumerable<ProductDto>> GetProducts()
    {
        var client = _httpClientFactory.CreateClient("Product");
        var response = await client.GetAsync($"/api/products");
        var apiContent = await response.Content.ReadAsStringAsync();
        var resp = JsonConvert.DeserializeObject<OkResponse>(apiContent);
        if (resp.IsSuccess)
        {
            return JsonConvert.DeserializeObject<IEnumerable<ProductDto>>(Convert.ToString(resp.Result));
        }
        return new List<ProductDto>();
    }
}

