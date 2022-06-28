import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { OrderItem } from "./orderItem.schema";

export type OrderDocument = Order & Document;

@Schema({timestamps: true})
export class Order {
    @Prop()
    items: [OrderItem];

    @Prop()
    totalPrice: number;
}
export const OrderSchema = SchemaFactory.createForClass(Order);