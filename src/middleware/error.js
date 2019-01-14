'use strict';

module.exports = (err, res) => {
  // let error = { error: err };
  // res.statusCode = 500;
  // res.statusMessage = 'Server Error';
  // res.setHeader('Content-Type', 'application/json');
  // res.write( JSON.stringify(error) );
  // res.end();
  res.render('pages/error', {error: err});

};