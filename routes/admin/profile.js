var express = require('express');
var crypto = require('crypto');
var User = require("../../models/user");
var router = express.Router();

/* GET User page. */
router.get('/ajax', function(req, res, next) {
    //个人信息
    user = {
        name: "wjz",
        image: "/admin/img/user3-128x128.jpg",
        role: 10
    };
    res.render('admin/_user_show', {
            title:"个人中心",
            user: user
    });
    return;
    
    
    var id = req.session.user._id;
    User.search({"_id": id}, function(err, data) {
        data = req.session.user;
        res.render('admin/_user_show', {
                title:"个人中心",
                user: data
        });
    });
});
/* GET table status page. */
router.get('/ajax/tableOptions', function(req, res, next) {
    //表格修饰
    res.send({
        done: false
    });
});

//修改信息
router.get('/ajax/edit/:id', function(req, res, next) {
    //var id = req.session.user._id;
    var data = req.session.user;
    //User.searchOne({"_id": id}, function(err, data) {
        res.render('admin/_user_edit', {
            title: 'User_edit',
            index: 'user_edit',
            User: data
        });
    //});
});
//修改密码
router.post('/ajax/resetPwd', function(req, res, next) {
    //var id = req.session.user._id;
    var data = req.session.user;
    //User.searchOne({"_id": id}, function(err, data) {
        res.render('admin/_lock', {
            title: 'User_edit',
            index: 'user_edit',
            User: data
        });
    //});
});

module.exports = router;
