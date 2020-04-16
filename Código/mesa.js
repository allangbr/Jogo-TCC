
class Mesa {
  constructor(img){
  this.h = 0.6*height;
  this.w = constrain(2*this.h,0,width); 
  this.x = (width - this.w)/2;
  this.y = 0.2*height;
  this.img = img;
  }
  
  show(){
    image(img, this.x,this.y,this.w,this.h);
    //stroke(160,82,45);
    //strokeWeight(10);
    //fill(34,139,34);
    //rect(this.x,this.y,this.w,this.h);
  }
  
}
