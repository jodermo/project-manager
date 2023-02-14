/**
 *    TATOR - Nest App
 *    © 2020
 *    Author: Moritz Petzka
 *    Website: https://petzka.com
 *    Email: info@petzka.com
 */

import {
    Post,
    Controller,
    UseInterceptors,
    UploadedFile,
    Logger, Res, Get, Param, HttpStatus, Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileService } from '../file/file.service';
import { File } from '../file/file.entity';

@Controller('upload')
export class UploadController {
    private logger = new Logger('FileUpload');

    constructor(private fileService: FileService) {
    }

    @Post()
    @UseInterceptors(FileInterceptor(
        'file',
        {
            storage: diskStorage(
                {
                    destination: './upload',
                    filename: (req, file, cb) => {
                        let fileName = Date.now() + '_';
                        if (file.userId || file.userId === 0) {
                            fileName = file.userId + '_' + fileName;
                        }
                        fileName += Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                        return cb(null, `${fileName}${extname(file.originalname)}`);
                    },
                },
            ),
        },
    ))
    uploadFile(@UploadedFile() file, @Res() res, @Body() body: any) {
        file.path = file.path.replace('\\\\', '/');
        file.path = file.path.replace('\\', '/');
        file.thumbnail = file.path.replace('.', '_thumbnail.');
        this.generateThumbnail(file, file.thumbnail, 300, 200).then(() => {
            file.userId = file.userId || body.userId || null;
            file.created = Date.now();
            file.type = file.type || body.type || 'document';
            file.name = file.name || file.originalname || null;
            file.category = body.category || 'upload';
            file.subCategory = body.subCategory || null;
            if (body.file) {
                file.type = file.type || body.file.type || null;
                file.name = body.file.name || file.name || null;
                // tslint:disable-next-line:forin
                for (const key in body.file) {
                    file[key] = body.file[key];
                }
            }
            return this.fileService.createFile(file as File).then(result => {
                this.logger.log(file.originalname + ' : ' + file.mimetype + ' > ' + file.path);
                return res.status(HttpStatus.OK).json(result);
            });
        });
    }

    @Get(':fileName')
    async serveFile(@Param('fileName') fileName, @Res() res): Promise<any> {
        res.sendFile(fileName, {root: './upload'});
    }

    userDir(file) {
        if (file && file.userId) {
            return '/' + file.userId;
        }
        return '';
    }

    async generateThumbnail(file, thumbPath, width = 300, height = 200) {
        if (file.mimetype.includes('image')) {
            const options = {
                width,
                height,
                responseType: 'base64',
                jpegOptions: {force: true, quality: 90},
                fit: 'cover',
            };
            /*
            try {
                const thumbnail = await imageThumbnail('./' + file.path, options);
                fs.writeFile('./' + thumbPath, thumbnail, {encoding: 'base64'}, (err) => {
                    this.logger.log('thumbnail created');
                });
                file.thumbnail = thumbPath;
                this.logger.log('thumbnail ' + thumbPath);
            } catch (err) {
                file.thumbnail = file.path;
                this.logger.log(err);
            }

             */
        } else if (file.mimetype.includes('video')) {
            return this.generateVideoThumbnail(file, thumbPath, width, height);
        }
        return;
    }

    async generateVideoThumbnail(file, thumbPath, width = 300, height = 200, timePosition = '00:00:01') {
        /*
        const fileType = '.png';
        const videoTypes = ['.mp4', '.webm', '.ogg', '.ogv', '.avi'];
        for (const videoType of videoTypes) {
            thumbPath = thumbPath.toLowerCase().replace(videoType, fileType);
        }
        file.thumbnail = thumbPath;
        return videoThumbnail.extract('./' + file.path, './' + thumbPath, timePosition, width + 'x' + height, () => {
            this.logger.log('snapshot saved to ' + file.path + ' (' + width + 'x' + height + ') with a frame at' + timePosition);
        });

         */
        return;
    }
}
