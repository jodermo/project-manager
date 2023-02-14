import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { MemoService } from './memo.service';
import { Memo } from './memo.entity';

@Controller('memo')
export class MemoController {
  constructor(private readonly memoService: MemoService) {}


  @Post()
  create(@Body() body: Memo) {
    return this.memoService.create(body);
  }

  @Get('/')
  findAll() {
    return this.memoService.findAll();
  }

  @Get('active')
  findActive() {
    return this.memoService.findActive();
  }

  @Get(':id')
  findOne(@Param() params: Memo): Promise<Memo> {
    return this.memoService.findOne(params.id);
  }

  @Patch(':id')
  update(@Param() params: Memo, @Body() body: Memo) {
    if (body) {
      return this.memoService.update(params.id, body);
    }
  }

  @Put(':id')
  addOrUpdate(@Param() params: Memo, @Body() body: Memo) {
    if (body?.id) {
      return this.memoService.update(params.id, body);
    } else {
      return this.memoService.create(body);
    }
  }

  @Delete(':id')
  remove(@Param() params: Memo) {
    return this.memoService.remove(params.id);
  }
}
