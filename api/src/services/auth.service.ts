import { generateHash } from "../utils/hash";
import User from "../database/models/User.mode";
import INewUser from "../interfaces/newUser.interface";
import AccountService from "./account.service";
import { createToken } from "../utils/jwt";

export default class AuthService {
  private accountService = new AccountService()

  async signup(newUser: INewUser) {
    const newId = await this.accountService.createAccount()
    
    const hash = generateHash(newUser.password)

    const data = {
      username: newUser.username,
      password: hash,
      accountId: newId
    }

    const user = await User.create(data)

    const { password: _, ...rest } = user.dataValues

    return createToken(rest)
  }
}