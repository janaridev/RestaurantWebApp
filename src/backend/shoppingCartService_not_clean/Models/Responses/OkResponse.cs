namespace shoppingCartService.Models.Responses;

public class OkResponse
{
    public bool IsSuccess { get; set; }
    public int StatusCode { get; set; }
    public object Result { get; set; }
}