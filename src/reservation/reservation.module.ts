import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Reservation } from './entities/reservation.entity';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { User } from 'src/user/entities/user.entity';
import { Schedule } from 'src/show/entities/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation,User,Schedule])],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}