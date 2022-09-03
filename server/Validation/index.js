const Joi = require('joi');

class Validation {
  static signupValidation = (req) => {
    const schema = Joi.object({
      username: Joi.string().required().min(3),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    return schema.validateAsync(req.body);
  };
}

module.exports = Validation;
