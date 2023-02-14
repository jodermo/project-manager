import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Poi } from './poi.entity';

@Injectable()
export class PoiService {


    private logger = new Logger('PoiService');

    constructor(
        @InjectRepository(Poi)
        private readonly repository: Repository<Poi>) {

    }

    async create(poi: Poi): Promise<Poi> {
        this.logger.log('create POI');
        this.logger.log(poi);
        return this.repository.save(poi);
    }

    async findAll(): Promise<Poi[]> {
        return await this.repository.find();
    }

    async findActive(): Promise<Poi[]> {
        return await this.repository.find({active: true});
    }

    async findOne(id: number): Promise<Poi> {
        const result = await this.repository.find({id: id});
        return result[0];
    }


    async update(id: number, poi: Poi): Promise<any> {
        this.logger.log('update POI: ' + id);
        this.logger.log(poi);
        await this.repository.update({id: id}, poi);
        return await this.repository.find({id: id});
    }

    async remove(id: number): Promise<Poi[]> {
        await this.repository.delete({id: id});
        return await this.repository.find();
    }

}
