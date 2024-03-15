import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateReservationDto } from './dto/create-reservation.dto';
import { RemoveReservationDTO } from './dto/remove-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationService } from './reservation.service';

@Controller('post')        //  http://서버주소/post
export class ReservationController {
  constructor(private readonly postService: ReservationService) {}

  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.postService.create(createReservationDto);
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
  update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return this.postService.update(+id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() deleteReservationDto: RemoveReservationDTO) {
    return this.postService.remove(+id, deleteReservationDto);
  }
}