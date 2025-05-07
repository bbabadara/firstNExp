class Personne {
    constructor(id, nom, prenom, age, email) {
      this.id = id;
      this.nom = nom;
      this.prenom = prenom;
      this.age = age || null;
      this.email = email || null;
    }
  }
 
  module.exports = Personne;