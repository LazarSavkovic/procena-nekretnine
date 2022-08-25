const Joi = require("joi");

module.exports.aptSchema = Joi.object({
    apt: Joi.object({
        title: Joi.string().required(),
        short_description: Joi.string().required(),
        price: Joi.number().required().min(0),
        sq_mt: Joi.number().required().min(0),
        rooms: Joi.number().required().min(0),
        long: Joi.number().required().min(0),
        lat: Joi.number().required().min(0)
    }).required()
})
