//ESTE ES EL SCHEMA DE VALIDACIÓN DE USERS

const Joi = require('joi'); //Joi, herramienta de validación de datos.

//Validaciones para cada campo. Definición de formato
const id = Joi.string().uuid();
const name = Joi.string().min(5).max(40);
const gene = Joi.string().min(3).max(10);
const movil =  Joi.string().min(10).max(15);
const job = Joi.string().max(40)
const email = Joi.string().email();
const isBlock = Joi.boolean();


const createUserSchema = Joi.object({
  name: name.required(),
  gene: gene.required(),
  movil: movil.required(),
  job: job.required(),
  email: email.required(),
  isBlock: isBlock.required()
});


const updateUserSchema = Joi.object({
  name: name,
  gene: gene,
  movil: movil,
  job: job,
  email: email,
  isBlock: isBlock
});


const getUserSchema = Joi.object({
  id: id.required()
});

const deleteUserSchema = Joi.object({
  id: id.required()
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema, deleteUserSchema }
