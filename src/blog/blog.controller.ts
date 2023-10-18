import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
  UsePipes,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('blog')
@UsePipes(ValidationPipe)
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createBlogDto: CreateBlogDto, @Request() req) {
    // Access the authenticated user's ID
    const userId = req.user.id;
    return this.blogService.create(createBlogDto, userId);
  }

  @Get()
  findAll(@Query() queryParams) {
    // Pass the queryParams to the service to handle pagination
    return this.blogService.findAll(queryParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(id, updateBlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}
