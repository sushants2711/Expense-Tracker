import joi from "joi";

// create middleware
export const createMiddleware = async (req, res, next) => {
    try {
        const schema = joi.object({
            title: joi.string().min(3).max(100).required().pattern(/[a-zA-Z]/),
            category: joi.string().min(3).max(100).required().pattern(/[a-zA-Z]/),
            amount: joi.number().min(-10000000).max(10000000).invalid(0).required()
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: "validation failed by middleware",
                error: error.details[0].message
            });
        };

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

// update middleware
export const updateMiddleware = async (req, res, next) => {
    try {
        const schema = joi.object({
            title: joi.string().min(3).max(100).optional().empty('').pattern(/[a-zA-Z]/),
            category: joi.string().min(3).max(100).optional().empty('').pattern(/[a-zA-Z]/),
            amount: joi.number().min(-10000000).max(10000000).invalid(0).optional().empty('')
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: "At least update one field is required || only numbers is not allowed",
                error: error.details[0].message
            });
        };

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

