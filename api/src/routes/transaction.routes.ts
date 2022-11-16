import { Router } from "express";
import TransactionController from "../controllers/transaction.controller";

const transactionRouter = Router();

const transactionController = new TransactionController();

transactionRouter
  .route("/")
  .post((req, res) => transactionController.transferByUsername(req, res));

export default transactionRouter;
