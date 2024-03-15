import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
  } from 'typeorm';
  import { User } from 'src/user/entities/user.entity';
  import {Category} from '../types/category.type'
import { Schedule } from './schedule.entity';

  @Entity({
    name: 'seats',
  })

  export class Seat {
    @PrimaryGeneratedColumn({unsigned:true})
    id: number;
  
    @Column({unsigned:true})
    scheduleId: number;

    @Column({unsigned:true}) //0아래로 내려갈 수 있으니까
    availableSeats: number;

    @Column({unsigned:true})
    totleSeats: number;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt?: Date;

    @OneToOne((type): typeof Schedule => Schedule, schedule => schedule.seat)
    @JoinColumn() //OneToOne 에서 끌려가는쪽에 joincolumn 넣어줌
    schedule: Schedule;
  }
  