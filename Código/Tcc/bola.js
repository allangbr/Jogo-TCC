class Bola{
  constructor(x,y){
  this.x = x;
  this.y = y;
  this.d = 0.03*width;
  this.angle = 0;
  this.speed = 0;
  this.xsignal = 1;
  this.ysignal = 1;
  this.friction = 0.035;
  }
  
  show(){
    stroke(0);
    strokeWeight(1);
    fill(255);
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
  
  direction(){
    if(this.speed ==0 && keyIsDown(UP_ARROW)){
      this.angle +=0.1; 
      //this.angle = constrain(this.angle + 0.1,0,2*PI);
    } 
    if(this.speed ==0 && keyIsDown(DOWN_ARROW)){
      this.angle -=0.1;
      //this.angle = constrain(this.angle - 0.1,0,2*PI);
    }
    stroke(0);
    strokeWeight(2);
    if(this.speed == 0){
    
      line(this.x,this.y,this.x+cos(this.angle)*this.d*6,this.y+sin(this.angle)*this.d*6);
    }
  }
  
  
  
}  
