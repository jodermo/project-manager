import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Language} from './language.entity';

@Injectable()
export class LanguageService {

    private logger = new Logger('LanguageService');

    constructor(
        @InjectRepository(Language)
        private readonly repository: Repository<Language>) {

    }

    async create(language: Language): Promise<Language> {
        this.logger.log('create language');
        this.logger.log(language);
        return this.repository.save(language);
    }

    async findAll(): Promise<Language[]> {
        this.logger.log('findAll');
        return await this.repository.find();
    }

    async findActive(): Promise<Language[]> {
        return await this.repository.find({active: true});
    }

    async findOne(id: number): Promise<Language> {
        const result = await this.repository.find({id: id});
        this.logger.log('findOne');
        this.logger.log(result);
        return result[0];
    }


    async update(id: number, language: Language): Promise<any> {
        await this.repository.update({id: id}, language);
        this.logger.log('update');
        this.logger.log(language);
        return await this.repository.find({id: id});
    }

    async remove(id: number): Promise<Language[]> {
        await this.repository.delete({id: id});
        this.logger.log('remove');
        this.logger.log(id);
        return await this.repository.find();
    }
}
