/**
 *    TATOR - Nest App
 *    © 2020
 *    Author: Moritz Petzka
 *    Website: https://petzka.com
 *    Email: info@petzka.com
 */

import {forwardRef, Module} from '@nestjs/common';
import { UploadController } from './upload.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from '../file/file.service';
import { File } from '../file/file.entity';
import {AppService} from "../../app.service";
import {AppModule} from "../../app.module";

@Module({
    imports: [TypeOrmModule.forFeature([File]), forwardRef(()=>AppModule)],
    providers: [FileService, AppService],
    controllers: [UploadController],
})
export class UploadModule {
}
