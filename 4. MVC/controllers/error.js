exports.get404 = (req, res, next) => {
  res.status(404).render('404',
    {
      docTitle: 'Err0r: 404'
    }
  );
}