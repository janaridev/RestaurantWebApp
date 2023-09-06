using domain.responses;

namespace shoppingCartService.Models.Responses;

public static class ApiResponseHandler
{
    public static SuccessResponse SendSuccessResponse(int statusCode, object result)
    {
        var responseData = new SuccessResponse
        {
            IsSuccess = true,
            StatusCode = statusCode,
            Result = result
        };
        return responseData;
    }

    public static ErrorResponse SendErrorResponse(int statusCode, string error)
    {
        var responseData = new ErrorResponse
        {
            IsSuccess = false,
            StatusCode = statusCode,
            Error = error,
        };

        return responseData;
    }
}