document.getElementById('TITLE').innerHTML = "Ch04 单例模式"

// 实现 1
    function Single(value){
        if(Single.me){
            console.log('hit')
            return Single.me
        }
        else {
            if(value)
                this.value = value
            else 
                this.value = 0

            Single.me = this
        }

    }
    Single.prototype.add = function (value){
        if(!value)
            return this.value
        this.value += value
        return
    }
// test 1
    var t1 = new Single()
    var t2 = new Single()
    console.log(t1, t2, ' EQUAL?' , t1 === t2)

// 实现2      可以动态使用不同的类
    function SingleNew(){
        // console.log(theClass)
        var theClass = Array.prototype.shift.call(arguments)
        var className = theClass.toString()
        if(SingleNew[className]){
            console.log( '  = SingleNew hit')
            return SingleNew[className]
        }

        function creat(theClass){
            function F(args){
                theClass.apply(this, args)
            }
            F.prototype = theClass.prototype

            return function(){
                return new F(arguments)
            }
        }

        return SingleNew[className] = creat(theClass)(arguments)

    }
// test2
    function C1(v){this.name = 'C1'; this.v = v }
    function C2(v){this.name = 'C2'; this.v = v }

    var c11 = SingleNew(C1,1)
    var c12 = SingleNew(C1,2)
    console.log(c11, c12, ' EQUAL?' , c11 === c12)

    var c21 = SingleNew(C2,22)
    var c22 = SingleNew(C2,11)
    console.log(c21, c22, ' EQUAL?' , c21 === c22)

    console.log(SingleNew)

