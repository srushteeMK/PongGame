var database;

var gameState =0;
var playerCount = 0;
var allPlayers;
var score =0;
var player, form,game;
var player1,player2;
var players;

var edges,players,player1,player2,ball,game,form,gameState,playerCount,player;
var player1score =0;
var player2score =0;
var ballPos;
var winner,message;
function setup() {
  createCanvas(400, 400);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  
}

function draw() {
 
  
   if (playerCount === 2) {
     game.update(1);
   }
   if (gameState === 1) {
    form.hide();
     clear(); 
     game.play();
   }
   if (gameState === 2) {
    clear();
     game.end();
   }
}