import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({example: 'test@gmail.com',description: 'The email of the user',})
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @ApiProperty({example: 'strongPassword123!',description: 'The password of the user',})
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}