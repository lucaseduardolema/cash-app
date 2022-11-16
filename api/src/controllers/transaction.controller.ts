import { Request, Response } from "express";
import HttpError from "../utils/httpError";
import TransactionService from "../services/transaction.service";
import { transactionSchema } from "./schemas/transaction.schema";
import { decodeToken } from "../utils/jwt";
import IUser from "../interfaces/newUser.interface";
import ITransfer from "../interfaces/transfer.interface";

export default class TransactionController {
  private transactionService = new TransactionService();

  async transferByUsername(req: Request, res: Response) {
    const info = req.body;
    const token = req.get("authorization") as string;
    if (!token) throw new HttpError(404, "Token nessário");

    const { error } = transactionSchema.validate(info);
    if (error) throw new HttpError(404, error.message);
    
    const user: IUser = decodeToken(token);
    if (info.username === user.username) {
      throw new HttpError(404, "Não é possível transferir para sí mesmo");
    }

    const data: ITransfer = {
      fromUsername: user.username,
      fromAccountId: user.accountId as number,
      valueToDebit: info.value,
      toUsername: info.username,
    };

    const message = await this.transactionService.transferByUsername(data);

    res.status(200).json(message);
  }
}
