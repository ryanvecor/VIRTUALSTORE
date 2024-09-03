//middleware tipo validación
const boom = require('@hapi/boom'); //librería para manejar errores con status code
/**Este middleware será construido de manera dinámica */
function validatorHandler(schema, property) {
  return (req, res, next) => {//retorna un middleware utilizando la propiedad de closure en javascript
    const data = req[property]; //property porque la información del request en cualquiera de las siguientes tres:
    /**
     * req.body -> si es un post
     * req.params -> si es un get
     * req.query -> si es un patch
     */
    //console.log(data);
    const {error} = schema.validate(data, {abortEarly: false});// abortEarly: false es para que envíe todos los errores juntos y no uno por uno
    if (error){// si hay error
      next(boom.badRequest(error)); // envía error tipo 400
    }
    //si no hay error
    next();
  }
}

module.exports = validatorHandler;
