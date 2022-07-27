import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { InMemoryRepository } from './repository/in-memory-users.repository';

@Module({
    imports: [],
    controllers: [UsersController],
    providers: [UsersService, InMemoryRepository],
})
export class UsersModule {}
