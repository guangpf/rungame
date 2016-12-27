window.onload=function(){
    var canvas=document.getElementsByTagName("canvas")[0];
    var cobj=canvas.getContext("2d");
    var clientw=document.documentElement.clientWidth;
    var clienth=document.documentElement.clientHeight;
    canvas.width=clientw;
    canvas.height=clienth;
    var runimg=document.querySelectorAll(".run");
    var jumpimg=document.querySelectorAll(".jump");
    var hinderimg=document.querySelectorAll(".hinder");
    var runA=document.querySelector(".runA");
    var jumpA=document.querySelector(".jumpA");
    var hitA=document.querySelector(".hitA");
    var fireA=document.querySelector(".fireA");
    var overA=document.querySelector(".voerA");
    var waitA=document.querySelector(".waitA");
    var zidan=document.querySelector(".zidan");
    var scoresbx=$(".scores-box");
    var lives=$(".life");
    var scores=$(".score");
    var blood=$(".blood");
    var startBtn=$(".btn");
    var start=$(".start");
    var cover=$(".cover");
    waitA.play();
    startBtn.one("click",function(){
        var gameObj=new game(canvas,cobj,runimg,jumpimg,hinderimg,runA,jumpA,hitA,fireA,overA,waitA,zidan,scores,blood);
        gameObj.play1(start,cover,scoresbx,lives);
    })

}
