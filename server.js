require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

//User controllers
const { newUser } = require('./controllers/users/newUser');
const { getUser } = require('./controllers/users/getUser');
const { loginUser } = require('./controllers/users/loginUser');

//Tweet controllers
const { listTweets } = require('./controllers/tweets/listTweets');
const { newTweet } = require('./controllers/tweets/newTweet');
const { getTweet } = require('./controllers/tweets/getTweet');
const { deleteTweet } = require('./controllers/tweets/deleteTweet');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

//Rutas de users
app.post('/user', newUser);
app.get('/user/:id', getUser);
app.post('/login', loginUser);

//Rutas de tweets
app.get('/', listTweets);
app.post('/', newTweet);
app.get('/tweet/:id', getTweet);
app.delete('/tweet/:id', deleteTweet);

//Middleware para las peticiones 404
app.use((req, res) => {
  console.warn('Error 404 Not Found');
  res.status(404).send({
    status: 'error',
    message: 'Not found',
  });
});

//Middleware de errores
app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message,
  });
});

//Lanzamos el server
app.listen(3000, () => {
  console.log('Servidor funcionado 🙈');
});
