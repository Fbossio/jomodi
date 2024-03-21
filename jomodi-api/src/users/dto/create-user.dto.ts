import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  firstName: string;
  @ApiProperty({ example: 'Doe' })
  @IsString()
  lastName: string;
  @ApiProperty({ example: 'john@john.com' })
  @IsEmail()
  email: string;
  @ApiProperty({ example: 'password123' })
  @IsString()
  password: string;
}
