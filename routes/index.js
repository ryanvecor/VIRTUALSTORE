//ESTE index.js ES EL ARCHIVO DONDE SE CONFIGURAN TODAS LAS RUTAS

const express = require('express');

const productRouter  = require('./products.router'); //Se importa el router para el endpoint products
const usersRouter  = require('./users.router'); //Se importa el router para el endpoint users
const categoriesRouter  = require('./categories.router'); //Se importa el router para el endpoint categories

function routerApi(app){ //recibe la app
  const router = express.Router();
  app.use('/api/v1', router); //Se define un path global para manejar versiones

  router.use('/products', productRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);


}
module.exports = routerApi;// //Se convierte la función routerApi en un módulo exportable.
