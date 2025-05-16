class Article {
    constructor(id, libelle, prix, quantite, categorie_id) {
        this.id = id;
        this.libelle = libelle;
        this.prix = prix ;
        this.quantite = quantite;
        this.categorie_id = categorie_id
        
    }
    
}
module.exports = Article;