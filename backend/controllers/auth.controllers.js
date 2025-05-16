import bcrypt from "bcryptjs";
import authModel from "../models/auth.model.js";
import { setCookies } from "../middlewares/jwt.cookies.js";


// signup controller logic
export const signupController = async (req, res) => {
    try {
        // take all the request from the body
        const { name, email, password, confirmPassword } = req.body;

        // Regex to allow only letters and spaces
        const nameRegex = /^[A-Za-z\s]+$/;

        if (!nameRegex.test(name)) {
            return res.status(400).json({ error: "Name must contain only letters and spaces." });
        }

        // check both of the password is equal or not
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password not match"
            });
        };

        // check user is exist or not
        const userExist = await authModel.findOne({ email });

        // If user is already exist
        if (userExist) {
            return res.status(400).json({
                success: false,
                message: "User is already exist"
            });
        };

        // hashing the password
        const salt_round = 10;
        const hash_password = await bcrypt.hash(password, salt_round);

        // create a new user in our database
        const data = new authModel({
            name,
            email,
            password: hash_password
        });

        // save the data in our database 
        await data.save();

        // send a cookies
        setCookies(data._id, res);

        // return a response to the user created successfully
        return res.status(201).json({
            success: true,
            message: "user created successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    };
};

export const loginController = async (req, res) => {
    try {
        // take all the request from body
        const { email, password } = req.body;

        // check user is exist or not 
        const userExist = await authModel.findOne({ email });

        // if user not exist then
        if (!userExist) {
            return res.status(400).json({
                success: false,
                message: "Unauthorized - user can't exist "
            });
        };

        // compare the password
        const compare_password = await bcrypt.compare(password, userExist.password);

        if (!compare_password) {
            return res.status(400).json({
                success: false,
                message: "Wrong password"
            });
        };

        // send a cookies
        setCookies(userExist._id, res);

        // return a response
        return res.status(200).json({
            success: true,
            message: "user logged in successfully",
            name: userExist.name,
            email: userExist.email
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    };
};

export const logoutController = async (req, res) => {
    try {
        // clear the cookie
        res.cookie("jwt", "", { maxAge: 0 });
        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server error",
            error: error.message
        });
    };
}

export const deleteController = async (req, res) => {
    try {
        // take all the request from the body
        const { name, email, password } = req.body;

        // create a regex for a name 
        const nameRegex = /^[A-Za-z\s]+$/;

        // check the regex is right or not
        if (!nameRegex.test(name)) {
            return res.status(400).json({ error: "Name must contain only letters and spaces." });
        }

        // logged in user
        const loggedInUser = req.user._id;

        // if loggedIn user not find
        if (!loggedInUser) {
            return res.status(403).json({
                success: false,
                message: "User is not authenticated"
            });
        };

        // check userExist or not in a database
        const userExist = await authModel.findOne({ email });

        if (!userExist) {
            return res.status(400).json({
                success: false,
                message: "User is not exist"
            });
        };

        // If user is exist than compare their Id to logged In user Id
        if (userExist._id.toString() !== loggedInUser.toString()) {
            return res.status(403).json({
                success: false,
                message: "You should only delete their own account"
            });
        };

        // Check the password with the help of bcryptjs
        const compare_password = await bcrypt.compare(password, userExist.password);

        // If name , email, password must be equal to user that exist in our database
        if (name !== userExist.name || email !== userExist.email || !compare_password) {
            return res.status(400).json({
                success: false,
                message: "All field are not matching"
            });
        }

        // delete the user from a database
        await authModel.findByIdAndDelete(loggedInUser);

        // clear the cookie
        res.clearCookie("jwt");

        // return the success message
        return res.status(200).json({
            success: true,
            message: "User account delete successfull"
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