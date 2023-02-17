import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { LocationService } from './location.service';
import { Location } from './location.entity';

@Controller('location')
export class LocationController {
    constructor(private readonly locationService: LocationService) {
    }

    @Post()
    create(@Body() body: Location) {
        return this.locationService.create(body);
    }

    @Get()
    findAll() {
        return this.locationService.findAll();
    }

    @Get('active')
    findActive() {
        return this.locationService.findActive();
    }

    @Get(':id')
    findOne(@Param() params: Location): Promise<Location> {
        return this.locationService.findOne(params.id);
    }

    @Patch(':id')
    update(@Param() params: Location, @Body() body: Location) {
        if (body) {
            return this.locationService.update(params.id, body);
        }
    }

    @Put(':id')
    async addOrUpdate(@Param() params: Location, @Body() body: Location) {
        if (body?.id) {
            return await this.locationService.update(params.id, body);
        } else {
            return await this.locationService.create(body);
        }
    }

    @Delete(':id')
    remove(@Param() params: Location) {
        return this.locationService.remove(params.id);
    }
}
