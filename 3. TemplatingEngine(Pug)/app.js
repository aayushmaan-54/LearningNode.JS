const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

console.log('Admin routes loaded');
app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render('404', { docTitle: 'Err0r: 404' })
});

app.listen(3000); 
