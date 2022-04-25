const bcrypt = require('bcrypt');
const { generateError } = require('../helpers');
const { getConnection } = require('./db');

//Crea un usuario en la BBDD y devuelve su id
const createUserInDB = async (email, password) => {
  let connection;
  try {
    connection = await getConnection();

    //Comprobar que no exista otro usuario con ese mail
    const [user] = await connection.query(
      `
    SELECT id FROM users WHERE email = ?`,
      [email]
    );
    if (user.length > 0) {
      throw generateError(
        'Ya existía un usuario en la base de datos con ese email',
        409
      );
    }
    //Encriptamos la password
    const passwordHash = await bcrypt.hash(password, 8);
    //Crear usuario
    const [newUser] = await connection.query(
      `
    INSERT INTO users (email,password) VALUES (?,?)`,
      [email, passwordHash]
    );
    //Devolver id
    return newUser.insertId;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
//Devuelve la información pública de un usuario dada su id
const getUserById = async (id) => {
  let connection;
  try {
    connection = await getConnection();

    const [user] = await connection.query(
      `
    SELECT id, email created_at FROM users WHERE id=?`,
      [id]
    );

    if (user.length === 0) {
      throw generateError(`No hay ningún usuario con el id ${id}`, 404);
    }
    return user[0];
  } finally {
    if (connection) connection.release();
  }
};
//Devuelve la información pública de un usuario dada su email
const getUserByEmail = async (email) => {
  let connection;
  try {
    connection = await getConnection();

    const [user] = await connection.query(
      `
    SELECT id, email, password, created_at FROM users WHERE email=?`,
      [email]
    );

    if (user.length === 0) {
      throw generateError(`No hay ningún usuario con el email ${email}`, 404);
    }
    return user[0];
  } finally {
    if (connection) connection.release();
  }
};
module.exports = { createUserInDB, getUserById, getUserByEmail };
