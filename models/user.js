var db = require("./db"); 
var mongoose = require("mongoose"); 
    
var UserSchema = new mongoose.Schema({
      name: String,
      password: String
});
var UserModel = mongoose.model('user', UserSchema);

function User(){};

/* 保存 */
User.prototype.save = function(obj, callback) {
    var instance = new UserModel(obj);
    instance.save(function(err){
        callback(err);
    });
};

/* 搜索 */
User.prototype.search = function(obj, callback) {
    UserModel.find(obj, function(err, obj){
        callback(err, obj);
    });
};

/* 按名字进行查找 */
User.prototype.findByName = function(name, callback) {
    UserModel.findOne({name: name}, function(err, obj) {
        callback(err, obj);
    });
};

module.exports = new User();
