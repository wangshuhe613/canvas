var starObj=function(){
	this.x;
	this.y;
	this.picNum;
	this.timer;
	this.ySpd;
	this.xSpd;
	this.beta;
}

starObj.prototype.init=function(){
	this.x=Math.random()*350+20;//返回的是0-1的值
	this.y=Math.random()*450+20;
	this.picNum = Math.floor(Math.random() * 7);
	//math.floor是归一的功能
	//使每一个星星随机闪烁，而不是同时闪烁
    this.ySpd = Math.random() * 0.6 - 0.3; //[0,2) [-1, 1)
	this.xSpd = Math.random() * 0.2 - 0.1;
	//使星星具有一个位移速度
	this.beta = Math.random() * Math.PI * 0.5;
	//使星星不跑到主图片之外
	this.timer=0;

}
starObj.prototype.shining=function(){
	/*this.picNum += 1;//随着时间流逝均匀的增加
	if(this.picNum>=7){
		this.picNum=0;
		this.timer=0;
	}*/
	this.xSpd = Math.random() * 0.2 - 0.1; //[0,2) [-1, 1)
	this.x += this.xSpd;
	this.y += this.ySpd;
     //使星星不跑出范围之外
	if (this.x > 370 || this.x < 10)
		this.init();
	else if (this.y > 470 || this.y < 10)
		this.init();

	this.timer += deltaTime;
	if (this.timer > 50) {
		this.picNum += 1;
		this.picNum %= 7;
		this.timer = 0;
	}

}

starObj.prototype.draw=function(){
	//透明度控制，save和restore之间才起作用，他们之外的东西则不作用。
	//否则整个女孩图片都会受到透明度控制
	ctx.save();
    ctx.globalAlpha = Math.sin(this.beta) * alive;//全局透明度
	ctx.drawImage(starpic, this.picNum * 7, 0, 7, 7, this.x, this.y, 7, 7);
    ctx.restore();
}

function drawStars(){

	for (var i = 0; i < num; i++) {
		stars[i].shining();
		stars[i].draw();
	}
}


function aliveUpdate() {
	if (switchy) {
		alive += 0.03;
		if (alive > 1) {
			alive = 1;
		}
	} else {
		alive -= 0.03;
		if (alive < 0) {
			alive = 0;
		}
	}
}

