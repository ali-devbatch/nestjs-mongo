import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signUp.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // to register a new uer
  @Post('register')
  async registerUser(@Body() signUpDto: SignUpDto) {
    const response = await this.authService.registerUser(signUpDto);
    return response;
  }

  // login user
  @Get('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
