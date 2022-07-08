import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}
    async findByPhone(phone: string): Promise<User | undefined> {
        const user = await this.userModel.findOne({phone});
        return user;
    }

    async createUser(user): Promise<User> {
        const newUser = await this.userModel.create(user);
        return newUser;
    }

    async findAll(query) {
        const {search} = query;
        const searchQuery = search ? {$or: [{name: new RegExp(search, 'i')}, {email: new RegExp(search, 'i')}, {phone: new RegExp(search, 'i')}]} : {};
        const users = await this.userModel.find(searchQuery).select('-password');
        return users;
    }

    async findById(id) {
        const user = await this.userModel.findById(id).select('-password');
        return user;
    }

    async updateById(id, user) {
        if (user.password) {
            throw new BadRequestException('Please use route: /changePassword instead to change password');
        } else {
            const updatedUser = await this.userModel.findByIdAndUpdate(id, user, {new: true, runValidators: true});
            return updatedUser;
        }
    }

    async changePassword(id, body) {
        const{oldPassword, newPassword} = body;
        const user = await this.userModel.findById(id);
        const isPassWordMatched = await bcrypt.compare(oldPassword, user.password);
        if (!isPassWordMatched) {
            throw new BadRequestException('Old password is invalid');
        } else {
            user.password = newPassword;
            await user.save();
            return {
                message: 'Changed password successfully'
            }
        }
    }
}

