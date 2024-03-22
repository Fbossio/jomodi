import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SigninDto {
  @ApiProperty({ example: 'test@user.com' })
  @IsEmail()
  email: string;
  @ApiProperty({ example: 'password123' })
  @IsString()
  password: string;
}
