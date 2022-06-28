import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Product } from "src/products/schemas/product.schema";

@Schema({timestamps: true})
export class OrderItem {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true})
    product: Product;

    @Prop({required: true, default: 1})
    quantity: number;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);