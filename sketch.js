
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score, survivalTime;
var ground;

var gameState;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 600);
  monkey = createSprite(250, 300, 40, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(200, 330, 600, 10);
  ground.velocityX = -4;
  
  score = 0;
  survivalTime = 0;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  gameState = "play";
  
  
}


function draw() {
  background("white");
  
  if(gameState === 'play'){
    if(keyDown("space") && monkey.y >100){
    monkey.y += -10; 
  }
  
  
  textSize(20);
  text("Score: " + score, 500, 50);
  text("Survival Time: " + survivalTime, 100, 50);
  survivalTime = Math.ceil(frameCount/frameRate())
  
  if(obstacleGroup.isTouching(monkey)){
    gameState = "end";
  }
  
  spawnBanana();
  spawnObstacle();
  }
  
  if(gameState === "end"){
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    textSize(20);
    text("Game Over", 250, 250);
  }
  
  monkey.velocityY = 2;  
  if(monkey.isTouching(ground)){
    monkey.velocityY = 0;
  } 
  ground.x = ground.width/2;
  
  
  drawSprites();
}

function spawnBanana(){
  if(World.frameCount % 80 === 0){
    var bananaY = Math.round(random(120, 200))
    banana = createSprite(400, bananaY, 20, 20);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.lifetime = 150;
    banana.velocityX = -2; 
    bananaGroup.add(banana);
    
    monkey.depth = banana.depth + 1;
  }
}
function spawnObstacle(){
  if(World.frameCount % 300 == 0){
    obstacle = createSprite(300, 310, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -2;
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);
  }
}




