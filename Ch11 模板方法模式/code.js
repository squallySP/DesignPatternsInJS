// document.getElementById('TITLE').innerHTML = "Ch11 模板方法模式"

// 1. coffee or tea  class
function HotDrink() {}
HotDrink.prototype.boilWater = function() {
    console.log('把水烧开')
}
HotDrink.prototype.brew = function() {
    console.log('冲泡')
}
HotDrink.prototype.pourInCap = function() {
    console.log('把饮料倒进杯子')
}
HotDrink.prototype.addCondiments = function() {
    console.log('加调料')
}
HotDrink.prototype.init = function () {
    this.boilWater()
    this.brew()
    this.pourInCap()
    this.addCondiments()
}

function Tea() {}
Tea.prototype = new HotDrink()
Tea.prototype.contrustor = Tea
Tea.prototype.brew = function(){
    console.log('冲泡茶叶')
}
Tea.prototype.addCondiments = function(){
    console.log('加柠檬汁')
}

function Coffee() {}
Coffee.prototype = new HotDrink()
Coffee.prototype.contrustor = Coffee
Coffee.prototype.brew = function(){
    console.log('冲泡咖啡')
}
Coffee.prototype.addCondiments = function(){
    console.log('加牛奶和糖')
}

var d1 = new Tea()
var d2 = new Coffee()
console.log(d1, d2)
d1.init()
d2.init()

console.log("- - - - - - - - - - - - - ")

// 2. coffee or tea  function

function HotDrinkFn(param) {
    return {
        boilWater: function() {
            console.log('把水烧开')
        },
        brew: param.brew,
        pourInCap: function() {
            console.log('把饮料倒进杯子')
        },
        addCondiments: param.addCondiments,
        init: function(){
            this.boilWater()
            this.brew()
            this.pourInCap()
            this.addCondiments()
        }
    }
}

var myTea = HotDrinkFn({
    brew: function () {
        console.log('冲泡茶叶')
    },
    addCondiments: function () {
        console.log('往茶水里面加糖')
    }
})
var myCoffee = HotDrinkFn({
    brew: function () {
        console.log('冲泡咖啡')
    },
    addCondiments: function () {
        console.log('往咖啡里面加糖和牛奶')
    }
})

console.log([myTea, myCoffee])
myTea.init()
myCoffee.init()

console.log("- - - - - - - - - - - - - ")

// 3. shapes

function Shape(){
}
Shape.prototype.transform = function (){
    console.log('图形变换')
}
Shape.prototype.render = function (ctx) {
    this.transform(ctx)
    this.fill(ctx)
    this.stroke(ctx)
}

function Rect(){
    this.name = '矩形'
}
Rect.prototype = new Shape()
Rect.prototype.constructor = Rect
Rect.prototype.fill = function () {
    console.log('矩形填充')
}
Rect.prototype.stroke = function () {
    console.log('矩形描边')
}

var r1 = new Rect()
r1.render()
