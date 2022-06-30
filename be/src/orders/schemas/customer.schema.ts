import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Customer {
    @Prop({required: true})
    name: string;

    @Prop({required: true, match: /^0[0-9]{9,10}$/})
    phone: string;

    @Prop({required: true})
    address: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);