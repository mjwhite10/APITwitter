const { getTweetById } = require('../../db/tweets');

const getTweet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tweet = await getTweetById(id);
    res.send({
      status: 'Ok',
      message: tweet,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTweet };
