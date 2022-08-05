import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Repository } from 'src/interfaces/repository.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../users.model';
import { v4 } from 'uuid';

@Injectable()
class PostgreSQLRepository implements Repository {
    constructor(@InjectModel(User) private userRepository: typeof User) {}

    async create(createUserDto: CreateUserDto) {
        const userModel = { id: v4(), ...createUserDto, isDeleted: false };
        const user = await this.userRepository.create(userModel);
        return user;
    }

    async checkLogin(userLogin: string, userId?: string) {
        const users = await this.findAll();
        if (
            users.find((user) => {
                return user.login === userLogin && user.id !== userId;
            })
        ) {
            return true;
        }
        return false;
    }

    async findAll() {
        const users = await this.userRepository.findAll({
            where: { isDeleted: false },
        });
        return users;
    }

    async findById(id: string) {
        const user = await this.userRepository.findByPk(id);
        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const user = this.findById(id);
        if (!user) return null;
        for (const key of Object.keys(updateUserDto)) {
            await this.userRepository.update(
                { [key]: updateUserDto[key] },
                { where: { id: id } },
            );
        }
        return this.findById(id);
    }

    async remove(id: string) {
        const user = this.findById(id);
        if (!user) return null;
        await this.userRepository.update(
            { isDeleted: true },
            { where: { id: id } },
        );
        return this.findById(id);
    }
}

export { PostgreSQLRepository };
