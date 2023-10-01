package cart

import "orderService/dtos/product"

type CartDetailsDto struct {
	CartDetailId  string
	CartHeaderId  string
	CartHeaderDto CartHeaderDto
	ProductId     string
	ProductDto    product.ProductDto
	Count         int
}
