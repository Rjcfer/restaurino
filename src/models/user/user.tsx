import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare password: string;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare admin: boolean;
  declare hash: CreationOptional<string>;
  declare resetPasswordToken: CreationOptional<string>;
  declare resetPasswordExpires: CreationOptional<Date>;
  declare verifyToken: CreationOptional<string>;
  declare verifyExpires: CreationOptional<Date>;
}

export function initUser(sequelize: Sequelize) {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      resetPasswordToken: {
        type: DataTypes.STRING,
      },
      resetPasswordExpires: {
        type: DataTypes.DATE,
      },
      verifyToken: {
        type: DataTypes.STRING,
      },
      verifyExpires: {
        type: DataTypes.DATE,
      },
      hash: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",
    },
  );
}
