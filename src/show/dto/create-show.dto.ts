
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateShowDto {
  @IsString()      
  @IsNotEmpty({ message: '공연의 제목을 입력해주세요.' })
  readonly showTitle: string;

  @IsString()
  @IsNotEmpty({ message: '공연의 내용을 입력해주세요.' })   
  readonly showInfo: string;

  @IsNumber()
  @IsNotEmpty({ message: '공연 카테고리를 입력해주세요.' })
  readonly showCategory: string;

  @IsNumber()
  @IsNotEmpty({ message: '공연 날짜를 입력해주세요.' })
  readonly showDate: Date;

}