/* eslint-disable prettier/prettier */
import { BadRequestException, ForbiddenException, Injectable} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Request } from 'express';
import { userDto } from './user.dto';
// import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}
    
    async getUser(id: string, req: Request){
        const user = await this.prisma.user.findUnique({where:{id},
        omit: {hashedPassword: true}})
        if (!user) {
            throw new BadRequestException('User not found')
        }
        const decodedUser = req.user as { id: string; email: string };
        if (user.id !== decodedUser.id) {
            throw new ForbiddenException();
        }

        return {
            message: 'User retrieved successfully',
            user
        }
    }

    async fixUser(dto: userDto, id:string, req: Request){ 
        const user = await this.prisma.user.findUnique({where:{id}})
        if (!user) {
            throw new BadRequestException('User not found')
        }
        const decodeUser = req.user as {id: string, email:string}
        if (user.id !== decodeUser.id) {
            throw new ForbiddenException()
        }

        // // Build updateData properly
        // const updateData: any = {};

        // if (dto.email) {
        // updateData.email = dto.email;
        // }

        // if (dto.password) {
        // updateData.hashedPassword = await bcrypt.hash(dto.password, 10);
        // }
        
        const updateUser = await this.prisma.user.update({
            where:{id: id},
            data: {
                ...(dto.email && {email: dto.email}),
                ...(dto.password && {hashedPassword: dto.password}) 
            }
        })
        if (!updateUser){
            throw new BadRequestException('Not Updated')
        }
        return {
            message: 'User Updated successfully'
        }
    }
    async users() {
        return await this.prisma.user.findMany({select:
            {id: true,
             email: true
            }
        })
    }

    async deleteUser(id: string, req:Request){
        const getUser = await this.prisma.user.findUnique({where:{id}})
        if (!getUser) {
            throw new BadRequestException('Oops! User not found')
        }
        const decodeUser = req.user as { id: string; email: string };
        if (getUser.id !== decodeUser.id) {
            throw new ForbiddenException();
        }
        await this.prisma.user.delete({ where: { id } });
        return { message: 'User deleted successfully' };
    }
}
