'use strict';
console.log("in here api 🍩 ");
// dependencies  
const express = require('express');
const router = express.Router();
const superagent = require('superagent');

// database stuff
const book = require('../models/books')
const Book = require('../models/book-constructor.js');
const bookShelf = require('../models/bookshelf');


// server setup
const app = express();
app.set('view engine', 'ejs');

const handleError = require('../middleware/error');

//  API Routes
router.get('/', getBooks);
router.post('/searches', createSearch);
router.get('/searches/new', newSearch);
router.get('/books/:id', getBook);
router.post('/books', createBook);
router.put('/books/:id', updateBook);
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
      .then(apiResponse => {
        let bookArr = apiResponse.body.items.map((books) => new Book(books.volumeInfo));
        return bookArr;
      })
      .then(results => response.render('pages/searches/show', {results: results}))
      .catch(err => handleError(err, response));
  };
  
  function newSearch(request, response) {
    response.render('pages/searches/new');
    console.log(" hit newSearch 🐧");
  }


  // mongo functions

function createBook(req, res, next){
  // console.log('in create books', req);
  book.post(req.body)
    .then(result => res.redirect(`/books/${result._id}`))
    .then(results => res.status(200).json(results))
    .catch(next);
}

  function getBook(req, res, next){
    let id = req.params.id;
    book.get(id)
    .then(results => {
      console.log(results, 'results HERE');
      
      bookShelf.get(results.shelf)
      .then(data => {
        console.log("  ⭐️  ",results,'BREAK', data, "  ⭐️  ");
        res.render('pages/books/show', {
          book: results, bookshelves: data
        });
      
      // bookShelf.get(moreResults => {
      //   console.log('hit');
        
      //   console.log(results, moreResults);
        
      // })

    })
    
  })
};

function updateBook(req , res, next){
  books.put(request.params.id, request.body)
    .then( result => response.status(200).json(result) )
    .catch(next);
}

    
    



module.exports = router;