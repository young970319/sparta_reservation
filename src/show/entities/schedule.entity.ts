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
import { Show } from './show.entity';
import { Seat } from './seat.entity';

  @Entity({
    name: 'schedules',
  })

  export class Schedule {
    @PrimaryGeneratedColumn({unsigned:true})
    id: number;
  
    @Column({unsigned:true})
    showId: number;

    @Column({type:'date'})
    date: Date;

    @Column({type:'time'})
    time: string;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt?: Date;

    @ManyToOne((type): typeof Show => Show, show => show.schedules, {onDelete:'CASCADE'})
    show: Show;

    @OneToOne((type): typeof Seat => Seat, seat => seat.schedule)
    seat: Seat;
  }
  