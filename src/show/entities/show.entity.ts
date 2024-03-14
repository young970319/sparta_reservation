import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
  } from 'typeorm';
  import { User } from 'src/user/entities/user.entity';
  import {Category} from '../category.type'

  @Entity({
    name: 'shows',
  })

  @Unique(['name', 'date'])
  export class Show {
    @PrimaryGeneratedColumn()
    id: bigint;
  
    @Column({ type: 'bigint', name: 'userId', nullable: false })
    userId: bigint;
  
    @Column({ type: 'varchar', nullable: false })
    showTitle: string;
  
    @Column({ type: 'varchar', nullable: false })
    showInfo: string;

    @Column({ type: 'datetime', nullable: false })
    showDate: Date;

    @Column({ type: 'varchar', nullable: false })
    showPlace: string;
  
    @Column({ type: 'varchar', nullable: true })
    showImage: string;
  
    @Column({ type: 'enum', enum: Category, nullable: false })
    showCategory: Category;

  }
  