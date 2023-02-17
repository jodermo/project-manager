import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserMessage} from "./user-message.entity";

@Injectable()
export class UserMessageService {

    private logger = new Logger('UserMessageService');

    constructor(
        @InjectRepository(UserMessage)
        private readonly repository: Repository<UserMessage>) {

    }

    async create(userMessage: UserMessage): Promise<UserMessage> {
        return this.repository.save(userMessage);
    }

    async findAll(): Promise<UserMessage[]> {
        return await this.repository.find();
    }

    async findActive(): Promise<UserMessage[]> {
        return await this.repository.find({active: true});
    }


    async findOne(id: number): Promise<UserMessage> {
        const result = await this.repository.find({id: id});
        return result[0];
    }


    async update(id: number, userMessage: UserMessage): Promise<any> {
        await this.repository.update({id: id}, userMessage);
        return await this.repository.find({id: id});
    }

    async remove(id: number): Promise<UserMessage[]> {
        await this.repository.delete({id: id});
        return await this.repository.find();
    }
}
