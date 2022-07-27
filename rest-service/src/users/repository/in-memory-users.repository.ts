import { Injectable } from '@nestjs/common';
import { Repository } from 'src/interfaces/repository.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { v4 } from 'uuid';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
class InMemoryRepository implements Repository {
    private users: User[] = [];

    create(createUserDto: CreateUserDto) {
        const newUser = { id: v4(), ...createUserDto, isDeleted: false };
        this.users.push(newUser);
        return newUser;
    }

    checkLogin(userLogin: string, userId?: string) {
        if (
            this.users.find((user) => {
                return user.login === userLogin && user.id !== userId;
            })
        ) {
            return true;
        }
        return false;
    }

    findAll() {
        return this.users.filter((user) => !user.isDeleted);
    }

    findById(id: string) {
        return this.users.find((user) => user.id === id);
    }

    update(id: string, updateUserDto: UpdateUserDto) {
        const user = this.findById(id);
        if (!user) return null;
        for (const key of Object.keys(updateUserDto)) {
            user[key] = updateUserDto[key];
        }
        return user;
    }

    remove(id: string) {
        const user = this.findById(id);
        if (!user) return null;
        user.isDeleted = true;
        return user;
    }
}

export { InMemoryRepository };
