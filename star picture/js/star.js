var can;
var ctx;
var w;
var h;
var pic=new Image();
var starpic=new Image();
var num=80;
var stars=[];

var deltaTime;//两帧之间的时间间隔
var lastTime;//上一帧的闪烁时间

var switchy = false;
var alive = 0;

function init(){//初始化函数
	//console.log("a");
	can=document.getElementById("canvas");
	ctx=can.getContext("2d");//画布
	w=can.width;
	h=can.height;
	//console.log(w);

	//事件监听
	document.addEventListener('mousemove', mousemove, false);

	pic.src="src/star.jpg";
	starpic.src="src/star.png";

	for(var i=0;i<=num;i++){
		stars[i]=new starObj();
		stars[i].init();
	}
	lastTime = Date.now();//获取当前时间作为丄一帧闪烁的时间
	gameloop();

}

document.body.onload=init;

function  gameloop(){//循环绘制
	window.requestAnimFrame(gameloop);
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;//刷新之后上一帧时间变为当前时间
	drawBack();
	drawPic();
	drawStars();
	aliveUpdate();


}

function drawBack(){//绘制背景颜色

	ctx.fillStyle="#003377";
	ctx.fillRect(0,0,w,h);//绘制的尺寸和原点
}

function drawPic(){
	//drawImage(img,x,y)
	//0点在canvas的左上角
	ctx.drawImage(pic, 20, 20, 350, 450);

}

function mousemove(e) {
	if (e.offsetX || e.layerX) {

		var px = e.offsetX == undefined ? e.layerX : e.offsetX;
		var py = e.offsetY == undefined ? e.layerY : e.offsetY;
		//console.log(e);

		if (px > 20 && px < 370 && py > 20 && py < 470) {
			switchy = true;
		} else {
			switchy = false;
		}
	}
}

window.requestAnimFrame = (function() {//使requestAnimFrame能够兼容所有浏览器的
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
			return window.setTimeout(callback, 1000 / 60);
		};
})();