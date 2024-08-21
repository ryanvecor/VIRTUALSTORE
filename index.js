/* AQUÍ CONFIGURAMOS EL SERVIDOR HTTP PARA CORRER EN EL PUERTO 3000 */

/*En el navegador, digite localhost:3000
MODELO DE RUTA ACTUALIZADO
http://localhost:3000/api/v1/products/

ENDPOINTS

/products
/users
/categories

*/

const express = require('express'); //importamos express
const routerApi = require('./routes'); //Se importa la carpeta routes. Y tenemos la función routerApi

const app = express(); //creamos una aplicación tipo express
const port = process.env.PORT || 3000; //definimos el puerto por el que correra la app

/* middleware requerido para método post */
app.use(express.json()); //middleware para recibir información tipo json que nos envíen por método post


//Definimos una ruta y hacemos un callback

/*Ruta por defecto para probar en el navegador: localhost:3000 */
app.get('/', (req, res)=> { // parámetros del callback: req, request. Y res, response
  res.send('Este es mi server en Express');
});

/** Nueva ruta: localhost:3000/new-endpoint */
app.get('/new-endpoint', (req, res)=> { // Ejemplos de endpoint: users, products, categories
  res.send('Aquí se debe mostrar el resultado de la implementación del new-endpoint ');
});



//le decimos a la app el puerto por el que debe escuchar
// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

routerApi(app);// Se llama la función y se le pasa la app

/*
MODOS DE EJECUCIÓN DE LA APP

Modo desarrollo, comando: npm run dev

Modo producción, comando: npm run start

ctrl + C para salir de cualquiera de los modos.
*/
