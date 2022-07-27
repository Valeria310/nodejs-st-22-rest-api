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
    create(@Body() createUserDto: CreateUserDto) {
        if (!this.usersService.checkLogin(createUserDto.login)) {
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
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        if (
            !updateUserDto.login ||
            !this.usersService.checkLogin(id, updateUserDto.login)
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
