import mongoose from "mongoose";

export class CreateProductDto {
    name: string;
    image: string;
    quantity: number;
    description: string;
    category: mongoose.Schema.Types.ObjectId;
}
