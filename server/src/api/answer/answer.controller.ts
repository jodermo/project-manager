import {Body, Controller, Delete, Get, Param, Patch, Post, Put} from '@nestjs/common';
import { AnswerService } from './answer.service';
import {Answer} from "./answer.entity";

@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}


  @Post()
  create(@Body() body: Answer) {
    return this.answerService.create(body);
  }

  @Get()
  findAll() {
    return this.answerService.findAll();
  }

  @Get('active')
  findActive() {
    return this.answerService.findActive();
  }

  @Get(':id')
  findOne(@Param() params: Answer): Promise<Answer> {
    return this.answerService.findOne(params.id);
  }

  @Patch(':id')
  async update(@Param() params: Answer, @Body() body: Answer) {
    if (body) {
      return await this.answerService.update(params.id, body);
    }
  }

  @Put(':id')
  addOrUpdate(@Param() params: Answer, @Body() body: Answer) {
    if (body?.id) {
      return this.answerService.update(params.id, body);
    } else {
      return this.answerService.create(body);
    }
  }

  @Delete(':id')
  remove(@Param() params: Answer) {
    return this.answerService.remove(params.id);
  }
}
