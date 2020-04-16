class Obstaculo{
  constructor(x, y, w, h){
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  }
  
  show(){
    strokeWeight(1);
    stroke(0);
    fill(139,69,19);
    rect(this.x, this.y, this.w, this.h);
  }

}