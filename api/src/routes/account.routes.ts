import { Router } from "express";
import AccountController from "../controllers/account.controller";

const accountRouter = Router()

const accountController = new AccountController()

accountRouter
  .route('/')
  .get((req, res) => accountController.getBalanceById(req, res))

export default accountRouter
