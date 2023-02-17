import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './location.entity';

@Injectable()
export class LocationService {


    private logger = new Logger('LocationService');

    constructor(
        @InjectRepository(Location)
        private readonly repository: Repository<Location>) {

    }

    async create(location: Location): Promise<Location> {
        this.logger.log('create POI');
        this.logger.log(location);
        return this.repository.save(location);
    }

    async findAll(): Promise<Location[]> {
        return await this.repository.find();
    }

    async findActive(): Promise<Location[]> {
        return await this.repository.find({active: true});
    }

    async findOne(id: number): Promise<Location> {
        const result = await this.repository.find({id: id});
        return result[0];
    }


    async update(id: number, location: Location): Promise<any> {
        this.logger.log('update POI: ' + id);
        this.logger.log(location);
        await this.repository.update({id: id}, location);
        return await this.repository.find({id: id});
    }

    async remove(id: number): Promise<Location[]> {
        await this.repository.delete({id: id});
        return await this.repository.find();
    }

}
