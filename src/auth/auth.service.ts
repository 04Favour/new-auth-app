/* eslint-disable prettier/prettier */
import { BadRequestException, ForbiddenException, Injectable} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
 constructor(private Prisma: PrismaService, private jwtService: JwtService){}

 async signup( dto: CreateAuthDto) {
  const {email, password} = dto;
  const foundUser = await this.Prisma.user.findUnique({where: {email}})
  if (foundUser) {
    throw new BadRequestException('User already exists')
  }
  const hashedPassword = await this.hashPassword(password)

  await this.Prisma.user.create({
    data: {
        email,
        hashedPassword
    }
  })
  return {message:'signed up successfully'}
 }

 async signin(dto: CreateAuthDto, req: Request, res: Response,) {
    const {email, password} = dto;
    const findUser = await this.Prisma.user.findUnique({where:{email}})
    if (!findUser) {
        throw new BadRequestException("Wrong credentials")
    }

    const matchPassword = await this.comparePassword({password, hash:findUser.hashedPassword})
    if (!matchPassword) {
        throw new BadRequestException('Wrong Credentials')
    }

    const payload = { id:findUser.id, email: findUser.email};
  
    const access_token = await this.jwtService.signAsync(payload);

    if (!access_token) {
      throw new ForbiddenException()
    }

    res.cookie('token', access_token);

    return res.send(
      {message: 'Sign in successful'}
    )
    

 }

 signout(req: Request, res: Response) {
  res.clearCookie('token')
  return  res.send({ message: 'signed out in style'})
 }


 async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
 }

 async comparePassword(args: {password: string, hash: string}) {
    return await bcrypt.compare(args.password, args.hash)
 }
}
