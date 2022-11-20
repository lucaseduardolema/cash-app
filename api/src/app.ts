import "express-async-errors";
import express from "express";
import handleError from "./middlewares/handleError";
import authRouter from "./routes/auth.routes";
import accountRouter from "./routes/account.routes";
import transactionRouter from "./routes/transaction.routes";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "./swagger.json";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/account", accountRouter);
app.use("/transaction", transactionRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(handleError);

export default app;
