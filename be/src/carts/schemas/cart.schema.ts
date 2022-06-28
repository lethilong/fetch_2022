import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { CartItem } from "./cartItem.schema";

export type CartDocument = Cart & Document;

@Schema({timestamps: true})
export class Cart {
    @Prop({required: true})
    customerIp: string;

    @Prop()
    items: [CartItem];
}

export const CartSchema = SchemaFactory.createForClass(Cart);