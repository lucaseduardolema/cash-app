import { Model, INTEGER, DECIMAL, DATE } from 'sequelize';
import db from '.';

class Transactions extends Model {
  declare id: number;

  declare debitedAccountId: number;

  declare creditedAccoundId: number;

  declare value: number;

  declare createdAt: Date;

  declare updatedAt: Date;
}

Transactions.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  debitedAccountId: {
    allowNull: false,
    type: INTEGER,
    field: 'debited_account_id',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: 'accounts',
      key: 'id',
    },
  },
  creditedAccoundId: {
    allowNull: false,
    type: INTEGER,
    field: 'credited_account_id',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: 'accounts',
      key: 'id',
    },
  },
  value: {
    type: DECIMAL,
  },
  createdAt: {
    allowNull: false,
    type: DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DATE,
  },
}, {
  sequelize: db,
  modelName: 'transactions',
  timestamps: true,
  underscored: true,
});

export default Transactions;
