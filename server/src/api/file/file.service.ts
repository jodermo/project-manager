import {HttpStatus, Injectable, Logger, Inject, forwardRef} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {File} from './file.entity';
import {AppService} from "../../app.service";
import {configService} from "../../config/config.service";

@Injectable()
export class FileService {

    private logger = new Logger('FileService');

    constructor(
        @InjectRepository(File)
        private readonly fileRepository: Repository<File>,
        @Inject(forwardRef(() => AppService)) private readonly appService: AppService
    ) {
    }

    async findAll(): Promise<File[]> {
        return await this.fileRepository.find();
    }

    async findActive(): Promise<File[]> {
        return await this.fileRepository.find({active: true});
    }

    async findById(id: number): Promise<File> {
        const result = await this.fileRepository.find({id: id});
        return result[0];
    }

    async uploadFile(file: any, res: any): Promise<any> {
        console.log('uploadFile result', file);
        return await this.appService.submit('test', file, configService.getSftpConnectionInfo()).then((result: string) => {
            console.log('uploadFile result', result);
            return res.status(HttpStatus.OK).json(result);
        }).catch((error: any) => {
            console.log('uploadFile error', error);
            return res.status(HttpStatus.OK).json(error);
        });
    }


    async createFile(file: File): Promise<File> {
        if (file.path) {
            // this.replaceAll(file.path, 'upload\\\\', 'upload\\');
        }
        return this.fileRepository.save(file);
    }

    async updateFile(id: number, file: File): Promise<any> {
        await this.fileRepository.update({id: id}, file);
        return await this.fileRepository.find({id: id});
    }


    async deleteFile(id: number): Promise<File[]> {
        await this.fileRepository.delete({id: id});
        return await this.fileRepository.find();
    }

    async deleteFileByKey(key: string): Promise<File[]> {
        await this.fileRepository.delete({key: key});
        return await this.fileRepository.find();
    }

    replaceAll(originalString, find, replace) {
        if (originalString) {
            return originalString.replace(new RegExp(find, 'g'), replace);
        }
        return originalString;

    };
}
