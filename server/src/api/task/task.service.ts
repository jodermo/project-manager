import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Task} from './task.entity';

@Injectable()
export class TaskService {

    private logger = new Logger('TaskService');

    constructor(
        @InjectRepository(Task)
        private readonly repository: Repository<Task>) {

    }

    async create(task: Task): Promise<Task> {
        return this.repository.save(task);
    }

    async findAll(): Promise<Task[]> {
        return await this.repository.find();
    }

    async findActive(): Promise<Task[]> {
        return await this.repository.find({active: true});
    }


    async findOne(id: number): Promise<Task> {
        const result = await this.repository.find({id: id});
        return result[0];
    }


    async update(id: number, task: Task): Promise<any> {
        await this.repository.update({id: id}, task);
        return await this.repository.find({id: id});
    }

    async remove(id: number): Promise<Task[]> {
        await this.repository.delete({id: id});
        return await this.repository.find();
    }
}
