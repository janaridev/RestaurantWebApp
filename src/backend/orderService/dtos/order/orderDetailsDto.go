package order

import "orderService/dtos/product"

type OrderDetailsDto struct {
	OrderDetailId string
	OrderHeaderId string
	ProductId     string
	Product       product.ProductDto
	Count         int
	ProductName   string
	Price         float64
}
