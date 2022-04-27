const Joi = require('@hapi/joi');
const { generateError } = require('../helpers');

const newUserSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required()
    .error(
      generateError('El campo email debe existir y ser un email válido', 400)
    ),
  password: Joi.string()
    .min(4)
    .required()
    .error(
      generateError(
        'El campo password debe existir y ser mayor de 8 caracteres',
        400
      )
    ),
});
module.exports = { newUserSchema };
