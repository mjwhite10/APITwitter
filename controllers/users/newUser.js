const { generateError, validateUser } = require('../../helpers');
const { createUserInDB } = require('../../db/users');

const newUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const validation = validateUser(req.body);

    if (validation.error) {
      //Bad request
      throw generateError(validation.error.message, 400);
    }

    const id = await createUserInDB(email, password);
    console.log(id);
    res.send({
      status: 'ok',
      message: `User created with id ${id}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { newUser };
