import { IsNotEmpty, Min } from "class-validator";

export class OrderItemDto {
    @IsNotEmpty()
    product: string;

    @Min(1)
    quantity: number;

}
export class CreateOrderDto{
    products: OrderItemDto[];
}
   
