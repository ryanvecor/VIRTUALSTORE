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

/**Importamos products.service.js */
const ProductsService = require('./../services/products.service');

/**Importamos validator.handler.js */
const validatorHandler = require('./../middlewares/validator.handler');

/**Importamos products.schema.js */
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  deleteProductSchema} = require('../schemas/products.schema');

/**Como desde aqui no tenemos acceso a la app, creamos un routing específico con express
para poder tener acceso a la app desde el endpoint products */

const router = express.Router(); // SE LE DICE A EXPRESS QUE SE NECESITA UN Router específico para los productos
const service = new ProductsService();//service es una instancia de la clase ProductsService


/** USO DEL FORMATO JSON
 * Cambiamos el formato para presentar el resultado en la página.
 * Por ejemplo, para el Frontend y aplicaciones móviles se usa el formato JSON
 */
/* localhost:3000/api/v1/products */

//MÉTODO GET
router.get('/',
  async (req, res, next)=>{
    try {
      const products = await service.find();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * NOTA: => En el código fuente, LOS ENDPOINTS (urls) establecidos de forma específica o estática
 * deben ir antes de los endpoints establecidos de forma dinámica. De lo contrario,
 * no darán el resultado esperado.
 */
//RUTA: localhost:3000/api/v1/products/filter
router.get('/filter', (req, res) => {
  res.send('Esto es un filtro de productos. Ha sido definido como un endpoint estático o específico.');
});

//RECIBIENDO PARÁMETROS DINÁMICOS A TRAVES DE LA URL

//PARÁMETROS tipo PARAMS
//MÉTODO GET -> FIND ONE
/**El middleware dinámico, validatorHandler, se debe ejecutar primero
 * para validar el id que viene en params. Si el id es válido se ejecuta el siguente middleware
 */
router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next)=>{
    /**Así se debe capturar el error de forma explícita en el routing
     * y luego ejecutar el middleware del error como tal con try catch y next
     */
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.status(200).json(product);
    } catch (error) {
      next(error); //ejecución del middleware tipo error, de forma explícita
    }
  }
);

//MÉTODO POST --> CREATE
router.post('/' ,
  validatorHandler(createProductSchema, 'body'), //validamos todos los datos que vienen en body
  async (req, res, next)=> {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
  }
);

//MÉTODO PATCH --> UPDATE
router.patch('/:id' ,
  validatorHandler(getProductSchema, 'params'),//validamos primero el id
  validatorHandler(updateProductSchema, 'body'), //y luego validamos todos los datos
  async (req, res, next)=> {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.status(201).json(product);
    } catch (error) {
        next(error);
    }
  }
);

//MÉTODO DELETE
router.delete('/:id' ,
  validatorHandler(deleteProductSchema, 'params'),
  async (req, res, next)=> {
    try {
      const { id } = req.params;
      const resultado = await service.delete(id);
      res.status(200).json(resultado);
    } catch (error) {
        next(error);
    }
  }
);

module.exports = router; //Se convierte el router en un módulo exportable.
