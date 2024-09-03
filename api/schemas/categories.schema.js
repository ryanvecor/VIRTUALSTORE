//ESTE ES EL SCHEMA DE VALIDACIÓN DE CATEGORIES

const Joi = require('joi'); //Joi, herramienta de validación de datos.

//Validaciones para cada campo. Definición de formato
const id = Joi.string().uuid();
const category = Joi.string().min(3).max(30);
const isBlock = Joi.boolean();



const createCategorySchema = Joi.object({
  category: category.required(),
  isBlock: isBlock.required()
});


const updateCategorySchema = Joi.object({
  category: category,
  isBlock: isBlock
});


const getCategorySchema = Joi.object({
  id: id.required()
});


const deleteCategorySchema = Joi.object({
  id: id.required()
});


module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema, deleteCategorySchema }
