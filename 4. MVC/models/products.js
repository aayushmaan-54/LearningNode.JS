const fs = require('fs');
const path = require('path');

const rootDir = require('../utils/path');

const p = path.join(rootDir, 'data', 'products.json');


const getProductFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      console.error(err);
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  })
}


module.exports = class Products {
  constructor(title) {
    this.title = title
  }

  save() {
    getProductFromFile(Products => {
      Products.push(this);
      fs.writeFile(p, JSON.stringify(Products), err => {
        console.error(err);
      })
    })
  }

  static fetchAll(cb) {
    getProductFromFile(cb);
  }
}