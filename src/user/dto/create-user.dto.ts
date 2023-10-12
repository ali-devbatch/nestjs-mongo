import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Name should be a string' }) // Ensure that the 'name' property is a string
  @IsNotEmpty({ message: 'Name should not be empty' }) // Ensure that the 'name' property is not empty
  name: string;

  @IsEmail({}, { message: 'Email should be a valid email address' }) // Ensure that the 'email' property is a valid email address
  @IsNotEmpty({ message: 'Email should not be empty' }) // Ensure that the 'email' property is not empty
  email: string;
  // Add other properties as needed
}
