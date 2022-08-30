const Joi = require("joi");

module.exports.aptSchema = Joi.object({
    apt: Joi.object({
        title: Joi.string().required(),
        short_description: Joi.string().required(),
        price: Joi.number().required().min(0),
        floor: Joi.number().min(0),
        sq_mt: Joi.number().required().min(0),
        rooms: Joi.number().required().min(0),
        long: Joi.number().required().min(0).unsafe(),
        lat: Joi.number().required().min(0).unsafe()
    }).required()
})

module.exports.flatSchema = Joi.object({
    flat: Joi.object({
        title: Joi.string().required(),
        short_description: Joi.string(),
        floor: Joi.number().min(0),
        sq_mt: Joi.number().required().min(0),
        rooms: Joi.number().required().min(0),
        long: Joi.number().required().unsafe(),
        lat: Joi.number().required().unsafe()
    }).required()
})
