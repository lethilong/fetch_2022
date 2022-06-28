import { IsNotEmpty, Min } from "class-validator";
import { Product } from "src/products/schemas/product.schema";

export class ChangeCartDto {

    @IsNotEmpty()
    productId: Product;

}