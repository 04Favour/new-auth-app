/* eslint-disable prettier/prettier */
import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { CreateAuthDto } from "src/auth/dto/create-auth.dto";

export class userDto extends PartialType(CreateAuthDto){}