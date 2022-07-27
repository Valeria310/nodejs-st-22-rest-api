import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
    IsString,
    IsDefined,
    IsNotEmpty,
    Matches,
    IsNumber,
    Min,
    Max,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly login: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @Matches(/(?=.*[0-9])(?=.*[a-z]|[A-Z])/i, {
        message: 'password must contain letters and numbers',
    })
    readonly password: string;

    @IsNotEmpty()
    @IsNumber()
    @Max(130)
    @Min(4)
    readonly age: number;
}
