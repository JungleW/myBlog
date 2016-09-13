var express = require('express');
var User = require("../../models/user");
var router = express.Router();

try{
    var config = require("../../configs/config");   
}catch(e){
    config = require("../../configs/default"); 
}

router.all("/ajax/*", function(req,res,next){
    if (!req.session.user) {
        if(req.url=="/login"){  
            next();//如果请求的地址是登录则通过，进行下一个请求  
        } else {  
            res.redirect('user/login');  
        }  
    } else if (req.session.user) {
        next();  
    }  
}); 

router.all("/", function(req,res,next){
    if (req.session.user) {
        next();  
    } else if(!req.session.user) {
        
    }  
});

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(config);
     //搜读者
    User.search({}, function(err, data) {   
        req.session.user = data[0];
        req.session.user.role = 1;
        req.session.user.image = "/admin/img/user_jugnle.jpg";
        res.render('admin/index', {
            title: '首页',
            user: req.session.user,
            config: config
        });
    });
});

/* GET test page. */
router.get('/test/:n/:role', function(req, res, next) {
    var n = req.params.n;
    var role = req.params.role;
    User.search({}, function(err, data) {   
        req.session.user = data[n];
        req.session.user.role = role;
        req.session.user.image = "/admin/img/user3-128x128.jpg";
        res.render('admin/index', {
            title: '首页',
            user: req.session.user
        });
    });
});
/* GET test page. */
router.get('/role/:role', function(req, res, next) {
    req.session.user = {
        name: "wjz",
        image: "/admin/img/user3-128x128.jpg",
        role: req.params.role
    }
    res.render('admin/index', {
        title: '首页',
        user: req.session.user
    });
});

/* GET home page. */
router.get('/ajax', function(req, res, next) {
    req.session.user = user;
    res.render('admin/_index', {
        title: '首页',
        user: req.session.user
    });
});

/* GET home page. */
router.get('/ajax/tableOptions', function(req, res, next) {
    req.session.user = user;
    res.send({
        done: false
    });
});
//锁屏
router.get('/ajax/lock', function(req, res, next) {
    //var id = req.session.user._id;
    var data = req.session.user;
    //User.searchOne({"_id": id}, function(err, data) {
        res.render('admin/_lock', {
            title: 'User_edit',
            index: 'user_edit',
            user: data
        });
    //});
});
module.exports = router;
