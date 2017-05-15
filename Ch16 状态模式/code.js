// document.getElementById('TITLE').innerHTML = "CCh15 装饰者模式"

// 1. 自己实现一个 before 和 after

function fun() {
    console.log(' in function fun() ', arguments)
}

function f1() {
    console.log(' in function f1() ', arguments)
}

function f2() {
    console.log(' in function f2() ', arguments)
}

Function.prototype.before = function (beforeFun) {
    var self = this
    return function () {
        beforeFun.apply(this, arguments)
        var result = self.apply(this, arguments)
        return result
    }
}
Function.prototype.after = function (afterFun) {
    var self = this
    return function () {
        var result = self.apply(this, arguments)
        afterFun.apply(this, arguments)
        return result
    }
}

// fun(1,2,3)

var newFun = fun.before(f1).after(f2).before(f2)
// x = x.after(f2)
newFun(2,3,4)