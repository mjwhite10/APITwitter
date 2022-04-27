const { getTweetById, deleteTweetById } = require('../../db/tweets');
const { generateError } = require('../../helpers');

const deleteTweet = async (req, res, next) => {
  try {
    //Recogemos el id del tweet
    const { id } = req.params;
    //Conseguimos la info del tweet que queremos borrar
    const tweet = await getTweetById(id);

    //Revisamos que el usuario que hace la petición de borrado es el mismo que creó el tweet
    if (req.userId !== tweet.user_id) {
      throw generateError('No estas autorizado para borrar ese tweet', 401);
    }
    //Borramos tweet
    await deleteTweetById(id);
    res.send({
      status: 'Ok',
      message: 'El tweet se ha borrado',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteTweet };
