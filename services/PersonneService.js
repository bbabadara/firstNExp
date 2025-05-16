
const DataStore = require('../utils/DataStore');

class PersonneService {
  constructor() {
    this.store = new DataStore('datas.json', 'personnes');
  }

  getAll() {
    return this.store.getAll();
  }

  ajouter(personne) {
    personne.id = this.store.getId();
    this.store.add(personne);
  }

  getParId(id) {
    return this.store.findById(id);
  }

  supprimer(id) {
    return this.store.deleteById(id);
  }

  modifier(id, updatedPersonne) {
    return this.store.updateById(id, updatedPersonne);
  }
}

module.exports = PersonneService;
