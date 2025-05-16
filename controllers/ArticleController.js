const Article = require('../models/Article');
const ArticleService = require('../services/ArticleService');
const CategorieService = require('../services/CategorieService');

const categorieService = new CategorieService();
const service = new ArticleService();

exports.getAllArticles = (req, res) => {
  const articles = service.getAll();
  res.status(200).json(articles);
};

exports.getArticleById = (req, res) => {
  const id = parseInt(req.params.id);
  const article = service.getParId(id);
  if (!article) {
    return res.status(404).json({ message: 'Article non trouvé' });
  }
  res.status(200).json(article);
};

exports.createArticle = (req, res) => {
  const { libelle, prix, quantite, categorie_id } = req.body;

  if (!libelle || prix == null || quantite == null || !categorie_id) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }
  const existLibelle=service.getByLibelle(libelle)

 if (existLibelle) {
    return res.status(400).json({ message: 'Un article avec ce libellé existe déjà' });
  }
  // Verif cat 
  const categorie = categorieService.getParId(parseInt(categorie_id));
  if (!categorie) {
    return res.status(400).json({ message: 'Catégorie non valide (categorie_id inconnu)' });
  }

  const article = new Article(0, libelle, prix, quantite, parseInt(categorie_id));
  service.ajouter(article);
  res.status(201).json(article);
};


exports.updateArticle = (req, res) => {
  const id = parseInt(req.params.id);
  const article = service.getParId(id);
  if (!article) {
    return res.status(404).json({ message: 'Article non trouvé' });
  }

  const { libelle, prix, quantite, categorie_id } = req.body;

  if (libelle !== undefined) article.libelle = libelle;
  if (prix !== undefined) article.prix = prix;
  if (quantite !== undefined) article.quantite = quantite;
  if (categorie_id !== undefined) {
     const cat = categorieService.getParId(parseInt(categorie_id));
  if (!cat) {
    return res.status(400).json({ message: 'Catégorie invalide' });
  }
  article.categorie_id = parseInt(categorie_id);
}

  const updated = service.modifier(id, article);
  res.status(200).json(updated);
};

exports.deleteArticle = (req, res) => {
  const id = parseInt(req.params.id);
  const article = service.getParId(id);
  const success = service.supprimer(id);
  if (!success) {
    return res.status(404).json({ message: 'Article non trouvé' });
  }

  res.status(200).json({
    message: 'Article supprimé avec succès',
    article
  });
};
