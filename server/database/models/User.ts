import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../db';

interface UserAttributes { 
    id: string;
    username: string;
    password: string;
    email: string;
}

interface  UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: string;
    public username!: string;
    public password!: string;
    public email!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
    },
    {
        sequelize,
        modelName: 'User',
    }
);

export default User;
