const path = require('path');
const sharp = require('sharp');
const { nanoid } = require('nanoid');
const { createTweet } = require('../../db/tweets');
const { createPathIfNotExits } = require('../../helpers');
const { newTweetSchema } = require('../../validators/tweetValidators');

const newTweet = async (req, res, next) => {
  try {
    const { text } = req.body;

    await newTweetSchema.validateAsync(req.body);

    let imageFileName;
    if (req.files?.image) {
      //Creo el path de uploads
      const uploadsDir = path.join(__dirname, '../../uploads');

      //Creo el directorio si no existe
      createPathIfNotExits(uploadsDir);

      //Procesar la imagen
      const image = sharp(req.files.image.data);
      image.resize(1000);

      //Guardo la imagen con un nombre random
      imageFileName = `${nanoid(24)}.jpg`;
      await image.toFile(path.join(uploadsDir, imageFileName));
    }

    const id = await createTweet(req.userId, text, imageFileName);
    res.send({
      status: 'ok',
      message: `Tweet creado con id ${id} se ha creado correctamente`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { newTweet };
