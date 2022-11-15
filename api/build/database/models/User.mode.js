"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const Account_model_1 = __importDefault(require("./Account.model"));
class User extends sequelize_1.Model {
}
User.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.INTEGER,
    },
    username: {
        type: sequelize_1.STRING,
        unique: true,
    },
    password: {
        type: sequelize_1.STRING,
    },
    accountId: {
        allowNull: false,
        type: sequelize_1.INTEGER,
        field: 'account_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: 'accounts',
            key: 'id',
        },
    },
}, {
    sequelize: _1.default,
    modelName: 'users',
    underscored: true,
    timestamps: false,
    indexes: [{ unique: true, fields: ['username'] }],
});
User.hasOne(Account_model_1.default, { foreignKey: 'id' });
exports.default = User;
//# sourceMappingURL=User.mode.js.map