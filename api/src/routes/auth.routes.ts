import { Router } from "express";
import AuthController from "../controllers/auth.controller";

const authRouter = Router();

const authController = new AuthController();

authRouter
  .route("/signup")
  .post((req, res) => authController.signup(req, res));

export default authRouter;
