document.getElementById('TITLE').innerHTML = "Ch07 迭代器模式"

// for 和 迭代器的差异
// 1、对一个数字数组求和，
var l = [1,2,3,4,5,6,7,8,9,10]

function add(a, b){ return a+b}
// for 方法
var sum = 0
for(var i=0; i<l.length;i++){
    sum = add(sum, l[i])
}
console.log(sum)

// 迭代器方法
var sum = 0
l.forEach(function(value){
    sum = add(sum, value)
})
console.log(sum)

// 2. 双数组求和
var l1 = [1,2,3,4,5,6,7,8,9,0]
var l2 = [0,9,8,7,6,5,4,3,2,1]

var l = []
for(var i=0;i<l1.length; i++){
    l.push(l1[i]+l2[i])
}
console.log(l)
var l = []
l1.forEach(function(value, i) {
    l.push(value+l2[i])
})
console.log(l)

// 用递归来实现

var l = [1,2,3,4,5,6,7,8,9,10]
function add2(){
    if(arguments.length == 1){
        return arguments[0]
    }
    else{
        return arguments[0] + //arguments.callee.apply(null, arguments.slice(1))
            arguments.callee.apply(null, Array.prototype.slice.call(arguments, 1))
    }
}

console.log(add2.apply(null, l))

var l1 = [1,2,3,4,5,6,7,8,9,0]
var l2 = [0,9,8,7,6,5,4,3,2,1]
var l3 = [1000,100,100,100,100,100,100,100,100,1000]

function addArray1(){
    if(arguments.length == 1){
        return arguments[0]
    }
    else {
        var l1 = Array.prototype.shift.apply(arguments)
        var newl = arguments.callee.apply(this, arguments)
        var l = []
        for(var i=0; i<l1.length; i++){
            l.push(l1[i] + newl[i])
        }
        return l
    }
}

console.log(addArray1(l1, l2))
console.log(addArray1(l1, l2, l3))

function addArray2(){
    var l = []
    for(var i=0; i<arguments[0].length; i++){
        var args = []
        for(var j=0; j<arguments.length; j++){
            args.push(arguments[j][i])
        }
        l.push(add2.apply(null, args))
    }
    return l
}
console.log(addArray2(l1, l2))
console.log(addArray2(l1, l2, l3))