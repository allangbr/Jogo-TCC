class Bolale{
  constructor(x,y){
  this.x = x;
  this.y = y;
  this.d = 0.03*width;
  this.angle = 0;
  this.speed = 0;
  this.xsignal = 1;
  this.ysignal = 1;
  this.friction = 0.07;
  }
  
  show(){
    stroke(100);
    strokeWeight(1);
    fill(0);
    ellipse(this.x,this.y,this.d,this.d); 
  }
  
  move(){
    this.x += cos(this.angle)*this.speed*this.xsignal;
    this.y += sin(this.angle)*this.speed*this.ysignal;
  }
  
  rubbing(){
    if(this.speed > 0){
      this.speed = constrain(this.speed - this.friction,0,100); 
    }
    else{
      this.xsignal = 1;
      this.ysignal = 1;
    }
  }  
                             
                             
  bounce(x,y,w,h){    
    if(((this.x - this.d/2) - 20) <= x || (this.x +this.d/2) >= x+(w-20)){
      this.xsignal *= (-1);       
    }
  
    if(((this.y - this.d/2) - 20) <= y || (this.y + this.d/2) >= y+(h-20)){
      this.ysignal *= (-1);       
    }
   }
}