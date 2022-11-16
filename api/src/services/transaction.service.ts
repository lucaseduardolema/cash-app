import ITransfer from "../interfaces/transfer.interface";
import db from "../database/models";
import Account from "../database/models/Account.model";
import HttpError from "../utils/httpError";
import UserService from "./user.service";
import Transactions from "../database/models/Transactions.model";

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
        fromAccount?.dataValues.balance - data.valueToDebit;
      const toNewBalance = toAccount?.dataValues.balance + data.valueToDebit;
      await Account.update(
        { balance: fromNewBalance },
        { where: { id: fromAccount?.dataValues.id }, transaction: t }
      );

      await Account.update(
        { balance: toNewBalance },
        { where: { id: toAccount?.dataValues.id }, transaction: t }
      );

      // await db.query("INSERT INTO transactions")

      await Transactions.create(
        {
          debitedAccountId: fromAccount?.dataValues.id,
          creditedAccoundId: toAccount?.dataValues.id,
          value: data.valueToDebit,
        },
        { transaction: t }
      );

      await t.commit();
      return { message: "Transferencia realizada "}
    } catch (error: any) {
      await t.rollback();
      throw new HttpError(404, error)
    }
  }
}