  const quantOb = 1;
  const quantBall = 1;
  const newGame = 0;
  const inGame = 1;
  const gameOver = 2;
  const inicio = 3;
  const playing = 4;
  const win = 5;
  const gameOver1 = 6;

  let som = 1 + quantOb + quantBall;
  let mesa;
  let bola;
  let obstaculo;
  let bolas = [];
  let obstaculos = [];
  let colidiveis = [];
  let hit = false;
  let hitt = false;
  let hittt = false;
  let ver = false;
  let pontanterior = 0;
  let xBranca = 0;
  let yBranca = 0;
  let xAux = 0;
  let yAux = 0;
  let xOb = 0;
  let yOb = 0;

  let img;
  let img2;
  let cont = 0;
  let vidas = 1;
  let contEnd = 0;
  let contOver = 0;

  let state = newGame;
  
  function preload() {
    img = loadImage('mesadebilhar.png');
    img2 = loadImage('intro.png');
  }

  function reset(){
    if(colidiveis.lenght != 0 && obstaculos.length != 0 && bolas.lenght != 0){
      colidiveis.splice(0, som);
      obstaculos.splice(0, quantOb);
      bolas.splice(0, quantBall);
      bola.x = -10;
      bola.y = 0;
    
      bola.x = xBranca;
      bola.y = yBranca;
      append(colidiveis, bola);
  
      for(let i=0; i<quantOb; i++){
        obstaculo = new Obstaculo(xOb, yOb, 25, 25);
        append(obstaculos, obstaculo);
      }
  
      for(let i=0; i<quantBall; i++){
        bolaleAux = new Bolale(xAux, yAux);
        append(bolas, bolaleAux);
        append(colidiveis, bolaleAux);               
      }
    }
  }

function setup() {
  createCanvas(600, 400);
  frameRate(30);
  mesa = new Mesa(img);
  
  bola = new Bola(random(140, 300) + xAux + xOb,random(110, 150) + yAux + yOb);
  append(colidiveis, bola);
  
  for(let i=0; i<quantBall; i++){
    bolaleAux = new Bolale(random(300, 458) + xAux + xOb,random(150, 290) + yAux + yOb);
    append(colidiveis, bolaleAux);
    append(bolas, bolaleAux);
  }
  
  for(let i=0; i<quantOb; i++){
    obstaculo = new Obstaculo(random(150, 450), random(150, 250), 25, 25);
    append(obstaculos, obstaculo);
  }
}

function draw() {
  background(0);

  strokeWeight(2);
  stroke(255);
  mesa.show();
  
  if(state == newGame){
    fill(255);
    textSize(25);
    strokeWeight(2);
    stroke(0);
    text("BILHAR FRANCÊS", width/2 - 115, height/2 - 40);
    image(img2, width/2 + 120, height/2 - 80, 70, 70);
    textSize(13);
    text("Use as teclas Up e Down para mirar!", width/2 - 200, height/2);
    text("Use a tecla A para atirar!", width/2 - 200, height/2 + 20);
    text("OBJETIVO: Faça a bola branca quicar tres vezes nas laterais antes", width/2 - 200, height/2 + 40);
    text("de colidir com a bola preta com o auxilio das marcações!", width/2 - 200, height/2 + 60)
  
    if ( Math.floor(frameCount / 10) % 2 == 0 ) {
      fill("Yellow");
      text("Pressione a tecla Enter para começar o jogo...", width / 2 - 120, height - 110);
    }
  }
  if(state == inGame){
    noStroke();
    fill(255);
    text("Acertos: " + cont,60,0.85*height);
    text("Vidas restantes: " + vidas,60,0.90*height);
    bola.direction();
    bola.move();
    bola.bounce(mesa.x,mesa.y,mesa.w,mesa.h);
    bola.rubbing();
    bola.show();
  
    for(let i=0; i<quantOb; i++){
      obstaculos[i].show();
    }
  
    for(let i=0; i<quantBall; i++){
      bolas[i].move();
      bolas[i].bounce(mesa.x,mesa.y,mesa.w,mesa.h);
      bolas[i].rubbing();
      bolas[i].show();
    }
  
    for(let i = 0; i<colidiveis.length - 1; i++){
      let bolaA = colidiveis[i];
      for(let j = i + 1; j<colidiveis.length; j++) {
        let bolaB = colidiveis[j];
        let bolasf = bolaA.speed;
      
        hit = collideCircleCircle(bolaA.x, bolaA.y, bolaA.d, bolaB.x, bolaB.y, bolaB.d);
        if (hit && bolaB.speed == 0){
          bolaA.speed = 0;
          bolaA.speed = bolasf * (1);
          bolaA.xsignal *= (-1);
          bolaA.ysignal *= (-1);
          bolaB.speed = bolaA.speed;
          bolaB.angle = bolaA.angle;
          cont ++;
          contEnd = cont;
          contOver = cont;
        }
      
        if(hit && bolaB.speed != 0){
          bolaA.speed = 0;
          bolaA.speed = bolasf * (-1);
          bolaA.xsignal *= (-1);
          bolaA.ysignal *= (-1);
          bolaB.speed = bolaA.speed;
          bolaB.angle = bolaA.angle;
        }
        
        if(cont == 2 && bolaA.speed == 0){
            state = win; 
            print(state);
        }
      
        if(ver && bolaA.speed == 0 && pontanterior == cont){
          cont = 0;
          contEnd = cont;
          ver = false;
          reset();
        
          if(vidas > 0){
            vidas -= 1;     
          }else{
            state = gameOver;
          }
        }
      }
    }
  
    for(let i=0; i<obstaculos.length; i++){
      ob = obstaculos[i];
      hitt = collideRectCircle(ob.x, ob.y, ob.w, ob.h, bola.x, bola.y, bola.d);
      bolasf = bola.speed;
      if (hitt){
        bola.speed = 0;
        bola.speed = bolasf * (1);
        bola.xsignal *= (-1);
        bola.ysignal *= (-1);
      }
    
      hittt = collideRectCircle(ob.x, ob.y, ob.w, ob.h, bolaleAux.x, bolaleAux.y, bolaleAux.d);
      bolasAlef = bolaleAux.speed;
      if (hittt){
        bolaleAux.speed = 0;
        bolaleAux.speed = bolasAlef * (1);
        bolaleAux.xsignal *= (-1);
        bolaleAux.ysignal *= (-1);
      }      
    }
  }
  
  if(state == gameOver){
    strokeWeight(2);
    stroke(0);
    textSize( map( sin(frameCount * 0.1), 0, 1, 24, 32) );
    textAlign(CENTER);
    fill("Yellow");
    text("GAME OVER", width / 2, height / 2 - 25);

    textSize(15);
    fill(255);
    strokeWeight(2);
    stroke(0);
    text("Acertos " + contOver, width / 2, height / 2 + 20);
    text("Pressione a tecla i para retornar ao inicio ", width / 2, height / 2 + 0);

  }
  
  if(state == gameOver1){
    strokeWeight(2);
    stroke(0);
    textSize( map( sin(frameCount * 0.1), 0, 1, 24, 32) );
    textAlign(CENTER);
    fill("Yellow");
    text("GAME OVER", width / 2, height / 2 - 25);

    textSize(15);
    fill(255);
    strokeWeight(2);
    stroke(0);
    text("Acertos " + contOver, width / 2, height / 2 + 20);
    text("Pressione a tecla i para retornar ao inicio ", width / 2, height / 2 + 0);
   
  }
  
  if(state == inicio){
    contOver = 0;
    fill(255);
    textSize(25);
    strokeWeight(2);
    stroke(0);
    text("BILHAR FRANCÊS", width/2, height/2 - 40);
    image(img2, width/2 + 120, height/2 - 80, 70, 70);
    textSize(13);
    text("Use as teclas Up e Down para mirar!", width/2 - 97, height/2 );
    text("Use a tecla A para atirar!", width/2 - 131, height/2 + 20);
    text("OBJETIVO: Faça a bola branca quicar tres vezes nas laterais antes", width/2 - 8, height/2 + 40);
    text("de colidir com a bola preta com o auxilio das marcações!", width/2 - 38, height/2 + 60)
  
  
    if ( Math.floor(frameCount / 10) % 2 == 0 ) {
      fill("Yellow");
      text("Pressione a tecla Enter para começar o jogo...", width / 2, height - 110);
    }
  }
  
  if(state == playing){
    noStroke();
    fill(255);
    text("Acertos: " + contEnd,90,0.85*height);
    text("Vidas restantes: " + vidas,113,0.90*height);
    bola.direction();
    bola.move();
    bola.bounce(mesa.x,mesa.y,mesa.w,mesa.h);
    bola.rubbing();
    bola.show();
  
    for(let i=0; i<quantOb; i++){
      obstaculos[i].show();
    }
  
    for(let i=0; i<quantBall; i++){
      bolas[i].move();
      bolas[i].bounce(mesa.x,mesa.y,mesa.w,mesa.h);
      bolas[i].rubbing();
      bolas[i].show();
    }
  
    for(let i = 0; i<colidiveis.length - 1; i++){
      let bolaA = colidiveis[i];
      for(let j = i + 1; j<colidiveis.length; j++) {
        let bolaB = colidiveis[j];
        let bolasf = bolaA.speed;
      
        hit = collideCircleCircle(bolaA.x, bolaA.y, bolaA.d, bolaB.x, bolaB.y, bolaB.d);
        if (hit && bolaB.speed == 0){
          bolaA.speed = 0;
          bolaA.speed = bolasf * (1);
          bolaA.xsignal *= (-1);
          bolaA.ysignal *= (-1);
          bolaB.speed = bolaA.speed;
          bolaB.angle = bolaA.angle;
          cont ++;
          contEnd = cont;
          contOver = cont;
        }
      
        if(hit && bolaB.speed != 0){
          bolaA.speed = 0;
          bolaA.speed = bolasf * (-1);
          bolaA.xsignal *= (-1);
          bolaA.ysignal *= (-1);
          bolaB.speed = bolaA.speed;
          bolaB.angle = bolaA.angle;
        }
        
        if(cont == 2 && bolaA.speed == 0){
          state = win; 
          print(state);
        }
        
      
        if(ver && bolaA.speed == 0 && pontanterior == cont){
          cont = 0;
          contEnd = cont;
          ver = false;
          reset();
          
          if(vidas > 0){
            vidas -= 1;     
          }
          if(vidas == 0 && contEnd > 0){
            state = gameOver;
          }
          if(vidas == 0 && contEnd == 0){
            state = gameOver1;
          }
        }
      }
    }
  
    for(let i=0; i<obstaculos.length; i++){
      ob = obstaculos[i];
      hitt = collideRectCircle(ob.x, ob.y, ob.w, ob.h, bola.x, bola.y, bola.d);
      bolasf = bola.speed;
      if (hitt){
        bola.speed = 0;
        bola.speed = bolasf * (1);
        bola.xsignal *= (-1);
        bola.ysignal *= (-1);
      }
    
      hittt = collideRectCircle(ob.x, ob.y, ob.w, ob.h, bolaleAux.x, bolaleAux.y, bolaleAux.d);
      bolasAlef = bolaleAux.speed;
      if (hittt){
        bolaleAux.speed = 0;
        bolaleAux.speed = bolasAlef * (1);
        bolaleAux.xsignal *= (-1);
        bolaleAux.ysignal *= (-1);
      }
    }
  }
  if(state == win){
    cont = 0;
    contEnd = 0;
    strokeWeight(2);
    stroke(0);
    textSize( map( sin(frameCount * 0.1), 0, 1, 24, 32) );
    textAlign(CENTER);
    fill("Yellow");
    text("YOU WIN!", width / 2, height / 2 - 25);

    textSize(15);
    fill(255);
    strokeWeight(2);
    stroke(0);
    text("Acertos " + contOver, width / 2, height / 2 + 20);
    text("Pressione a tecla i para retornar ao inicio ", width / 2, height / 2 + 0);
  }
}
 
function keyPressed(){
  //tacada aperta "enter"
  if(keyCode === 65){
    bola.speed = 8;
    ver = true;
    pontanterior = cont;
    xBranca = bola.x;
    yBranca = bola.y;
    xAux = bolaleAux.x;
    yAux = bolaleAux.y;
    xOb = obstaculo.x;
    yOb = obstaculo.y;
  }
  
  if(keyCode === 13){
    if(state == newGame){
      state = inGame;
    }
    if(state == inicio){
      state = playing;
    }
  }
  
  if(keyCode === 73 ){
    state = inicio;
  } 
}


