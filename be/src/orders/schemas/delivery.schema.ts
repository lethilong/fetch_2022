import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Delivery {
    @Prop({required: true})
    name: string;

    @Prop({required: true, match: /^0[0-9]{9,10}$/})
    phone: string;

    @Prop({required: true})
    address: string;
}

export const DeliverySchema = SchemaFactory.createForClass(Delivery);