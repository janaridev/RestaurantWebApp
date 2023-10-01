package models

import (
	"time"

	uuid "github.com/satori/go.uuid"
)

type OrderHeader struct {
	OrderHeaderId   uuid.UUID `gorm:"type:char(32);primary_key;unique"`
	UserId          string
	CouponCode      string
	Discount        float64
	CartTotal       float64
	Email           string
	OrderTime       time.Time
	Status          string
	PaymentIntentId string
	StripeSessionId string
	OrderDetails    []OrderDetails
}
