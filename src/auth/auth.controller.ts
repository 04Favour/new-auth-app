/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  signup(@Body() dto:CreateAuthDto) {
    return this.authService.signup(dto)
  }

  @Post('signIn')
  signin(@Body() dto:CreateAuthDto, @Req() req, @Res() res) {
    return this.authService.signin(dto, req, res)
  }

  @Get()
  signout(@Req() req, @Res() res) {
    return this.authService.signout(req, res)
  }

}
