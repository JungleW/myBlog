 var mongoose = require("mongoose"); 
 var db = mongoose.connect("mongodb://119.29.91.217:27017/myBlog"); 

exports.db = db;