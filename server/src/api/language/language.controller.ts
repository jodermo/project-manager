import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { LanguageService } from './language.service';
import { Language } from './language.entity';

@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Post()
  create(@Body() body: Language) {
    return this.languageService.create(body);
  }

  @Get()
  findAll() {
    return this.languageService.findAll();
  }

  @Get('active')
  findActive() {
    return this.languageService.findActive();
  }

  @Get(':id')
  findOne(@Param() params: Language): Promise<Language> {
    return this.languageService.findOne(params.id);
  }

  @Patch(':id')
  update(@Param() params: Language, @Body() body: Language) {
    if (body) {
      return this.languageService.update(params.id, body);
    }
  }

  @Put(':id')
  addOrUpdate(@Param() params: Language, @Body() body: Language) {
    if (body?.id) {
      return this.languageService.update(params.id, body);
    } else {
      return this.languageService.create(body);
    }
  }

  @Delete(':id')
  remove(@Param() params: Language) {
    return this.languageService.remove(params.id);
  }
}
