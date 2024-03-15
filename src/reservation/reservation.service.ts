import { Cache } from 'cache-manager';
import _ from 'lodash';
import { Repository } from 'typeorm';

import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateReservationDto } from './dto/create-reservation.dto';
import { RemoveReservationDTO } from './dto/remove-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation) private reservationRepository: Repository<Reservation>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(createreservationDto: CreateReservationDto) {
    return (await this.reservationRepository.save(createreservationDto)).id;
  }

  async findAll() {
    const cachedArticles = await this.cacheManager.get('articles');
    if (!_.isNil(cachedArticles)) {
      return cachedArticles;
    }

    const articles = await this.reservationRepository.find({
      where: { deletedAt: null },
      select: ['id', 'title', 'updatedAt'],
    });
    await this.cacheManager.set('articles', articles);
    return articles;
  }

  async findOne(id: number) {
    if (_.isNaN(id)) {
      throw new BadRequestException('게시물 ID가 잘못되었습니다.');
    }

    return await this.reservationRepository.findOne({
      where: { id, deletedAt: null },
      select: ['title', 'content', 'updatedAt'],
    });
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    if (_.isNaN(id)) {
      throw new BadRequestException('게시물 ID가 잘못되었습니다.');
    }

    const { content, password } = updateReservationDto;
    const reservation = await this.reservationRepository.findOne({
      select: ['password'],
      where: { id },
    });

    if (_.isNil(reservation)) {
      throw new NotFoundException('게시물을 찾을 수 없습니다.');
    }

    if (!_.isNil(reservation.password) && reservation.password !== password) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    await this.reservationRepository.update({ id }, { content });
  }

  async remove(id: number, removeReservationDto: RemoveReservationDTO) {
    if (_.isNaN(id)) {
      throw new BadRequestException('게시물 ID가 잘못되었습니다.');
    }

    const { password } = removeReservationDto;

    const reservation = await this.reservationRepository.findOne({
      select: ['password'],
      where: { id },
    });

    if (_.isNil(reservation)) {
      throw new NotFoundException('게시물을 찾을 수 없습니다.');
    }

    if (!_.isNil(reservation.password) && reservation.password !== password) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    await this.reservationRepository.softDelete({ id });
  }
}