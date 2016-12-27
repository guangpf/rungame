//function person(canvas,cobj,runimg,jumpimg){
//    this.x=canvas.width/3;
//    this.y=0;
//    this.endy=230;
//    this.width=135;
//    this.height=168;
//    this.canvas=canvas;
//    this.cobj=cobj;
//    this.runimg=runimg;
//    this.status="runimg";
//    this.state=0;
//    this.speedy=5;
//    this.zhongli=10;
//}
//person.prototype={
//    running:function(){
//        this.cobj.save();
//        this.cobj.translate(this.x,this.y);
//        this.cobj.drawImage(this[this.status][this.state],0,0,135,168,0,0,this.width,this.height);
//        this.cobj.restore();
//    },
//    update:function(){
//        if(this.y>this.endy){
//            this.y=this.endy;
//        }else if(this.y<this.endy){
//            this.speedy+=this.zhongli;
//            this.y+=this.speedy;
//        }
//    }
//
//}
//
//function game(canvas,cobj,runimg,jumpimg){
//    this.canvas=canvas;
//    this.cobj=cobj;
//    this.canvasW=canvas.width;
//    this.canvasH=canvas.height;
//    this.person=new person(canvas,cobj,runimg,jumpimg);
//    this.speed=8;
//    this.score=1;
//    this.life=3;
//}
//game.prototype={
//    play:function(start,cover){
//        start.css("animation","start1 2s ease forwards");
//        cover.css("animation","cover1 2s ease forwards");
//        var that=this;
//        var num=0;
//        var back=0;
//        var num2=0;
//        setInterval(function(){
//            num++;
//            num2+=5;
//            that.cobj.clearRect(0,0,that.canvasW,that.canvasH);
//            that.person.state=num%5;
//            that.person.running();
//            that.person.update();
//            that.canvas.style.backgroundPositionX=-num2+"px";
//        },50)
//    }
//}//function person(canvas,cobj,runimg,jumpimg){
//    this.x=canvas.width/3;
//    this.y=0;
//    this.endy=230;
//    this.width=135;
//    this.height=168;
//    this.canvas=canvas;
//    this.cobj=cobj;
//    this.runimg=runimg;
//    this.status="runimg";
//    this.state=0;
//    this.speedy=5;
//    this.zhongli=10;
//}
//person.prototype={
//    running:function(){
//        this.cobj.save();
//        this.cobj.translate(this.x,this.y);
//        this.cobj.drawImage(this[this.status][this.state],0,0,135,168,0,0,this.width,this.height);
//        this.cobj.restore();
//    },
//    update:function(){
//        if(this.y>this.endy){
//            this.y=this.endy;
//        }else if(this.y<this.endy){
//            this.speedy+=this.zhongli;
//            this.y+=this.speedy;
//        }
//    }
//
//}
//
//function game(canvas,cobj,runimg,jumpimg){
//    this.canvas=canvas;
//    this.cobj=cobj;
//    this.canvasW=canvas.width;
//    this.canvasH=canvas.height;
//    this.person=new person(canvas,cobj,runimg,jumpimg);
//    this.speed=8;
//    this.score=1;
//    this.life=3;
//}
//game.prototype={
//    play:function(start,cover){
//        start.css("animation","start1 2s ease forwards");
//        cover.css("animation","cover1 2s ease forwards");
//        var that=this;
//        var num=0;
//        var back=0;
//        var num2=0;
//        setInterval(function(){
//            num++;
//            num2+=5;
//            that.cobj.clearRect(0,0,that.canvasW,that.canvasH);
//            that.person.state=num%5;
//            that.person.running();
//            that.person.update();
//            that.canvas.style.backgroundPositionX=-num2+"px";
//        },50)
//    }
//}