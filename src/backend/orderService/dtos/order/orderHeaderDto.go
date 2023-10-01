package order

import "time"

type OrderHeaderDto struct {
	OrderHeaderId   string
	UserId          string
	CouponCode      string
	Discount        float64
	CartTotal       float64
	Email           string
	OrderTime       time.Time
	Status          string
	PaymentIntentId string
	StripeSessionId string
	OrderDetails    []OrderDetailsDto
}
