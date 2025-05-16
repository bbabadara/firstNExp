const Personne = require('../models/Personne');
const {
    getPersonnes,
    ajouterPersonne,
    getPersonneParId,
    supprimerPersonne,
    modifierPersonne
    } = require('../services/personneService1');




exports.getAllPersonnes = (req, res) => {
  const personnes = getPersonnes();
  res.status(200).json(personnes);
};
exports.getPersonneById = (req, res) => {
  const id = parseInt(req.params.id);
  const personne = getPersonneParId(id);
  if (!personne) {
    return res.status(404).json({ message: 'Personne non trouvée' });
  }
  res.status(200).json(personne);
};
exports.createPersonne = (req, res) => {
  const { nom, prenom, age, email } = req.body;
  if (!nom || !prenom) {
    return res.status(400).json({ message: 'Le nom et le prénom sont obligatoires' });
  }
  const nPersonne = new Personne(0, nom, prenom, age, email);
  ajouterPersonne(nPersonne);
  res.status(201).json(nPersonne);
};
exports.updatePersonne = (req, res) => {
  const id = parseInt(req.params.id);
  const personne = getPersonneParId(id);
  if (!personne) {
    return res.status(404).json({ message: 'Personne non trouvée' });
  }
  const { nom, prenom, age, email } = req.body;
  if (nom) personne.nom = nom;
  if (prenom) personne.prenom = prenom;
  if (age !== undefined) personne.age = age;
  if (email) personne.email = email;
  modifierPersonne(id, personne);
  res.status(200).json(personne);
};


exports.deletePersonne = (req, res) => {
  const id = parseInt(req.params.id);
  const personneSuprimee = getPersonneParId(id);
  const personne = supprimerPersonne(id);
  if (!personne) {
    return res.status(404).json({ message: 'Personne non trouvée' });
  }
  res.status(200).json({
    message: 'Personne supprimée avec succès',
    personne: personneSuprimee
  });
};
