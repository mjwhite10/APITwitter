const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateError } = require('../../helpers');
const { getUserByEmail } = require('../../db/users');
const { newUserSchema } = require('../../validators/userValidators');
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //Validamos el body
    await newUserSchema.validateAsync(req.body);

    //Recojemos los datos del user con el email
    const user = await getUserByEmail(email);

    //Compruebo que las password sean iguales
    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) {
      throw generateError('La contraseña no coincide', 401);
    }
    //Creo el payload del token
    const payload = { id: user.id };

    //Firmo el token
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '30d' });

    //Envio el token
    res.send({
      status: 'ok',
      data: token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { loginUser };
