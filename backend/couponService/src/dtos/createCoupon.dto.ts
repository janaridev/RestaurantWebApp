export interface CreateCouponDto {
  couponCode: string;
  discountAmount: number;
  minAmount?: number;
}
