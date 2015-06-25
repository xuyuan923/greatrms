var mongoose = require('mongoose');
var LineSchema = require('../schemas/line');
var Line = mongoose.model('Line',LineSchema);
module.exports  = Line;