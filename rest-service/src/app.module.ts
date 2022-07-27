import { Module } from '@nestjs/common';
import { InMemoryRepository } from './users/repository/in-memory-users.repository';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

@Module({
    imports: [UsersModule],
    controllers: [UsersController],
    providers: [UsersService, InMemoryRepository],
})
export class AppModule {}
