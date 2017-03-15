document.getElementById('TITLE').innerHTML = "Ch06 代理模式"

// 1 图片的加载
  // 实际上，就是当执行一个比较费时的操作时，为了提升用户体验，
  // 向用户展示“loading”信息。

  function Source() {
    this.onload = function(){
      console.log("Source loaded.")
    }
    this.ready = false

    var self = this
    this.setTime = function(t){
      self.ready = false
      setTimeout(function(){
        self.onload()
        self.ready = true
      }, t*1000)
    }
  }

  (function (){
    // console.log('没有代理')
    // var s = new Source()
    // s.setTime(3)
  })()



  function ProxySource(){
    var s = new Source()
    this.setTime = function(t){
      console.log('loading...')
      s.setTime(t)
    }
  }
  (function (){
    // console.log('使用代理')
    // var ps = new ProxySource()
    // ps.setTime(4)
  })

// 2 合并请求 延时发送
  // 在web领域，反复发送http请求的资源消耗比较大，
  // 合并后延时发送可以有效节约资源

  function sender() {
    return {
      send: function(cmd){
        console.log(cmd)
      }
    }
  }

  function proxySender() {
    var cache = []
    var caching = false
    var mySender = sender()

    return {
      send: function (cmd) {
        if(! caching){
          caching = true
          setTimeout(function(){
            mySender.send(cache.join(','))
            cache.length = 0
            caching = false
          }, 2000)
        }
        cache.push(cmd)
      }
    }
  }

  var s1 = sender()
  s1.send('cmd1')
  s1.send('cmd2')
  s1.send('cmd3')
  s1.send('cmd4')
  s1.send('cmd5')
  s1.send('cmd6')
  var s2 = proxySender()
  s2.send('cmd1')
  s2.send('cmd2')
  s2.send('cmd3')
  s2.send('cmd4')
  s2.send('cmd5')
  s2.send('cmd6')

// 3. 虚拟代理实现惰性加载
  // 实现一个延迟加载的信息输出窗口
  // 下面的实现没有使用 虚拟代理方法，而是用闭包来实现了
  // 书中的方法，是延迟加载js文件，在加载js文件之前，用一个同名同接口的对象来替代
  // 实际js中生成的对象，并对数据进行缓存，从而实现惰性加载的目的。
  var myConsole = (function (){
    var cache = []
    var div = undefined
    var logMsg = function(msg) {
      var p = document.createElement('p')
      p.innerHTML = msg
      div.appendChild(p)
    }

    return {
      log: function(msg){
        if(div){
          logMsg(msg)
        }
        else {
          cache.push(msg)
        }
      },
      show: function(){
        if(div)
          return
        div = document.createElement("div")
        div.innerHTML = '<h2>myConsole</h2>'
        document.getElementsByTagName('body')[0].appendChild(div)
        cache.forEach(function(msg){
          logMsg(msg)
        })
      }
    }
  })()

  myConsole.log(1)
  myConsole.log(2)
  myConsole.log(3)
  myConsole.show()
  myConsole.log(44)
  myConsole.log(444)
  myConsole.log(4444)

