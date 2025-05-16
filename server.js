const express = require('express');
const bodyParser = require('body-parser');
const personnesRoutes = require('./routes/personnesRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const articlesRoutes = require('./routes/articlesRoutes');
const dettesRoutes = require('./routes/dettesRoutes');


const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Route de base
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API de gestion de personnes' });
});


// Routes pour les personnes
app.use('/api/personnes', personnesRoutes);

// Routes pour les categories
app.use('/api/categories', categoriesRoutes);

// Routes pour les articles
 app.use('/api/articles', articlesRoutes);
 
// Routes pour les dettes
 app.use('/api/dettes', dettesRoutes);


app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});


module.exports = app;
