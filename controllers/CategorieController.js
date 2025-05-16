const Categorie = require('../models/Categorie');
const CategorieService = require('../services/CategorieService');

const service = new CategorieService();

exports.getAllCategories = (req, res) => {
  const categories = service.getAll();
  res.status(200).json(categories);
};

exports.getCategorieById = (req, res) => {
  const id = parseInt(req.params.id);
  const categorie = service.getParId(id);
  if (!categorie) {
    return res.status(404).json({ message: 'Catégorie non trouvée' });
  }
  res.status(200).json(categorie);
};

exports.createCategorie = (req, res) => {
  const { libelle } = req.body;
  if (!libelle) {
    return res.status(400).json({ message: 'Le libellé est obligatoire' });
  }
  const newCat = new Categorie(0, libelle);
  service.ajouter(newCat);
  res.status(201).json(newCat);
};

exports.updateCategorie = (req, res) => {
  const id = parseInt(req.params.id);
  const existing = service.getParId(id);
  if (!existing) {
    return res.status(404).json({ message: 'Catégorie non trouvée' });
  }

  const { libelle } = req.body;
  if (libelle) existing.libelle = libelle;
  const updated = service.modifier(id, existing);
  res.status(200).json(updated);
};

exports.deleteCategorie = (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = service.getParId(id);
  const success = service.supprimer(id);
  if (!success) {
    return res.status(404).json({ message: 'Catégorie non trouvée' });
  }

  res.status(200).json({
    message: 'Catégorie supprimée avec succès',
    categorie: deleted
  });
};
