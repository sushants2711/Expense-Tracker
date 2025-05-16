import joi from "joi";

// create middleware
export const createMiddleware = async (req, res, next) => {
    try {
        const schema = joi.object({
            title: joi.string().min(3).max(100).required(),
            category: joi.string().min(3).max(100).required(),
            amount: joi.number().min(-10000000).max(10000000).invalid(0).required()
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: "validation failed || incorrect data",
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
            title: joi.string().min(3).max(100),
            category: joi.string().min(3).max(100),
            amount: joi.number().min(-10000000).max(10000000).invalid(0)
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: "At least update one field",
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

