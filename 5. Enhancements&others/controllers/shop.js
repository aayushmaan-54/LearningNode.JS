const Product = require('../models/products');

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list',
      {
        prods: products,
        docTitle: 'All Products',
        isAllProdActive: true
      }
    )
  });
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/index',
      {
        prods: products,
        docTitle: 'Shop',
        isShopActive: true
      }
    )
  });
}

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    docTitle: 'Your Cart',
    isCartActive: true
  })
}

exports.getOrders = (req, res, next) => {
  res.render('shop/order', {
    docTitle: 'Your Orders',
    isOrderActive: true
  })
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    docTitle: 'Checkout',
    isCheckoutActive: true,
  });
}