
const { faker } = require('@faker-js/faker'); //librería para generar Data Fake


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

  create(data){
    const newUSer = {
      id: faker.string.uuid(),
      ...data
    }
    this.users.push(newUSer);
    return newUSer;
  }


  find(){
    return this.users;
  }

  findOne(id){
    return this.users.find(item => item.id === id);
  }
  update(id, changes){
    const index = this.users.findIndex(item => item.id === id);
    if (index === -1){
      throw new Error('User not found');
    }
    const user = this.users[index];
    this.users[index] = {
        ...user,
        ...changes
      };
    return this.users[index];
  }

  delete(id){
    const index = this.users.findIndex(item => item.id === id);
    if (index === -1){
      throw new Error('User not found');
    }
    this.users.splice(index, 1);
    return { id };

  }
}
  module.exports = UsersService;
