import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

interface UserAttributes {
  userId?: number;
  name: string;
  email: string;
  phone: string;
  address?: string;
  password: string;
  role: 'Admin' | 'Chit Creator' | 'Participant';
}

class User extends Model<UserAttributes> implements UserAttributes {
  public userId!: number;
  public name!: string;
  public email!: string;
  public phone!: string;
  public address!: string;
  public password!: string;
  public role!: 'Admin' | 'Chit Creator' | 'Participant';
}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('Admin', 'Chit Creator', 'Participant'),
      defaultValue: 'Participant',
    },
  },
  {
    sequelize,
    tableName: 'users',
  }
);


// const User = sequelize.define('User', {
//   userId: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING,
//     unique: true,
//     allowNull: false,
//   },
//   phone: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   address: {
//     type: DataTypes.STRING,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   role: {
//     type: DataTypes.ENUM('Admin', 'Chit Creator', 'Participant'),
//     defaultValue: 'Participant',
//   },
// });
export default User;
