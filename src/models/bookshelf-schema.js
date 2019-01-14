'use strict';

const book = require('./book-schema.js');
const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);

const bookshelf = mongoose.Schema(
  {
    name: {type: String, required: true},
  });

bookshelf.virtual('books', {
  ref: `book`,
  localField: 'name',
  foreignField: 'bookshelf',
  justOne: false,
});

bookshelf.pre('find', function() {
  try {
    this.populate('books');
  }
  catch(e) {console.log('Find Error', e); }
});

module.exports = mongoose.model('bookshelf', bookshelf);