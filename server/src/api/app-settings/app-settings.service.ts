import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppSetting } from './app-setting.entity';

@Injectable()
export class AppSettingsService {

    private logger = new Logger('AppSettingsService');

    constructor(
        @InjectRepository(AppSetting)
        private readonly repository: Repository<AppSetting>) {

    }

    async create(appSettings: AppSetting): Promise<AppSetting> {
        return this.repository.save(appSettings);
    }

    async findAll(): Promise<AppSetting[]> {
        return await this.repository.find();
    }

    async findActive(): Promise<AppSetting[]> {
        return await this.repository.find({active: true});
    }

    async findOne(id: number): Promise<AppSetting> {
        const result = await this.repository.find({id: id});
        return result[0];
    }


    async update(id: number, appSettings: AppSetting): Promise<any> {
        await this.repository.update({id: id}, appSettings);
        return await this.repository.find({id: id});
    }

    async remove(id: number): Promise<AppSetting[]> {
        await this.repository.delete({id: id});
        return await this.repository.find();
    }

}
