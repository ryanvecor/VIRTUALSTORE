
const express = require('express'); //importamos express
//const { faker } = require('@faker-js/faker'); //Importamos la librería faker para generar Data Fake
const UsersService = require('./../services/users.service');

/**Como desde aqui no tenemos acceso a la app, creamos un routing con Express */
const router = express.Router(); // SE LE DICE A EXPRESS QUE SE NECESITA UN Router específico; este es para los productos
const service = new UsersService();

//MÉTODO GET
/* router.get('/', (req, res)=>{
  const users =[];
  const { size } = req.query;
  const limit = size || 10;
  for (let index = 0; index < limit; index++) {
    users.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(), //lo mejor es tener nombres y apellidos por separado
      gene: faker.person.sex(),
      movil: faker.phone.number(),
      job: faker.person.jobTitle(),
      email: faker.internet.email()
    });
  }
  res.json(users);
}); */

router.get('/', (req, res)=>{
  const users = service.find();
  res.json(users);
});

/*
router.get('/filter', (req, res) => {
  res.send('Esto es un filtro de usuarios. Ha sido definido como un endpoint estático o específico.');
});

 */
/*
router.get('/:id', (req, res)=> { // Método get, recibiendo el parámetro id
  const { id } = req.params; //destructuración: de todos los parámetros que tenga el objeto .params solo requerimos el id
  if (id === '666'){
    res.status(404).json({
      message: 'User Not Found'
    });
  } else{
    res.status(200).json(
      {
        id,
        name: faker.person.fullName(), //lo mejor es tener nombres y apellidos por separado
        gene: faker.person.sex(),
        movil: faker.phone.number(),
        job: faker.person.jobTitle(),
        email: faker.internet.email(),
        note: 'Este es un endpoint dinámico de usuarios'
      });
  }
});
 */
router.get('/:id', (req, res) =>{
  const { id } = req.params;
  const user = service.findOne(id);
  res.json(user);
});
// PARÁMETROS TIPO QUERY
/* Estrategias de paginación desde la url: limit y offset */
/* RUTA 1: localhost:3000/api/v1/users */
/* RUTA 2: localhost:3000/api/v1/users?limit=777&offset=888 */
router.get('/', (req, res) => {
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


//MÉTODO POST
router.post('/' , (req, res)=> {
  const body = req.body;
  const newUSer = service.create(body);
  res.status(201).json(newUSer);
});

//MÉTODO PATCH --> UPDATE
router.patch('/:id' , (req, res)=> {
  const { id } = req.params;
  const body = req.body;
  const user = service.update(id, body);
  res.json(user);
});

//MÉTODO DELETE
router.delete('/:id' , (req, res)=> {
  const { id } = req.params;
  const resultado = service.delete(id);
  res.json(resultado);
});


module.exports = router; //Se convierte el router en un módulo exportable.

