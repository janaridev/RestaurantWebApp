namespace shoppingCartService.Models.Responses;

public static class ApiResponseHandler
{
    public static OkResponse SendSuccessResponse(int statusCode, object result)
    {
        var responseData = new OkResponse
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