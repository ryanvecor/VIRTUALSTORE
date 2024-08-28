

const express = require('express'); //importamos express

const CategoriesService = require('./../services/categories.service');

/**Como desde aqui no tenemos acceso a la app, creamos un routing con Express */
const router = express.Router(); // SE LE DICE A EXPRESS QUE SE NECESITA UN Router específico; este es para los productos

const service = new CategoriesService();

//MÉTODO GET --> FIND
router.get('/',
  async (req, res, next) => {
    try {
      const categories = await service.find();
      res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
  }
);


router.get('/filter', (req, res) => {
  res.send('Esto es un filtro de categorias. Ha sido definido como un endpoint estático o específico.');
});

//MÉTODO GET --> FIND ONE
router.get('/:id',
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.status(200).json(category);
    } catch (error) {
        next(error);
      }
  }
);


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


//METODO POST --> CREATE
router.post('/' ,
  async (req, res, next)=> {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
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
      const category = await service.update(id, body);
      res.status(201).json(category);
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
