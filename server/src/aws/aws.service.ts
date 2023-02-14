import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { configService } from '../config/config.service';
import { File } from '../api/file/file.entity';
import { FileService } from '../api/file/file.service';
import { uuid } from 'uuidv4';

@Injectable()
export class AwsService {
    private logger = new Logger('AwsService');

    private getS3() {
        return new S3({
            accessKeyId: configService.getAWSConfig().accessKey,
            secretAccessKey: configService.getAWSConfig().secretKey,
            region: configService.getAWSConfig().uploadRegion,
            endpoint: 'https://s3.amazonaws.com'
        });
    }

    public async uploadFile(file: any, dataService: FileService, res: any) {
        const s3 = this.getS3();
        const Key = uuid() + '-' + file.originalname;
        const params = {
            Body: file.buffer,
            Bucket: configService.getAWSConfig().uploadBucket,
            Key: Key
        }
        this.logger.log('AWS upload Bucket:' + params.Bucket);
        this.logger.log('AWS upload Key:' + params.Key);
        const result = await s3.upload(params).promise();
        this.logger.log('AWS Result');
        this.logger.log(result);
        const newFile = await dataService.createFile({
            key: result.Key,
            location: result.Location,
            bucket: result.Bucket,
            name: file.originalname,
            filename: file.originalname,
            originalname: file.originalname,
            mimetype: file.mimetype,
            path: 'file/key/' + Key,
            thumbnail: 'file/key/' + Key
        } as File);
        this.logger.log('New File');
        this.logger.log(newFile);
        return res.status(HttpStatus.OK).json(newFile);
    }

    public getFile(Key: string) {
        const s3 = this.getS3();
        const params = {
            Key: Key,
            Bucket: configService.getAWSConfig().uploadBucket
        }
        return s3.getObject(params).createReadStream();
    }

    public async deleteFile(Key: string) {
        const s3 = this.getS3();
        const params = {
            Key: Key,
            Bucket: configService.getAWSConfig().uploadBucket
        }
        return await s3.deleteObject(params).promise();
    }
}
