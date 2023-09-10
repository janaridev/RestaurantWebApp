namespace shoppingCartService.Models.Responses;

public class ErrorResponse
{
    public bool IsSuccess { get; set; }
    public int StatusCode { get; set; }
    public string Error { get; set; }
}