
const { faker } = require('@faker-js/faker'); //librería para generar Data Fake

const boom = require('@hapi/boom'); //librería para manejar errores con status code

//Usando POO en javascript
class UsersService{
  /**
   * Definimos toda la lógica e interacciones que van a tener nuestros datos.
   * En este caso, para la entidad products: es decir, las funcionalidades
   * para gestionar productos
   */
  constructor(){
    this.users = [];//Por ahora se manejará en este array en memoria, luego en PostgresSql
    this.generate(); //Cada vez que se cree una instancia del servicio generará 100 productos.
  }

  //GENERATE
  generate(){
    const limit = 30;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.string.uuid(),
        name: faker.person.fullName(), //lo mejor es tener nombres y apellidos por separado
        gene: faker.person.sex(),
        movil: faker.phone.number(),
        job: faker.person.jobTitle(),
        email: faker.internet.email(),
        isBlock: faker.datatype.boolean()
      });
    }
    //console.log(this.users);
  }

  //CREATE
  async create(data){
    const newUSer = {
      id: faker.string.uuid(),
      ...data
    }
    this.users.push(newUSer);
    return newUSer;
  }


  //FIND
  async find(){ //async como preparación a conexión con servicios que si sean asíncronos
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.users);
      }, 3000); //3 seg para cargar los datos
    })
  }


  //FIND ONE
  async findOne(id){
    const user = this.users.find(item => item.id === id);
    if(!user){
      throw boom.notFound('User Not Found');
    }
    if(user.isBlock){
      throw boom.conflict('User Is Block');
    }
    return user;
  }

  //UPDATE
  async update(id, changes){
    const index = this.users.findIndex(item => item.id === id); //obtener posición, el index, del id
    if(index === -1){ // si el id no es encontrado, devuelve -1. Entonces se lanza un error.
      throw boom.notFound('User Not Found');
    } //si el id es encontrado, es decir su posición, entonces
    const user = this.users[index]; //guardamos en user el usuario de la posición deseada

    /*
    Se agregan los cambios en el index o posición encontrado de la siguente manera:

    usando el spread operator para modificar sólo el valor indicado y conservar los
    otros valores del objeto user
    */
    this.users[index] = {
      ...user, //persistir los atributos existentes del usuario
      ...changes  //y sólo aplicar los nuevos cambios
    };
    return this.users[index];// ahora si, retorne el objeto modificado(actualizado)
  }

  //DELETE
  async delete(id){
    const index = this.users.findIndex(item => item.id === id); //obtener posición, el index, del id
    if(index === -1){ // si el id no es encontrado, devuelve -1. Entonces se lanza un error.
      throw boom.notFound('User Not Found');
    } //si el id es encontrado, es decir su posición, entonces
    this.users.splice(index, 1);//con splice enviamos una posición y el número de elementos a eliminar de ese index (1)
    return { id };
  }

}
  module.exports = UsersService;
