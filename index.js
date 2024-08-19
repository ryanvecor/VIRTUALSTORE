/* AQUÍ CONFIGURAMOS EL SERVIDOR HTTP PARA CORRER EN EL PUERTO 3000 */

const express = require('express'); //importamos express
const app = express(); //creamos una aplicación tipo express
const port = 3000; //definimos el puerto por el que correra la app

//Definimos una ruta y hacemos un callback

/*Ruta por defecto para probar en el navegador: localhost:3000 */
app.get('/', (req, res)=> { // parámetros del callback: req, request. Y res, response
  res.send('Este es mi server en Express');
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
