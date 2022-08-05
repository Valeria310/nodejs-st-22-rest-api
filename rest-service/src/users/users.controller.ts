import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    HttpException,
    Query,
    ParseIntPipe,
    Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('v1/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        if (!(await this.usersService.isLoginFree(createUserDto.login))) {
            return this.usersService.create(createUserDto);
        } else {
            throw new HttpException('user already exists', 400);
        }
    }

    @Get()
    findAll(
        @Query('loginSubstring') loginSubstring: string,
        @Query('limit', ParseIntPipe) limit: number,
    ) {
        return this.usersService.findAll(limit, loginSubstring);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        if (
            !updateUserDto.login ||
            !(await this.usersService.isLoginFree(updateUserDto.login, id))
        ) {
            return this.usersService.update(id, updateUserDto);
        } else {
            throw new HttpException('user already exists', 400);
        }
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
}
