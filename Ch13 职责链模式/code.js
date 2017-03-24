// document.getElementById('TITLE').innerHTML = "Ch13 职责链模式"

// 1. 手机订单 传统方式，条件语句嵌套
    // orderType(1 500,2 200,3 0) pay(0,1) stock
    // 交付500定金的用户会获得100优惠券
    // 交付200定金的用户会获得50优惠券
    // 未交付定金的用户无优惠券，并且在有货的情况下才能购买

function getOrder(orderType, pay, stock){
    if(orderType == 1){
        if(pay){
            console.log("购买成功，获得100元优惠券")
        }else if(stock > 0){
            console.log("购买成功，无优惠券")
        } 
        else {
            console.log("无货，无法购买")
        }

    } else if(orderType == 2){
        if(pay){
            console.log("购买成功，获得50元优惠券")
        }else if(stock > 0){
            console.log("购买成功，无优惠券")
        } 
        else {
            console.log("无货，无法购买")
        }
    } else if(orderType == 3){
        if(stock >0){
            console.log("购买成功，无优惠券")
        } 
        else {
            console.log("无货，无法购买")
        }
    }
}

getOrder(1, 1, 0)
getOrder(1, 0, 1)
getOrder(1, 0, 0)

console.log("- - - - - - - - - - -")

// 2. 手机订单 职责链模式 自己想的方法

function perorder500(orderType, pay, stock){
    if(orderType == 1 && pay){
        console.log("购买成功，获得100元优惠券")
    }
    else {
        return "tryNext"
    }
}

function perorder200(orderType, pay, stock){
    if(orderType == 2 && pay){
        console.log("购买成功，获得50元优惠券")
    }
    else {
        return "tryNext"
    }
}

function normalOrder(orderType, pay, stock){
    if(stock>0){
        console.log("购买成功，无优惠券")
    } 
    else {
        console.log("无货，无法购买")
    }
}

function chainGetOrder(){
    var fns = [perorder500,perorder200,normalOrder]
    var self = this
    for(var i=0; i<fns.length; i++){
        if(fns[i].apply(self, arguments) != "tryNext")
            break;
    }
}

chainGetOrder(1, 1, 0)
chainGetOrder(1, 0, 1)
chainGetOrder(1, 0, 0)

console.log("- - - - - - - - - - -")

// 3. 手机订单 职责链模式 书中的方法 AOP?

function perorder500(orderType, pay, stock){
    if(orderType == 1 && pay){
        console.log("购买成功，获得100元优惠券")
    }
    else {
        return "tryNext"
    }
}

function perorder200(orderType, pay, stock){
    if(orderType == 2 && pay){
        console.log("购买成功，获得50元优惠券")
    }
    else {
        return "tryNext"
    }
}

function normalOrder(orderType, pay, stock){
    if(stock>0){
        console.log("购买成功，无优惠券")
    } 
    else {
        console.log("无货，无法购买")
    }
}

// addNext, 将前、后两个函数封入闭包，返回的新函数尝试调用前函数，符合预设条件时调用后函数。
Function.prototype.addNext = function (fn) {
    var self = this 
    return function() {
        if(self.apply(this, arguments) == "tryNext")
            return fn.apply(this, arguments)
    }
}

var chainGetOrder2 = perorder500.addNext(perorder200).addNext(normalOrder)


chainGetOrder2(1, 1, 0)
chainGetOrder2(1, 0, 1)
chainGetOrder2(1, 0, 0)

console.log("- - - - - - - - - - -")

// 4. 异步职责链

function f1(num, callback){
    setTimeout(function(){
        num += 1
        console.log('f1 : ', num)
        callback(num)
    }, 1000)
}

function f2(num, callback){
    setTimeout(function(){
        num += 2
        console.log('f2 : ', num)
        callback(num)
    }, 1000)
}

function f3(num){
    setTimeout(function(){
        num += 3
        console.log('f3 : ', num)
        // callback(num)
    }, 1000)
}

Function.prototype.syncNext = function (fn) {
    var self = this
    return function(){
        // var args = Array.prototype.push.call(arguments, fn)
        self.call(this, arguments[0], fn)
    }
}

var syncFun = f1.syncNext(f2.syncNext(f3))

//syncFun(0)

console.log("- - - - - - - - - - -")

Function.prototype.syncAfter = function(fn){
    var self = this
    return function(){
        // var args = Array.prototype.push.call(arguments, self)
        arguments[arguments.length] = self
        arguments.length += 1
        //console.log(args, arguments)
        fn.apply(this, arguments)
    }
}

var syncFun2 = f3.syncAfter(f2).syncAfter(f1)

syncFun2(1)