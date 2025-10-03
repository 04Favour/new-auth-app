/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
export class CreateAuthDto {
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20, {message: 'Password has to be between 3 and 20 chars'})
  public password: string;
}
