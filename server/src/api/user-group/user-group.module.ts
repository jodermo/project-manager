import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserGroupService } from './user-group.service';
import { UserGroupController } from './user-group.controller';
import { UserGroup } from './user-group.entity';
import {UserRole} from "../user-role/user-role.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserGroup, UserRole])],
  controllers: [UserGroupController],
  providers: [UserGroupService]
})
export class UserGroupModule {}
