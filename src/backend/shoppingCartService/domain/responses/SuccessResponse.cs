namespace domain.responses;

public class SuccessResponse
{
    public bool IsSuccess { get; set; }
    public int StatusCode { get; set; }
    public object Result { get; set; }
}