import {
    IsString,
    IsDefined,
    IsNotEmpty,
    Matches,
    IsNumber,
    Min,
    Max,
} from 'class-validator';
const plugLogin = 'a';
const plugPassword = 'Qw2';
const plugAge = 5;
export class UpdateUserDto {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly login: string = plugLogin;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @Matches(/(?=.*[0-9])(?=.*[a-z]|[A-Z])/i, {
        message: 'password must contain letters and numbers',
    })
    readonly password: string = plugPassword;

    @IsNotEmpty()
    @IsNumber()
    @Max(130)
    @Min(4)
    readonly age: number = plugAge;
}
