var cvs=document.getElementById('cvs');
var ctx=cvs.getContext('2d');
var count=0;
var monster1=new Image();
monster1.src='img/1.png';
var monster2=new Image();
monster2.src='img/2.png';
var monster3=new Image();
monster3.src='img/3.png';
var monster4=new Image();
monster4.src='img/4.png';
var monster5=new Image();
monster5.src='img/5.png';
var monster6=new Image();
monster6.src='img/6.png';
var monster7=new Image();
monster7.src='img/7.png';
var monster8=new Image();
monster8.src='img/8.png';
var monster9=new Image();
monster9.src='img/9.png';
var monster10=new Image();
monster10.src='img/10.png';
var trap1=new Image();
trap1.src='img/bx.png';
var trap2=new Image();
trap2.src='img/bxg.png';
var tops=new Image();
tops.src='img/file.png';
var game=null;
game=new Game();
game.update();

function Game() {
    var _this=this;
    var m=0;
    var v=2;
    this.life=3;
    this.man=new Man();
    this.mon=[];
    this.traps=[];
    this.Invincible=[];
    this.bulltes=[];
    this.frame=0;
    this.lastFrame=0;
    this.CDCode=60;
    this.Life=function () {
        if (_this.life<1){
            window.location.reload();
          self.location='js.html';
        }
    };
    this.update=function () {
        ctx.clearRect(0,0,cvs.width,cvs.height);
        m++;
        //调用怪物图片
        if(m<v){
            _this.mon.push(new Monster(400,400,0,2,400,400,200,520,1,monster1,0,1));
            _this.mon.push(new Monster(600,300,0,2,80,900,300,300,1,monster2,1,0));
            _this.mon.push(new Monster(150,150,0,2,80,850,150,150,1,monster3,1,0));
            _this.mon.push(new Monster(650,350,0,2,84,850,350,350,1,monster4,1,0));
            _this.mon.push(new Monster(700,650,0,2,700,700,600,750,1,monster5,0,1));
            _this.mon.push(new Monster(700,490,0,2,700,700,300,500,1,monster6,0,1));
            _this.mon.push(new Monster(690,490,0,2,450,950,490,490,1,monster7,1,0));
            _this.mon.push(new Monster(514,680,0,2,514,514,640,750,1,monster8,0,1));
            _this.mon.push(new Monster(256,770,0,2,248,256,725,850,1,monster9,0,1));
            _this.mon.push(new Monster(300,710,0,2,300,480,710,710,1,monster10,1,0));
            _this.Invincible.push(new Trap(Math.floor(Math.random()*800+100),Math.floor(Math.random()*300+200),trap1));
            _this.traps.push(new Trap(Math.floor(Math.random()*800+100),Math.floor(Math.random()*300+200),trap2));
            _this.traps.push(new Trap(Math.floor(Math.random()*800+100),Math.floor(Math.random()*300+200),trap2));
            _this.traps.push(new Trap(Math.floor(Math.random()*800+100),Math.floor(Math.random()*300+200),trap2));
            _this.Invincible.push(new Trap(Math.floor(Math.random()*800+100),Math.floor(Math.random()*300+200),trap2));
            _this.traps.push(new Trap(Math.floor(Math.random()*800+100),Math.floor(Math.random()*300+200),trap2));
            _this.Invincible.push(new Trap(Math.floor(Math.random()*800+100),Math.floor(Math.random()*300+200),trap2));
            _this.traps.push(new Trap(Math.floor(Math.random()*800+100),Math.floor(Math.random()*300+200),trap2));
            _this.traps.push(new Trap(Math.floor(Math.random()*800+100),Math.floor(Math.random()*300+200),trap2));
        }
        _this.traps.forEach(function (t, n) {
           t.draw();
            if(Math.abs(_this.traps[n].x-_this.man.x)<=15&&Math.abs(_this.traps[n].y-_this.man.y)<=15) {
                t.updateStatus();
                _this.man.x=400;
                _this.man.y=0;
                _this.life--;
                _this.traps.splice(n,1);
            }
        });
        _this.Invincible.forEach(function (t, n) {
            t.draw();
            if(Math.abs(_this.Invincible[n].x-_this.man.x)<=25&&Math.abs(_this.Invincible[n].y-_this.man.y)<=25) {
                t.updateStatus();
                _this.life+=2;
                _this.man.x=370;
                _this.man.y=775;
            }
        });
        //生成怪物并判断
        _this.mon.forEach(function (t,val) {
            t.draw();
            t.updatePos();
            if(t.dead1){
                _this.mon.splice(index,1);
            }
            var dx=Math.abs(_this.mon[val].positionX-_this.man.x);
            var dy=Math.abs(_this.mon[val].positionY-_this.man.y);
            if(dx<=33&&dy<=33){
                _this.man.x=400;
                _this.man.y=0;
                _this.life--;
            }
        });
        console.log(_this.life);
        _this.man.draw();
        _this.man.updateJudge();
        _this.Life();
        window.requestAnimationFrame(_this.update);
    };
}
//创建人物
function Man() {
    var _this=this;
    this.x=400;
    this.y=0;
    this.frame=0;
    this.frames=0;
    this.dead=false;
    this.skill=2;
    var img=new Image();
    img.src="img/NPC2.png";
    this.draw=function () {
        ctx.beginPath();
        ctx.drawImage(img,img.width/4* _this.frame,img.height/4* _this.frames,img.width/4,img.height/4,_this.x,_this.y,img.width/4,img.height/4);
    };
    //键盘控制
    document.onkeydown=function (e) {
        //_this.frame= ++ _this.frame >=4 ? 0 : _this.frame;
        if (e.keyCode==37){
            _this.frames=1;
            _this.frame= ++ _this.frame >=4 ? 0 : _this.frame;
            if(_this.moveLeft) {
                _this.x-=1;
            }
        }else if (e.keyCode==38){
            _this.frames=3;
            _this.frame= ++ _this.frame >=4 ? 0 : _this.frame;
            if(_this.moveTop) {
                _this.y-=1;
            }
        }else if (e.keyCode==39){
            _this.frames=2;
            _this.frame= ++ _this.frame >=4 ? 0 : _this.frame;
            if (_this.moveRright){
                _this.x+=1;
            }
        }else if (e.keyCode==40){
            _this.frames=0;
            _this.frame= ++ _this.frame >=4 ? 0 : _this.frame;
            if (_this.moveButtom){
                _this.y+=1;
            }
        }
    };
    //判断位置
    this.updateJudge=function () {
        if((_this.x==355 &&_this.y>=-45&& _this.y<=108)||(_this.x==127&&_this.y>=79&&_this.y<=121)
            ||(_this.x==79&&_this.y>=121&&_this.y<=500)||(_this.x==683&&_this.y>=254&&_this.y<=281)||(_this.x==836&&_this.y>=500&&_this.y<=527)
            ||(_this.x==729&&_this.y>=500&&_this.y<=623)||(_this.x==649&&_this.y>=86&&_this.y<=108)||(_this.x==128&&_this.y>=500&&_this.y<=551)
            ||(_this.x==881&&_this.y>=255&&_this.y<=279)||(_this.x==563&&_this.y>=728&&_this.y<=755)||(_this.x==413&&_this.y>=755&&_this.y<=777)
            ||(_this.x==311&&_this.y>=777&&_this.y<=838)||(_this.x==423&&_this.y>=623&&_this.y<=649)||(_this.x==229&&_this.y>=649&&_this.y<=777)
        ){
            _this.moveLeft=false;
        }else {
            _this.moveLeft=true;
        }
        if((_this.x==485&&_this.y>=-45&&_this.y<=52)||(_this.x==412&&_this.y>=52&&_this.y<=108)||(_this.x==662&&_this.y>=86&&_this.y<=126)
            ||(_this.x==867&&_this.y>=128&&_this.y<=256)||(_this.x==813&&_this.y>=255&&_this.y<=282)||(_this.x==488&&_this.y>=254&&_this.y<=281)
            ||(_this.x==915&&_this.y>=255&&_this.y<=364)||(_this.x==960&&_this.y>=364&&_this.y<=500)||(_this.x==866&&_this.y>=500&&_this.y<=527)
            ||(_this.x==765&&_this.y>=500&&_this.y<=568)||(_this.x==807&&_this.y>=568&&_this.y<=599)||(_this.x==868&&_this.y>=600&&_this.y<=674)
            ||(_this.x==143&&_this.y>=79&&_this.y<=106)||(_this.x==466&&_this.y>=527&&_this.y<=551)||(_this.x==568&&_this.y>=500&&_this.y<=527)
            ||(_this.x==792&&_this.y>=674&&_this.y<=701)||(_this.x==744&&_this.y>=702&&_this.y<=728)
        ){
            _this.moveRright=false;
        }else {
            _this.moveRright=true;
        }
        if((_this.x>=355 && _this.x<=485 && _this.y==-45)||(_this.x>=421&&_this.x<=649&&_this.y==108)||(_this.x>=649&&_this.x<=662&&_this.y==86)
            ||(_this.x>=143&&_this.x<=367&&_this.y==106) ||(_this.x>=127 && _this.x<=143 && _this.y==79)||(_this.x>=127 && _this.x<=143 && _this.y==79)
            ||(_this.x>=76 && _this.x<=127 && _this.y==121)||(_this.x>=76 && _this.x<=127 && _this.y==121)||(_this.x>=488 && _this.x<=683 && _this.y==121)
            ||(_this.x>=813 && _this.x<=881 && _this.y==281)||(_this.x>=881 && _this.x<=915 && _this.y==255) ||(_this.x>=229 && _this.x<=423&& _this.y==649)
            ||(_this.x>=79 && _this.x<=229 && _this.y==777) ||(_this.x>=423 && _this.x<=729&& _this.y==623)
        ){
            _this.moveTop=false;
        } else {
            _this.moveTop=true;
        }
        if((_this.x>=412 && _this.x<=485 && _this.y==52)||(_this.x>=866 && _this.x<=960 && _this.y==500)||(_this.x>=836 && _this.x<=866 && _this.y==527)
            ||(_this.x>=765 && _this.x<=836 && _this.y==500)||(_this.x>=568 && _this.x<=730 && _this.y==500)||(_this.x>=466 && _this.x<=568 && _this.y==527)
            ||(_this.x>=128 && _this.x<=466 && _this.y==551)||(_this.x>=79 && _this.x<=128 && _this.y==500)||(_this.x>=488 && _this.x<=683 && _this.y==254)
            ||(_this.x>=881 && _this.x<=890 && _this.y==267)||(_this.x>=813 && _this.x<=881 && _this.y==255)||(_this.x>=792 && _this.x<=868 && _this.y==674)
            ||(_this.x>=744 && _this.x<=792&& _this.y==702)||(_this.x>=563 && _this.x<=744 && _this.y==728)||(_this.x>=413 && _this.x<=563 && _this.y==755)
            ||(_this.x>=311 && _this.x<=777&& _this.y==777)||(_this.x>=81 && _this.x<=311 && _this.y==838)||(_this.x>=423 && _this.x<=729 && _this.y==623)
        ){
            _this.moveButtom=false;
        }else {
            _this.moveButtom=true;
        }
        if(_this.x<225&&_this.y>800){
            self.location='last.html';
        }
    };
}
//创建怪物
function Monster(positionX,positionY,frame1,frames1,x1,x2,y1,y2,speed,img1,xFrame,yFrame) {
    var _this = this;
    this.positionX = positionX;
    this.positionY = positionY;
    this.frame1=frame1;
    this.frames1=frames1;
    this.x1=x1;
    this.x2=x2;
    this.y1=y1;
    this.y2=y2;
    this.dead1=false;
    this.xFrame=xFrame;
    this.yFrame=yFrame;
    this.speed = speed;
    this.draw=function () {
        ctx.beginPath();
        ctx.drawImage(img1,img1.width/4* _this.frame1,img1.height/4* _this.frames1,img1.width/4,img1.height/4,_this.positionX,_this.positionY,img1.width/4,img1.height/4);
    };
    this.updatePos = function () {
        var dt=1;
        count++;
        if (count=4){
            _this.frame1= ++ _this.frame1 >=4 ? 0 : _this.frame1;
        }
         if (_this.xFrame==1&&_this.yFrame==0){
             if (_this.positionX==_this.x1){
                 _this.frames1=2;
                 _this.speed=1;
             }else if(_this.positionX==_this.x2){
                 _this.frames1=1;
                 _this.speed=-1;
             }
             _this.positionX=_this.positionX+_this.speed*dt;
         }
         if (_this.yFrame==1&&_this.xFrame==0){
             if (_this.positionY==_this.y1){
                 _this.frames1=0;
                 _this.speed=1;
             }else if(_this.positionY==_this.y2){
                 _this.frames1=3;
                 _this.speed=-1;
             }
             _this.positionY=_this.positionY+_this.speed*dt;
         }
    };
}
//宝箱
function Trap(x,y,img) {
    var _this=this;
    _this.x=x;
    _this.y=y;
    _this.frames1=0;
    _this.frame1=0;
    _this.hide=true;
    this.draw=function () {
        ctx.beginPath();
        ctx.drawImage(img,img.width/4* _this.frame1,img.height/4* _this.frames1,img.width/4,img.height/4,_this.x,_this.y,img.width/4,img.height/4);
    };
    this.updateStatus=function () {
        _this.frames1++;
        if (_this.frames1>4){
            _this.frames1=0;
        }
    }
}
