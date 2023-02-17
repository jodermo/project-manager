import {Body, Controller, Delete, Get, Param, Patch, Post, Put} from '@nestjs/common';
import { UserMessageService } from './user-message.service';
import {UserMessage} from "./user-message.entity";

@Controller('user-message')
export class UserMessageController {
  constructor(private readonly userMessageService: UserMessageService) {}

  @Post()
  create(@Body() body: UserMessage) {
    return this.userMessageService.create(body);
  }

  @Get()
  findAll() {
    return this.userMessageService.findAll();
  }

  @Get('active')
  findActive() {
    return this.userMessageService.findActive();
  }

  @Get(':id')
  findOne(@Param() params: UserMessage): Promise<UserMessage> {
    return this.userMessageService.findOne(params.id);
  }

  @Patch(':id')
  async update(@Param() params: UserMessage, @Body() body: UserMessage) {
    if (body) {
      return await this.userMessageService.update(params.id, body);
    }
  }

  @Put(':id')
  addOrUpdate(@Param() params: UserMessage, @Body() body: UserMessage) {
    if (body?.id) {
      return this.userMessageService.update(params.id, body);
    } else {
      return this.userMessageService.create(body);
    }
  }

  @Delete(':id')
  remove(@Param() params: UserMessage) {
    return this.userMessageService.remove(params.id);
  }
}
