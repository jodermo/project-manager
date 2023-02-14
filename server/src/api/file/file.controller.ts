import {
    Get,
    Controller,
    Param,
    Body,
    Delete,
    Patch,
    Post,
    Res,
    UploadedFile,
    UseInterceptors,
    Logger, Response, Put
} from '@nestjs/common';
import {
    FileInterceptor,
} from '@nestjs/platform-express';
import { FileService } from './file.service';
import { File } from './file.entity';
import { AwsService } from '../../aws/aws.service';

@Controller('file')
export class FileController {

    private logger = new Logger('FileController');

    constructor(private readonly dataService: FileService, private awsService: AwsService) {
    }

    @Get()
    getEntries(): Promise<File[]> {
        return this.dataService.findAll();
    }

    @Get('active')
    findActive() {
        return this.dataService.findActive();
    }

    @Get(':id')
    getFileById(@Param() params: File): Promise<File> {
        return this.dataService.findById(params.id);
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadS3File(@Response() res: any, @UploadedFile() file: any) {
        this.logger.log('upload file: ' + file.originalname);
        return this.dataService.uploadFile(file, res);
        // return this.awsService.uploadFile(file, this.dataService, res);
    }

    @Get('key/:id')
    getS3File(@Param() params: any, @Res() res: any) {
        const file = this.awsService.getFile(params.id);
        this.logger.log(file);
        file.pipe(res);
    }

    @Delete('key/:id')
    async deleteS3File(@Param() params: any, @Res() res: any) {
        await this.awsService.deleteFile(params.id);
        return await this.dataService.deleteFileByKey(params.id);
    }

    @Post()
    createFile(@Body() body: File) {
        if (body) {
            return this.dataService.createFile(body);
        }
    }

    @Patch(':id')
    updateFile(@Param() params: File, @Body() body: File) {
        if (body) {
            return this.dataService.updateFile(params.id, body);
        }
    }

    @Put(':id')
    addOrUpdate(@Param() params: File, @Body() body: File) {
        if (body?.id) {
            return this.dataService.updateFile(params.id, body);
        } else {
            return this.dataService.createFile(body);
        }
    }

    @Delete(':id')
    deleteFile(@Param() params: File) {
        return this.dataService.deleteFile(params.id);
    }
}
