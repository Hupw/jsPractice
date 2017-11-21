/*
使用方法:

调用new nav.ElasticNav(obj)创建一个弹性导航
其中obj为:
    obj = {
            className: string,
            width: number,
            maxWidth: number
          };
*****************************************************************

变量(带有*的变量与方法为外部接口)：

ElasticNav(obj)
    properties:
        li 要设置弹性菜单的li元素的伪数组
            timer 定时器
            speed 当前速度
        className * 要设置弹性菜单的li元素的类名
        maxWidth * 弹性菜单最大宽度
        times     0~1对反弹的次数进行设置
        speedOffset   反弹时的速度偏移量
        width * 初始宽度
    methods:
        init 初始化函数
        moveWider
        moveNarrower
        setWider
        setNarrower
        create *
 */
var nav = {};
nav.ElasticNav = function(obj){
    this.create(obj);
};
nav.ElasticNav.prototype.init = function(obj){
    try{
        this.className = obj.className;
        this.maxWidth = obj.maxWidth;
        this.width = obj.width;
        if(typeof this.maxWidth !== 'number'){
            throw "ERROR : need right maxWidth"
        }
        if(typeof this.className !== 'string'){
            throw "ERROR : need right className";
        }
        if(typeof this.width !== 'number'){
            throw "ERROR : need right width";
        }
    }catch(error){
        console.log(error);
    }
    this.li = document.getElementsByClassName(obj.className);
    for(var i=0; i<this.li.length; i++){
        this.li[i].timer = null;
        this.li[i].speed = 0;
    }
    this.times = obj.times || 0.5;
    this.speedOffset = obj.speedOffset || this.width/25;
};

nav.ElasticNav.prototype.moveWider = function(obj,maxWidth){
    obj.speed += this.speedOffset;
    //当当前宽度与目标宽度width十分接近且速度较小时,停止移动
    if(Math.abs(obj.offsetWidth - maxWidth) < 1 && Math.abs(obj.speed) < 1){
        clearInterval(obj.timer);
        obj.timer = null;
    }else{
        //当当前宽度加速度大于width时,对速度进行方向反转和值变小
        if(obj.offsetWidth + obj.speed >= maxWidth){
            obj.speed *= -this.times; //很明显,这个值越小,弹动停止越快
            obj.style.width = maxWidth + 'px'; //设置这个值可以让每一次回弹都到达指定的width
        }else{
            obj.style.width = obj.offsetWidth + obj.speed + 'px';
        }
    }
};
nav.ElasticNav.prototype.moveNarrower = function(obj,width){
    obj.speed -= this.speedOffset;
    if(Math.abs(obj.offsetWidth - width) < 1 && Math.abs(obj.speed) < 1){
        clearInterval(obj.timer);
        obj.timer = null;
    }else{
        if(obj.offsetWidth + obj.speed < width){
            obj.speed *= -this.times;
            obj.style.width = width + 'px';
        }else{
            obj.style.width = obj.offsetWidth + obj.speed + 'px';
        }
    }
};

nav.ElasticNav.prototype.setWider = function(obj){
    if(obj.timer){clearInterval(obj.timer);}
    obj.timer = setInterval(this.moveWider.bind(this,obj,this.maxWidth),30);
};
nav.ElasticNav.prototype.setNarrower = function(obj){
    if(obj.timer){clearInterval(obj.timer);}
    obj.timer = setInterval(this.moveNarrower.bind(this,obj,this.width),30);
};

nav.ElasticNav.prototype.create = function(obj){
    this.init(obj);
    for(var i=0; i<this.li.length; i++){
        var item = this.li[i];
        item.addEventListener('mouseover',this.setWider.bind(this,item));
        item.addEventListener('mouseout',this.setNarrower.bind(this,item));
    }
};
