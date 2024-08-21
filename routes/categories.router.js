

const express = require('express'); //importamos express
const { faker } = require('@faker-js/faker'); //Importamos la librería faker para generar Data Fake

/**Como desde aqui no tenemos acceso a la app, creamos un routing con Express */
const router = express.Router(); // SE LE DICE A EXPRESS QUE SE NECESITA UN Router específico; este es para los productos

//MÉTODO GET
router.get('/', (req, res)=>{
  const categories =[];
  const { size } = req.query;
  const limit = size || 10;
  for (let index = 0; index < limit; index++) {
    categories.push({
      id: faker.string.uuid(),
      category:faker.commerce.productAdjective()
    });
  }
  res.json(categories);
});

router.get('/filter', (req, res) => {
  res.send('Esto es un filtro de categorias. Ha sido definido como un endpoint estático o específico.');
});


router.get('/:id', (req, res)=> { // Método get, recibiendo el parámetro id
  const { id } = req.params; //destructuración: de todos los parámetros que tenga el objeto .params solo requerimos el id
  res.json(
    {
      id,
      category:faker.commerce.productAdjective(),
      note: 'Este es un endpoint dinámico de categorias'
    }
  );
});

//relacionando entidades: productos con categorías
/* localhost:3000/categories/categoryId/products/productId */
router.get('/:categoryId/products/:productId', (req, res)=> {
  const { categoryId, productId } = req.params;
  res.json(
    {
      categoryId,
      productId
    }
  );
});


//METODO POST
router.post('/' , (req, res)=> {
  const body = req.body;
  res.json({
    message: 'created',
    data: body
  });
});


//MÉTODO PATCH --> UPDATE
router.patch('/:id' , (req, res)=> {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'update',
    data: body,
    id //porque viene como parámetro
  });
});

//MÉTODO DELETE
router.delete('/:id' , (req, res)=> {
  const { id } = req.params;
  res.json({
    message: 'delete',
    id //porque viene como parámetro
  });
});

module.exports = router; //Se convierte el router en un módulo exportable.
