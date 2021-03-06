document.getElementById('TITLE').innerHTML = "Ch05 策略模式"

// 1. 计算年中奖 bonus。根据工资和绩效等级，计算出年终奖的金额
    // S 4倍，A 3，B 2，同时假设计算方法很复杂，不是简单的不同比率
    function caculateBonus(lv, salary) {
        // console.log(arguments.callee)
        return arguments.callee.strategies[lv](salary)
    }
    caculateBonus.strategies = {
        'S': function (salary) {
            return salary * 4
        },
        'A': function (salary) {
            return salary * 3
        },
        'B': function (salary) {
            return salary * 2
        }
    }

    console.log(caculateBonus('S', 1000)) // 4000
    console.log(caculateBonus('A', 2000)) // 6000
    console.log(caculateBonus('B', 1500)) // 3000

// 2. 动画，运动的小球
    // 书中是控制div的位置，来实现动画，
    // 为了简单起见，在控制台的不同位置打印'o'来模拟
    function showBall(motion, maxPosition, steps) {
        var maxPosition = maxPosition || 100
        var steps = steps || 30
        var sTime = + new Date()
        var positions = arguments.callee.strategies[motion](maxPosition, steps)
        console.log(positions)

        printBall(positions)

        function printBall(positions){
            if(positions.length > 0){
                var pos = parseInt(positions.shift())
                var spaces = ''
                while(pos){
                    spaces += ' '
                    pos -= 1
                }
                console.log(spaces + 'o')
                setTimeout(function (){printBall(positions)}, 50)
                // printBall(positions)
            }
        }
    }
    showBall.strategies = {
        'linear': function(max, steps){
            var result = []
            var i = 0
            while(i<=steps){
                result.push(max*(i/steps))
                i+=1
            }
            return result
        },
        'sin' : function(max, steps){
            var result = []
            var i = 0
            while(i<=steps){
                result.push(max*Math.sin(i/steps*Math.PI))
                i+=1
            }
            return result
        },
        'square' : function(max, steps){
            var result = []
            var i = 0
            while(i<=steps){
                result.push(max*(i/steps)*(i/steps))
                i+=1
            }
            return result
        },
        'square2' : function(max, steps){
            var result = []
            var i = 0
            while(i<=steps){
                if(i<steps/2){
                    result.push(max/2*Math.pow((i/steps*2),2))
                }
                else{
                    result.push(max - max/2*Math.pow((steps-i)/steps*2,2))
                }
                i+=1
            }
            return result
        },
    }

    // showBall('linear', 150, 50)
    // showBall('sin', 150, 50)
    // showBall('square', 150, 50)
    // showBall('square2', 150, 50)

// 3. 数据的校验
    // 书中的样例是对html表单内容的校验，
    // 这里简化为 对象属性 的校验

    function User(name, password, phoneNum) {


        this.name = name
        this.password = password
        this.phoneNum = phoneNum

        this.validate()
    }
    User.prototype.validate = function () {
        var strategies = this.strategies
        var validators = this.validators
        for(var attr in validators) {
            // console.log(attr)
            var value = this[attr]
            validators[attr].forEach(function(rule){
                // console.log(rule)
                var strategy = rule.strategy.split(':')[0]
                var args = rule.strategy.split(':')[1]? rule.strategy.split(':')[1].split(','): []
                args.push(rule.errMsg)
                args.unshift(value)
                strategies[strategy].apply(null, args)
            })
        }
    }
    User.prototype.strategies = {
        'isNonEmpty': function(value, msg){
            if(value === '' || value === undefined || value === null){
                console.error(msg)
                return false
            }
            return true
        },
        'minLength': function(value, length, msg){
            if(value.length < length){
                console.error(msg)
                return false
            }
            return true
        },
        'isPhoneNum': function(){},
    }
    User.prototype.validators = {
        // '属性名': [{'策略名:参数1,参数2','错误信息'}, [下一个策略]]
        'name': [
            {
                strategy: 'isNonEmpty', 
                errMsg: '用户名不可为空'
            },
            {
                strategy: 'minLength:4', 
                errMsg: '用户名长度不可小于4个字符'
            },
        ],
        'password': [
            {
                strategy: 'isNonEmpty', 
                errMsg: '密码不可为空'
            },
            {
                strategy: 'minLength:6', 
                errMsg: '密码长度不可小于6个字符'
            },
        ],
        'phoneNum': [
        ],
    }

    // test
    console.log('u1: ','', '', '123')
    var u1 = new User('', '', '123')
    console.log('u2: ','name', 'abcd', '123')
    var u2 = new User('name', 'abcd', '123')
    console.log('u3: ', 'name', 'abcd123', '123')
    var u3 = new User('name', 'abcd123', '123')

