import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Translation } from './translation.entity';

@Injectable()
export class TranslationService {


  private logger = new Logger('TranslationService');

  constructor(
      @InjectRepository(Translation)
      private readonly repository: Repository<Translation>) {

  }

  async create(translation: Translation): Promise<Translation> {
    return this.repository.save(translation);
  }

  async findAll(): Promise<Translation[]> {
    return await this.repository.find();
  }

  async findActive(): Promise<Translation[]> {
    return await this.repository.find({active: true});
  }

  async findOne(id: number): Promise<Translation> {
    const result = await this.repository.find({id: id});
    return result[0];
  }


  async update(id: number, translation: Translation): Promise<any> {
    await this.repository.update({id: id}, translation);
    return await this.repository.find({id: id});
  }

  async remove(id: number): Promise<Translation[]> {
    await this.repository.delete({id: id});
    return await this.repository.find();
  }
  
}
