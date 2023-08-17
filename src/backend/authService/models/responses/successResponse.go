package responses

type SuccessResponse struct {
	IsSuccess  bool        `json:"isSuccess"`
	StatusCode int         `json:"statuscode"`
	Result     interface{} `json:"result"`
}

func SendSuccessResponse(isSuccess bool, statusCode int, result interface{}) SuccessResponse {
	return SuccessResponse{
		IsSuccess:  isSuccess,
		StatusCode: statusCode,
		Result:     result,
	}
}
