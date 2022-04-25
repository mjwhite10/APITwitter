const Joi = require('@hapi/joi');

const generateError = (message, status) => {
  const error = new Error(message);
  error.httpStatus = status;
  return error;
};

const validateUser = (params) => {
  return Joi.object()
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(4).max(20).required(),
    })
    .validate(params);
};

const validateId = (params) => {
  return Joi.object()
    .keys({
      id: Joi.number().positive().required(),
    })
    .validate(params);
};

module.exports = { generateError, validateUser, validateId };
