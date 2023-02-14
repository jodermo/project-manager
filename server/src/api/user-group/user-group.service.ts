import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserGroup } from './user-group.entity';

@Injectable()
export class UserGroupService {

    private logger = new Logger('UserGroupsService');

    constructor(
        @InjectRepository(UserGroup)
        private readonly repository: Repository<UserGroup>) {

    }

    async create(userGroup: UserGroup): Promise<UserGroup> {
        return this.repository.save(userGroup);
    }

    async findAll(): Promise<UserGroup[]> {
        return await this.repository.find();
    }

    async findActive(): Promise<UserGroup[]> {
        return await this.repository.find({active: true});
    }

    async findOne(id: number): Promise<UserGroup> {
        const result = await this.repository.find({id: id});
        return result[0];
    }


    async update(id: number, userGroup: UserGroup): Promise<any> {
        await this.repository.update({id: id}, userGroup);
        return await this.repository.find({id: id});
    }

    async remove(id: number): Promise<UserGroup[]> {
        await this.repository.delete({id: id});
        return await this.repository.find();
    }
}
