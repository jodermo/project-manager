import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { AppSettingsService } from './app-settings.service';
import { AppSetting } from './app-setting.entity';

@Controller('app-settings')
export class AppSettingsController {
    constructor(private readonly appSettingsService: AppSettingsService) {
    }

    @Post()
    create(@Body() body: AppSetting) {
        return this.appSettingsService.create(body);
    }

    @Get()
    findAll() {
        return this.appSettingsService.findAll();
    }

    @Get('active')
    findActive() {
        return this.appSettingsService.findActive();
    }

    @Get(':id')
    findOne(@Param() params: AppSetting): Promise<AppSetting> {
        return this.appSettingsService.findOne(params.id);
    }

    @Patch(':id')
    update(@Param() params: AppSetting, @Body() body: AppSetting) {
        if (body) {
            return this.appSettingsService.update(params.id, body);
        }
    }

    @Put(':id')
    addOrUpdate(@Param() params: AppSetting, @Body() body: AppSetting) {
        if (body?.id) {
            return this.appSettingsService.update(params.id, body);
        } else {
            return this.appSettingsService.create(body);
        }
    }

    @Delete(':id')
    remove(@Param() params: AppSetting) {
        return this.appSettingsService.remove(params.id);
    }
}
