import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { InMemoryRepository } from './repository/in-memory-users.repository';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { PostgreSQLRepository } from './repository/postgreSQL-users.repository';

@Module({
    imports: [SequelizeModule.forFeature([User])],
    controllers: [UsersController],
    providers: [
        UsersService,
        InMemoryRepository,
        PostgreSQLRepository,
        { provide: getModelToken(User), useValue: User },
    ],
})
export class UsersModule {}
