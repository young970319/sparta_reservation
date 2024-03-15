import { IsNumber, IsString } from 'class-validator';
import { Schedule } from 'src/show/entities/schedule.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({    // 해당 클래스가 어떤 테이블에 매핑 되는지를 나타내는 어노테이션
  name: 'reservations',
})
export class Reservation {
  @PrimaryGeneratedColumn({unsigned:true})
  id: number;

  @Column({unsigned:true})
  userId: number;

  @Column({unsigned:true})
  scheduleId: number;

  @CreateDateColumn()   // 레코드가 생성된 날짜를 자동으로 기록
  createdAt: Date;

  @UpdateDateColumn()   // 레코드가 수정된 날짜를 자동으로 기록
  updatedAt: Date;

  @DeleteDateColumn()   // 레코드가 논리적으로 삭제된 날짜를 자동으로 기록
  deletedAt?: Date;

  @ManyToOne((type): typeof User => User, user => user.reservations, {onDelete: 'CASCADE'})
  user: User;

  @ManyToOne((type): typeof Schedule => Schedule, {onDelete: 'CASCADE'})
  schedule: Schedule;
}