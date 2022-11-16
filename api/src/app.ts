import "express-async-errors";
import express from "express";
import handleError from "./middlewares/handleError";
import authRouter from "./routes/auth.routes";
import accountRouter from "./routes/account.routes";
import transactionRouter from "./routes/transaction.routes";

const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/account", accountRouter);
app.use("/transaction", transactionRouter);

app.use(handleError);

export default app;
