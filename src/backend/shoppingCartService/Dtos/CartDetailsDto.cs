namespace Dtos;

public record CartDetailsDto
{
    public Guid CartDetailsId { get; init; }
    public Guid CartHeaderId { get; init; }
    public CartHeaderDto CartHeader { get; init; }
    public string ProductId { get; init; }
    public ProductDto Product { get; init; }
    public int Count { get; init; }
}