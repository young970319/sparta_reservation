import { IsNotEmpty, IsString, IsStrongPassword, IsEmail, IsNumber, IsBoolean } from 'class-validator';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import {
  Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';

@Entity({
  name: 'users',
})
export class User { 
  @PrimaryGeneratedColumn({unsigned:true})
  id: number;

  @IsNotEmpty({message: '이메일을 입력해 주세요.'})
  @IsEmail({},{message: '이메일 형식이 맞지 않습니다.'}) //이메일 형식이 맞는지 확인
  @Column({unique:true})
  email: string;

  @IsNotEmpty({message: '비밀번호를 입력해 주세요.'})
  @IsStrongPassword({minLength:8},
      {message: '비밀번호는 최소 8글자 입니다.'},)

  @Column()
  password: string;

  @IsNotEmpty({message: '닉네임을 입력해 주세요.'})
  @IsString()
  @Column()
  nickname: string;

  @IsNumber()
  @Column({unsigned:true})
  points: number;

  @IsBoolean()
  @Column({default:false})
  isAdmin: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany((type): typeof Reservation => Reservation, (reservation):any => reservation.user)
  reservations:Reservation[];
}
