import { Prop, Schema } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Product } from "src/products/schemas/product.schema";

@Schema({timestamps: true})
export class CartItem {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true})
    productId: Product;

    @Prop({required: true, default: 1})
    quantity: number;
}