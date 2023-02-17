import { Module } from '@nestjs/common';
import { ProjectTemplateService } from './project-template.service';
import { ProjectTemplateController } from './project-template.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProjectTemplate} from "./project-template.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ProjectTemplate])],
  controllers: [ProjectTemplateController],
  providers: [ProjectTemplateService]
})
export class ProjectTemplateModule {}
