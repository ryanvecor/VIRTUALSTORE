/* AQUÍ CONFIGURAMOS EL SERVIDOR HTTP PARA CORRER EN EL PUERTO 3000 */

const express = require('express'); //importamos express
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


app.get('/products/:id', (req, res)=> { // Método get, recibiendo el parámetro id
  const { id } = req.params; //destructuración: de todos los parámetros que tenga el objeto .params solo requerimos el id
  res.json(
    {
      id,
      name: 'Computer X',
      price: 4000
    }
  );
});

//relacionando entidades: productos con categorías
app.get('/categories/:categoryId/products/:productId', (req, res)=> {
  const { categoryId, productId } = req.params;
  res.json(
    {
      categoryId,
      productId
    }
  );
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
