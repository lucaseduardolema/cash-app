"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const Transactions_model_1 = __importDefault(require("./Transactions.model"));
class Account extends sequelize_1.Model {
}
Account.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.INTEGER,
    },
    balance: {
        type: sequelize_1.DECIMAL,
    },
}, {
    sequelize: _1.default,
    modelName: 'accounts',
    timestamps: false,
});
Account.hasMany(Transactions_model_1.default, { as: 'transactions' });
Transactions_model_1.default.belongsTo(Account, {
    foreignKey: 'debitedAccountId',
    as: 'debitedAccount',
});
Transactions_model_1.default.belongsTo(Account, {
    foreignKey: 'creditedAccoundId',
    as: 'creditedAccound',
});
exports.default = Account;
//# sourceMappingURL=Account.model.js.map