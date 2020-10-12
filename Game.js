var cvs=document.getElementById('cvs');
var ctx=cvs.getContext('2d');
var game=null;
game=new Games();
game.update();
var time = 150;
function test(){
    setInterval(function() {
        time--;
        document.querySelector("#time").innerHTML = time + "秒";
        if(time == 0) {
            self.location='cg.html';
        }
    }, 1000);
}

function Games() {
    var _this=this;
    this.man=new Man();
    this.enemies=[];
    this.count=0;
    this.time=
    _this.enemies.push(new Enemy());
    this.update=function () {
        ctx.clearRect(0,0,cvs.width,cvs.height);

        _this.enemies.forEach(function (t) {
            t.draw();
            if (t.x>_this.man.x){
                t.frames=1;
                t.frame= ++ t.frame >=4 ? 0 : t.frame;
                t.x-=1;
            }else if(t.x<_this.man.x){
                t.frames=2;
                t.frame= ++ t.frame >=4 ? 0 : t.frame;
                t.x+=1;
            }else  if (t.y>_this.man.y){
                t.frames=3;
                t.frame= ++ t.frame >=4 ? 0 : t.frame;
                t.y-=1;
            }else if(t.y<_this.man.y){
                t.frames=0;
                t.frame= ++ t.frame >=4 ? 0 : t.frame;
                t.y+=1;
            }else if (Math.abs(t.x-_this.man.x)<40&&Math.abs(t.x-_this.man.x)<40){
                console.log(t.x ,_this.man.x);
                _this.count+=1;
                _this.man.x=Math.floor(Math.random()*930+10);
                _this.man.y=Math.floor(Math.random()*640+10);
                if (_this.count==3){
                    self.location='js.html';
                }
            }
        });
            _this.man.draw();
            _this.man.updateJudge();
        window.requestAnimationFrame(_this.update);
    }
}
//创建人物
function Man() {
    var _this=this;
    this.x=400;
    this.y=0;
    this.frame=0;
    this.frames=0;
    this.dead=false;
    var img=new Image();
    img.src="img/NPC2.png";
    this.draw=function () {
        ctx.beginPath();
        ctx.drawImage(img,img.width/4* _this.frame,img.height/4* _this.frames,img.width/4,img.height/4,_this.x,_this.y,img.width/4,img.height/4);
    };
    document.onkeydown=function (e) {
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
    this.updateJudge=function () {
        console.log(_this.x);
        console.log(_this.y);
        if(_this.x==-10 &&_this.y>=-10&&_this.y<=750)
        {
            _this.moveLeft=false;
        }else {
            _this.moveLeft=true;
        }
        if(_this.x==960&&_this.y>=-10&&_this.y<=680){
            _this.moveRright=false;
        }else {
            _this.moveRright=true;
        }
        if( _this.x>=-10 && _this.y==-10&&_this.x<1000)
        {
            _this.moveTop=false;
        } else {
            _this.moveTop=true;
        }
        if(_this.x>=-10 &&_this.x<=960 && _this.y==680)
        {
            _this.moveButtom=false;
        }else {
            _this.moveButtom=true;
        }
        /*if(_this.x<225&&_this.y>800){
            self.location='last.html';
        }*/
    };
}
//创建人物
function Enemy() {
    var _this=this;
    this.x=600;
    this.y=650;
    this.frame=0;
    this.frames=0;
    this.dead=false;
    var img=new Image();
    img.src="img/bs.png";
    this.draw=function () {
        ctx.beginPath();
        ctx.drawImage(img,img.width/4* _this.frame,img.height/4* _this.frames,img.width/4,img.height/4,_this.x,_this.y,img.width/4,img.height/4);
    };
}