import express from "express";
import { verifyCookieForEnsureAuth } from "../middlewares/jwt.verify.js";
import { createMiddleware, updateMiddleware } from "../middlewares/expense.middleware.js";
import { allExpenseController, createExpenseController, deleteExpenseController, filterYourExpenseInAscendingOrderByAmount, filterYourExpenseInAscendingOrderByCategory, filterYourExpenseInAscendingOrderByTitle, filterYourExpenseInDescendingOrderByAmount, searchYourExpenseController, updateExpenseController } from "../controllers/expense.controller.js";

const expenseRouter = express.Router();

expenseRouter.route("/create").post(verifyCookieForEnsureAuth, createMiddleware, createExpenseController);
expenseRouter.route("/fetch-all").get(verifyCookieForEnsureAuth, allExpenseController);
expenseRouter.route("/update/:id").put(verifyCookieForEnsureAuth, updateMiddleware, updateExpenseController);
expenseRouter.route("/delete/:id").delete(verifyCookieForEnsureAuth, deleteExpenseController);
expenseRouter.route("/search").get(verifyCookieForEnsureAuth, searchYourExpenseController);
expenseRouter.route("/filter/title").get(verifyCookieForEnsureAuth, filterYourExpenseInAscendingOrderByTitle);
expenseRouter.route("/filter/category").get(verifyCookieForEnsureAuth, filterYourExpenseInAscendingOrderByCategory);
expenseRouter.route("/filter/amount/asc").get(verifyCookieForEnsureAuth, filterYourExpenseInAscendingOrderByAmount);
expenseRouter.route("/filter/amount/dsc").get(verifyCookieForEnsureAuth, filterYourExpenseInDescendingOrderByAmount);
export default expenseRouter;