import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Order } from "src/orders/schemas/order.schema";

@Schema({timestamps: true})
export class Payment {
    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'order'})
    order: Order;

    @Prop({required: true, default: false})
    isPaid: boolean;
}

export const PaymentSchema = SchemaFactory.createForClass(Order);