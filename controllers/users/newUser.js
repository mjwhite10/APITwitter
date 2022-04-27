const { createUserInDB } = require('../../db/users');
const { newUserSchema } = require('../../validators/userValidators');
const newUser = async (req, res, next) => {
  try {
    await newUserSchema.validateAsync(req.body);

    const { email, password } = req.body;

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
