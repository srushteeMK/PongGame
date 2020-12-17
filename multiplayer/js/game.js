class Game{
    constructor(){
  
    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })
  
    }
  
    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
  
  
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(10,200,10,70);
  
    
    player2 = createSprite(380,200,10,70);
  
    players=[player1,player2];
    ball = createSprite(200,200,12,12);
  
        }
    
    play(){
        console.log(player1.x);
        console.log(player2.x);
        Player.getPlayerInfo();
                if(allPlayers!==undefined){
                  
                for(var i=0;i<400;i=i+20){
                    line(200,i,200,i+10);
                  }
           
                  if (keyDown("space") ) {
                   ball.velocityX = 5;
                   ball.velocityY = 5;
  
                 }
                 database.ref("ball").update({
                    x:ball.x,
                    y:ball.y
                })
                 edges = createEdgeSprites();
                 if (ball.isTouching(edges[2]) || ball.isTouching(edges[3])) {
                   ball.bounceOff(edges[2]);
                   ball.bounceOff(edges[3]);
                   //wall_hitSound.play();
                 }
                 ball.bounceOff(players)
                 var x =-370;
                 var y;
                 var index =0;
                 drawSprites();
                 for(var plr in allPlayers){
                   
                    
                     index = index+1;
                    
                    x = x+380;
                     y= 400-allPlayers[plr].distance;;
                     
                     players[index - 1].x = x;
                     players[index - 1].y = y;
                       
                     if(index === player.index){
                       
                        players[index - 1].shapeColor = "red";
  
                         
                     }
                     player1score=allPlayers.player1.score;
                     player2score=allPlayers.player2.score
                         textSize(15);
                         fill("black");
                         text("Player 1 :" +allPlayers.player1.score,100,14);
                      text("Player 2 :" + allPlayers.player2.score, 250, 14);
                 
                 }
                
                
               
  
                if (keyIsDown(DOWN_ARROW) && player.index !== null) {
                    player.distance -= 10
                    player.update();
                }
                if (keyIsDown(UP_ARROW) && player.index !== null) {
                    player.distance += 10
                    player.update();
                }
            
             
                  if (player.index !== null) {
                     
                          if (ball.x>400) {
                              ball.x=200;
                              ball.y=200;
                              ball.velocityX=0;
                            ball.velocityY=0
                            player1score++;
                            database.ref("players/player1").update({
                                score:player1score,
                            })
                              
                          }
                          
                          if (ball.x<0) {
                            ball.x=200;
                            ball.y=200;
                            ball.velocityX=0;
                          ball.velocityY=0
                          player2score++;
                            database.ref("players/player2").update({
                                score:player2score,
                            })
                             
                         }    
                 }
                
                
         if(player2score===5||player1score===5){
             gameState=2
             if(player2score===5){
                 database.ref("players/player2/name").on("value",(data)=>{
                    winner=data.val()
                 })
                
             }
             if(player1score===5){
                database.ref("players/player1/name").on("value",(data)=>{
                   winner=data.val()
                })
               
            }
         }
         
            }
         
  
    }
  
    end(){
      message=createElement("h1","Winner is "+winner);
      message.position(100,100)
    }
  }