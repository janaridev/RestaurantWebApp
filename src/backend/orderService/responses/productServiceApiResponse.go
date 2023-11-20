package responses

import "orderService/dtos/product"

type ProductServiceApiResponse struct {
	IsSuccess  bool                 `json:"isSuccess"`
	StatusCode int                  `json:"statusCode"`
	Result     []product.ProductDto `json:"result"`
}