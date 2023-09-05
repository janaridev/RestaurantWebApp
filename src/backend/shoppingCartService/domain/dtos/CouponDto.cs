namespace domain.dtos;

public record CouponDto
{
    public string CouponId { get; init; }
    public string CouponCode { get; init; }
    public double DiscountAmount { get; init; }
    public double MinAmount { get; init; }
}