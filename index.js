/* AQUÍ CONFIGURAMOS EL SERVIDOR HTTP PARA CORRER EN EL PUERTO 3000 */

const express = require('express'); //importamos express
const { faker } = require('@faker-js/faker'); //Importamos la librería faker para generar Data Fake

const app = express(); //creamos una aplicación tipo express
const port = 3000; //definimos el puerto por el que correra la app

//Definimos una ruta y hacemos un callback

/*Ruta por defecto para probar en el navegador: localhost:3000 */
app.get('/', (req, res)=> { // parámetros del callback: req, request. Y res, response
  res.send('Este es mi server en Express');
});

/** Nueva ruta: localhost:3000/new-endpoint */
app.get('/new-endpoint', (req, res)=> { // Ejemplos de endpoint: users, products, categories
  res.send('Aquí se debe mostrar el resultado de la implementación del new-endpoint ');
});

/** USO DEL FORMATO JSON
 * Cambiamos el formato para presentar el resultado en la página.
 * Por ejemplo, para el Frontend y aplicaciones móviles se usa el formato JSON
 */
/* localhost:3000/products */
app.get('/products', (req, res)=> { // Ejemplos de endpoint: users, products, categories
  res.json([
    {
      name: 'Computer X',
      price: 4000
    },

    {
      name: 'Laptop X',
      price: 5000
    },

    {
      name: 'Television X',
      price: 2000
    }
  ]);
});

/**
 * NOTA: => En el código fuente, LOS ENDPOINTS (urls) establecidos de forma específica o estática
 * deben ir antes de los endpoints establecidos de forma dinámica. De lo contrario,
 * no darán el resultado esperado.
 */
//RUTA: localhost:3000/productos/filter
app.get('/products/filter', (req, res) => {
  res.send('Esto es un filter. Ha sido definido como un endpoint estático o específico.');
});

//RECIBIENDO PARÁMETROS DINÁMICOS A TRAVES DE LA URL

//PARÁMETROS tipo PARAMS
/* localhost:3000/products/alphaNumeric */
app.get('/products/:id', (req, res)=> { // Método get, recibiendo el parámetro id
  const { id } = req.params; //destructuración: de todos los parámetros que tenga el objeto .params solo requerimos el id
  res.json(
    {
      id,
      name: 'Computer X',
      price: 4000,
      note: 'Este es un endpoint dinámico'
    }
  );
});

//relacionando entidades: productos con categorías
/* localhost:3000/categories/categoryId/products/productId */
app.get('/categories/:categoryId/products/:productId', (req, res)=> {
  const { categoryId, productId } = req.params;
  res.json(
    {
      categoryId,
      productId
    }
  );
});


// PARÁMETROS TIPO QUERY
/* Estrategias de paginación desde la url: limit y offset */
/* RUTA 1: localhost:3000/users */
/* RUTA 2: localhost:3000/users?limit=777&offset=888 */
app.get('/users', (req, res) => {
  const { limit, offset } = req.query;
  if(limit && offset){
    res.json({
      limit,
      offset
    });
  } else {
    res.send('No ingresó parámetros limit y offset en la url');
  }
});


//IMPLEMENTANDO Y USANDO LA LIBRERÍA FAKER, GENERANDO DATA FAKERS
/* RUTA 1: localhost:3000/productosFakers => devolverá máximo 10 productos */
/**RUTA 2: localhost:3000/productosFakers?size=n => devolverá n productos. n = entero */
app.get('/productosFakers', (req, res)=>{
  const productosFakers =[];
  const { size } = req.query;
  const limit = size || 10;
  for (let index = 0; index < limit; index++) {
    productosFakers.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.url()
    });
  }
  res.json(productosFakers);
});

//le decimos a la app el puerto por el que debe escuchar
app.listen(port, () => { //callback sin parámetros
  console.log('Mi puerto: ' + port);
});


/*
MODOS DE EJECUCIÓN DE LA APP

Modo desarrollo, comando: npm run dev

Modo producción, comando: npm run start

ctrl + C para salir de cualquiera de los modos.
*/
