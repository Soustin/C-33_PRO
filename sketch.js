var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
let particles = [];
var particle;
var plinkos = [];
var divisions = [];
var divisionHeight=300;
var score =0;
var count = 0;
// PLAY = 0
// END = 1
var gameState = "start";

var box;

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }  

    // box = createSprite(400, 600, width, 20);    
}
 


function draw() {
  background("black");
  textSize(20)
  text("Score : "+score,20,30);
  fill("white");
  textSize(35)
  text("500", 10, 550);
  text("500", 90, 550);
  text("500", 170, 550);
  text("500", 250, 550);
  text("100", 330, 550);
  text("100", 410, 550);
  text("100", 490, 550);
  text("200", 570, 550);
  text("200", 650, 550);
  text("200", 730, 550);

  Engine.update(engine);
  ground.display();

  if(gameState === "end"){
    textSize(100)
    text("Game Over", 150, 250)
  }
  
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }

   if(particle != null){
     particle.display();

     if(particle.body.position.y > 760){
       if(particle.body.position.y > 300 && particle.body.position.x < 300 && particle.body.position.x > 1){
         score = score+500;
         particle = null;
         if(count >= 5) gameState = "end";
       }
       else if(particle.body.position.y > 300 && particle.body.position.x < 600 && particle.body.position.x > 301){
         score = score+100;
         particle=null;
         if(count >= 5) gameState = "end";
       }
       else if (particle.body.position.y > 300 && particle.body.position.x < 800 && particle.body.position.x > 601){
         score = score+200;
         particle = null;
         if(count >= 5) gameState = "end";
       }

     }
   }



//   if(frameCount%100===0){
//    particles.push(new Particle(random(width/2-60, width/2+60), 10,10)); 
//  }  
 
//   for (var j = 0; j < particles.length; j++) {
   
//      particles[j].display();
//    }

//    if(particles.x < 600 && particles.y >600){
//      score = score+100;
//    }

   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }

  // if(particles.x.position <600 && particles.y.position > 600){
  //   score += 100;
  //  }
  // mousePressed();
  // drawSprites();

}

function mousePressed(){
  if(gameState !== "end"){
    count++;
    particle = new Particle(mouseX, 10, 10, 10);
    particle.collide(ground)
  }
}