"use strict";
window.addEventListener("load", () => {
  var mui = new kisn_ui(
    document.querySelector("#nibun"),
    document.querySelector("#nyuton"),
    document.querySelector("#graph1"),
    document.querySelector("#graph1b"),

  );
mui.setResult_ui2(document.querySelector("#kaisu"));
mui.setResult_ui(document.querySelector("#result"));
mui.draw_axis();
});

class kisn_ui {
  constructor( nibun,nyuton,canvas, background) {
    this.canvas = canvas;
    this.background = background;
    this.kisn = new kisn(canvas);
    this.nibun = nibun;
    this.nyuton = nyuton;

    this.nibun.addEventListener("click", () => {
      let  input_number = document.querySelector("#box").value;
      let result2 = this.kisn.nibun_write(input_number);
      let result = this.kisn.nibunhou();
      this.result2.textContent = "二分法　"+"計算回数: " + result2[0]+ " 回　"+" 現在の値: "+result2[1];
      this.result.textContent =
        "近似値：" +
        result[0]  +
        "(総計算回数：" +
        result[1] +
        "回)";
    });

    this.nyuton.addEventListener("click", () => {
      let  input_number = document.querySelector("#box").value;
      let result2 = this.kisn.nyuton_write(input_number);
      let result = this.kisn.nyutonhou();
      this.result2.textContent = "ニュートン法 "+"計算回数: " + result2[0]+ " 回　"+" 現在の値: "+result2[1];
      this.result.textContent =
        "近似値：" +
        result[0]  +
        "(総計算回数：" +
        result[1] +
        "回)";
    });
  }

  setResult_ui(result_element) {
  this.result = result_element;
  this.result.textContent = "計算値：";
}

setResult_ui2(result_element) {
this.result2 = result_element;
this.result2.textContent = "計算回数：";
}

  draw_axis() {
    console.log(this.background);
    let ctx2 = this.background.getContext('2d');
    ctx2.beginPath();
    ctx2.moveTo(0,this.canvas.height/2);
    ctx2.lineTo(this.canvas.width,this.canvas.height/2);
    ctx2.moveTo(this.canvas.width/2,0);
    ctx2.lineTo(this.canvas.width/2,this.canvas.height);
    ctx2.stroke();
 }
}

class kisn {
 constructor(canvas) {
   this.canvas = canvas;
   this.ctx = canvas.getContext("2d");
   this.a = 0.0;
   this.b = 0.0;
   this.c = 0.0;
   this.EPS = 0.0001
   this.all_number = 0;  // 計算回数
 }

 nibunhou(){
   this.a = 0.0;
   this.b = 1.0;
   this.all_number = 0;

   while(Math.abs(this.a - this.b) > this.EPS){
     this.c =(this.a + this.b)/2.0;
     if(this.func_y(this.c) * this.func_y(this.a) < 0){
       this.b = this.c;
     }else{
       this.a = this.c;
     }
     this.all_number++;
   }
   return [this.c,this.all_number];
 }

 nyutonhou(){
   this.a = 1.0;
   this.b = 0.0;
   this.all_number = 0;
   while(1){
     this.b = this.a - this.func_y(this.a) / this.func_z(this.a);
     if(Math.abs(this.a - this.b) < this.EPS){
       break;
     }else{
       this.a = this.b;
     }
     this.all_number++;
   }
    return [this.b,this.all_number];
 }

 nibun_write(x){
   this.a = 0.0;
   this.b = 1.0;
   this.c = 0;
   for(let i=0; i<x;i++){
     this.c =(this.a + this.b)/2.0;
     if(this.func_y(this.c) * this.func_y(this.a) < 0){
       this.b = this.c;
     }else{
       this.a = this.c;
     }
   }
    this.ctx.beginPath();
    let px = (1+this.c) * this.canvas.width / 2.0;
    let py = this.canvas.height/2.0;
    this.ctx.strokeStyle = "rgb(220, 40, 40)";
    this.ctx.moveTo(px, py);
    this.ctx.lineTo(px+2, py+2);
    this.ctx.lineWidth = 5;
    this.ctx.stroke();

    return[x,this.c];
 }

 nyuton_write(x){
   this.a = 1.0;
   this.b = 0.0;

   for(let i=0;i<x;i++){
     this.b = this.a - this.func_y(this.a) / this.func_z(this.a);
     if(Math.abs(this.a - this.b) < this.EPS){
       break;
     }else{
       this.a = this.b;
     }
     this.ctx.beginPath();
     let px = (1+this.b) * this.canvas.width / 2.0;
     let py = this.canvas.height/2.0;
     this.ctx.strokeStyle = "rgb(40, 40, 200)";
     this.ctx.moveTo(px, py);
     this.ctx.lineTo(px+2, py+2);
     this.ctx.lineWidth = 5;
     this.ctx.stroke();

   }
    return [x,this.b];
 }


 func_y(x){
   return (Math.pow(x,3.0) + x - 1.0);
 }

 func_z(x){
   return (3.0 * Math.pow(x,2.0) + 1.0);
 }
}
