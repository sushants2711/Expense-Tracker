import expenseModel from "../models/expense.model.js";
import mongoose from "mongoose";

export const createExpenseController = async (req, res) => {
    try {
        const { title, amount, category } = req.body;

        const loggedInUser = req.user._id;

        if (!loggedInUser) {
            return res.status(400).json({
                success: false,
                message: "Unauthorized- user"
            });
        };


        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID format",
            });
        }


        const newExpense = new expenseModel({
            title,
            amount,
            category,
            user: loggedInUser
        });

        const saveExpense = await newExpense.save();

        return res.status(201).json({
            success: true,
            message: "Expense added",
            data: saveExpense
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    };
};

export const allExpenseController = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        if (!loggedInUser) {
            return res.status(400).json({
                success: false,
                message: "Unauthorized - user"
            });
        };


        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID format",
            });
        }


        const expenseExist = await expenseModel.find({ user: loggedInUser });

        if (!expenseExist) {
            return res.status(400).json({
                success: false,
                message: "No expense exist"
            });
        };

        let totalReceived = 0;
        let totalSpent = 0;

        expenseExist.forEach((element) => {
            if (element.amount > 0) {
                totalReceived += element.amount
            } else if (element.amount < 0) {
                totalSpent += Math.abs(element.amount)
            };
        });

        const remainingAmount = totalReceived - totalSpent;

        return res.status(200).json({
            success: true,
            message: "Data fetch successfully",
            received: totalReceived,
            spent: totalSpent,
            remainingAmount: remainingAmount,
            data: expenseExist
        });

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    };
};

export const updateExpenseController = async (req, res) => {
    try {
        const { id } = req.params;

        const { title, amount, category } = req.body;

        if (!title && !amount && !category) {
            return res.status(400).json({
                success: false,
                message: "At least update one field is required"
            });
        };

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Id is missing"
            });
        };


        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID format",
            });
        }


        const loggedInUser = req.user._id;

        if (!loggedInUser) {
            return res.status(400).json({
                success: false,
                message: "Unauthorized - user"
            });
        };


        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID format",
            });
        }


        const expenseExist = await expenseModel.findById(id);

        if (!expenseExist) {
            return res.status(200).json({
                success: false,
                message: "Expense not exist",
            });
        };

        if (expenseExist.user.toString() !== loggedInUser.toString()) {
            return res.status(403).json({
                success: false,
                message: "You should only update your own todo"
            });
        };

        const updateData = {
            title: title || expenseExist.title,
            amount: amount || expenseExist.amount,
            category: category || expenseExist.category
        };

        const updateExpense = await expenseModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        return res.status(201).json({
            success: true,
            message: "Successfully updated",
            data: updateExpense
        });

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    };
};

export const deleteExpenseController = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Id is missing"
            });
        };

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID format",
            });
        }

        const loggedInUser = req.user._id;

        if (!loggedInUser) {
            return res.status(403).json({
                success: false,
            });
        };

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID format",
            });
        }

        const expenseExist = await expenseModel.findById(id);

        if (!expenseExist) {
            return res.status(400).json({
                success: false,
                message: "Expense not exist"
            });
        };

        if (expenseExist.user.toString() !== loggedInUser.toString()) {
            return res.status(403).json({
                success: false,
                message: "You should only delete your own Expenses"
            });
        };

        await expenseModel.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Expense deleted successfully"
        });

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    };
};

export const searchYourExpenseController = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        if (!loggedInUser) {
            return res.status(400).json({
                success: false,
                message: "Unauthorized-user"
            });
        };

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID format",
            });
        }

        const { query } = req.query;

        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Wrong query"
            });
        };

        const expenses = await expenseModel.find({
            user: loggedInUser,
            $or: [
                { title: { $regex: query, $options: "i" } },
                { category: { $regex: query, $options: "i" } },
            ]
        });

        return res.status(200).json({
            success: true,
            message: "Search results",
            data: expenses,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    };
};

export const filterYourExpenseInAscendingOrderByTitle = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        if (!loggedInUser) {
            return res.status(400).json({
                success: false,
                message: "Unauthorized - user"
            });
        };

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID format",
            });
        }

        const filterItem = await expenseModel.find({ user: loggedInUser });

        if (!filterItem) {
            return res.status(400).json({
                success: false,
                message: "Not find any data"
            });
        };

        if (filterItem.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No item available"
            });
        };

        const data = filterItem.sort((a, b) => a.title.localeCompare(b.title));

        return res.status(200).json({
            success: true,
            message: "data fetch ",
            data: data
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    };
};

export const filterYourExpenseInAscendingOrderByCategory = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        if (!loggedInUser) {
            return res.status(400).json({
                success: false,
                message: "Unauthorized - user"
            });
        };

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID format",
            });
        }

        const filterItem = await expenseModel.find({ user: loggedInUser });

        if (!filterItem) {
            return res.status(400).json({
                success: false,
                message: "Not find any datar"
            });
        };

        if (filterItem.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No item available"
            });
        };

        const data = filterItem.sort((a, b) => a.category.localeCompare(b.category));

        return res.status(200).json({
            success: true,
            message: "data fetch ",
            data: data
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    };
}

export const filterYourExpenseInAscendingOrderByAmount = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        if (!loggedInUser) {
            return res.status(400).json({
                success: false,
                message: "Unauthorized - user"
            });
        };

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID format",
            });
        }

        const filterItem = await expenseModel.find({ user: loggedInUser });

        if (!filterItem) {
            return res.status(400).json({
                success: false,
                message: "Not find any datar"
            });
        };

        if (filterItem.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No item available"
            });
        };

        const data = filterItem.sort((a, b) => a.amount - b.amount);

        return res.status(200).json({
            success: true,
            message: "data fetch ",
            data: data
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    };
}

export const filterYourExpenseInDescendingOrderByAmount = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        if (!loggedInUser) {
            return res.status(400).json({
                success: false,
                message: "Unauthorized - user"
            });
        };

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID format",
            });
        };

        const filterItem = await expenseModel.find({ user: loggedInUser });

        if (!filterItem) {
            return res.status(400).json({
                success: false,
                message: "Not find any datar"
            });
        };

        if (filterItem.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No item available"
            });
        };

        const data = filterItem.sort((a, b) => b.amount - a.amount);

        return res.status(200).json({
            success: true,
            message: "data fetch ",
            data: data
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    };
}