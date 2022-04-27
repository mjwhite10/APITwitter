const { generateError } = require('../helpers');
const { getConnection } = require('./db');

const getAllTweets = async () => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(`
    SELECT * FROM tweets ORDER BY created_at DESC`);

    return result;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const getTweetById = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
    SELECT * FROM tweets
    WHERE id = ?
    ORDER BY created_at DESC`,
      [id]
    );

    if (result.length === 0) {
      throw generateError(`No existe un tweet con el id: ${id}`, 404);
    }
    return result[0];
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const createTweet = async (userId, text, image = '') => {
  let connection;
  try {
    connection = await getConnection();

    const [resut] = await connection.query(
      `
    INSERT INTO tweets (user_id,text,image)
    VALUES (?,?,?)`,
      [userId, text, image]
    );

    return resut.insertId;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const deleteTweetById = async (id) => {
  let connection;
  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
    DELETE FROM tweets WHERE id = ?`,
      [id]
    );
    return result[0];
  } finally {
    if (connection) connection.release();
  }
};
module.exports = {
  createTweet,
  getAllTweets,
  getTweetById,
  deleteTweetById,
};
