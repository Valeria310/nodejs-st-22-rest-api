import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { User } from 'src/user/interfaces/user.interface';
import { v4 } from 'uuid';

@Injectable()
export class UserService {
    users: User[] = [];

    getUsers(loginSubstring?: string, limit?: number) {
        // let currentUsers = [...this.users];
        if (loginSubstring) {
            this.users = this.users.filter((user) =>
                user.login.includes(loginSubstring),
            );
        }
        if (limit) {
            return this.users
                .filter((user) => !user.isDeleted)
                .slice(0, limit)
                .sort((a, b) => a.login.localeCompare(b.login));
        } else {
            return this.users.filter((user) => !user.isDeleted);
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

    updateUser(id: string, updateUserDto: UpdateUserDto) {
        const user = this.getUserById(id);
        if (!user) return null;
        for (const key of Object.keys(updateUserDto)) {
            user[key] = updateUserDto[key];
        }
        return user;
    }

    deleteUser(id: string) {
        const user = this.getUserById(id);
        if (!user) return null;
        user.isDeleted = true;
        return user;
    }
}
