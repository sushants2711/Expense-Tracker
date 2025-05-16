import jwt from "jsonwebtoken";

// create a cookies for user verification 
export const setCookies = async (userId, res) => {
    try {
        const token = jwt.sign(
            { userId },
            process.env.JWT_TOKEN,
            { expiresIn: "30d" }
        );

        // send a cookie in a response and the cookie name in jwt
        res.cookie("jwt", token, {
            maxAge: 30 * 24 * 60 * 60 * 1000,      // 30 days in millisecond
            httpOnly: true,           // prevent from XSS attacks cross-site scripting attacks
            sameSite: "strict",    // CSRF attacks cross-site request forgery attacks
            secure: process.env.NODE_ENV !== "development"
        });

        return token;
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    };
};