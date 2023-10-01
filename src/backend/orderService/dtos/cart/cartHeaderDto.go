package cart

type CartHeaderDto struct {
	CartHeaderId string
	UserId       string
	CouponCode   string
	Discount     float64
	CartTotal    float64
	Email        string
}
