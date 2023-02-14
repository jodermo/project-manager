import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserController } from './user.controller';
import {UserRole} from "../user-role/user-role.entity";
import {UserGroup} from "../user-group/user-group.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User, UserRole, UserGroup])],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule {
}
