import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './services/user/user.service';

@Controller('v1/users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    getAllUsers(
        @Query('loginSubstring') loginSubstring: string,
        @Query('limit', ParseIntPipe) limit: number,
    ) {
        return this.userService.getUsers(limit, loginSubstring);
    }

    @Get(':id')
    getUserById(@Param('id') id: string) {
        return this.userService.getUserById(id);
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        if (!this.userService.checkLogin(createUserDto.login)) {
            return this.userService.createUser(createUserDto);
        } else {
            throw new HttpException('user already exists', 400);
        }
    }

    @Delete(':id')
    removeUser(@Param('id') id: string) {
        return this.userService.deleteUser(id);
    }

    @Put(':id')
    updateUser(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string) {
        if (
            !updateUserDto.login ||
            !this.userService.checkLogin(id, updateUserDto.login)
        ) {
            return this.userService.updateUser(id, updateUserDto);
        } else {
            throw new HttpException('user already exists', 400);
        }
    }
}
