import ITransfer from "../interfaces/transfer.interface";
import db from "../database/models";
import Account from "../database/models/Account.model";
import HttpError from "../utils/httpError";
import UserService from "./user.service";
import Transactions from "../database/models/Transactions.model";
import { Op } from "sequelize";

export default class TransactionService {
  private userService = new UserService();

  async transferByUsername(data: ITransfer) {
    const t = await db.transaction();

    const fromAccount = await Account.findOne({
      where: { id: data.fromAccountId },
    });
    if (data.valueToDebit > fromAccount?.dataValues.balance) {
      throw new HttpError(403, "Saldo insuficiente");
    }
    const toUser = await this.userService.getUserByUsername(data.toUsername);
    const toAccount = await Account.findOne({
      where: { id: toUser?.dataValues.accountId },
    });

    try {
      const fromNewBalance =
        Number(fromAccount?.dataValues.balance) - Number(data.valueToDebit);
      const toNewBalance =
        Number(toAccount?.dataValues.balance) + Number(data.valueToDebit);
      await Account.update(
        { balance: fromNewBalance },
        { where: { id: fromAccount?.dataValues.id }, transaction: t }
      );

      await Account.update(
        { balance: toNewBalance },
        { where: { id: toAccount?.dataValues.id }, transaction: t }
      );

      await Transactions.create(
        {
          debitedAccountId: fromAccount?.dataValues.id,
          creditedAccoundId: toAccount?.dataValues.id,
          value: data.valueToDebit,
        },
        { transaction: t }
      );

      await t.commit();
      return { message: "Transferencia realizada" };
    } catch (error: any) {
      await t.rollback();
      throw new HttpError(404, error);
    }
  }

  async getAllUserTransactions(accountId: number) {
    const transactions = await Transactions.findAll({
      where: {
        [Op.or]: [
          { debitedAccountId: accountId },
          { creditedAccoundId: accountId },
        ],
      },
    });
    return transactions;
  }
}
