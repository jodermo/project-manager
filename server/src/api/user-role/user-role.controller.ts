import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { UserRole } from './user-role.entity';

@Controller('user-role')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}


  @Post()
  create(@Body() body: UserRole) {
    return this.userRoleService.create(body);
  }

  @Get()
  findAll() {
    return this.userRoleService.findAll();
  }

  @Get('active')
  findActive() {
    return this.userRoleService.findActive();
  }

  @Get(':id')
  findOne(@Param() params: UserRole): Promise<UserRole> {
    return this.userRoleService.findOne(params.id);
  }

  @Patch(':id')
  update(@Param() params: UserRole, @Body() body: UserRole) {
    if (body) {
      return this.userRoleService.update(params.id, body);
    }
  }

  @Put(':id')
  addOrUpdate(@Param() params: UserRole, @Body() body: UserRole) {
    if (body?.id) {
      return this.userRoleService.update(params.id, body);
    } else {
      return this.userRoleService.create(body);
    }
  }

  @Delete(':id')
  remove(@Param() params: UserRole) {
    return this.userRoleService.remove(params.id);
  }
}
