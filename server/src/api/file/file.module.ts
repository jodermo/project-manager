import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { File } from './file.entity';
import { AwsModule } from '../../aws/aws.module';
import { AwsService } from '../../aws/aws.service';
import {AppService} from "../../app.service";
import {AppModule} from "../../app.module";

@Module({
    imports: [TypeOrmModule.forFeature([File]), AwsModule, forwardRef(()=>AppModule)],
    providers: [FileService, AwsService, AppService],
    controllers: [FileController],
})
export class FileModule {
}
