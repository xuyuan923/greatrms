/**
 * Created by cassie on 14/11/16.
 */
var mongoose = require('mongoose');
var IssueSchema = require('../schemas/issue');
var Issue = mongoose.model('Issue',IssueSchema);
module.exports  = Issue;