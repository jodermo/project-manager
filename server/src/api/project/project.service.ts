import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
    private logger = new Logger('ProjectService');

    constructor(
        @InjectRepository(Project)
        private readonly repository: Repository<Project>) {

    }

    async create(project: Project): Promise<Project> {
        return this.repository.save(project);
    }

    async findAll(): Promise<Project[]> {
        return await this.repository.find();
    }

    async findActive(): Promise<Project[]> {
        return await this.repository.find({active: true});
    }


    async findOne(id: number): Promise<Project> {
        const result = await this.repository.find({id: id});
        return result[0];
    }


    async update(id: number, project: Project): Promise<any> {
        await this.repository.update({id: id}, project);
        return await this.repository.find({id: id});
    }

    async remove(id: number): Promise<Project[]> {
        await this.repository.delete({id: id});
        return await this.repository.find();
    }
}
