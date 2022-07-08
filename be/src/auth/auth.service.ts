import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(phone: string, password: string): Promise<any> {
        const user = await this.usersService.findByPhone(phone);
        if (!user) {
            throw new UnauthorizedException('User with this phone does not exist')
        } else {
            const isPassWordMatched = await bcrypt.compare(password, user.password);
            if (user && isPassWordMatched) {
                user.password = undefined;
                return user;
            } else {
                throw new UnauthorizedException('Incorrect password ')
            }
        }
        
    }

    async signup(user): Promise<any> {
        const newUser = await this.usersService.createUser(user);
        newUser.password = undefined;
        return {
            data: newUser
        };
    }

    async login(user: any) {
        const payload = {id: user._id, roles: user.roles};
        return {
            token: this.jwtService.sign(payload)
        }
    }

}
