var express = require('express');
var crypto = require('crypto');
var User = require("../../models/user");
var router = express.Router();

/* GET blog page. */
router.get('/', function(req, res, next) {
    //搜索博文
    User.search({}, function(err, data) {
        res.render('admin/user', {
            title: 'User',
            index: 'user',
            blogs: data,
            user: req.session.user
        });
    });
});
/* GET blog page. */
router.get('/ajax/list', function(req, res, next) {
    //搜索博文
    User.search({}, function(err, data) {
        res.send({
            titles: [
                {name: '名字', label: 'name'}
            ],
            list: data
        });
    });
});
/* GET blog list page. */
router.get('/ajax/rows', function(req, res, next) {
    //搜索博文
    User.search({}, function(err, data) {
        res.send({
            users: data,
            user: req.session.user
        });
    });
});


module.exports = router;
