import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UserRole} from './user-role.entity';

@Injectable()
export class UserRoleService {

    private logger = new Logger('UserRolesService');

    constructor(
        @InjectRepository(UserRole)
        private readonly repository: Repository<UserRole>) {

    }

    async create(userRole: UserRole): Promise<UserRole> {
        return this.repository.save(userRole);
    }

    async findAll(): Promise<UserRole[]> {
        return await this.repository.find();
    }

    async findActive(): Promise<UserRole[]> {
        return await this.repository.find({active: true});
    }

    async findOne(id: number): Promise<UserRole> {
        const result = await this.repository.find({id: id});
        return result[0];
    }


    async update(id: number, userRole: UserRole): Promise<any> {
        await this.repository.update({id: id}, userRole);
        return await this.repository.find({id: id});
    }

    async remove(id: number): Promise<UserRole[]> {
        await this.repository.delete({id: id});
        return await this.repository.find();
    }
}
