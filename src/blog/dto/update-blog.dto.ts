import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateBlogDto {
  @IsString()
  @IsOptional() // Make title optional
  @Length(3, 100)
  blogTitle: string;

  @IsString()
  @IsOptional() // Make description optional
  blogDescription: string;
}
