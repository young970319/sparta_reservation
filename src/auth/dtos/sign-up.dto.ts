import { PickType } from "@nestjs/mapped-types";
import { IsNotEmpty,IsStrongPassword } from "class-validator";
import {User} from "src/user/entities/user.entity";

export class SignUpDto extends PickType(User, ['email','password','nickname',]){
    @IsNotEmpty({message: '비밀번호 확인란을 입력해 주세요.'})
    @IsStrongPassword({minLength:8},
        {message: '비밀번호는 최소 8글자 입니다.'},)
    passwordConfirm: string;
}