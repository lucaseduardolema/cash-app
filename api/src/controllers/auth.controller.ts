import { Request, Response } from "express";
import AuthService from "../services/auth.service";
import IUser from "../interfaces/newUser.interface";
import UserService from "../services/user.service";
import HttpError from "../utils/httpError";
import { userSchema } from "./schemas/user.schema";

export default class AuthController {
  private userService = new UserService();
  private authService = new AuthService();

  async signup(req: Request, res: Response) {
    const user = req.body as IUser;

    const { error } = userSchema.validate(user);
    if (error) throw new HttpError(400, error.message);

    const userExist = await this.userService.getUserByUsername(user.username);
    if (userExist) throw new HttpError(409, "Usuário já cadastrado");

    const token = await this.authService.signup(user);

    res.status(201).json({ token });
  }

  async signin(req: Request, res: Response) {
    const user = req.body as IUser;

    const { error } = userSchema.validate(user);
    if (error) throw new HttpError(400, error.message);

    const token = await this.authService.signin(user);

    res.status(200).json({ token });
  }
}
