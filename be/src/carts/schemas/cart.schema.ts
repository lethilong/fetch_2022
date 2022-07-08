import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Product } from "src/products/schemas/product.schema";
import { User } from "src/users/schemas/user.schema";

export type CartDocument = Cart & Document;

@Schema({timestamps: true})
export class Cart {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref:'User', required: true})
    customerId: User;

    @Prop({
        type:[{
            quantity:{type:Number}, 
            product:{type:mongoose.Schema.Types.ObjectId, required: true, ref: 'Product'}
        }]
    })
    items: { quantity: number; product: Product }[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);