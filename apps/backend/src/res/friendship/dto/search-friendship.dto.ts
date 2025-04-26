import { PartialType } from '@nestjs/swagger';
import { Friendship } from '../entities/friendship.entity';

export class SearchFriendshipDto extends PartialType(Friendship) {}
