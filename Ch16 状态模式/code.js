if(this.document){
    document.getElementById('TITLE').innerHTML = "Ch16 状态模式"
}

// 1、第一个例子 电灯 只有两个状态

function Ligth() {
    this.status = 'off'
    this.switch = function() {
        if(this.status == 'off') this.status = 'on';
        else this.status = 'off'
    }
}
var l1 = new Ligth()
l1.switch()
console.log(l1)
l1.switch()
console.log(l1)

// 2, 一个小孩， 三个状态 哭 笑 正常，通过给糖（candy）或打（hit）来转变
        // 用了和1相同的方法，用条件语句来判断，可以见增加一个状态之后，代码明显更加复杂，难以管理

function Kid1(){
    this.s = 'normal' // cry laugh
    this.give = function(item){
        if(this.s == 'normal'){
            if(item == 'candy')     this.s = 'laugh';
            else if(item == 'hit')  this.s = 'cry';
        }
        else if(this.s == 'cry'){
            if(item == 'candy')     this.s = 'normal';
            else if(item == 'hit')  this.s = 'cry';
        }
        else if(this.s == 'laugh'){
            if(item == 'candy')     this.s = 'laugh';
            else if(item == 'hit')  this.s = 'normal';
        }
        console.log("Kid's status is", this.s)
    }
}
var k1 = new Kid1()
k1.give('candy')
k1.give('hit')
k1.give('hit')
k1.give('candy')
console.log('- - - - - - - - - - - - - - -')

// 3 同样是一个爱哭小孩，换一种方法来做
    // 这种方式可以比较清晰容易地管理状态之间的关系
    // 但是尚未实现状态下的方法

function Kid2() {
    this.s = 'normal'
    var statuses = {
        'normal': {
            'candy': 'laugh',
            'hit': 'cry'
        },
        'laugh': {
            'candy': 'laugh',
            'hit': 'normal'
        },
        'cry': {
            'candy': 'normal',
            'hit': 'cry'
        }
    }
    this.give = function(item) {
        this.s = statuses[this.s][item]
        console.log("Kid's status is", this.s)
    }
}


var k2 = new Kid2()
k2.give('candy')
k2.give('hit')
k2.give('hit')
k2.give('candy')
console.log('- - - - - - - - - - - - - - -')

// 4 尝试给爱哭小孩加入行为

function Kid3() {
    this.s = 'normal'
    var statuses = {
        'normal': {
            'candy': 'laugh',
            'hit': 'cry',
            go: function(){console.log('just walk')}
        },
        'laugh': {
            'candy': 'laugh',
            'hit': 'normal',
            go: function(){console.log('run happily')}
        },
        'cry': {
            'candy': 'normal',
            'hit': 'cry',
            go: function(){console.log('go slowly')}
        }
    }
    this.give = function(item) {
        this.s = statuses[this.s][item]
        console.log("Kid's status is", this.s)
    }
    this.go = function(){
        statuses[this.s].go()
    }
}


var k3 = new Kid3()
k3.go()
k3.give('candy')
k3.go()
k3.give('hit')
k3.go()
k3.give('hit')
k3.go()
k3.give('candy')
k3.go()
console.log('- - - - - - - - - - - - - - -')