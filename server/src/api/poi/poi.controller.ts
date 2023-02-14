import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { PoiService } from './poi.service';
import { Poi } from './poi.entity';

@Controller('poi')
export class PoiController {
    constructor(private readonly poiService: PoiService) {
    }

    @Post()
    create(@Body() body: Poi) {
        return this.poiService.create(body);
    }

    @Get()
    findAll() {
        return this.poiService.findAll();
    }

    @Get('active')
    findActive() {
        return this.poiService.findActive();
    }

    @Get(':id')
    findOne(@Param() params: Poi): Promise<Poi> {
        return this.poiService.findOne(params.id);
    }

    @Patch(':id')
    update(@Param() params: Poi, @Body() body: Poi) {
        if (body) {
            return this.poiService.update(params.id, body);
        }
    }

    @Put(':id')
    async addOrUpdate(@Param() params: Poi, @Body() body: Poi) {
        if (body?.id) {
            return await this.poiService.update(params.id, body);
        } else {
            return await this.poiService.create(body);
        }
    }

    @Delete(':id')
    remove(@Param() params: Poi) {
        return this.poiService.remove(params.id);
    }
}
