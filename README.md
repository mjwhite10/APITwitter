# Simple Twitter API

Este ejercicio consiste en crear una API que simule el funcionamiento de una aplicación similar a Twitter

## Entidades

* User:
  * id
  * email
  * password
  * created_at

* Tweet:
  * id
  * user
  * tweet
  * image(opcional)
  * created_at

## Endpoints

* POST /user Registrar usuario ✅
* GET /user/:id Devolver información de usuario ✅
* POST /login Login de usuario (devuelve token) ✅
* POST / Permite crear un tweet (necesita cabecera con token) ✅
* GET / Lista todos los tweets
* GET /tweet/:id Devuelve un tweet
* DELETE /tweet/:id Borra un tweet sólo si eres quien lo creó
