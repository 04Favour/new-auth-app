/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { userDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUser(@Param('id') id:string, @Req() req){
    return this.userService.getUser(id, req)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  fixUser(@Body() dto: userDto, @Param('id') id:string, @Req() req){
    return this.userService.fixUser(dto, id, req);
  }

  @Get()
  users() {
    return this.userService.users()
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: string, @Req() req){
    return this.userService.deleteUser(id, req)
  }
}
