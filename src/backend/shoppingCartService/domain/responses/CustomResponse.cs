namespace domain.responses;

public abstract class CustomResponse
{
    public bool IsSuccess { get; set; }
    public int StatusCode { get; set; }
}