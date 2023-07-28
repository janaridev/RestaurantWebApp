export interface ICreateCouponDto {
  couponCode: string;
  discountAmount: number;
  minAmount?: number;
}
