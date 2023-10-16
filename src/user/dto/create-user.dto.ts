import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Name should be a string' }) // Ensure that the 'name' property is a string
  @IsNotEmpty({ message: 'Name should not be empty' }) // Ensure that the 'name' property is not empty
  name: string;

  @IsEmail({}, { message: 'Email should be a valid email address' }) // Ensure that the 'email' property is a valid email address
  @IsNotEmpty({ message: 'Email should not be empty' }) // Ensure that the 'email' property is not empty
  email: string;

  @IsString({ message: 'Password should be a string' }) // Ensure that the 'password' property is a string
  @IsNotEmpty({ message: 'Password should not be empty' }) // Ensure that the 'password' property is not empty
  @IsStrongPassword({}, { message: 'Password should be strong' }) // Use this if you have a strong password validation
  password: string;
  // Add other properties as needed
}
