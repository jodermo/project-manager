import {Body, Controller, Delete, Get, Param, Patch, Post, Put} from '@nestjs/common';
import {AttributeService} from './attribute.service';
import {Attribute} from './attribute.entity';

@Controller('attribute')
export class AttributeController {
    constructor(private readonly attributeService: AttributeService) {
    }

    @Post()
    create(@Body() body: Attribute) {
        return this.attributeService.create(body);
    }

    @Get()
    findAll() {
        return this.attributeService.findAll();
    }


    @Get(':id')
    findOne(@Param() params: Attribute): Promise<Attribute> {
        return this.attributeService.findOne(params.id);
    }

    @Get(':route')
    findByRoute(@Param() params: Attribute): Promise<Attribute[]> {
        return this.attributeService.findByRoute(params.route);
    }

    @Get(':route/:parentId')
    findByApiRouteParentId(@Param() params: Attribute): Promise<Attribute[]> {
        return this.attributeService.findByApiRouteParentId(params.route, params.parentId);
    }

    @Patch(':id')
    update(@Param() params: Attribute, @Body() body: Attribute) {
        if (body) {
            return this.attributeService.update(params.id, body);
        }
    }

    @Put(':id')
    addOrUpdate(@Param() params: Attribute, @Body() body: Attribute) {
        if (body?.id) {
            return this.attributeService.update(params.id, body);
        } else {
            return this.attributeService.create(body);
        }
    }

    @Delete(':id')
    remove(@Param() params: Attribute) {
        return this.attributeService.remove(params.id);
    }
}
