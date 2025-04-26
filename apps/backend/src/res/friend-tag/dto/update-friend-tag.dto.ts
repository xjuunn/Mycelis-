import { PartialType } from '@nestjs/swagger';
import { CreateFriendTagDto } from './create-friend-tag.dto';

export class UpdateFriendTagDto extends PartialType(CreateFriendTagDto) {}
