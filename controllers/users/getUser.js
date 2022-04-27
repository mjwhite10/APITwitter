const { getUserById } = require('../../db/users');
const { generateError } = require('../../helpers');

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id || id <= 0) {
      generateError('Es necesario pasar un id mayor que 0', 400);
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
