import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreatePostDto } from './dto/create-reservation.dto';
import { RemovePostDTO } from './dto/remove-reservation.dto';
import { UpdatePostDto } from './dto/update-reservation.dto';
import { PostService } from './reservation.service';

@Controller('post')        //  http://서버주소/post
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() deletePostDto: RemovePostDTO) {
    return this.postService.remove(+id, deletePostDto);
  }
}