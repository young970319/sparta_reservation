import { OmitType, PickType } from '@nestjs/mapped-types';

import { CreatePostDto } from './create-reservation.dto';

export class UpdatePostDto extends OmitType(CreatePostDto, ['title']) {}