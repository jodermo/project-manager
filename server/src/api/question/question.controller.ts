import {Body, Controller, Delete, Get, Param, Patch, Post, Put} from '@nestjs/common';
import { QuestionService } from './question.service';
import {Question} from "../question/question.entity";

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}


  @Post()
  create(@Body() body: Question) {
    return this.questionService.create(body);
  }

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Get('active')
  findActive() {
    return this.questionService.findActive();
  }

  @Get(':id')
  findOne(@Param() params: Question): Promise<Question> {
    return this.questionService.findOne(params.id);
  }

  @Patch(':id')
  async update(@Param() params: Question, @Body() body: Question) {
    if (body) {
      return await this.questionService.update(params.id, body);
    }
  }

  @Put(':id')
  addOrUpdate(@Param() params: Question, @Body() body: Question) {
    if (body?.id) {
      return this.questionService.update(params.id, body);
    } else {
      return this.questionService.create(body);
    }
  }

  @Delete(':id')
  remove(@Param() params: Question) {
    return this.questionService.remove(params.id);
  }
}
