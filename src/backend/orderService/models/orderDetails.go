package models

import uuid "github.com/satori/go.uuid"

type OrderDetails struct {
	OrderDetailId uuid.UUID `gorm:"type:char(32);primary_key;unique"`
	OrderHeaderId uuid.UUID
	OrderHeader   OrderHeader
	ProductId     string
	Count         int
	ProductName   string
	Price         float64
}
