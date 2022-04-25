const { generateError, validateId } = require('../../helpers');
const { getUserById } = require('../../db/users');

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const validation = validateId(req.params);

    if (validation.error) {
      //Bad request
      throw generateError(validation.error.message, 400);
    }

    const user = await getUserById(id);
    res.send({
      status: 'Ok',
      message: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUser };
