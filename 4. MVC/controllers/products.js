const Product = require('../models/products');

exports.getAddProducts = (req, res, next) => {
  res.render('add-product',
    {
      docTitle: 'Add Product',
      isActive: true
    }
  );
}


exports.postAddProducts = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
}


exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll((products) => {
    res.render('shop',
      {
        prods: products,
        docTitle: 'Shop',
        isShopActive: true
      }
    )
  });
}