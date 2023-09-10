using Dtos;

namespace shoppingCartService.Services.Coupon;

public interface ICouponService
{
    Task<CouponDto> GetCoupons(string couponCode);
}

