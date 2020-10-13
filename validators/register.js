const Joi = require('@hapi/joi')
const schema = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email({ minDomainSegments: 2 })
})
function validateRegister(data) {
    return schema.validate(data)
}
module.exports = validateRegister