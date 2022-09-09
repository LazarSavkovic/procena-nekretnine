const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension)

module.exports.aptSchema = Joi.object({
    apt: Joi.object({
        title: Joi.string().required().escapeHTML(),
        short_description: Joi.string().required().escapeHTML(),
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
        title: Joi.string().required().escapeHTML(),
        short_description: Joi.string().escapeHTML(),
        location: Joi.string().required().escapeHTML(),
        floor: Joi.number().min(0),
        sq_mt: Joi.number().required().min(0),
        rooms: Joi.number().required().min(0)
    }).required()
})
