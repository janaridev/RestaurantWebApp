namespace domain.dtos;

public record CartDto
{
    public CartHeaderDto CartHeader { get; init; }
    public IEnumerable<CartDetailsDto> CartDetails { get; set; }
}