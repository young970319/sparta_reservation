import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsString()       // DTO 를 구성하는 각각의 데이터 필드의 타입 정의
  @IsNotEmpty({ message: '게시물의 제목을 입력해주세요.' })
  readonly title: string;

  @IsString()
  @IsNotEmpty({ message: '게시물의 내용을 입력해주세요.' })   // 이 필드는 꼭 전달되어야 한다를 의미
  readonly content: string;

  @IsNumber()
  @IsNotEmpty({ message: '게시물의 비밀번호를 입력해주세요.' })
  readonly password: number;
}