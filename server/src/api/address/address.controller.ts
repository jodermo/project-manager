import {Body, Controller, Delete, Get, Param, Patch, Post, Put} from '@nestjs/common';
import { Address } from './address.entity';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}


  @Post()
  create(@Body() body: Address) {
    return this.addressService.create(body);
  }

  @Get()
  findAll() {
    return this.addressService.findAll();
  }

  @Get('active')
  findActive() {
    return this.addressService.findActive();
  }

  @Get(':id')
  findOne(@Param() params: Address): Promise<Address> {
    return this.addressService.findOne(params.id);
  }

  @Patch(':id')
  async update(@Param() params: Address, @Body() body: Address) {
    if (body) {
      return await this.addressService.update(params.id, body);
    }
  }

  @Put(':id')
  addOrUpdate(@Param() params: Address, @Body() body: Address) {
    if (body?.id) {
      return this.addressService.update(params.id, body);
    } else {
      return this.addressService.create(body);
    }
  }

  @Delete(':id')
  remove(@Param() params: Address) {
    return this.addressService.remove(params.id);
  }
}
