//ESTE ES EL SCHEMA DE VALIDACIÓN DE PRODUCTOS

const Joi = require('joi'); //Joi, herramienta de validación de datos.

//Validaciones para cada campo. Definición de formato
const id = Joi.string().uuid();
const name =Joi.string().min(3).max(25);
const price = Joi.number().integer().min(10).strict();
const image =Joi.string().uri();
const isBlock = Joi.boolean();

/*
//EJEMPLO PARA PERSONALIZAR LOS MENSAJES DE VALIDACIÓN EN ESPAÑOL

const name = joi.string().min(3).max(15).messages({
  'string.base': `" nombre "debe ser un tipo de 'texto'`,
  'string.empty': `"nombre "no puede ser un campo vacío`,
  'string.min': `"nombre" debe tener una longitud mínima de {#limit}`,
  'string.max': `"nombre" debe tener una longitud máxima de {#limit}`
});

*/

//schema para cada método

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image:image.required(),
  isBlock: isBlock.required()
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  isBlock: isBlock
});

const getProductSchema = Joi.object({
  id: id.required()
});

const deleteProductSchema = Joi.object({
  id: id.required()
});

module.exports = {createProductSchema, updateProductSchema, getProductSchema, deleteProductSchema}
