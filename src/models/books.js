'use strict';
const bookSchema = require('./book-schema');
const DataModel = require('./model.js');

class Book extends DataModel{}


module.exports = new Book(bookSchema);