const DataStore = require('../utils/DataStore');

class ArticleService {
  constructor() {
    this.store = new DataStore('datas.json', 'articles');
  }

  getAll() {
    return this.store.getAll();
  }

  ajouter(article) {
    article.id = this.store.getId();
    this.store.add(article);
  }

  getParId(id) {
    return this.store.findById(id);
  }

  getByLibelle(libelle){
    const articles= this.store.getAll();
    return  articles.some(a => a.libelle.toLowerCase() === libelle.toLowerCase());
  }
  supprimer(id) {
    return this.store.deleteById(id);
  }

  modifier(id, updatedArticle) {
    return this.store.updateById(id, updatedArticle);
  }
}

module.exports = ArticleService;
