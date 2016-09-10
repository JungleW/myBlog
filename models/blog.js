var db = require("./db"); 
var mongoose = require("mongoose"); 
    
var BlogSchema = new mongoose.Schema({
    title: String,
    author: String,
    content: String
});
var BlogModel = mongoose.model('blog', BlogSchema);

function Blog(){};

/* 保存 */
Blog.prototype.save = function(obj, callback) {
    var instance = new BlogModel(obj);
    instance.save(function(err){
        callback(err);
    });
};

/* 保存 */
Blog.prototype.search = function(obj, callback) {
    BlogModel.find(obj, function(err, obj){
        callback(err, obj);
    });
};

/* 按名字进行查找 */
Blog.prototype.findById = function(id, callback) {
    BlogModel.findOne({_id: id}, function(err, obj) {
        callback(err, obj);
    });
};

module.exports = new Blog();
