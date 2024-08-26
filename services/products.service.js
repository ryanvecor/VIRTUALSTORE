//EN LA CARPETA services DEBEMOS COLOCAR TODA LA LÓGICA DEL NEGOCIO. EN ESTE CASO:
/*
ProductsService, UsersService, CategoriesService

Cada uno es una clase que debe contener
un constructor y
  create
  find
  finOne
  update
  delete
*/
const { faker } = require('@faker-js/faker'); //Importamos la librería faker para generar Data Fake

//Usando POO
class ProductsService{
  /**
   * Definimos toda la lógica e interacciones que van a tener nuestros datos.
   * En este caso, para la entidad products: es decir, las funcionalidades
   * para gestionar productos
   */
  constructor(){
    this.products = [];//Por ahora se manejará en este array en memoria, luego en PostgresSql
    this.generate(); //Cada vez que se cree una instancia del servicio generará la cantidad productos.
  }

  //GENERATE
  generate(){
    const limit = 30;

    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean()
      });
    }
  }

  //CREATTE
  async create(data){
    const newProduct = {
      id: faker.string.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  //FIND
  async find(){
    return this.products;
  }

  //FIND ONE
  async findOne(id){
    return this.products.find(item => item.id === id);
  }

  //UPDATE
  async update(id, changes){
    //se necesita obtener la posición del id en el array products, entonces...
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1){//Si findIndex no encuentra el objeto, devuelve -1
      throw new Error('Product not found');
    }
    const product = this.products[index];
  /*
  Se agregan los cambios en el index encontrado usando el
  spread operator para modificar sólo el valor indicado y conservar los
  otros valores del objeto product
  */
    this.products[index] = {
      ...product, //persistir los atributos existentes del product
      ...changes  //y sólo aplicar los nuevos cambios
    };
    return this.products[index];// ahora si, retorne el objeto modificado(actualizado)
  }

  //DELETE
  async delete(id){
    //se necesita obtener la posición del id en el array products, entonces...
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1){ //Si findIndex no encuentra el objeto, devuelve -1
      throw new Error('Product not found');
    }
    this.products.splice(index, 1);//Se envía el índex y el # de producros a eliminar (1)
    return { id };// el id eliminado
  }
}

module.exports = ProductsService; //La clase ProductsService se convierte en una clase exportable
