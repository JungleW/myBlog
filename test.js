
function _lazyMan(name){
    this.task = [];
    var self = this;
    var fn = (function(n){
        var name = n;
        return function(){
            console.log("Hi, This is " + name);
            self.next();
        }
    })(name);
    this.task.push(fn);
    setTimeout(function(){
        self.next();
    }, 0);
}
_lazyMan.prototype.next = function(){
    var fn = this.task.shift();
    fn && fn();
}
_lazyMan.prototype.eat=function(str){
    var self = this;
    var fn = (function(s){
        return function(){
            console.log("eat " + s);
            self.next();
        };
    })(str);
    this.task.push(fn);
    return this;
}
_lazyMan.prototype.sleep=function(str){
    var self = this;
    var fn = (function(time){
        return function(){
            setTimeout(function(){
                console.log("wake up after " + time);
                self.next();
            },  1000* time);
        };
    })(str);
    this.task.push(fn);
    return this;
}
_lazyMan.prototype.sleepFirst=function(str){
    var self = this;
    var fn = (function(time){
        return function(){
            setTimeout(function(){
                console.log("wake up after " + time);
                self.next();
            },  1000* time);
        };
    })(str);
    this.task.unshift(fn);
    return this;
}
function LazyMan(name){
    return new _lazyMan(name);
}
LazyMan("wjz").eat("dinner").sleepFirst(4).eat("breakfast").sleep(5).eat("lunch");