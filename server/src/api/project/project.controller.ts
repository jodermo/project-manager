import {Body, Controller, Delete, Get, Param, Patch, Post, Put} from '@nestjs/common';
import { ProjectService } from './project.service';
import {Project} from "./project.entity";

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Body() body: Project) {
    return this.projectService.create(body);
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get('active')
  findActive() {
    return this.projectService.findActive();
  }

  @Get(':id')
  findOne(@Param() params: Project): Promise<Project> {
    return this.projectService.findOne(params.id);
  }

  @Patch(':id')
  async update(@Param() params: Project, @Body() body: Project) {
    if (body) {
      return await this.projectService.update(params.id, body);
    }
  }

  @Put(':id')
  addOrUpdate(@Param() params: Project, @Body() body: Project) {
    if (body?.id) {
      return this.projectService.update(params.id, body);
    } else {
      return this.projectService.create(body);
    }
  }

  @Delete(':id')
  remove(@Param() params: Project) {
    return this.projectService.remove(params.id);
  }
}
