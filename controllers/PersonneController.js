const Personne = require('../models/Personne');
const PersonneService = require('../services/PersonneService');


const service = new PersonneService();

// GET /personnes
exports.getAllPersonnes = (req, res) => {
  const personnes = service.getAll();
  res.status(200).json(personnes);
};

// GET /personnes/:id
exports.getPersonneById = (req, res) => {
  const id = parseInt(req.params.id);
  const personne = service.getParId(id);
  if (!personne) {
    return res.status(404).json({ message: 'Personne non trouvée' });
  }
  res.status(200).json(personne);
};

// POST /personnes
exports.createPersonne = (req, res) => {
  const { nom, prenom, age, email } = req.body;

  if (!nom || !prenom) {
    return res.status(400).json({ message: 'Le nom et le prénom sont obligatoires' });
  }

  const nouvellePersonne = new Personne(0, nom, prenom, age, email);
  service.ajouter(nouvellePersonne);
  res.status(201).json(nouvellePersonne);
};

// PUT /personnes/:id
exports.updatePersonne = (req, res) => {
  const id = parseInt(req.params.id);
  const existing = service.getParId(id);

  if (!existing) {
    return res.status(404).json({ message: 'Personne non trouvée' });
  }

  const { nom, prenom, age, email } = req.body;
  const updatedData = {};

  if (nom !== undefined) updatedData.nom = nom;
  if (prenom !== undefined) updatedData.prenom = prenom;
  if (age !== undefined) updatedData.age = age;
  if (email !== undefined) updatedData.email = email;

  const updated = service.modifier(id, updatedData);
  res.status(200).json(updated);
};

// DELETE /personnes/:id
exports.deletePersonne = (req, res) => {
  const id = parseInt(req.params.id);
  const deletedPersonne = service.getParId(id);
  const success = service.supprimer(id);

  if (!success) {
    return res.status(404).json({ message: 'Personne non trouvée' });
  }

  res.status(200).json({
    message: 'Personne supprimée avec succès',
    personne: deletedPersonne
  });
};
