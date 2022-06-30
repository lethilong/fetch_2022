import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Customer } from "src/orders/schemas/customer.schema";
import { Product } from "src/products/schemas/product.schema";

export type CartDocument = Cart & Document;

@Schema({timestamps: true})
export class Cart {
    @Prop({required: true})
    customerIp: string;

    @Prop({
        type:[{quantity:{type:Number}, productId:{type:mongoose.Schema.Types.ObjectId, required: true, ref: 'Product'}}]
    })
    items: { quantity: number; productId: Product }[];
 
    @Prop()
    customer: Customer;
}

export const CartSchema = SchemaFactory.createForClass(Cart);