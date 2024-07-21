import "dotenv/config";
import joi from "joi";

const environments = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    CORS_ORIGINS: process.env.CORS_ORIGINS,
    MONGODB_URI: process.env.MONGODB_URI,
    DB_NAME: process.env.DB_NAME,
};


const envSchema = joi.object({
    NODE_ENV: joi.string().valid("dev", "production", "test").required(),
    PORT: joi.number().required(),
    CORS_ORIGINS: joi.string().required(),
    MONGODB_URI: joi.string().required(),
    DB_NAME: joi.string().required(),
});

const { error } = envSchema.validate(environments);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export default environments;