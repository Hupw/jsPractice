/*
使用方法：

使用new nav.LevelNav(obj)创建一个新的单列下拉菜单
其中obj为：
    obj = {id: 'id'};

****************************************************************

变量(带有*的变量与方法为外部接口)：

nav.LevelNav
    properties:
        id * 要创建单列下拉菜单的ul的id
        li
        ul
    methods:
        expose
        hide
        addEvent
        init
        create
 */
var nav = {};
nav.LevelNav = function(obj){
    try{
        if(typeof obj.id !== 'string'){
            throw "ERROR: need right id";
        }
        this.ul = document.getElementById(obj.id);
    }catch(error){
        console.log(error);
    }
    this.li = this.ul.getElementsByTagName('li');
    this.init();
    this.addEvent();
};
nav.LevelNav.prototype.expose = function() {
    for (var i = 1; i < this.li.length; i++) {
        this.li[i].style.display = 'list-item';
    }
};
nav.LevelNav.prototype.hide = function() {
    for (var i = 1; i < this.li.length; i++) {
        this.li[i].style.display = 'none';
    }
};
nav.LevelNav.prototype.addEvent = function() {
    this.ul.addEventListener('mouseover', this.expose.bind(this));
    this.ul.addEventListener('mouseout', this.hide.bind(this));
};
nav.LevelNav.prototype.init = function(){
    for(var i=1; i<this.li.length; i++){
        this.li[i].style.display = 'none';
    }
};
