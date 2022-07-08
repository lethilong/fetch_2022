import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Category } from "src/categories/schemas/category.schema";

export type ProductDocument = Product & Document;

@Schema({timestamps: true})
export class Product {
    @Prop({required: true, trim: true})
    name: string;

    @Prop({required: true})
    image: string;

    @Prop({default: 1, min: 0})
    quantity: number;

    @Prop({required: true})
    price: number;

    @Prop()
    description: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref:'Category', required: true})
    category: Category;

    @Prop({default: false})
    isFeatured: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
// ProductSchema.pre(/^find/, async function(next: Function) {
//     this.populate({
//         path: 'category',
//         select: 'name'
//     });
//     next();
// }

// )