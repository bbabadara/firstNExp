// utils/DataStore.js
const fs = require('fs');
const path = require('path');

class DataStore {
  constructor(fileName, collectionName) {
    this.filePath = path.join(__dirname, '..', 'data', fileName);
    this.collection = collectionName;
  }

  readFile() {
    try {
      const rawData = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(rawData);
    } catch (err) {
      console.error('Erreur de lecture du fichier :', err);
      return {};
    }
  }

  writeFile(data) {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Erreur d\'écriture dans le fichier :', err);
    }
  }

  getAll() {
    const data = this.readFile();
    return data[this.collection] || [];
  }

  getId() {
    const items = this.getAll();
    const maxId = items.reduce((max, item) => item.id > max ? item.id : max, 0);
    return maxId + 1;
  }

  add(obj) {
    const data = this.readFile();
    if (!data[this.collection]) data[this.collection] = [];
    data[this.collection].push(obj);
    this.writeFile(data);
  }

  findById(id) {
    return this.getAll().find(item => item.id === id);
  }

  deleteById(id) {
    const data = this.readFile();
    const collection = data[this.collection] || [];
    const newCollection = collection.filter(item => item.id !== id);

    if (newCollection.length !== collection.length) {
      data[this.collection] = newCollection;
      this.writeFile(data);
      return true;
    }
    return false;
  }

  updateById(id, updatedObj) {
    const data = this.readFile();
    const collection = data[this.collection] || [];
    const index = collection.findIndex(item => item.id === id);

    if (index !== -1) {
      collection[index] = { ...collection[index], ...updatedObj };
      data[this.collection] = collection;
      this.writeFile(data);
      return collection[index];
    }
    return null;
  }
}

module.exports = DataStore;
