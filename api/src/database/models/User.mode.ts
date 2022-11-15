import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';
import Account from './Account.model';

class User extends Model {
  declare id: number;

  declare username: string;

  declare password: string;

  declare accountId: number;
}

User.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  username: {
    type: STRING,
    unique: true,
  },
  password: {
    type: STRING,
  },
  accountId: {
    allowNull: false,
    type: INTEGER,
    field: 'account_id',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: 'accounts',
      key: 'id',
    },
  },
}, {
  sequelize: db,
  modelName: 'users',
  underscored: true,
  timestamps: false,
  indexes: [{ unique: true, fields: ['username'] }],
});

User.hasOne(Account, { foreignKey: 'id' });

export default User;
