import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { InMemoryRepository } from './users/repository/in-memory-users.repository';
import { PostgreSQLRepository } from './users/repository/postgreSQL-users.repository';
import { UsersController } from './users/users.controller';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

@Module({
    imports: [
        UsersModule,
        ConfigModule.forRoot({ envFilePath: '.env' }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.HOST,
            port: Number(process.env.PORT),
            username: process.env.NAME,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            models: [User],
            autoLoadModels: true,
        }),
    ],
    controllers: [UsersController],
    providers: [
        UsersService,
        InMemoryRepository,
        PostgreSQLRepository,
        { provide: getModelToken(User), useValue: User },
    ],
})
export class AppModule {}
