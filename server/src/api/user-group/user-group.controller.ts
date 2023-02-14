import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UserGroupService } from './user-group.service';
import { UserGroup } from './user-group.entity';

@Controller('user-group')
export class UserGroupController {
  constructor(private readonly userGroupService: UserGroupService) {}

  @Post()
  create(@Body() body: UserGroup) {
    return this.userGroupService.create(body);
  }

  @Get()
  findAll() {
    return this.userGroupService.findAll();
  }


  @Get('active')
  findActive() {
    return this.userGroupService.findActive();
  }

  @Get(':id')
  findOne(@Param() params: UserGroup): Promise<UserGroup> {
    return this.userGroupService.findOne(params.id);
  }

  @Patch(':id')
  update(@Param() params: UserGroup, @Body() body: UserGroup) {
    if (body) {
      return this.userGroupService.update(params.id, body);
    }
  }

  @Put(':id')
  addOrUpdate(@Param() params: UserGroup, @Body() body: UserGroup) {
    if (body?.id) {
      return this.userGroupService.update(params.id, body);
    } else {
      return this.userGroupService.create(body);
    }
  }

  @Delete(':id')
  remove(@Param() params: UserGroup) {
    return this.userGroupService.remove(params.id);
  }
}
