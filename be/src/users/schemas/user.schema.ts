import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as bcrypt from 'bcrypt'

export type UserDocument = User & Document;


export enum Role {
    Customer = 'customer',
    Admin = 'admin'
}

@Schema({timestamps: true})
export class User {
    @Prop({required: true, unique: true, match: /^0[0-9]{9,10}$/})
    phone: string;

    @Prop({required: true})
    name: string;

    @Prop({unique: true})
    email: string;

    @Prop({required: true})
    address: string;

    @Prop({required: true})
    password: string;

    @Prop({default: [Role.Customer]})
    roles: Role[]

}
export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre('save', async function(next: Function) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
}

)

