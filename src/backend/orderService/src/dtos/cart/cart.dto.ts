import { CartDetailsDto } from "./cartDetails.dto";
import { CartHeaderDto } from "./cartHeader.dto";

export interface CartDto {
  cartHeaderDto: CartHeaderDto;
  cartDetailsDto: Array<CartDetailsDto>;
}
