var express = require('express');
var crypto = require('crypto');
var User = require("../../models/user");
var router = express.Router();

/* GET User page. */
router.get('/ajax', function(req, res, next) {
    //搜读者
    User.search({}, function(err, data) {
        res.render('admin/_user', {
            title:"读者",
            table:{
                id: "table",
                titles: [
                    {name: '读者', label: 'name', url: ''}, 
                    {name: '注册时间', label: 'buildTime'},
                    {name: '操作', opers: 
                        [  
                            {name: '详情',  oper: 'show'}, 
                            {name: '编辑',  oper: 'edit'}, 
                            {name: '删除',  oper: 'del'}
                        ]
                    }
                ],
                list: data
            }
        });
    });
});
/* GET table status page. */
router.get('/ajax/tableOptions', function(req, res, next) {
    //表格修饰
    res.send({
        title:"用户",
        table:{
            id: "table",
            noSortArr: [2]
        },
        done: true
    });
});

/* GET User list page. */
router.get('/ajax/list', function(req, res, next) {
    //用户列表
    User.search({}, function(err, data) {
        res.send({
            Users: data,
            user: req.session.user
        });
    });
});

//修改用户
router.get('/ajax/edit', function(req, res, next) {
    res.render('admin/_User_edit', {
        title: 'User_edit',
        index: 'user_edit',
        User: ""
    });
});
//修改博文
router.get('/ajax/edit/:id', function(req, res, next) {
    var id = req.params.id;
    User.searchOne({"_id": id}, function(err, data) {
        res.render('admin/_User_edit', {
            title: 'User_edit',
            index: 'user_edit',
            User: data
        });
    });
});

router.get('/ajax/show/:id', function(req, res, next) {
    var id = req.params.id;
    User.searchOne({"_id": id}, function(err, data) {
        res.render('admin/_user_show', {
            title: 'User_show',
            index: 'user_show',
            User: data
        });
    });
});


router.get('/ajax/message', function(req, res, next) {
    var id = req.session.user.id;
    User.searchOne({"_id": id}, function(err, data) {
        res.render('admin/_user_message', {
            title: 'User_show',
            index: 'user_show',
            User: data
        });
    });
});

router.post('/ajax/del/:id', function(req, res, next) {
    var id = req.params.id;
    User.delete({_id: id}, function(err) {
        if(err){        
            res.send({
                done: false,
                msg: "删除失败"
            });
            return;
        } else {
            res.send({
                done: true,
                msg: "删除成功"
            });
            return;
        }

    });
});
router.post('/ajax/update', function(req, res, next) {
    var id = req.body.id;
    //检验用户输入
    if(req.body.username == undefined || req.body.username == ''){
        res.send({
            done: false,
            msg: "账号不能为空"
        });
        return;
    }else if(req.body.username.legnth > 15){
        res.send({
            done: false,
            msg: "账号长度不能大于15"
        });
        return;
    }
    if(req.body.password == undefined || req.body.password == ''){
        res.send({
            done: false,
            msg: "密码不能为空"
        });
        return;
    }else if(req.body.password.length <6 || req.body.password.legnth > 20){
        res.send({
            done: false,
            msg: "请确保密码长度为6-20"
        });
        return;
    }
    //生成口令的数列值
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    
    //获取待处理数据
    var newUser = {
        name: req.body.username,
        password: password
    };
    
    if(id){
        //检查用户名是否已存在
        User.searchOne({_id: {"$ne": id}, name: newUser.name}, function(err, user) {
            if(user)
                err = '该账户名已存在';
            if(err) {
                 res.send({
                    done: false,
                    msg: err
                 });
                return;
            }
            //如果不存在新用户则新增加
            User.update({"_id": user.id}, newUser, function(err) {
                if(err){
                    res.send({
                        done: false,
                        msg: "更新失败"
                    });
                    return;
                }
                res.send({
                    done: true,
                    msg: "更新成功"
                });
            });
        });
    }else{
        //检查用户名是否已存在
        User.searchOne({name: newUser.name}, function(err, user) {
            if(user)
                err = '该账户名已存在';
            if(err) {
                 res.send({
                    done: false,
                    msg: err
                 });
                return;
            }
            //如果不存在新用户则新增加
            User.save(newUser, function(err) {
                if(err){
                    res.send({
                        done: false,
                        msg: "更新失败"
                    });
                    return;
                }
                res.send({
                    done: true,
                    msg: "更新成功"
                });
            });
        });
    }
});


module.exports = router;
