import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Answer} from "./answer.entity";

@Injectable()
export class AnswerService {
    private logger = new Logger('AnswerService');

    constructor(
        @InjectRepository(Answer)
        private readonly repository: Repository<Answer>) {

    }

    async create(answer: Answer): Promise<Answer> {
        return this.repository.save(answer);
    }

    async findAll(): Promise<Answer[]> {
        return await this.repository.find();
    }

    async findActive(): Promise<Answer[]> {
        return await this.repository.find({active: true});
    }


    async findOne(id: number): Promise<Answer> {
        const result = await this.repository.find({id: id});
        return result[0];
    }


    async update(id: number, answer: Answer): Promise<any> {
        await this.repository.update({id: id}, answer);
        return await this.repository.find({id: id});
    }

    async remove(id: number): Promise<Answer[]> {
        await this.repository.delete({id: id});
        return await this.repository.find();
    }
}
