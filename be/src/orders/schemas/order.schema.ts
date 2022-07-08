import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Product } from "src/products/schemas/product.schema";
import { User } from "src/users/schemas/user.schema";
import { Delivery } from "./delivery.schema";

export type OrderDocument = Order & Document;

@Schema({timestamps: true})
export class Order {

    @Prop({type: mongoose.Schema.Types.ObjectId, ref:'User', required: true})
    customerId: User;

    @Prop({
        type:[{
            quantity:{type:Number, min: 1, required: true}, 
            product:{type:mongoose.Schema.Types.ObjectId, required: true, ref: 'Product'}
        }],
        required: true
    })
    items: { quantity: number; product: Product }[];

    @Prop()
    totalPrice: number;

    @Prop()
    delivery: Delivery;

    @Prop({
        default: 'pending',
        enum: [
            'pending',
            'confirmed',
            'delivering',
            'completed',
            'cancelled'
        ]
        

    })
    status: string;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
OrderSchema.pre(/^find/, async function(next: Function) {
    this.populate('items.product');
    next();
})