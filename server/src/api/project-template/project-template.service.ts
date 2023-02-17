import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ProjectTemplate} from "./project-template.entity";

@Injectable()
export class ProjectTemplateService {
    private logger = new Logger('ProjectTemplateService');

    constructor(
        @InjectRepository(ProjectTemplate)
        private readonly repository: Repository<ProjectTemplate>) {

    }

    async create(projectTemplate: ProjectTemplate): Promise<ProjectTemplate> {
        return this.repository.save(projectTemplate);
    }

    async findAll(): Promise<ProjectTemplate[]> {
        return await this.repository.find();
    }

    async findActive(): Promise<ProjectTemplate[]> {
        return await this.repository.find({active: true});
    }


    async findOne(id: number): Promise<ProjectTemplate> {
        const result = await this.repository.find({id: id});
        return result[0];
    }


    async update(id: number, projectTemplate: ProjectTemplate): Promise<any> {
        await this.repository.update({id: id}, projectTemplate);
        return await this.repository.find({id: id});
    }

    async remove(id: number): Promise<ProjectTemplate[]> {
        await this.repository.delete({id: id});
        return await this.repository.find();
    }
}
