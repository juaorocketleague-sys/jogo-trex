var trex, trex_running, edges;
var sounds , die , point , jump
var restart, restartImage
var gameOver,gameOverImage
var trexperdido
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score=0
var groundImage;
var ground, invisibleGround
var cloud, cloudImage
var obs, obs1, obs2, obs3, obs4, obs5, obs6
var obsgrupo, cloudgrupo
function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  gameOverImage = loadImage ("gameOver.png")
  restartImage = loadImage ("restart.png")
  trexperdido = loadAnimation ("trex_collided.png")
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")
  obs1 = loadImage("obstacle1.png")
  obs2 = loadImage("obstacle2.png")
  obs3 = loadImage("obstacle3.png")
  obs4 = loadImage("obstacle4.png")
  obs5 = loadImage("obstacle5.png")
  obs6 = loadImage("obstacle6.png")
  jump = loadSound("jump.mp3")
  die = loadSound("die.mp3")
  point = loadSound("checkPoint.mp3")

}

function setup() {
  //createCanvas(600, 200); 
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) {
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(displayWidth + 80, displayHeight);
  }
  else {
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(windowWidth, windowHeight);
  }
  //criando o trex
  trex = createSprite(canW-520, canH-40, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("perdido", trexperdido);
  edges = createEdgeSprites();

  ground = createSprite(canW-400, canH-30, canW, 20)
  ground.addImage("ground", groundImage)

  invisibleGround = createSprite(canW/3, canH-21, canW, 10)
  invisibleGround.visible = false

  //adicione dimensão e posição ao trex

 obsgrupo=new Group()
 cloudgrupo=new Group()

  trex.scale = 0.5;
  trex.x = 80
  trex.setCollider("circle",0,0,40)
  trex.debug=false
  gameOver = createSprite (canW/2,canH/2)
  gameOver.addImage("gameOver",gameOverImage)
  gameOver.scale=0.5
  restart = createSprite (canW/2,canH/2+40)
  restart.addImage("restart",restartImage)
  restart.scale=0.5
  restart.visible=false
  gameOver.visible=false
}


function draw() {
  //definir a cor do plano de fundo 
  
  background(200);
  if(gameState === PLAY){
    score=score+Math.round(getFrameRate()/35)
    if(score>0 && score%1000 === 0){
      point.play()
    }
   if (keyDown("space") && trex.y >= canH-50) {
      trex.velocityY = -8.5;
      jump.play()
    }
    if (touches.length>0 && trex.y >= canH-50) {
      trex.velocityY = -8.5;
      jump.play()
      touches = []
    }
    if (ground.x <= 0) {
     ground.x = 600
    }
     trex.velocityY = trex.velocityY + 0.5;
    ground.velocityX = -(2+3*score/1000)
    SpawnClouds()
    spawncactos()
    if (trex.isTouching(obsgrupo)){
      gameState = END
    
      die.play()
    }
  }else if (gameState === END) {
   ground.velocityX = 0
   obsgrupo.setVelocityXEach(0)
   cloudgrupo.setVelocityXEach(0)
   trex.velocityY = 0
   obsgrupo.setLifetimeEach(-1)
   cloudgrupo.setLifetimeEach(-1)
   trex.changeAnimation("perdido")
   restart.visible=true
  gameOver.visible=true 
  if(mousePressedOver(restart)){
    gameState=PLAY
    score=0
    obsgrupo.destroyEach()
    cloudgrupo.destroyEach()
     trex.changeAnimation("running")
     trex.y=canH-40
     gameOver.visible=false
     restart.visible=false
     obsgrupo.velocityX=-4.5
     cloudgrupo.velocityX=-3
     

  }
  if(touches.length>0){
    gameState=PLAY
    score=0
    obsgrupo.destroyEach()
    cloudgrupo.destroyEach()
     trex.changeAnimation("running")
     trex.y=canH-40
     gameOver.visible=false
     restart.visible=false
     obsgrupo.velocityX=-4.5
     cloudgrupo.velocityX=-3
    touches = [] 

  }
  }
   text("Score: "+score,canW-100,canH-180)
   
  
  //registrando a posição y do trex
  console.log(trex.y)

  //pular quando tecla de espaço for pressionada
  
 
  

  //impedir que o trex caia 
  trex.collide(invisibleGround)
  
  drawSprites();
}
function SpawnClouds() {
  if (frameCount % 140 === 0) {
    cloud = createSprite(canW, canH-140, 40, 10)
    cloud.addImage("cloud", cloudImage)
    cloud.velocityX = -(3+3*score/1000)
    cloud.y = Math.round(random(10, 80))

    var escalas = [0.8, 1, 1.5 ]
    var ale = random(escalas)

    cloud.scale = ale
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1

    cloud.lifetime = canW/3
    cloudgrupo.add(cloud)
  }

}
function spawncactos() {
  if (frameCount % 120 === 0) {
     obs = createSprite(canW+100, canH-45, 10, 40)
    obs.addImage(obs1)
    obs.velocityX = -(4.5+3*score/1000)
    var ale=Math.round(random(1,6))
    switch(ale){
      case 1:obs.addImage(obs1)
      obs.scale=0.5
      break
      case 2:obs.addImage(obs2)
      obs.scale=0.7
      break
      case 3:obs.addImage(obs3)
      obs.scale=0.8
      break
      case 4:obs.addImage(obs4)
      obs.scale=0.5
      break
      case 5:obs.addImage(obs5)
      obs.scale=0.5
      break
      case 6:obs.addImage(obs6)
      obs.scale=0.5
      break 
      default:break
    }   obs.lifetime=canW/3
    obsgrupo.add(obs)
  }


  }
