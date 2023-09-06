namespace domain.responses;

public class ErrorResponse
{
    public bool IsSuccess { get; set; }
    public int StatusCode { get; set; }
    public string Error { get; set; }
}