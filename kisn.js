window.addEventListener("load", () => {
  var mui = new kisn_ui(
    document.querySelector("#nibun"),
    document.querySelector("#graph1"),
    document.querySelector("#graph1b")
  );
mui.setResult_ui(document.querySelector("#result"));
mui.draw_axis();
});

class kisn_ui {
  constructor( nibun,canvas, background) {
    this.canvas = canvas;
    this.background = background;
    this.nibun = nibun;

    this.nibun.addEventListener("click", () => {
      let result = this.kisn.nibun();
      this.result.textContent =
        "近似値：" +
        result[0]  +
        "(試行回数：" +
        result[1] +
        "回)";
    });
  }

  setResult_ui(result_element) {
  this.result = result_element;
  this.result.textContent = "計算値：";
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
   this.c = 0;
   this.EPS = 0.0001
   this.times = 10000; // startボタンが押された際の打点数
   this.all_number = 0;  // 計算回数
 }

 nibun(){
   let a = 0;
   let b = 1.0;
   while(Math.abs(a-b) > this.EPS){
     this.c =(a+b)/2.0;
     if(this.func_y(this.c) * this.func_y(a) < 0){
       b = this.c;
     }else{
       a = this.c;
     }
     this.all_number++;
   }
   
   return [this.c,this.all_number];
 }

 func_y(x){
   return Math.pow(x,3.0) + x -1.0;
 }
}
