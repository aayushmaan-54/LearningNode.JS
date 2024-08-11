const fs = require('fs');
const path = require('path');

const rootDir = require('../utils/path');

const p = path.join(rootDir, 'data', 'products.json');


const getProductFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  })
}


module.exports = class Products {
  constructor(prodTitle, prodPrice, prodImageUrl, prodDescription) {
    this.prodTitle = prodTitle;
    this.prodPrice = prodPrice;
    this.prodImageUrl = prodImageUrl;
    this.prodDescription = prodDescription;
  }

  save() {
    getProductFromFile(Products => {
      Products.push(this);
      fs.writeFileSync(p, JSON.stringify(Products))
    })
  }

  static fetchAll(cb) {
    getProductFromFile(cb);
  }
}