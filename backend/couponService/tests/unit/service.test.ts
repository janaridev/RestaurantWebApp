import { CouponService } from "../../src/services/coupon.service";
import { ICreateCouponDto } from "../../src/dtos/createCoupon.dto";
import { IUpdateCouponDto } from "../../src/dtos/updateCoupon.dto";
import { Coupon } from "../../src/models/coupon.model";

jest.mock("../../src/models/coupon.model");

describe("CouponService", () => {
  let couponService: CouponService;

  beforeEach(() => {
    couponService = new CouponService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getCoupons", () => {
    it("should return an array of coupons", async () => {
      const mockCoupons: ICreateCouponDto[] = [
        { couponCode: "coupon1", discountAmount: 10, minAmount: 100 },
        { couponCode: "coupon2", discountAmount: 20, minAmount: 200 },
      ];
      (Coupon.find as jest.MockedFunction<any>).mockResolvedValue(mockCoupons);

      const result = await couponService.getCoupons();
      expect(result).toEqual(mockCoupons);
    });
  });

  describe("getCouponById", () => {
    it("should return a coupon with the provided ID", async () => {
      const mockCoupon: ICreateCouponDto = {
        couponCode: "coupon1",
        discountAmount: 10,
        minAmount: 100,
      };
      const couponId = "some-id";
      (Coupon.findById as jest.MockedFunction<any>).mockResolvedValue(
        mockCoupon
      );

      const result = await couponService.getCouponById(couponId);
      expect(result).toEqual(mockCoupon);
    });

    it("should return null if the coupon with the provided ID is not found", async () => {
      const couponId = "non-existing-id";
      (Coupon.findById as jest.MockedFunction<any>).mockResolvedValue(null);

      const result = await couponService.getCouponById(couponId);
      expect(result).toBeNull();
    });
  });

  describe("createCoupon", () => {
    it("should create and return a new coupon", async () => {
      const newCoupon: ICreateCouponDto = {
        couponCode: "new-coupon",
        discountAmount: 15,
        minAmount: 150,
      };

      // Mock the save method to return the newCoupon with a generated _id
      const saveMock = jest
        .fn()
        .mockResolvedValue({ ...newCoupon, _id: "some-id" });
      jest.spyOn(Coupon.prototype, "save").mockImplementation(saveMock);

      const result = await couponService.createCoupon(newCoupon);

      expect(result).toEqual({
        ...newCoupon,
        _id: "some-id",
      });
    });
  });

  describe("updateCoupon", () => {
    it("should update the coupon with the provided ID", async () => {
      const couponId = "some-id";
      const updateCoupon: IUpdateCouponDto = {
        couponCode: "",
        discountAmount: 20,
        minAmount: 200,
      };

      await couponService.updateCoupon(couponId, updateCoupon);
      expect(Coupon.findByIdAndUpdate).toHaveBeenCalledWith(
        couponId,
        updateCoupon
      );
    });
  });

  describe("deleteCoupon", () => {
    it("should delete the coupon with the provided ID", async () => {
      const couponId = "some-id";
      await couponService.deleteCoupon(couponId);
      expect(Coupon.deleteOne).toHaveBeenCalledWith({ _id: couponId });
    });
  });

  describe("isCouponExist", () => {
    it("should return true if the coupon with the provided code exists", async () => {
      const couponCode = "existing-coupon";
      (Coupon.findOne as jest.MockedFunction<any>).mockResolvedValue({
        _id: "some-id",
      });

      const result = await couponService.isCouponExist(couponCode);
      expect(result).toBe(true);
    });

    it("should return false if the coupon with the provided code does not exist", async () => {
      const couponCode = "non-existing-coupon";
      (Coupon.findOne as jest.MockedFunction<any>).mockResolvedValue(null);

      const result = await couponService.isCouponExist(couponCode);
      expect(result).toBe(false);
    });
  });
});
