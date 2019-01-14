'use strict';
const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);
// ,{toObject:{virtuals:true}, toJSON:{virtuals:true}});
const bookShelf = require('./bookshelf-schema');

const book =  mongoose.Schema({
  title: {type: String, require:true},
  author: {type: String, require:true},
  isbn: {type: String},
  image_url: {type: String},
  description: {type: String},
  bookshelf_id: {type: String},
},{toObject:{virtuals:true}, toJSON:{virtuals:true}});

book.virtual('bookShelf', {
  ref: 'booksShelf',
  localField: 'bookshelf_id',
  foreignField: 'shelf',
  justOne: false,
})

// category.virtual('products', {
//   ref: 'products',
//   localField: 'name',
//   foreignField: 'category',
//   justOne: false,
// });

module.exports = mongoose.model('book', book);