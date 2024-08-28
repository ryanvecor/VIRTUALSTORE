
const { faker } = require('@faker-js/faker'); //librería para generar Data Fake

const boom = require('@hapi/boom'); //librería para manejar errores con status code

//Usando POO en javascript
class CategoriesService{

  constructor(){
    this.categories = [];//Por ahora se manejará en este array en memoria, luego en PostgresSql
    this.generate(); //Cada vez que se cree una instancia del servicio generará X categorias.
  }

  generate(){
    const limit = 15;
    for (let index = 0; index < limit; index++) {
      this.categories.push({
        id: faker.string.uuid(),
        category:faker.commerce.productAdjective(),
        isBlock: faker.datatype.boolean()
      });
    }
    //console.log(this.categories);
  }

  //CREATE
  async create(data){
    const newCategory = {
      id: faker.string.uuid(),
      ...data
    }
    this.categories.push(newCategory);
    return newCategory;
  }

  //FIND
  async find(){ //async como preparación a conexión con servicios que si sean asíncronos
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.categories);
      }, 3000); //3 seg para cargar los datos
    })
  }


  //FIND ONE
  async findOne(id){
    const category = this.categories.find(item => item.id === id);
    if(!category){
      throw boom.notFound('Category Not Found');
    }
    if(category.isBlock){
      throw boom.conflict('Category Is Block');
    }
    return category;
  }


  //UPDATE
  async update(id, changes){
    const index = this.categories.findIndex(item => item.id === id); //obtener posición, el index, del id
    if(index === -1){ // si el id no es encontrado, devuelve -1. Entonces se lanza un error.
      throw boom.notFound('Category Not Found');
    } //si el id es encontrado, es decir su posición, entonces
    const category = this.categories[index]; //guardamos en category la categoria de la posición deseada
    /*
    Se agregan los cambios en el index o posición encontrado de la siguente manera:
    usando el spread operator para modificar sólo el valor indicado y conservar los
    otros valores del objeto category
    */
    this.categories[index] = {
      ...category, //persistir los atributos existentes de la categoria
      ...changes  //y sólo aplicar los nuevos cambios
    };
    return this.categories[index];// ahora si, retorne el objeto modificado(actualizado)
  }

  //DELETE
  async delete(id){
    const index = this.categories.findIndex(item => item.id === id); //obtener posición, el index, del id
    if(index === -1){ // si el id no es encontrado, devuelve -1. Entonces se lanza un error.
      throw boom.notFound('Category Not Found');
    } //si el id es encontrado, es decir su posición, entonces
    this.categories.splice(index, 1);//con splice enviamos una posición y el número de elementos a eliminar de ese index (1)
    return { id }
  }
}

module.exports = CategoriesService;
