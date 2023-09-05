namespace domain.dtos;

public record ProductDto
{
    public string _id { get; init; }
    public string Name { get; init; }
    public double Price { get; init; }
    public string Description { get; init; }
    public string CategoryName { get; init; }
    public string ImageUrl { get; init; }
}