import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import * as dotenv from 'dotenv';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';
dotenv.config();

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: process.env.JWT_EXPIRE}
    })
  ],
  providers: [
    AuthService, 
    LocalStrategy, 
    JwtStrategy,
    RolesGuard
  ],
  controllers: [AuthController],
})
export class AuthModule {}
