namespace Dtos;

public record CartDto
{
    public CartHeaderDto CartHeader { get; init; }
    public IEnumerable<CartDetailsDto> CartDetails { get; init; }
}