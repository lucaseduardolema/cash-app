import { Model, INTEGER, DECIMAL, DATE, literal } from 'sequelize';
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
    field: 'created_at',
    type: DATE,
    defaultValue: literal('CURRENT_TIMESTAMP')
  },
  updatedAt: {
    allowNull: false,
    field: 'updated_at',
    type: DATE,
    defaultValue: literal('CURRENT_TIMESTAMP')
  }
}, {
  sequelize: db,
  modelName: 'transactions',
  timestamps: true,
  underscored: true,
});

export default Transactions;
