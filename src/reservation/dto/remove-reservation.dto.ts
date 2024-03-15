import { PickType } from '@nestjs/mapped-types';

import { CreateReservationDto } from './create-reservation.dto';

export class RemoveReservationDTO extends PickType(CreateReservationDto, ['password']) {}