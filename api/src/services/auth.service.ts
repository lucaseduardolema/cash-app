import { compareHash, generateHash } from "../utils/hash";
import User from "../database/models/User.mode";
import IUser from "../interfaces/newUser.interface";
import AccountService from "./account.service";
import { createToken } from "../utils/jwt";
import UserService from "./user.service";
import HttpError from "../utils/httpError";

export default class AuthService {
  private accountService = new AccountService()
  private userService = new UserService()

  async signup(newUser: IUser) {
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

  async signin(userData: IUser) {
    const user = await this.userService.getUserByUsername(userData.username)

    const { password, ...rest } = user?.dataValues

    const isValidPass = compareHash(userData.password, password)

    if (!user || !isValidPass) throw new HttpError(400, "Password ou Username incorreto")

    return createToken(rest)
  }
}