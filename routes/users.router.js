
const express = require('express'); //importamos express

const UsersService = require('./../services/users.service');

/**Como desde aqui no tenemos acceso a la app, creamos un routing con Express */
const router = express.Router(); // SE LE DICE A EXPRESS QUE SE NECESITA UN Router específico; este es para los productos
const service = new UsersService();

//MÉTODO GET
router.get('/',
  async (req, res, next)=>{
    try {
      const users = await service.find();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
);

/*
router.get('/filter', (req, res) => {
  res.send('Esto es un filtro de usuarios. Ha sido definido como un endpoint estático o específico.');
});

 */

router.get('/:id',
  async (req, res, next) =>{
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

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
router.post('/' ,
  async (req, res, next)=> {
    try {
      const body = req.body;
      const newUSer = await service.create(body);
      res.status(201).json(newUSer);
    } catch (error) {
      next(error);
    }
  }
);

//MÉTODO PATCH --> UPDATE
router.patch('/:id' ,
  async (req, res, next)=> {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await service.update(id, body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);

//MÉTODO DELETE
router.delete('/:id' ,
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

