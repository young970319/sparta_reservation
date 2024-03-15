import { OmitType, PickType } from '@nestjs/mapped-types';

import { CreateReservationDto } from './create-reservation.dto';

export class UpdateReservationDto extends OmitType(CreateReservationDto, ['title']) {}