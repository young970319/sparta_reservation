import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { AuthService } from './AuthService';
import { SignUpDto } from './dtos/sign-up.dto'


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  async signUp(@Body() signUpDto: SignUpDto): Promise<SignUpDto> {
    const data = await this.authService.signUp(signUpDto);
    return {
      statusCode:HttpStatus.CREATED,message: '회원가입에 성공했습니다.',data};
  }


}
