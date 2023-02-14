import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Memo } from './memo.entity';

@Injectable()
export class MemoService {

    private logger = new Logger('MemoService');

    constructor(
        @InjectRepository(Memo)
        private readonly repository: Repository<Memo>) {

    }

    async create(memo: Memo): Promise<Memo> {
        return this.repository.save(memo);
    }

    async findAll(): Promise<Memo[]> {
        return await this.repository.find();
    }

    async findActive(): Promise<Memo[]> {
        return await this.repository.find({active: true});
    }

    async findOne(id: number): Promise<Memo> {
        const result = await this.repository.find({id: id});
        return result[0];
    }


    async update(id: number, memo: Memo): Promise<any> {
        await this.repository.update({id: id}, memo);
        return await this.repository.find({id: id});
    }

    async remove(id: number): Promise<Memo[]> {
        await this.repository.delete({id: id});
        return await this.repository.find();
    }
}
