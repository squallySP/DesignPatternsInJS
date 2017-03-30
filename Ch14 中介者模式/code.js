// document.getElementById('TITLE').innerHTML = "Ch14 中介者模式"

// 1. 自己想办法实现一个网络版俄罗斯方块
    // 按颜色分队，每对有若干队员
    // 当某队的队员全部失败后，团队判负，对方判胜

function Player(name, team) {
    this.name = name
    this.team = team
    this.status = 1
}
Player.prototype.lost = function () {
    this.status = 0
    this.team.playerLost(this)
}
Player.prototype.reset = function () {
    this.status = 1
}

function Team(name) {
    this.name = name
    this.members = {}
    this.enemyTeam = null
}
Team.prototype.VS = function (enemyTeam) {
    this.enemyTeam = enemyTeam
    enemyTeam.enemyTeam = this
}
Team.prototype.addPlayer = function (player){
    if(player.name in this.members)
        return
    this.members[player.name] = player
    player.team = this
    return this
}
Team.prototype.playerLost = function (player){
    for(var p in this.members){
        if(this.members[p].status)
            return
    }
    this.lost()
    this.enemyTeam.win()
}
Team.prototype.lost = function (){
    console.log('Team', this.name, 'is lost.')
    for(var p in  this.members){
        console.log(p, 'is lost.')
        this.members[p].reset()
    }
}
Team.prototype.win = function (){
    console.log('Team', this.name, 'is win.')
    for(var p in  this.members){
        console.log(p, 'is win.')
        this.members[p].reset()
    }
}

var p1 = new Player('p1')
var p2 = new Player('p2')
var p3 = new Player('p3')
var p4 = new Player('p4')

var teamA = new Team('A')
var teamB = new Team('B')

teamA.addPlayer(p1).addPlayer(p2)
teamB.addPlayer(p3).addPlayer(p4)

teamA.VS(teamB)

p1.lost()
p3.lost()
// p2.lost()
p4.lost()
