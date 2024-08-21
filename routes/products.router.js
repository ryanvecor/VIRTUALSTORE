//Separación de responsabilidades con express.Router
//Los routers CORRESPONDEN A LA CAPA DE CONTROLADORES,
// ESTOS TIENEN ACCESO A LA CAPA DE SERVICIOS, DONDE ESTÁ TODA LA LÓGICA DEL NEGOCIO.
//ESTOS SERVICIOS USAN LAS LIBRERÍAS (otra capa) Y ESTAS A OTRAS APIs EXTERNAS O BD
/**
 * SE CREA LA CARPETA routes
 * dentro de esta se crea:
 *  products.router.js
 *  users.router.js
 *  categories.router.js
 * y también otro...
 *  index.js   ESTE ES EL ARCHIVO QUE VA A CONFIGURAR TODAS LAS RUTAS
 */
//AQUÍ VAN TODAS LAS RUTAS RELACIONADAS CON LA RESPONSABILIDAD DE PRODUCTS


const express = require('express'); //importamos express
const { faker } = require('@faker-js/faker'); //Importamos la librería faker para generar Data Fake

/**Como desde aqui no tenemos acceso a la app, creamos un routing con Express */
const router = express.Router(); // SE LE DICE A EXPRESS QUE SE NECESITA UN Router específico; este es para los productos

/** USO DEL FORMATO JSON
 * Cambiamos el formato para presentar el resultado en la página.
 * Por ejemplo, para el Frontend y aplicaciones móviles se usa el formato JSON
 */
/* localhost:3000/products */
//IMPLEMENTANDO Y USANDO LA LIBRERÍA FAKER, GENERANDO DATA FAKERS

router.get('/', (req, res)=>{
  const products =[];
  const { size } = req.query;
  const limit = size || 10;
  for (let index = 0; index < limit; index++) {
    products.push({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.url()
    });
  }
  res.json(products);
});

/**
 * NOTA: => En el código fuente, LOS ENDPOINTS (urls) establecidos de forma específica o estática
 * deben ir antes de los endpoints establecidos de forma dinámica. De lo contrario,
 * no darán el resultado esperado.
 */
//RUTA: localhost:3000/productos/filter
router.get('/filter', (req, res) => {
  res.send('Esto es un filtro de productos. Ha sido definido como un endpoint estático o específico.');
});

//RECIBIENDO PARÁMETROS DINÁMICOS A TRAVES DE LA URL

//PARÁMETROS tipo PARAMS
/* localhost:3000/products/alphaNumeric */
router.get('/:id', (req, res)=> { // Método get, recibiendo el parámetro id
  const { id } = req.params; //destructuración: de todos los parámetros que tenga el objeto .params solo requerimos el id
  res.json(
    {
      id,
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.url(),
      note: 'Este es un endpoint dinámico de productos'
    }
  );
});



module.exports = router; //Se convierte el router en un módulo exportable.
