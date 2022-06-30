import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Product } from "src/products/schemas/product.schema";
import { Customer } from "./customer.schema";
import { OrderItem } from "./orderItem.schema";

export type OrderDocument = Order & Document;

@Schema({timestamps: true})
export class Order {

    @Prop({
        type:[{quantity:{type:Number, min: 1, required: true}, product:{type:mongoose.Schema.Types.ObjectId, required: true, ref: 'Product'}}],
        required: true
    })
    items: { quantity: number; product: Product }[];

    @Prop()
    totalPrice: number;

    @Prop()
    customer: Customer;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
OrderSchema.pre(/^find/, async function(next: Function) {
    this.populate('items.product')
})