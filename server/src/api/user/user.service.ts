import { Body, Delete, Injectable, Param, Patch } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    private saltRounds = 10;

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>) {
    }

    async getUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findActive(): Promise<User[]> {
        return await this.userRepository.find({active: true});
    }

    async getUserByUsername(username: string): Promise<User> {
        return (await this.userRepository.find({username}))[0];
    }

    async getUserByEmail(email: string): Promise<User> {
        return (await this.userRepository.find({email}))[0];
    }

    async findById(id: number): Promise<User> {
        const result = await this.userRepository.find({id: id});
        return result[0];
    }

    async createUser(user: User): Promise<User> {
        console.log('createUser', user);
        if(user.password){
            user.passwordHash = await this.getHash(user.password);
        }
        // clear password as we don't persist passwords
        user.password = undefined;
        return this.userRepository.save(user);
    }

    async getHash(password: string | undefined): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    async compareHash(password: string | undefined, hash: string | undefined): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    async getLoginHash(password: string | undefined): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    async compareLoginHash(username: string | undefined, hash: string | undefined): Promise<boolean> {
        return bcrypt.compare(username, hash);
    }

    async updateUser(id: number, user: User): Promise<any> {
        await this.userRepository.update({id: id}, user);
        return await this.userRepository.find({id: id});
    }

    async deleteUser(id: number): Promise<User[]> {
        await this.userRepository.delete({id: id});
        return await this.userRepository.find();
    }
}
