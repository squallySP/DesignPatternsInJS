// document.getElementById('TITLE').innerHTML = "Ch11 享元模式"

// 1. 模特照相

// 剥离外部状态
function Model(type) {
    this.type = type
}
Model.prototype.takePhoto = function(){
    console.log("Taking photo: " + this.type + ' in ' + this.cloth)
}
Model.prototype.dress = function (cloth) {
    this.cloth = cloth
    return this
}

// 工厂进行对象的实例化，其中的models可以视为对象池
var ModelFactory = (function () {
    var models = {}
    return {
        create: function(type){
            if(!models[type]){
                models[type] = new Model(type)
            }
            return models[type]
        }
    }
})()

// 管理器封装外部状态
var photoManager = (function () {
    var photoDB = {}
    return {
        add: function(id, type, cloth){
            photoDB[id] = {
                type: type,
                cloth: cloth,
            }
            return this
        },
        setExternalState: function(id, flyWeight) {
            var data = photoDB[id]
            for (var addr in  data) {
                flyWeight[addr] = data[addr]
            }
        },
        takePhoto: function (id) {
            ModelFactory.create(photoDB[id].type).dress(photoDB[id].cloth).takePhoto()
        },
        takePhotos: function () {
            for(var id in photoDB){
                this.takePhoto(id)
            }
        }
    }
})()

photoManager.add('a001', '男', '羽绒服')
            .add('a002', '男', 'T恤衫')
            .add('a003', '女', '泳装')
            .add('a005', '女', '睡衣')
            .add('a004', '男童', '运动服')
            .add('a006', '男', '棉服')

photoManager.takePhotos()
