import { Body, Controller, Get, Post, UseGuards, Request } from "@nestjs/common";
import { get } from "http";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { Role } from "src/users/schemas/user.schema";
import { UsersService } from "src/users/users.service";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local.guards";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private userService: UsersService) {}
    @Post('signup')
    signup(@Body() user: CreateUserDto) {
        return this.authService.signup(user);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req){
        return this.authService.login(req.user);

    }

}