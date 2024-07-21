import Joi from "joi";

const updateWebsiteProductsSchema = Joi.object({
    body: Joi.object({
        webSiteName: Joi.string().required(),
    }),
});

export default {
    updateWebsiteProductsSchema,
};
