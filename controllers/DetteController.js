const Dette = require('../models/Dette');
const DetteService = require('../services/DetteService');
const PersonneService = require('../services/PersonneService');
const ArticleService = require('../services/ArticleService');

const detteService = new DetteService();
const personneService = new PersonneService();
const articleService = new ArticleService();

exports.getAllDettes = (req, res) => {
  const dettes = detteService.getAll();
  res.status(200).json(dettes);
};

exports.getDetteById = (req, res) => {
  const id = parseInt(req.params.id);
  const dette = detteService.getParId(id);
  if (!dette) {
    return res.status(404).json({ message: 'Dette non trouvée' });
  }
  res.status(200).json(dette);
};

exports.createDette = (req, res) => {
  const { date, personne_id, articles } = req.body;

  if (!date || !personne_id || !Array.isArray(articles) || articles.length === 0) {
    return res.status(400).json({ message: 'Tous les champs sont requis, y compris une liste d\'articles' });
  }

  const personne = personneService.getParId(parseInt(personne_id));
  if (!personne) return res.status(400).json({ message: 'Personne non valide' });
  let mnt=0;
  for (let article of articles) {
    if (article.quantite<=0) {
            return res.status(400).json({ message: `La quantite ne peut pas etre negative/null article invalide avec id ${article.id}` });

    }

    const found = articleService.getParId(parseInt(article.id));

    if (!found) {
      return res.status(400).json({ message: `Article invalide avec id ${article.id}` });
    }
    if (found.quantite<article.quantite) {
      return res.status(400).json({ message: `Quantite superieur au stock avec l'article dont l'id est : ${article.id}` });
    }
    mnt+=found.prix*article.quantite
  }

  const newDette = new Dette(0, date,parseInt(mnt), parseInt(personne_id), articles);
  detteService.ajouter(newDette);
  res.status(201).json(newDette);
};

exports.deleteDette = (req, res) => {
  const id = parseInt(req.params.id);
  const dette = detteService.getParId(id);
  const success = detteService.supprimer(id);
  if (!success) {
    return res.status(404).json({ message: 'Dette non trouvée' });
  }

  res.status(200).json({
    message: 'Dette supprimée avec succès',
    dette
  });
};
