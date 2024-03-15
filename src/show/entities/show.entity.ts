import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
  } from 'typeorm';
  import { User } from 'src/user/entities/user.entity';
  import {Category} from '../types/category.type'
import { Schedule } from './schedule.entity';

  @Entity({
    name: 'shows',
  })

  export class Show {
    @PrimaryGeneratedColumn({unsigned:true})
    id: number;
  
    @Column({unique:true})
    title: string;
  
    @Column({ type: 'text'})
    description: string;
  
    @Column({ type: 'enum', enum: Category})
    category: Category;

    @Column()
    place: string;

    @Column()
    price: number;

    @Column()
    thumbnail: string;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt?: Date;

    @OneToMany((type): typeof Schedule => Schedule, schedule => schedule.show, {cascade:true})
    schedules: Schedule[];
  }
  