import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type CategoryDocument = Category & Document;

@Schema({timestamps: true})
export class Category {
    @Prop({required: true, unique: true})
    name: string;

    @Prop()
    image: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);