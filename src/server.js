'use strict';

// Application Dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const methodOverride = require('method-override');

// Esoteric Resources
const errorHandler = require( './middleware/error.js');
const notFound = require( './middleware/404.js' );
const router = require('./routes/books.js');
// require('./models/');

// Application Setup
const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

// Application Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(methodOverride((request, response) => {
  if (request.body && typeof request.body === 'object' && '_method' in request.body) {
    // look in urlencoded POST bodies and delete it
    let method = request.body._method;
    delete request.body._method;
    return method;
  }
}))



// Set the view engine for server-side templating
app.set('view engine', 'ejs');
// Routes
app.use(router);

// the catch alls
app.use(errorHandler);
app.use(notFound);




// Server StartUp
let isRunning = false;

module.exports = {
    server: app,
    start: (port) => {
      if( ! isRunning ) {
        app.listen(port, () => {
          isRunning = true;
          console.log(`Server Up on ${port}`);
        });
      }
      else {
        console.log('Server is already running');
      }
    },
  };
  
// // API Routes
// app.get('/', getBooks);
// app.post('/searches', createSearch);
// app.get('/searches/new', newSearch);
// app.get('/books/:id', getBook);
// app.post('/books', createBook);
// app.put('/books/:id', updateBook);
// app.delete('/books/:id', deleteBook);

// app.get('*', (request, response) => response.status(404).send('This route does not exist'));

// app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));



