import { Body, Controller, Get, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from './schemas/user.schema';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Get()
    findAll(@Query() query) {
        console.log(query);
        return this.usersService.findAll(query);
    }

    @Get('me')
    getMe(@Request() req) {
        return this.usersService.findById(req.user.id);
    }


    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Get(':id')
    findById(@Param('id') id: string) {
        return this.usersService.findById(id);
    }

    @Patch('me')
    updateMe(@Request() req, @Body() user) {
        return this.usersService.updateById(req.user.id, user);
    }

    @Post('changePassword')
    changePassword(@Request() req, @Body() body) {
        return this.usersService.changePassword(req.user.id, body);
    }
    
}
