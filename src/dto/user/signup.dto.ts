import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @ApiProperty({example: 'john_doe',description: 'The username of the user',})
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({description: 'The email of the user'})
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @ApiProperty({example: 'strongPassword123!',description: 'The password of the user with minlength=6',})
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}