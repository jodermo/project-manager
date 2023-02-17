import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Question} from "./question.entity";

@Injectable()
export class QuestionService {

    private logger = new Logger('QuestionService');

    constructor(
        @InjectRepository(Question)
        private readonly repository: Repository<Question>) {

    }

    async create(question: Question): Promise<Question> {
        return this.repository.save(question);
    }

    async findAll(): Promise<Question[]> {
        return await this.repository.find();
    }

    async findActive(): Promise<Question[]> {
        return await this.repository.find({active: true});
    }


    async findOne(id: number): Promise<Question> {
        const result = await this.repository.find({id: id});
        return result[0];
    }


    async update(id: number, question: Question): Promise<any> {
        await this.repository.update({id: id}, question);
        return await this.repository.find({id: id});
    }

    async remove(id: number): Promise<Question[]> {
        await this.repository.delete({id: id});
        return await this.repository.find();
    }
}
