"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
class Transactions extends sequelize_1.Model {
}
Transactions.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.INTEGER,
    },
    debitedAccountId: {
        allowNull: false,
        type: sequelize_1.INTEGER,
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
        type: sequelize_1.INTEGER,
        field: 'credited_account_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: 'accounts',
            key: 'id',
        },
    },
    value: {
        type: sequelize_1.DECIMAL,
    },
    createdAt: {
        allowNull: false,
        type: sequelize_1.DATE,
    },
    updatedAt: {
        allowNull: false,
        type: sequelize_1.DATE,
    },
}, {
    sequelize: _1.default,
    modelName: 'transactions',
    timestamps: true,
    underscored: true,
});
exports.default = Transactions;
//# sourceMappingURL=Transactions.model.js.map