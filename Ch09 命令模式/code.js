// document.getElementById('TITLE').innerHTML = "Ch09 命令模式"

// 1. 按钮不知道自己要干什么，按照约定执行命令的一个属性
    //命令 command 接收者 reveiver 
    var btn1 = {}

    var sbody = {
        yell: function(){
            console.log("I'm here!")
        }
    }

    var cmd1 = {
        execute: function () {
            sbody.yell()
        }
    }

    function setCommand1(obj, cmd){
        obj.onclick = function(){
            cmd.execute()
        }
    }

    setCommand1(btn1, cmd1)
    // console.log(btn1)
    btn1.onclick()

// 2. 带 undo redo 功能的command

    var btn2 = {}

    var sb2 = {
        height: 50,
        yell: function(){
            console.log("I'm here!")
        },
        grow: function(value){
            this.height += value
        },
        show: function(){console.log('height is', this.height)}
    }

    var cmd2 = (function(){
        var history = []
        var future = []
        return {
            execute: function (value) {
                history.push({H: sb2.height, V: value})
                future = []
                sb2.grow(value)
            },
            undo: function(){
                if(history.length ==0) return;
                var status = history.pop()
                future.push(status)
                sb2.height = status.H
            },
            redo: function(){
                if(future.length ==0) return;
                var status = future.pop()
                history.push(status)
                sb2.grow(status.V)
            }
        }
    })()

    function setCommand2(obj, cmd){
        obj.do = function(value){
            cmd.execute(value)
        }
        obj.undo = function(){
            cmd.undo()
        }
        obj.redo = function(){
            cmd.redo()
        }
    }

    setCommand2(btn2, cmd2)
    sb2.show() //50
    btn2.do(30)
    sb2.show() //80
    btn2.do(20)
    sb2.show() //100
    btn2.undo()
    sb2.show() //80
    btn2.undo()
    sb2.show() //50
    btn2.undo()
    sb2.show() //50
    btn2.redo()
    sb2.show() //80
    btn2.redo()
    sb2.show() //100
    btn2.undo()
    btn2.do(40)
    sb2.show() //120
    btn2.redo()
    sb2.show() //120

    console.log("- - - - - - - - - - - - - - - ")

// 3. 队列功能的cmd
    var btn3 = {}  // 没用上啊

    var sb3 = {
        busy: 0,
        goto: function(station, callback){
            this.busy = 1
            console.log('Going to ', station, '...')
            var self = this
            setTimeout(function(){
                console.log('Reach ', station)
                self.busy = 0
                callback()
            }, 2000)
        }
    }

    var cmd3 = (function(sb){
        var stations = []
        return {
            add: function(station){
                stations.push(station)
                if(!sb.busy){
                    this.go()
                }
                return this
            },
            go: function(){
                if(stations.length == 0) return
                var stat = stations.shift()
                var self = this
                sb.goto(stat, function(){
                    self.go()
                })
            }
        }
    })(sb3)

    cmd3.add(1).add(2).add(3)

    cmd3.add(5).add(6)