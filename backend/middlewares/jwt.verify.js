import jwt from "jsonwebtoken";
import authModel from "../models/auth.model.js";


export const verifyCookieForEnsureAuth = async (req, res, next) => {
    try {
        // take a cookies from req.cookies
        const token = req.cookies.jwt;

        // If token is not available 
        if (!token) {
            return res.status(403).json({ success: false, message: "Unauthorized - No Token Provided" });
        };

        // decode the cookie
        const decode = jwt.verify(token, process.env.JWT_TOKEN);

        // if cookie is not decode than
        if (!decode) {
            return res.status(401).json({ success: false, message: "Jwt - Authorization failed" });
        };

        // take all the information of verify user except from password field
        const user = await authModel.findById(decode.userId).select("-password");

        // If user is not available 
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        };

        // assign the value to that user
        req.user = user;

        // calling a next function 
        next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server error",
            error: error.message
        });
    };
};
