import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Company} from './company.entity';

@Injectable()
export class CompanyService {
    private logger = new Logger('CompanyService');

    constructor(
        @InjectRepository(Company)
        private readonly repository: Repository<Company>) {

    }

    async create(company: Company): Promise<Company> {
        return this.repository.save(company);
    }

    async findAll(): Promise<Company[]> {
        return await this.repository.find();
    }


    async findActive(): Promise<Company[]> {
        return await this.repository.find({active: true});
    }

    async findOne(id: number): Promise<Company> {
        const result = await this.repository.find({id: id});
        return result[0];
    }


    async update(id: number, company: Company): Promise<any> {
        await this.repository.update({id: id}, company);
        return await this.repository.find({id: id});
    }

    async remove(id: number): Promise<Company[]> {
        await this.repository.delete({id: id});
        return await this.repository.find();
    }
}
