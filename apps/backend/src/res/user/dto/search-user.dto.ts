import { ApiProperty, PartialType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class SearchUserDto extends PartialType(User) {

}
