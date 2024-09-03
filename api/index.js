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

//despues de instalar cors | npm i cors | lo importamos para acceder a sus funciones
const cors = require('cors');

const routerApi = require('./routes'); //Se importa la carpeta routes. Y tenemos la función routerApi

//se importa el middleware tipo error, con las funciones creadas
const {
  logErrors,
  errorHandler,
  boomErrorHandler } = require('./middlewares/error.handler');

const app = express(); //creamos una aplicación tipo express
/* Si el puerto viene en una variable de entorno, asígnelo */
const port = process.env.PORT || 3000; //definimos el puerto por el que correra la app

/* middleware requerido para método post */
app.use(express.json()); //middleware para recibir información tipo json que nos envíen por método post

/*
Usando cors de esta manera, y antes de las rutas, permitimos que nuestra API pueda ser accesada
desde cualquier dominio y no solo desde su propio dominio

Con esta configuración de cors habilitamos cualquier origen o dominio
 */

//damos acceso a nuestra app para que use cors.
//app.use(cors()); //Así se permite el acceso a la API desde cualquier origen. No es prudente si la Api no es pública

// Lista de orígenes permitidos
const allowedOrigins = ['http://localhost:8080', 'http://localhost:3000', 'http://127.0.0.1:8080'];

// Función de callback para verificar el origen
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      // Permitir solicitudes sin origen (como solicitudes desde herramientas como Postman)
      return callback(null, true);
    }
    if (allowedOrigins.includes(origin)) {
      // El origen está permitido
      console.log(`Origen permitido: ${origin}`);
      callback(null, true);  // Permitir la solicitud
    } else {
      // El origen no está permitido
      console.log(`Origen no permitido: ${origin}`);
      callback(new Error('No autorizado por CORS'));  // Bloquear la solicitud
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
//De esta manera limitamos el acceso a nuestra API REST, sólo a los origenes permitidos

// Usar CORS con las opciones configuradas
app.use(cors(corsOptions));

//Definimos una ruta y hacemos un callback

/*Ruta por defecto para probar en el navegador: localhost:3000 */
app.get('/api', (req, res)=> { // parámetros del callback: req, request. Y res, response
  res.send('Este es mi server en Express');
});

/** Nueva ruta: localhost:3000/new-endpoint */
app.get('/api/new-endpoint', (req, res)=> { // Ejemplos de endpoint: users, products, categories
  res.send('Aquí se debe mostrar el resultado de la implementación del new-endpoint ');
});




routerApi(app);// Se llama la función y se le pasa la app

// Aquí ya se empiesan a usar las funciones del middleware tipo error
/**OJO!! Según este orden de las siguientes líneas, así se va a ejecutar de manera secuencial */
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

//le decimos a la app el puerto por el que debe escuchar
// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

module.exports = app;
/*
MODOS DE EJECUCIÓN DE LA APP

Modo desarrollo, comando: npm run dev

Modo producción, comando: npm run start

ctrl + C para salir de cualquiera de los modos.
*/

//ESTE COMANDO PARA HABILITAR OTRO PUERTO ESTANDO EN LA CARPETA DEL PROYECTO

/*
npx http-server -p 8080
*/

//URLS para prueba de acceso desde otro origen. Problema de la cabecera CORS
/*
http://127.0.0.1:8080/frontend.html

http://192.168.10.18:8080/frontend.html //generará error de Cors porque no se incluyó en la lista de origenes permitidos
*/
