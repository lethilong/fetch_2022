import { IsNotEmpty, IsNumberString, Min } from "class-validator";

export class OrderItemDto {
    @IsNotEmpty()
    product: string;

    @Min(1)
    quantity: number;

}

export class CustomerDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    @IsNumberString()
    address: string;
}
export class CreateOrderDto{
    @IsNotEmpty()
    products: OrderItemDto[];

    @IsNotEmpty()
    customer: CustomerDto;
}
   
