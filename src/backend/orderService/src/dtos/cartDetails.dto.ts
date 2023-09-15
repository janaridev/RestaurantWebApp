import { CartHeaderDto } from "./cartHeader.dto";
import { ProductDto } from "./product.dto";

export interface CartDetailsDto {
  cartDetailsId: string;
  cartHeaderId: string;
  cartHeaderDto: CartHeaderDto;
  productId: string;
  productDto: ProductDto;
  count: number;
}
