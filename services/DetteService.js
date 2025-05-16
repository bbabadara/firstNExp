const DataStore = require('../utils/DataStore');
const ArticleService = require('./ArticleService');
 const aService = new ArticleService();

class DetteService {
  constructor() {
    this.store = new DataStore('datas.json', 'dette');
  }

  getAll() {
    return this.store.getAll();
  }

  ajouter(dette) {
    dette.id = this.store.getId();
    this.store.add(dette);
    const articles=dette.articles;
    for (let article of articles) {
      const art = aService.getParId(article.id);
      art.quantite-=article.quantite
      aService.modifier(art.id,art)

    }
    
  }

  getParId(id) {
    return this.store.findById(id);
  }

  supprimer(id) {
    return this.store.deleteById(id);
  }

  modifier(id, updatedDette) {
    return this.store.updateById(id, updatedDette);
  }
}

module.exports = DetteService;
