import { ICreateCouponDto } from "../dtos/createCoupon.dto";
import { Coupon, ICoupon } from "../models/coupon.model";

export class CouponService {
  public async getCoupons(): Promise<Array<ICoupon>> {
    const coupons = await Coupon.find().select("-__v");
    return coupons;
  }

  public async getCouponById(couponId: string): Promise<ICoupon> {
    const coupon = await Coupon.findById(couponId).select("-__v");
    return coupon;
  }

  public async createCoupon(coupon: ICreateCouponDto): Promise<ICoupon> {
    const newCoupon = new Coupon(coupon);
    const createdCoupon = await newCoupon.save();

    return createdCoupon;
  }

  public async isCouponExist(couponCode: string): Promise<boolean> {
    const coupon = await Coupon.findOne({ couponCode: couponCode });
    return coupon !== null;
  }
}
