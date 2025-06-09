import express from "express";
import { deleteMiddleware, loginMiddleware, signupMiddleware } from "../middlewares/auth.middleware.js";
import { deleteController, loginController, logoutController, signupController } from "../controllers/auth.controllers.js";
import { verifyCookieForEnsureAuth } from "../middlewares/jwt.verify.js";

const authRoute = express.Router();

authRoute.route("/signup").post(signupMiddleware, signupController);
authRoute.route("/login").post(loginMiddleware, loginController);
authRoute.route("/logout").post(verifyCookieForEnsureAuth, logoutController);
authRoute.route("/account/delete").delete(verifyCookieForEnsureAuth, deleteMiddleware, deleteController);

export default authRoute;