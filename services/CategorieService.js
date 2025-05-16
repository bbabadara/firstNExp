const DataStore = require('../utils/DataStore');

class CategorieService {
  constructor() {
    this.store = new DataStore('datas.json', 'categories');
  }

  getAll() {
    return this.store.getAll();
  }

  ajouter(categorie) {
    categorie.id = this.store.getId();
    this.store.add(categorie);
  }

  getParId(id) {
    return this.store.findById(id);
  }

  supprimer(id) {
    return this.store.deleteById(id);
  }

  modifier(id, updatedCategorie) {
    return this.store.updateById(id, updatedCategorie);
  }
}

module.exports = CategorieService;
