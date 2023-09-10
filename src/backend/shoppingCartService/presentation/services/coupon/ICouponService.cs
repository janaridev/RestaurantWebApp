using domain.dtos;

namespace presentation.services.coupon;

public interface ICouponService
{
    Task<CouponDto> GetCoupons(string couponCode);
}