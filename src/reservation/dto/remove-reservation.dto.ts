import { PickType } from '@nestjs/mapped-types';

import { CreatePostDto } from './create-reservation.dto';

export class RemovePostDTO extends PickType(CreatePostDto, ['password']) {}