const Joi = require('@hapi/joi');
const { generateError } = require('../helpers');

const newTweetSchema = Joi.object().keys({
  text: Joi.string()
    .max(280)
    .required()
    .error(
      generateError(
        'El campo texto debería existir y su tamño no debe exceder los 280 caracteres',
        400
      )
    ),
});
module.exports = { newTweetSchema };
