
'use strict';
const bookshelf = require('./bookshelf-schema');
const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);

const book = mongoose.Schema({
  title: {type: String, required: true},
  author: {type: String, required: true},
  isbn: {type: String, required: true},
  image_url: {type: String, required: true},
  description: {type: String, required: true},
  bookshelf: {type: String, required: true},
}, {toObject:{virtuals:true}, toJSON:{virtuals:true}});

book.virtual('bookshelff', {
  ref: 'bookshelf',
  localField: 'bookshelf',
  foreignField: 'name',
  justOne: false,
});
book.pre('find', function() {
  try {
    this.populate('bookshelff');
  }
  catch(e) {console.log('Find Error', e); }
});


module.exports = mongoose.model('book', book);