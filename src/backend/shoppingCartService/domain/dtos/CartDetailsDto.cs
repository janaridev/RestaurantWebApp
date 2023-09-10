namespace domain.dtos;

public record CartDetailsDto
{
    public Guid CartDetailsId { get; set; }
    public Guid CartHeaderId { get; set; }
    public CartHeaderDto CartHeader { get; init; }
    public string ProductId { get; init; }
    public ProductDto Product { get; set; }
    public int Count { get; set; }
}