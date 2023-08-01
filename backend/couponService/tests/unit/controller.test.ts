import { FastifyRequest, FastifyReply } from "fastify";
import { CouponController } from "../../src/controllers/coupon.controller";
import { CouponService } from "../../src/services/coupon.service";
import { ICoupon } from "../../src/models/coupon.model";
import { ICreateCouponDto } from "../../src/dtos/createCoupon.dto";
import { IUpdateCouponDto } from "../../src/dtos/updateCoupon.dto";

// Mock the CouponService
jest.mock("../../src/services/coupon.service");

describe("CouponController", () => {
  let couponController: CouponController;
  let couponService: CouponService;
  let mockReply: FastifyReply;

  beforeEach(() => {
    couponService = new CouponService();
    couponController = new CouponController(couponService);
    mockReply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;
  });

  describe("getCoupons", () => {
    it("should return an array of coupons", async () => {
      // Mock CouponService.getCoupons method to return mock data
      const mockCoupons: ICoupon[] = [
        { couponCode: "coupon1", discountAmount: 10, minAmount: 100 },
        { couponCode: "coupon2", discountAmount: 20, minAmount: 200 },
      ];

      (
        CouponService.prototype.getCoupons as jest.MockedFunction<any>
      ).mockResolvedValue(mockCoupons);

      // Mock FastifyReply
      const reply: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      // Call the getCoupons method
      await couponController.getCoupons(
        {} as FastifyRequest,
        reply as FastifyReply
      );

      // Assert the response
      expect(reply.status).toHaveBeenCalledWith(200);
      expect(reply.send).toHaveBeenCalledWith({
        isSuccess: true,
        result: mockCoupons,
        statusCode: 200,
      });
    });
  });

  describe("getCouponById", () => {
    it("should return a coupon with the provided ID", async () => {
      // Mock coupon data
      const mockCoupon = {
        _id: "mock-id",
        couponCode: "coupon1",
        discountAmount: 10,
        minAmount: 100,
      };

      // Mock CouponService.getCouponById method to return the mock coupon
      const getCouponByIdMock = jest.fn().mockResolvedValue(mockCoupon);
      couponService.getCouponById = getCouponByIdMock;

      // Mock FastifyReply
      const reply: FastifyReply = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as any;

      // Call the getCouponById method with a mocked FastifyRequest containing the couponId
      await couponController.getCouponById(
        {
          params: {
            couponId: "mock-id",
          },
        } as FastifyRequest<{ Params: { couponId: string } }>,
        reply
      );

      // Assert that the response status and send methods were called with the expected values
      expect(reply.status).toHaveBeenCalledWith(200);
      expect(reply.send).toHaveBeenCalledWith({
        isSuccess: true,
        result: mockCoupon,
        statusCode: 200,
      });
    });

    it("should return null if the coupon with the provided ID is not found", async () => {
      // Mock CouponService.getCouponById method to return null
      const getCouponByIdMock = jest.fn().mockResolvedValue(null);
      couponService.getCouponById = getCouponByIdMock;

      // Mock FastifyReply
      const reply: FastifyReply = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as any;

      // Call the getCouponById method with a mocked FastifyRequest containing the couponId
      await couponController.getCouponById(
        {
          params: {
            couponId: "non-existing-id",
          },
        } as FastifyRequest<{ Params: { couponId: string } }>,
        reply
      );

      // Assert that the response status and send methods were called with the expected values
      expect(reply.status).toHaveBeenCalledWith(404);
      expect(reply.send).toHaveBeenCalledWith({
        isSuccess: false,
        error: "Coupon was not found.",
        statusCode: 404,
      });
    });

    it("should handle errors when fetching the coupon", async () => {
      // Mock CouponService.getCouponById method to throw an error
      const getCouponByIdMock = jest
        .fn()
        .mockRejectedValue(new Error("Mock error"));
      couponService.getCouponById = getCouponByIdMock;

      // Mock FastifyReply
      const reply: FastifyReply = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as any;

      // Call the getCouponById method with a mocked FastifyRequest containing the couponId
      await couponController.getCouponById(
        {
          params: {
            couponId: "mock-id",
          },
        } as FastifyRequest<{ Params: { couponId: string } }>,
        reply
      );

      // Assert that the response status and send methods were called with the expected values
      expect(reply.status).toHaveBeenCalledWith(500);
      expect(reply.send).toHaveBeenCalledWith({
        isSuccess: false,
        error: "Error while fetching coupon",
        statusCode: 500,
      });
    });

    describe("createCoupon", () => {
      it("should create a new coupon and return it with a 201 status code", async () => {
        // Mock coupon data
        const createCouponDto: ICreateCouponDto = {
          couponCode: "coupon1",
          discountAmount: 10,
          minAmount: 100,
        };

        // Mock the CouponService.isCouponExist method to return false
        jest.spyOn(couponService, "isCouponExist").mockResolvedValue(false);

        // Mock the CouponService.createCoupon method to return the created coupon
        const mockCreatedCoupon = {
          _id: "mock-id",
          couponCode: createCouponDto.couponCode,
          discountAmount: createCouponDto.discountAmount,
          minAmount: createCouponDto.minAmount,
        };
        jest
          .spyOn(couponService, "createCoupon")
          .mockResolvedValue(mockCreatedCoupon);

        // Call the createCoupon method with a mocked FastifyRequest containing the createCouponDto
        await couponController.createCoupon(
          {
            body: createCouponDto,
          } as FastifyRequest<{ Body: ICreateCouponDto }>,
          mockReply
        );

        // Assert that the response status and send methods were called with the expected values
        expect(mockReply.status).toHaveBeenCalledWith(201);
        expect(mockReply.send).toHaveBeenCalledWith({
          isSuccess: true,
          result: mockCreatedCoupon,
          statusCode: 201,
        });
      });

      it("should return an error response with a 400 status code if required fields are missing", async () => {
        // Mock coupon data with missing fields
        const createCouponDto = {
          couponCode: "coupon1",
        };

        // Call the createCoupon method with a mocked FastifyRequest containing the createCouponDto
        await couponController.createCoupon(
          {
            body: createCouponDto,
          } as FastifyRequest<{ Body: ICreateCouponDto }>,
          mockReply
        );

        // Assert that the response status and send methods were called with the expected values
        expect(mockReply.status).toHaveBeenCalledWith(400);
        expect(mockReply.send).toHaveBeenCalledWith({
          isSuccess: false,
          error: "Provide more information.",
          statusCode: 400,
        });
      });

      it("should return an error response with a 400 status code if the coupon already exists", async () => {
        // Mock coupon data
        const createCouponDto: ICreateCouponDto = {
          couponCode: "existing-coupon",
          discountAmount: 10,
          minAmount: 100,
        };

        // Mock the CouponService.isCouponExist method to return true
        jest.spyOn(couponService, "isCouponExist").mockResolvedValue(true);

        // Call the createCoupon method with a mocked FastifyRequest containing the createCouponDto
        await couponController.createCoupon(
          {
            body: createCouponDto,
          } as FastifyRequest<{ Body: ICreateCouponDto }>,
          mockReply
        );

        // Assert that the response status and send methods were called with the expected values
        expect(mockReply.status).toHaveBeenCalledWith(400);
        expect(mockReply.send).toHaveBeenCalledWith({
          isSuccess: false,
          error: "Coupon already exists.",
          statusCode: 400,
        });
      });

      it("should return an error response with a 500 status code if an error occurs during coupon creation", async () => {
        // Mock coupon data
        const createCouponDto: ICreateCouponDto = {
          couponCode: "coupon1",
          discountAmount: 10,
          minAmount: 100,
        };

        // Mock the CouponService.isCouponExist method to return false
        jest.spyOn(couponService, "isCouponExist").mockResolvedValue(false);

        // Mock the CouponService.createCoupon method to throw an error
        jest
          .spyOn(couponService, "createCoupon")
          .mockRejectedValue(new Error("Mock error"));

        // Call the createCoupon method with a mocked FastifyRequest containing the createCouponDto
        await couponController.createCoupon(
          {
            body: createCouponDto,
          } as FastifyRequest<{ Body: ICreateCouponDto }>,
          mockReply
        );

        // Assert that the response status and send methods were called with the expected values
        expect(mockReply.status).toHaveBeenCalledWith(500);
        expect(mockReply.send).toHaveBeenCalledWith({
          isSuccess: false,
          error: "Failed to create coupon.",
          statusCode: 500,
        });
      });
    });

    describe("updateCoupon", () => {
      it("should update the coupon and return a success message with a 200 status code", async () => {
        // Mock coupon data
        const couponId = "mock-id";
        const updateCouponDto: IUpdateCouponDto = {
          couponCode: "updated-coupon",
          discountAmount: 20,
          minAmount: 200,
        };

        // Mock the CouponService.getCouponById method to return a valid coupon
        const mockCoupon = {
          _id: couponId,
          couponCode: "existing-coupon",
          discountAmount: 10,
          minAmount: 100,
        };
        jest
          .spyOn(couponService, "getCouponById")
          .mockResolvedValue(mockCoupon);

        // Mock the CouponService.isCouponExist method to return false
        jest.spyOn(couponService, "isCouponExist").mockResolvedValue(false);

        // Mock the CouponService.updateCoupon method to return nothing (void)
        jest.spyOn(couponService, "updateCoupon").mockResolvedValue(undefined);

        // Call the updateCoupon method with a mocked FastifyRequest containing the updateCouponDto
        await couponController.updateCoupon(
          {
            params: {
              couponId: couponId,
            },
            body: updateCouponDto,
          } as FastifyRequest<{
            Body: IUpdateCouponDto;
            Params: { couponId: string };
          }>,
          mockReply
        );

        // Assert that the response status and send methods were called with the expected values
        expect(mockReply.status).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalledWith({
          isSuccess: true,
          result: "Coupon was updated.",
          statusCode: 200,
        });
      });

      it("should return an error response with a 400 status code if required fields are missing", async () => {
        // Mock coupon data with missing fields
        const couponId = "mock-id";
        const updateCouponDto = {
          couponCode: "updated-coupon",
        };

        // Call the updateCoupon method with a mocked FastifyRequest containing the updateCouponDto
        await couponController.updateCoupon(
          {
            params: {
              couponId: couponId,
            },
            body: updateCouponDto,
          } as FastifyRequest<{
            Body: IUpdateCouponDto;
            Params: { couponId: string };
          }>,
          mockReply
        );

        // Assert that the response status and send methods were called with the expected values
        expect(mockReply.status).toHaveBeenCalledWith(400);
        expect(mockReply.send).toHaveBeenCalledWith({
          isSuccess: false,
          error: "Provide more information.",
          statusCode: 400,
        });
      });

      it("should return an error response with a 404 status code if the coupon with the provided ID is not found", async () => {
        // Mock coupon data
        const couponId = "non-existing-id";
        const updateCouponDto: IUpdateCouponDto = {
          couponCode: "updated-coupon",
          discountAmount: 20,
          minAmount: 200,
        };

        // Mock the CouponService.getCouponById method to return null (coupon not found)
        jest.spyOn(couponService, "getCouponById").mockResolvedValue(null);

        // Call the updateCoupon method with a mocked FastifyRequest containing the updateCouponDto
        await couponController.updateCoupon(
          {
            params: {
              couponId: couponId,
            },
            body: updateCouponDto,
          } as FastifyRequest<{
            Body: IUpdateCouponDto;
            Params: { couponId: string };
          }>,
          mockReply
        );

        // Assert that the response status and send methods were called with the expected values
        expect(mockReply.status).toHaveBeenCalledWith(404);
        expect(mockReply.send).toHaveBeenCalledWith({
          isSuccess: false,
          error: "Coupon was not found.",
          statusCode: 404,
        });
      });

      it("should return an error response with a 400 status code if the coupon code is already taken", async () => {
        // Mock coupon data
        const couponId = "mock-id";
        const updateCouponDto: IUpdateCouponDto = {
          couponCode: "existing-coupon",
          discountAmount: 20,
          minAmount: 200,
        };

        // Mock the CouponService.getCouponById method to return a valid coupon
        const mockCoupon = {
          _id: couponId,
          couponCode: "existing-coupon",
          discountAmount: 10,
          minAmount: 100,
        };
        jest
          .spyOn(couponService, "getCouponById")
          .mockResolvedValue(mockCoupon);

        // Mock the CouponService.isCouponExist method to return true (coupon code already exists)
        jest.spyOn(couponService, "isCouponExist").mockResolvedValue(true);

        // Call the updateCoupon method with a mocked FastifyRequest containing the updateCouponDto
        await couponController.updateCoupon(
          {
            params: {
              couponId: couponId,
            },
            body: updateCouponDto,
          } as FastifyRequest<{
            Body: IUpdateCouponDto;
            Params: { couponId: string };
          }>,
          mockReply
        );

        // Assert that the response status and send methods were called with the expected values
        expect(mockReply.status).toHaveBeenCalledWith(400);
        expect(mockReply.send).toHaveBeenCalledWith({
          isSuccess: false,
          error: "Coupon code already exists.",
          statusCode: 400,
        });
      });

      it("should return an error response with a 500 status code if an error occurs during coupon update", async () => {
        // Mock coupon data
        const couponId = "mock-id";
        const updateCouponDto: IUpdateCouponDto = {
          couponCode: "updated-coupon",
          discountAmount: 20,
          minAmount: 200,
        };

        // Mock the CouponService.getCouponById method to return a valid coupon
        const mockCoupon = {
          _id: couponId,
          couponCode: "existing-coupon",
          discountAmount: 10,
          minAmount: 100,
        };
        jest
          .spyOn(couponService, "getCouponById")
          .mockResolvedValue(mockCoupon);

        // Mock the CouponService.isCouponExist method to return false
        jest.spyOn(couponService, "isCouponExist").mockResolvedValue(false);

        // Mock the CouponService.updateCoupon method to throw an error
        jest
          .spyOn(couponService, "updateCoupon")
          .mockRejectedValue(new Error("Mock error"));

        // Call the updateCoupon method with a mocked FastifyRequest containing the updateCouponDto
        await couponController.updateCoupon(
          {
            params: {
              couponId: couponId,
            },
            body: updateCouponDto,
          } as FastifyRequest<{
            Body: IUpdateCouponDto;
            Params: { couponId: string };
          }>,
          mockReply
        );

        // Assert that the response status and send methods were called with the expected values
        expect(mockReply.status).toHaveBeenCalledWith(500);
        expect(mockReply.send).toHaveBeenCalledWith({
          isSuccess: false,
          error: "Failed to update coupon.",
          statusCode: 500,
        });
      });
    });

    describe("deleteCoupon", () => {
      it("should delete the coupon and return a success message with a 200 status code", async () => {
        // Mock coupon data
        const couponId = "mock-id";

        // Mock the CouponService.getCouponById method to return a valid coupon
        const mockCoupon = {
          _id: couponId,
          couponCode: "existing-coupon",
          discountAmount: 10,
          minAmount: 100,
        };
        jest
          .spyOn(couponService, "getCouponById")
          .mockResolvedValue(mockCoupon);

        // Mock the CouponService.deleteCoupon method to return nothing (void)
        jest.spyOn(couponService, "deleteCoupon").mockResolvedValue(undefined);

        // Call the deleteCoupon method with a mocked FastifyRequest containing the couponId
        await couponController.deleteCoupon(
          {
            params: {
              couponId: couponId,
            },
          } as FastifyRequest<{ Params: { couponId: string } }>,
          mockReply
        );

        // Assert that the response status and send methods were called with the expected values
        expect(mockReply.status).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalledWith({
          isSuccess: true,
          result: "Coupon was deleted.",
          statusCode: 200,
        });
      });

      it("should return an error response with a 400 status code if the coupon id is missing", async () => {
        // Call the deleteCoupon method with a mocked FastifyRequest without the couponId
        await couponController.deleteCoupon(
          {
            params: {
              couponId: undefined, // Missing 'couponId'
            },
          } as FastifyRequest<{ Params: { couponId: string } }>,
          mockReply
        );

        // Assert that the response status and send methods were called with the expected values
        expect(mockReply.status).toHaveBeenCalledWith(400);
        expect(mockReply.send).toHaveBeenCalledWith({
          isSuccess: false,
          error: "Coupon id is null.",
          statusCode: 400,
        });
      });

      it("should return an error response with a 404 status code if the coupon with the provided ID is not found", async () => {
        // Mock coupon data
        const couponId = "non-existing-id";

        // Mock the CouponService.getCouponById method to return null (coupon not found)
        jest.spyOn(couponService, "getCouponById").mockResolvedValue(null);

        // Call the deleteCoupon method with a mocked FastifyRequest containing the couponId
        await couponController.deleteCoupon(
          {
            params: {
              couponId: couponId,
            },
          } as FastifyRequest<{ Params: { couponId: string } }>,
          mockReply
        );

        // Assert that the response status and send methods were called with the expected values
        expect(mockReply.status).toHaveBeenCalledWith(404);
        expect(mockReply.send).toHaveBeenCalledWith({
          isSuccess: false,
          error: "Coupon was not found.",
          statusCode: 404,
        });
      });

      it("should return an error response with a 500 status code if an error occurs during coupon deletion", async () => {
        // Mock coupon data
        const couponId = "mock-id";

        // Mock the CouponService.getCouponById method to return a valid coupon
        const mockCoupon = {
          _id: couponId,
          couponCode: "existing-coupon",
          discountAmount: 10,
          minAmount: 100,
        };
        jest
          .spyOn(couponService, "getCouponById")
          .mockResolvedValue(mockCoupon);

        // Mock the CouponService.deleteCoupon method to throw an error
        jest
          .spyOn(couponService, "deleteCoupon")
          .mockRejectedValue(new Error("Mock error"));

        // Call the deleteCoupon method with a mocked FastifyRequest containing the couponId
        await couponController.deleteCoupon(
          {
            params: {
              couponId: couponId,
            },
          } as FastifyRequest<{ Params: { couponId: string } }>,
          mockReply
        );

        // Assert that the response status and send methods were called with the expected values
        expect(mockReply.status).toHaveBeenCalledWith(500);
        expect(mockReply.send).toHaveBeenCalledWith({
          isSuccess: false,
          error: "Failed to delete coupon.",
          statusCode: 500,
        });
      });
    });
  });
});
