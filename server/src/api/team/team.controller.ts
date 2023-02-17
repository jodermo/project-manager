import {Body, Controller, Delete, Get, Param, Patch, Post, Put} from '@nestjs/common';
import { TeamService } from './team.service';
import {Team} from "./team.entity";

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}


  @Post()
  create(@Body() body: Team) {
    return this.teamService.create(body);
  }

  @Get()
  findAll() {
    return this.teamService.findAll();
  }

  @Get('active')
  findActive() {
    return this.teamService.findActive();
  }

  @Get(':id')
  findOne(@Param() params: Team): Promise<Team> {
    return this.teamService.findOne(params.id);
  }

  @Patch(':id')
  async update(@Param() params: Team, @Body() body: Team) {
    if (body) {
      return await this.teamService.update(params.id, body);
    }
  }

  @Put(':id')
  addOrUpdate(@Param() params: Team, @Body() body: Team) {
    if (body?.id) {
      return this.teamService.update(params.id, body);
    } else {
      return this.teamService.create(body);
    }
  }

  @Delete(':id')
  remove(@Param() params: Team) {
    return this.teamService.remove(params.id);
  }
}
