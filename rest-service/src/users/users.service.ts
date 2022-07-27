import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InMemoryRepository } from './repository/in-memory-users.repository';

@Injectable()
export class UsersService {
    constructor(private repository: InMemoryRepository) {}

    create(createUserDto: CreateUserDto) {
        return this.repository.create(createUserDto);
    }

    checkLogin(userLogin: string, userId?: string) {
        return this.repository.checkLogin(userLogin, userId);
    }

    findAll(limit: number, loginSubstring?: string) {
        let currentUsers = this.repository.findAll();
        if (loginSubstring) {
            currentUsers = currentUsers.filter((user) =>
                user.login.includes(loginSubstring),
            );
        }
        return currentUsers
            .slice(0, limit)
            .sort((a, b) => a.login.localeCompare(b.login));
    }

    findOne(id: string) {
        return this.repository.findById(id);
    }

    update(id: string, updateUserDto: UpdateUserDto) {
        return this.repository.update(id, updateUserDto);
    }

    remove(id: string) {
        return this.repository.remove(id);
    }
}
