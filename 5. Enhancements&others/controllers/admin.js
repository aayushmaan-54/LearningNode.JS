const Product = require('../models/products');


exports.getAddProducts = (req, res, next) => {
  res.render('admin/add-product',
    {
      docTitle: 'Add Product',
      isAdminProdActive: true
    }
  );
}


exports.postAddProducts = (req, res, next) => {
  const title = req.body.prodTitle;
  const price = req.body.prodPrice;
  const imgUrl = req.body.prodImageUrl;
  const desc = req.body.prodDescription;
  const product = new Product(title, price, imgUrl, desc);
  product.save();
  res.redirect('/');
}


exports.getProducts = (req, res, next) => {
  Product.fetchAll(product => {
    res.render('admin/products', {
      prods: product,
      docTitle: 'Admin Products',
      isAdminProdActive: true
    })
  })
}