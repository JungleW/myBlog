var express = require('express');
var crypto = require('crypto');
var Blog = require("../../models/blog");
var router = express.Router();

/* GET blog page. */
router.get('/', function(req, res, next) {
    //搜索博文
    Blog.search({}, function(err, data) {
        res.render('admin/blog', {
            title: 'Blog',
            index: 'blog',
            blogs: data,
            user: req.session.user
        });
    });
});
/* GET blog page. */
router.get('/ajax/list', function(req, res, next) {
    //搜索博文
    Blog.search({}, function(err, data) {
        res.send({
            titles: [
                {name: '标题', label: 'title', url: ''}, 
                {name: '作者', label: 'author'}, 
                {name: '阅读量', label: 'view'}, 
                {name: '点赞', label: 'like'},  
                {name: '详情', label: '', oper: 'show'}, 
                {name: '编辑', label: '', oper: 'edit'}
            ],
            noSortArr: [4,5],
            list: data
        });
    });
});
/* GET blog list page. */
router.get('/ajax/rows', function(req, res, next) {
    //搜索博文
    Blog.search({}, function(err, data) {
        res.send({
            blogs: data,
            user: req.session.user
        });
    });
});

//添加博文
router.get('/ajax/edit', function(req, res, next) {
    res.render('admin/blog_edit_ajax', {
        title: 'Blog_edit',
        index: 'blog_edit'
    });
});
//修改博文
router.get('/ajax/edit/:id', function(req, res, next) {
    var id = req.params.id;
    Blog.findById(id, function(err, data) {
        res.render('admin/blog_edit_ajax', {
            title: 'Blog_edit',
            index: 'blog_edit'
        });
    });
});

router.get('/ajax/show/:id', function(req, res, next) {
    var id = req.params.id;
    Blog.findById(id, function(err, data) {
        res.render('admin/blog_show_ajax', {
            title: 'blog_show',
            index: 'blog_show',
            blog: data
        });
    });
});

router.post('/update', function(req, res, next) {
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
