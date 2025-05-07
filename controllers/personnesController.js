const Personne = require('../models/personneModel');


// Base de données en mémoire pour stocker les personnes
let personnes = [
  { id: 1, nom: 'Demba', prenom: 'Fatima', age: 42, email: 'fatima@example.com' },
  { id: 2, nom: 'Diagne', prenom: 'Sophie', age: 35, email: 'sophie@example.com' }
];


exports.getAllPersonnes = (req, res) => {
  res.status(200).json(personnes);
};
exports.getPersonneById = (req, res) => {
  const id = parseInt(req.params.id);
  const personne = personnes.find(p => p.id === id);
 
  if (!personne) {
    return res.status(404).json({ message: 'Personne non trouvée' });
  }
 
  res.status(200).json(personne);
};
exports.createPersonne = (req, res) => {
  const { nom, prenom, age, email } = req.body;
 
  if (!nom || !prenom) {
    return res.sta
tus(400).json({ message: 'Le nom et le prénom sont obligatoires' });  }
  const id = personnes.length > 0 ? Math.max(...personnes.map(p => p.id)) + 1 : 1;
 
  const nouvellePersonne = new Personne(id, nom, prenom, age, email);
  personnes.push(nouvellePersonne);
 
  res.status(201).json(nouvellePersonne);
};
exports.updatePersonne = (req, res) => {
  const id = parseInt(req.params.id);
  const index = personnes.findIndex(p => p.id === id);
 
  if (index === -1) {
    return res.status(404).json({ message: 'Personne non trouvée' });
  }
 
  const { nom, prenom, age, email } = req.body;
  if (nom) personnes[index].nom = nom;
  if (prenom) personnes[index].prenom = prenom;
  if (age !== undefined) personnes[index].age = age;
  if (email) personnes[index].email = email;
 
  res.status(200).json(personnes[index]);
};


exports.deletePersonne = (req, res) => {
  const id = parseInt(req.params.id);
  const index = personnes.findIndex(p => p.id === id);
 
  if (index === -1) {
    return res.status(404).json({ message: 'Personne non trouvée' });
  }
 
  const personneSuprimee = personnes.splice(index, 1)[0];
 
  res.status(200).json({
    message: 'Personne supprimée avec succès',
    personne: personneSuprimee
  });
};
