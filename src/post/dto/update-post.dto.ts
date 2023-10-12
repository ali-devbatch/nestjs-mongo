import { IsOptional, IsString, Length } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  @IsOptional() // Make title optional
  @Length(3, 100)
  title: string;

  @IsString()
  @IsOptional() // Make description optional
  description: string;
  // Add other properties as needed
}
