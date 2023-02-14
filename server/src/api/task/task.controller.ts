import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}


  @Post()
  create(@Body() body: Task) {
    return this.taskService.create(body);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get('active')
  findActive() {
    return this.taskService.findActive();
  }

  @Get(':id')
  findOne(@Param() params: Task): Promise<Task> {
    return this.taskService.findOne(params.id);
  }

  @Patch(':id')
  async update(@Param() params: Task, @Body() body: Task) {
    if (body) {
      return await this.taskService.update(params.id, body);
    }
  }

  @Put(':id')
  addOrUpdate(@Param() params: Task, @Body() body: Task) {
    if (body?.id) {
      return this.taskService.update(params.id, body);
    } else {
      return this.taskService.create(body);
    }
  }

  @Delete(':id')
  remove(@Param() params: Task) {
    return this.taskService.remove(params.id);
  }
}
