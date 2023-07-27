import { CreateCouponDto } from "../dtos/createCoupon.dto";
import { Coupon, ICoupon } from "../models/coupon.model";

export class CouponService {
  public async getCoupons(): Promise<Array<ICoupon>> {
    const coupons = await Coupon.find();
    return coupons;
  }

  public async getCouponById(couponId: string): Promise<ICoupon> {
    const coupon = await Coupon.findById(couponId);
    return coupon;
  }

  public async createCoupon(coupon: CreateCouponDto): Promise<ICoupon> {
    const newCoupon = new Coupon(coupon);
    const createdCoupon = await newCoupon.save();

    return createdCoupon;
  }

  public async isCouponExist(couponCode: string): Promise<boolean> {
    const coupon = await Coupon.findOne({ couponCode: couponCode });
    return coupon !== null;
  }
}
