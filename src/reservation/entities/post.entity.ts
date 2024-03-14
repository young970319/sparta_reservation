import { IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({    // 해당 클래스가 어떤 테이블에 매핑 되는지를 나타내는 어노테이션
  name: 'posts',
})
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column('varchar', { length: 50, nullable: false })
  title: string;

  @IsString()
  @Column('varchar', { length: 1000, nullable: false })
  content: string;

  @IsNumber()
  @Column('int', { select: false, nullable: false })
  password: number;

  @CreateDateColumn()   // 레코드가 생성된 날짜를 자동으로 기록
  createdAt: Date;

  @UpdateDateColumn()   // 레코드가 수정된 날짜를 자동으로 기록
  updatedAt: Date;

  @DeleteDateColumn()   // 레코드가 논리적으로 삭제된 날짜를 자동으로 기록
  deletedAt?: Date;
}   // 모든 게시물은 NULL 값을 가지고 있다가 삭제가 되면 삭제된 날짜로 자동으로 기록되는 것임