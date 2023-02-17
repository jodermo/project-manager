import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Address} from "./address.entity";

@Injectable()
export class AddressService {

    private logger = new Logger('AddressService');

    constructor(
        @InjectRepository(Address)
        private readonly repository: Repository<Address>) {

    }

    async create(address: Address): Promise<Address> {
        return this.repository.save(address);
    }

    async findAll(): Promise<Address[]> {
        return await this.repository.find();
    }

    async findActive(): Promise<Address[]> {
        return await this.repository.find({active: true});
    }


    async findOne(id: number): Promise<Address> {
        const result = await this.repository.find({id: id});
        return result[0];
    }


    async update(id: number, address: Address): Promise<any> {
        await this.repository.update({id: id}, address);
        return await this.repository.find({id: id});
    }

    async remove(id: number): Promise<Address[]> {
        await this.repository.delete({id: id});
        return await this.repository.find();
    }
}
