const fs = require('fs/promises');
const generateError = (message, status) => {
  const error = new Error(message);
  error.httpStatus = status;
  return error;
};

const createPathIfNotExits = async (path) => {
  try {
    await fs.access(path);
  } catch {
    await fs.mkdir(path);
  }
};
module.exports = {
  generateError,
  createPathIfNotExits,
};
