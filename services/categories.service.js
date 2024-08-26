
const { faker } = require('@faker-js/faker'); //librería para generar Data Fake


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
  async find(){
    return this.categories;
  }

  //FIND ONE
  async findOne(id){
    return this.categories.find(item => item.id === id);
  }

  //UPDATE
  async update(id, changes){
    const index = this.categories.findIndex(item => item.id === id);
    if (index === -1){
      throw new Error('Category not found');
    }
    const category = this.categories[index];
    this.categories[index] = {
        ...category,
        ...changes
      };
    return this.categories[index];
  }

  //DELETE
  async delete(id){
    const index = this.categories.findIndex(item => item.id === id);
    if (index === -1){
      throw new Error('Category not found');
    }
    this.categories.splice(index, 1);
    return { id };
  }
}

module.exports = CategoriesService;
