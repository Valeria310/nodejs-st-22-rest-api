import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { User } from 'src/user/interfaces/user.interface';
import { v4 } from 'uuid';

@Injectable()
export class UserService {
    users: User[] = [];

    getUsers(loginSubstring?: string, limit?: number) {
        let currentUsers = [...this.users];
        if (loginSubstring) {
            currentUsers = currentUsers.filter(
                (user) => user.login.indexOf(loginSubstring) !== -1,
            );
        }
        if (limit) {
            return currentUsers
                .filter((user) => !user.isDeleted)
                .slice(0, limit - 1)
                .sort((a, b) => a.login.localeCompare(b.login));
        } else {
            return currentUsers.filter((user) => !user.isDeleted);
        }
    }

    getUserById(id: string) {
        return this.users.find((user) => user.id === id);
    }

    createUser(createUserDto: CreateUserDto) {
        const newUser = { id: v4(), ...createUserDto, isDeleted: false };
        this.users.push(newUser);
        return newUser;
    }

    updateUser(id: string, updateUserDto: UpdateUserDto) {
        const user = this.getUserById(id);
        const newUser = { ...user, ...updateUserDto };
        const userIndex = this.users.indexOf(user);
        this.users[userIndex] = newUser;
        return newUser;
    }

    deleteUser(id: string) {
        const user = this.getUserById(id);
        user.isDeleted = true;
        return user;
    }
}
