import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UserCreateAttr {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreateAttr> {
    @Column({
        type: DataType.STRING,
        unique: true,
        primaryKey: true,
    })
        id: string;

    @Column({ type: DataType.STRING })
        login: string;

    @Column({ type: DataType.STRING })
        password: string;

    @Column({ type: DataType.INTEGER })
        age: number;

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
        isDeleted: boolean;
}
