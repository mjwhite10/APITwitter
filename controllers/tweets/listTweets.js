const { getAllTweets } = require('../../db/tweets');

const listTweets = async (req, res, next) => {
  try {
    const tweets = await getAllTweets();
    res.send({
      status: 'ok',
      message: tweets,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { listTweets };
