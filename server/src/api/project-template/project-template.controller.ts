import {Body, Controller, Delete, Get, Param, Patch, Post, Put} from '@nestjs/common';
import { ProjectTemplateService } from './project-template.service';
import {ProjectTemplate} from "./project-template.entity";

@Controller('project-template')
export class ProjectTemplateController {
  constructor(private readonly projectTemplateService: ProjectTemplateService) {}


  @Post()
  create(@Body() body: ProjectTemplate) {
    return this.projectTemplateService.create(body);
  }

  @Get()
  findAll() {
    return this.projectTemplateService.findAll();
  }

  @Get('active')
  findActive() {
    return this.projectTemplateService.findActive();
  }

  @Get(':id')
  findOne(@Param() params: ProjectTemplate): Promise<ProjectTemplate> {
    return this.projectTemplateService.findOne(params.id);
  }

  @Patch(':id')
  async update(@Param() params: ProjectTemplate, @Body() body: ProjectTemplate) {
    if (body) {
      return await this.projectTemplateService.update(params.id, body);
    }
  }

  @Put(':id')
  addOrUpdate(@Param() params: ProjectTemplate, @Body() body: ProjectTemplate) {
    if (body?.id) {
      return this.projectTemplateService.update(params.id, body);
    } else {
      return this.projectTemplateService.create(body);
    }
  }

  @Delete(':id')
  remove(@Param() params: ProjectTemplate) {
    return this.projectTemplateService.remove(params.id);
  }
}
