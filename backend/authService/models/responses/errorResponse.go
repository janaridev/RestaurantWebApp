package responses

type ErrorResponse struct {
	IsSuccess  bool   `json:"isSuccess"`
	StatusCode int    `json:"statuscode"`
	Error      string `json:"result"`
}

func SendErrorResponse(isSuccess bool, statusCode int, err string) ErrorResponse {
	return ErrorResponse{
		IsSuccess:  isSuccess,
		StatusCode: statusCode,
		Error:      err,
	}
}
