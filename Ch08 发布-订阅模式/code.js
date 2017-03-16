document.getElementById('TITLE').innerHTML = "Ch08 发布订阅模式"

// 1. 一个提供事件订阅的对象
    var obj = (function () {
        var events = {}
        return {
            addListener: function(eventName, fn){
                if(!events[eventName]){
                    events[eventName] = []
                }
                for(var i = 0; i<events[eventName].length; i++){
                    if(events[eventName][i] == fn){
                        return
                    }
                }
                events[eventName].push(fn)
            },
            trigger: function(eventName, event){
                if(!events[eventName]){
                    return
                }
                events[eventName].forEach(function(fn){
                    fn.call(event, event)
                })
            },
            removeListener: function(eventName, fn){
                if(!events[eventName] || !fn in events[eventName]){
                    return
                }
                events[eventName].forEach(function(f, i){
                    if(f == fn){
                        events[eventName].splice(i,1)
                    }
                })
            }
        }
    })()

    function f1(e){console.log(['[f1]got alarm', e])}
    function f2(e){console.log(['[f2]got alarm', e])}
    obj.addListener('alarm', f1)
    obj.trigger('alert', 911)
    obj.trigger('alarm', 119)
    obj.addListener('alarm', f2)
    obj.trigger('alert', 9111)
    obj.trigger('alarm', 1191)
    obj.removeListener('alarm', f1)
    obj.trigger('alarm', 1192)
    
    console.log('- - - - - - - - -')

// 2. 为任意对象添加事件发布订阅功能
    function addEvent(obj) {
        if(obj._events)
            return
        obj._events = {}
        obj.addListener = function (eventName, fn) {
            if(!this._events[eventName]){
                this._events[eventName] = []
            }
            for(var i = 0; i<this._events[eventName].length; i++){
                if(this._events[eventName][i] == fn){
                    return
                }
            }
            this._events[eventName].push(fn)
        }
        obj.trigger = function (eventName, event) {
            if(!this._events[eventName]){
                return
            }
            this._events[eventName].forEach(function(fn){
                fn.call(event, event)
            })
        }
        obj.removeListener = function(eventName, fn){
                if(!this._events[eventName] || !fn in this._events[eventName]){
                    return
                }
                var self = this
                this._events[eventName].forEach(function(f, i){
                    if(f == fn){
                        self._events[eventName].splice(i,1)
                    }
                })
            }
    }

    var obj2 = {}
    addEvent(obj2)
    obj2.addListener('alarm', f1)
    obj2.trigger('alert', 2911)
    obj2.trigger('alarm', 2119)
    obj2.addListener('alarm', f2)
    obj2.trigger('alert', 29112)
    obj2.trigger('alarm', 21192)
    obj2.removeListener('alarm', f1)
    obj2.trigger('alert', 29113)
    obj2.trigger('alarm', 21193)

    console.log('- - - - - - - - -')


// 3. 一个全局事件对象 Event，提供事件的发布和订阅功能
    // 1 中的obj 本身就是一个全局对象，重命名为 Event即可


// 4. 带命名空间的全局 Event

    var Event = (function () {
        var nameSpaces = {
            _default_ : {}
        }
        var events = nameSpaces._default_
        return{
            addListener: function(eventName, fn){
                if(!events[eventName]){
                    events[eventName] = []
                }
                for(var i = 0; i<events[eventName].length; i++){
                    if(events[eventName][i] == fn){
                        return this
                    }
                }
                events[eventName].push(fn)
                return this
            },
            trigger: function(eventName, event){
                if(!events[eventName]){
                    return this
                }
                events[eventName].forEach(function(fn){
                    fn.call(event, event)
                })
                return this
            },
            removeListener: function(eventName, fn){
                if(!events[eventName] || !fn in events[eventName]){
                    return this
                }
                events[eventName].forEach(function(f, i){
                    if(f == fn){
                        events[eventName].splice(i,1)
                    }
                })
                return this
            },
            ns: function(namespace){
                namespace = namespace || "_default_"
                if(nameSpaces[namespace] == undefined){
                    nameSpaces[namespace] = {}
                }
                events = nameSpaces[namespace]
                return this
            }
        }
    })()

    Event.addListener('alarm', f1)
    Event.addListener('alarm', f1)
    Event.addListener('alarm', f2)
    Event.trigger('alarm', 111)

    Event.removeListener('alarm', f1)
    Event.removeListener('alarm', f2)
    Event.trigger('alarm', 222)

    Event.ns('NS1')
    Event.addListener('alarm', f1)
    Event.addListener('alarm', f2)
    Event.ns()

    Event.trigger('alarm', 333)
    Event.ns('NS1').trigger('alarm', 444).ns()