import { DECIMAL, INTEGER, Model } from 'sequelize';
import db from '.';
import Transactions from './Transactions.model';

class Account extends Model {
  declare id: number;

  declare balance: number;
}

Account.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  balance: {
    type: DECIMAL,
  },
}, {
  sequelize: db,
  modelName: 'accounts',
  timestamps: false,  
});

Account.hasMany(Transactions, { as: 'transactions' });
Transactions.belongsTo(Account, {
  foreignKey: 'debitedAccountId',
  as: 'debitedAccount',
});
Transactions.belongsTo(Account, {
  foreignKey: 'creditedAccoundId',
  as: 'creditedAccound',
});

export default Account;
