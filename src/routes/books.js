'use strict';
console.log("in here api 🍩 ");
// dependencies  
const express = require('express');
const router = express.Router();
const pg = require('pg');
const superagent = require('superagent');
const methodOverride = require('method-override');

// database stuff
const book = require('../models/books')
const bookConstructor = require('../models/book-constructor.js');

// server setup
const app = express();
app.set('view engine', 'ejs');


//  API Routes
router.get('/', getBooks);
router.post('/searches', createSearch);
router.get('/searches/new', newSearch);
// router.get('/books/:id', getBook);
// router.post('/books', createBook);
// router.put('/books/:id', updateBook);
// router.delete('/books/:id', deleteBook);
// router.get('*', (request, response) => response.status(404).send('This route does not exist'));


function getBooks(req, res, next){
    console.log("in getbooks 📙 ");
    book.get()
    .then(results => {
        const output = {
          count: results.length,
          results: results,
        };
        if (!output) {
          res.render('pages/searches/new');
        }
        else {
          res.render('pages/index', { books: output.results });
        }
      })
      .catch(next);
}

function createSearch(request, response) {
    let url = 'https://www.googleapis.com/books/v1/volumes?q=';
  
    if (request.body.search[1] === 'title') { url += `+intitle:${request.body.search[0]}`; }
    if (request.body.search[1] === 'author') { url += `+inauthor:${request.body.search[0]}`; }
  
    superagent.get(url)
      .then(apiResponse => apiResponse.body.items.map(bookResult => new Book(bookResult.volumeInfo)))
      .then(results => response.render('pages/searches/show', {results: results}))
      .catch(err => handleError(err, response));
  }
  
  function newSearch(request, response) {
    response.render('pages/searches/new');
  }
    
    



module.exports = router;