import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attribute } from './attribute.entity';

@Injectable()
export class AttributeService {
    private logger = new Logger('AttributeService');

    constructor(
        @InjectRepository(Attribute)
        private readonly repository: Repository<Attribute>) {

    }

    async create(attribute: Attribute): Promise<Attribute> {
        return this.repository.save(attribute);
    }

    async findAll(): Promise<Attribute[]> {
        return await this.repository.find();
    }

    async findActive(): Promise<Attribute[]> {
        return await this.repository.find({active: true});
    }

    async findOne(id: number): Promise<Attribute> {
        const result = await this.repository.find({id: id});
        return result[0];
    }

    async findByRoute(route: string): Promise<Attribute[]> {
        return await this.repository.find({route: route});
    }

    async findByApiRouteParentId(route: string, parentId: number): Promise<Attribute[]> {
        return await this.repository.find({route: route, parentId: parentId});
    }

    async update(id: number, attribute: Attribute): Promise<any> {
        await this.repository.update({id: id}, attribute);
        return await this.repository.find({id: id});
    }

    async remove(id: number): Promise<Attribute[]> {
        await this.repository.delete({id: id});
        return await this.repository.find();
    }
}
