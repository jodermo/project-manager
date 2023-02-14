import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from './company.entity';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  create(@Body() body: Company) {
    return this.companyService.create(body);
  }

  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @Get('active')
  findActive() {
    return this.companyService.findActive();
  }

  @Get(':id')
  findOne(@Param() params: Company): Promise<Company> {
    return this.companyService.findOne(params.id);
  }

  @Patch(':id')
  update(@Param() params: Company, @Body() body: Company) {
    if (body) {
      return this.companyService.update(params.id, body);
    }
  }

  @Put(':id')
  addOrUpdate(@Param() params: Company, @Body() body: Company) {
    if (body?.id) {
      return this.companyService.update(params.id, body);
    } else {
      return this.companyService.create(body);
    }
  }

  @Delete(':id')
  remove(@Param() params: Company) {
    return this.companyService.remove(params.id);
  }
}
