import {Controller, Get, Post, Body, Patch, Param, Delete, Put} from '@nestjs/common';
import {TranslationService} from './translation.service';
import {Translation} from './translation.entity';

@Controller('translation')
export class TranslationController {
    constructor(private readonly translationService: TranslationService) {
    }

    @Post()
    create(@Body() body: Translation) {
        return this.translationService.create(body);
    }

    @Get()
    findAll() {
        return this.translationService.findAll();
    }

    @Get('active')
    findActive() {
        return this.translationService.findActive();
    }

    @Get(':id')
    findOne(@Param() params: Translation): Promise<Translation> {
        return this.translationService.findOne(params.id);
    }

    @Patch(':id')
    update(@Param() params: Translation, @Body() body: Translation) {
        if (body) {
            return this.translationService.update(params.id, body);
        }
    }

    @Put(':id')
    addOrUpdate(@Param() params: Translation, @Body() body: Translation) {
        if (body?.id) {
            return this.translationService.update(params.id, body);
        } else {
            return this.translationService.create(body);
        }
    }

    @Delete(':id')
    remove(@Param() params: Translation) {
        return this.translationService.remove(params.id);
    }
}
