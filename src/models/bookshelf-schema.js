'use strict';
const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);

const bookshelf = mongoose.Schema({
  name: { type:String, required:true },
},
{toObject:{virtuals:true}, toJSON:{virtuals:true}});



module.exports = mongoose.model('bookshelf', bookshelf);