using domain.dtos;
using domain.responses;
using Newtonsoft.Json;

namespace presentation.services.coupon;

public class CouponService : ICouponService
{
    private readonly IHttpClientFactory _httpClientFactory;

    public CouponService(IHttpClientFactory clientFactory)
    {
        _httpClientFactory = clientFactory;
    }

    public async Task<CouponDto> GetCoupons(string couponCode)
    {
        var client = _httpClientFactory.CreateClient("Coupon");
        var response = await client.GetAsync($"/api/coupons/{couponCode}");
        var apiContent = await response.Content.ReadAsStringAsync();
        var resp = JsonConvert.DeserializeObject<SuccessResponse>(apiContent);
        if (resp != null && resp.IsSuccess)
        {
            return JsonConvert.DeserializeObject<CouponDto>(Convert.ToString(resp.Result));
        }
        return new CouponDto();
    }
}
