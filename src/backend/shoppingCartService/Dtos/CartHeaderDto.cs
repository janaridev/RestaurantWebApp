namespace Dtos;

public record CartHeaderDto
{
    public Guid CartHeaderId { get; init; }
    public string UserId { get; init; }
    public string CouponCode { get; init; }
    public double Discount { get; init; }
    public double CartTotal { get; init; }
}