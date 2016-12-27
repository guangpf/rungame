/*人物主类*/
function person(canvas,cobj,runimg,jumpimg){
    this.canvas=canvas;
    this.cobj=cobj;
    this.runimg=runimg;
    this.jumpimg=jumpimg;
    this.x=0;
    this.y=240;
    this.width=90;
    this.height=150;
    this.status="runimg";
    this.state=0;
    this.zhongli=10;
    this.speedx=5;
    this.num=0;
    this.life=3;
}
person.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.drawImage(this[this.status][this.state],0,0,90,110,0,0,this.width,this.height);
        this.cobj.restore();
    }
}
/*障碍物*/
function hinderimg(canvas,cobj,hinderimg){
    this.canvas=canvas;
    this.cobj=cobj;
    this.hinderimg=hinderimg;
    this.state=0;
    this.width=50;
    this.height=60;
    this.x=canvas.width-20;
    this.y=340;
    this.speedx=6;
}
hinderimg.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.drawImage(this.hinderimg[this.state],0,0,50,60,0,0,this.width,this.height);
        this.cobj.restore();
    }
}
/*粒子动画*/
function lizi(cobj){
    this.cobj=cobj;
    this.x=200;
    this.y=200;
    this.r=1+2*Math.random();
    this.color="red";
    this.speedx=6*Math.random()-3;
    this.speedy=6*Math.random()-3;
    this.zhongli=0.3;
    this.speedr=0.1;
}
lizi.prototype={
    draw:function(){
        var cobj=this.cobj;
        cobj.save();
        cobj.translate(this.x,this.y);
        cobj.beginPath();
        cobj.fillStyle=this.color;
        cobj.arc(0,0,this.r,0,2*Math.PI);
        cobj.fill();
        cobj.restore();
    },
    update:function(){
        this.speedy+=this.zhongli;
        this.x+=this.speedx;
        this.y+=this.speedy;
        this.r-=this.speedr;
    }
}
function xue(cobj,x,y){
     var arr=[];
    for(var i=0;i<30;i++){
        var obj=new lizi(cobj);
        obj.x=x;
        obj.y=y;
        arr.push(obj);
    }
    var t=setInterval(function(){
        for(var i=0;i<arr.length;i++){
            arr[i].draw();
            arr[i].update();
            if(arr[i].r<0){
                arr.splice(i,1);
            }
            if(arr.length==0){
                clearInterval(t);
            }
        }
    },50)
}
/*子弹*/
function bullet(canvas,cobj,zidan){
    this.canvas=canvas;
    this.cobj=cobj;
    this.zidan=zidan;
    this.x=0;
    this.y=0;
    this.width=40;
    this.height=40;
    this.color="green";
    this.speedx=5;
    this.jia=1;
}
bullet.prototype={
    draw:function(){
        var cobj=this.cobj;
        cobj.save();
        cobj.translate(this.x,this.y);
        cobj.drawImage(this.zidan,0,0,40,40,0,0,this.width,this.height);
        cobj.restore();
    }
}
/*游戏主程序*/
function game(canvas,cobj,runimg,jumpimg,hinderimg,runA,jumpA,hitA,fireA,overA,waitA,zidan,scores,blood){
    this.canvas=canvas;
    this.cobj=cobj;
    this.runA=runA;
    this.jumpA=jumpA;
    this.hitA=hitA;
    this.fireA=fireA;
    this.overA=overA;
    this.waitA=waitA;
    this.scores=scores;
    this.blood=blood;
    this.hinderimg=hinderimg;
    this.width=canvas.width;
    this.height=canvas.height;
    this.backx=0;
    this.backSpeed=5;
    this.hinderArr=[];
    this.score=0;
    this.person=new person(canvas,cobj,runimg,jumpimg);
    this.zidan=new bullet(canvas,cobj,zidan);
    this.isfire=false;
    this.name=prompt("请输入玩家名称","guanpengfei");
}
game.prototype={

    play1:function(start,cover,lives,scoresbx){
        var that=this;
        that.waitA.pause();
        that.runA.play();
        var num=0;
        var rand=(2+Math.ceil(6*Math.random()))*1000;
        /*开始界面*/
        start.css("animation","start1 2s ease forwards");
        cover.css("animation","cover1 2s ease forwards");
        lives.fadeIn(600);
        scoresbx.fadeIn(600);
        setInterval(function(){
            num+=50;
            that.person.num++;
            that.cobj.clearRect(0,0,that.canvas.width,that.canvas.height);
            if(that.person.status=="runimg"){
                that.person.state=that.person.num%8;
            }else if(that.person.status="jumpimg"){
                that.person.state=0;
            }
            /*人物发生变化*/
            that.person.x+=that.person.speedx;
            if(that.person.x>=that.canvas.width/3){
                that.person.x=that.canvas.width/3;
            }
            that.person.draw();
            /*操作障碍物*/
            if(num%rand==0){
                rand=(2*Math.ceil(6*Math.random()))*1000;
                num=0;
                var obj=new hinderimg(that.canvas,that.cobj,that.hinderimg);
                obj.state=Math.floor(Math.random()*that.hinderimg.length);
                that.hinderArr.push(obj);
            }
            for(var i=0;i<that.hinderArr.length;i++){
                that.hinderArr[i].x-=that.hinderArr[i].speedx;
                that.hinderArr[i].draw();
              if(hitPix(that.canvas,that.cobj,that.person,that.hinderArr[i])){
                  that.hitA.play();
                  if(!that.hinderArr[i].flag){
                      xue(that.cobj,(that.person.x + that.person.width / 2),(that.person.y + that.person.height / 2));
                      that.person.life--;
                      var bili=(1-(3-that.person.life)/3)*100;
                      that.blood.css({
                          background:"red",
                          width:bili+"%"
                      });
                      if(that.person.life==0){
                          var messages=localStorage.messages?JSON.parse(localStorage.messages):[];
                          var temp={name:that.name,score:that.score};
                          messages.push(temp);
                          str=JSON.stringify(messages);
                          console.log(str);
                          //that.overA.play();
                          alert("game over");
                          location.reload();

                      }
                      that.hinderArr[i].flag=true;
                  }
              }
                /*得分*/
                if(that.person.x>that.hinderArr[i].x+that.hinderArr[i].width){
                    if(!that.hinderArr[i].flag&&!that.hinderArr[i].flag1){
                        that.score++;
                        that.scores.html(that.score);
                        that.hinderArr[i].flag1=true;
                    }
                }
                if(that.isfire){
                    if(hitPix(that.canvas,that.cobj,that.zidan,that.hinderArr[i])){
                        that.hinderArr.splice(i,1);
                        that.cobj.clearRect(0,0,that.width,that.height);
                        that.score=that.score+1;
                        that.scores.html(that.score);
                    }
                }
            }
            /*子弹*/
            if(that.isfire){
                that.zidan.speedx+=that.zidan.jia;
                that.zidan.x+=that.zidan.speedx;
                that.zidan.draw();
            }
            /*操作背景*/
            that.backx-=that.backSpeed;
            that.canvas.style.backgroundPositionX=that.backx+"px";
        },50)

        that.key();
        that.fire();
    },
    /*跳跃*/
    key:function(){
        var that=this;
        var flag=true;
        document.onkeydown=function(e){
            if(!flag){
                return;
            }
            flag=false;
            if(e.keyCode==32){
                that.jumpA.play();
                that.runA.pause();
                that.person.status="jumpimg";
                var init=0;
                var speeda=10;
                var r=200;
                var y=that.person.y;
                var t=setInterval(function(){
                    init+=speeda;
                    if(init>180){
                        that.person.y=y;
                        clearInterval(t);
                        flag=true;
                        that.person.status="runimg";
                        that.runA.play();
                    }else{
                        var top=Math.sin(init*Math.PI/180)*r;
                        that.person.y=y-top;
                    }
                },100)
            }
        }
    },
    /*发射子弹*/
    fire:function(){
        var that=this;
        document.querySelector(".cover").onclick=function(){
            that.zidan.x=that.person.x + that.person.width / 2;
            that.zidan.y=that.person.y + that.person.height / 2+30;
            that.zidan.speedx=5;
            that.isfire=true;
            that.fireA.play();
        }
    }
}