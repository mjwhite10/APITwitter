const { generateError, validateUser } = require('../../helpers');
const { getUserByEmail } = require('../../db/users');

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const validation = validateUser(req.body);

    if (validation.error) {
      //Bad request
      throw generateError(validation.error.message, 400);
    }

    //Recojemos los datos del user con el email
    const user = await getUserByEmail(email);
    //Compruebo que las password sean iguales

    //Creo el payload del token

    //Firmo el token

    //Envio el token

    res.send({
      status: 'error',
      message: 'Not implemented',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { loginUser };
