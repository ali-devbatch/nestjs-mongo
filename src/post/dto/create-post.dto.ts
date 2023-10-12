import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePostDto {
  @IsString() // Ensure that the 'title' property is a string
  @IsNotEmpty() // Ensure that the 'title' property is not empty
  @Length(3, 100) // Ensure that the 'title' property is between 3 and 100 characters long
  title: string;

  @IsString() // Ensure that the 'description' property is a string
  @IsNotEmpty() // Ensure that the 'description' property is not empty
  description: string;
  // Add other properties as needed
}
