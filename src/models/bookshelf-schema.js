'use strict';
const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);
const books = require('./book-schema');

const bookshelf = mongoose.Schema({
  name: {type: String, required: false},
  
},
{toObject:{virtuals:true}, toJSON:{virtuals:true}});

bookshelf.virtual('book', {
  ref: 'books',
  localField: 'name',
  foreignField: 'bookshelf_id',
  justOne: false,
})

bookshelf.pre('find', function() {
  try {
    this.populate('book');
  }
  catch(e) {console.log('Find Error', e); }
});


module.exports = mongoose.model('bookshelf', bookshelf);