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

// console.log('没有代理')
// var s = new Source()
// s.setTime(3)


function ProxySource(){
  var s = new Source()
  this.setTime = function(t){
    console.log('loading...')
    s.setTime(t)
  }
}
console.log('使用代理')
var ps = new ProxySource()
ps.setTime(4)
