import { Request, Response } from "express";
import { decodeToken } from "../utils/jwt";
import AccountService from "../services/account.service";
import IUser from "../interfaces/newUser.interface";
import HttpError from "../utils/httpError";

export default class AccountController {
  private accountService = new AccountService();

  async getBalanceById(req: Request, res: Response) {
    const token = req.get("authorization") as string;

    const user: IUser = decodeToken(token);

    const balance = await this.accountService.getBalanceById(user.accountId);
    if (!balance) throw new HttpError(500, "Internal error");

    res.status(200).json(balance);
  }
}
