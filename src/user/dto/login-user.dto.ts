import { IsEmail,IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class LoginUserDto extends CreateUserDto {
  @IsEmail()
  @IsNotEmpty({message: '이메일을 입력해주세요.'})
  email: string;

  @IsString()
  @IsNotEmpty({message: '비밀번호를 입력해주세요.'})
  password: string;
}