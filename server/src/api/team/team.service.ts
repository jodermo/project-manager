import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Team} from "./team.entity";

@Injectable()
export class TeamService {

    private logger = new Logger('TeamService');

    constructor(
        @InjectRepository(Team)
        private readonly repository: Repository<Team>) {

    }

    async create(team: Team): Promise<Team> {
        return this.repository.save(team);
    }

    async findAll(): Promise<Team[]> {
        return await this.repository.find();
    }

    async findActive(): Promise<Team[]> {
        return await this.repository.find({active: true});
    }


    async findOne(id: number): Promise<Team> {
        const result = await this.repository.find({id: id});
        return result[0];
    }


    async update(id: number, team: Team): Promise<any> {
        await this.repository.update({id: id}, team);
        return await this.repository.find({id: id});
    }

    async remove(id: number): Promise<Team[]> {
        await this.repository.delete({id: id});
        return await this.repository.find();
    }
}
