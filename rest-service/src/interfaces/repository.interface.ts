import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

interface Repository {
    create(createUserDto: CreateUserDto);
    findAll();
    findById(id: string);
    update(id: string, updateUserDto: UpdateUserDto);
    remove(id: string);
}

export { Repository };
