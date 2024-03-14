import { PickType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto extends PickType
  (User, [
  'userId',
  'password',
] as const) {
  @IsString()
  @IsNotEmpty({message: '비밀번호 확인란을 입력해주세요.'})
  passwordCheck: string;

  @IsString()
  @IsNotEmpty({message: '닉네임을 입력해주세요.'})
  nickName: string;

}
