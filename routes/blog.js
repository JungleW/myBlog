var express = require('express');
var crypto = require('crypto');
var Blog = require("../models/blog");
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    //搜索博文
    Blog.search({}, function(err, data) {
        res.render('blog', {
            title: 'Blog',
            index: 'blog',
            blogs: data,
            user: req.session.user
        });
    });
});
router.get('/edit', function(req, res, next) {
    res.render('blog_edit', {
        title: 'Blog_edit',
        index: 'blog_edit',
        user: req.session.user
    });
});
router.get('/article', function(req, res, next) {
    res.render('blog_article', {
        title: 'Article',
        index: 'b_article',
        user: req.session.user
    });
});

router.post('/add', function(req, res, next) {
    //检验博文输入
    if(req.body.title == undefined || req.body.title == ''){
        res.send({
            done: false,
            msg: "标题不能为空"
        });
        return;
    }else if(req.body.title.legnth > 15){
        res.send({
            done: false,
            msg: "标题不能大于15"
        });
        return;
    }
    if(req.body.content == undefined || req.body.content == ''){
        res.send({
            done: false,
            msg: "博文内容不能为空"
        });
        return;
    }
    //获取待处理数据
    var newBlog = {
        title: req.body.title,
        author: "test",
        content: req.body.content
    };
    
    //检查用户名是否已存在
    Blog.save(newBlog, function(err, blog) {
        res.send({
            done: true,
            url: '/',
            user: req.session.user
        });
    });
});

module.exports = router;
