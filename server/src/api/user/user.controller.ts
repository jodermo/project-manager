import {Get, Post, Controller, Param, Body, Delete, Patch, Put} from '@nestjs/common';
import {UserService} from './user.service';
import {User} from './user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly dataService: UserService) {
    }

    @Get()
    getEntries(): Promise<User[]> {
        return this.dataService.getUsers();
    }

    @Get('active')
    findActive(): Promise<User[]> {
        return this.dataService.findActive();
    }

    @Get(':id')
    getUserById(@Param() params: User): Promise<User> {
        return this.dataService.findById(params.id);
    }

    @Post()
    createUser(@Body() body: User) {
        if (body) {
            return this.dataService.createUser(body);
        }
    }

    @Patch(':id')
    updateUser(@Param() params: User, @Body() body: User) {
        if (body && body.id) {
            return this.dataService.updateUser(params.id, body);
        }
    }

    @Put(':id')
    addOrUpdate(@Param() params: User, @Body() body: User) {
        if (body?.id) {
            return this.dataService.updateUser(params.id, body);
        } else {
            return this.dataService.createUser(body);
        }
    }

    @Delete(':id')
    deleteUser(@Param() params: User) {
        return this.dataService.deleteUser(params.id);
    }
}
