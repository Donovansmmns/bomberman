//Major Project -- Bomberman
//Donovan Simmons.
//Jan 21, 2019


//Settings for grid, player coordinates.
let title;
let menuBackground;
let state = "mainMenu";
let grid;
let rows = 9;
let cols = 9;
let cellSize;

let playerOne;
let playerTwo;

let playerOneX = 0;
let playerOneY = 0;
let playerTwoX = 8;
let playerTwoY = 8;

let bombPlaced = false;

let wall;
let breakable;
let bomb;

let checker;
let arrayCheck = [];
let rangeUp = 0;
let rangeUp1 = 0;
let rangeUp2 = 0;

//NICE TO HAVE
let spreadsheet;
let animation1;
let animation2;
let animation3;
let animation4;
let animation5;
let animation6;
let animation7;
let animation8;
let animation9;
let animation10;
let animation = [animation1, animation2, animation3, animation4, animation5, animation6, animation7, animation8, animation9, animation10];

//Preloads images for aesthetic, only bomb works.
function preload(){
  title = loadImage("assets/title.png")
  menuBackground = loadImage("assets/backtitle.jpg")
  wall = loadImage("assets/wall.png");
  breakable = loadImage("assets/breakable_wall.png")
  bomb = loadImage("assets/bomb.jpg")
  spreadsheet = loadImage("assets/spreadsheet.png")
  //NICE TO HAVE
  animation1 = loadImage("assets/animation1.png")
  animation2 = loadImage("assets/animation2.png")
  animation3 = loadImage("assets/animation3.png")
  animation4 = loadImage("assets/animation4.png")
  animation5 = loadImage("assets/animation5.png")
  animation6 = loadImage("assets/animation6.png")
  animation7 = loadImage("assets/animation7.png")
  animation8 = loadImage("assets/animation8.png")
  animation9 = loadImage("assets/animation9.png")
  animation10 = loadImage("assets/animation10.png")


}

//Sets grid dimensions and player location.
function setup() {
  if (windowWidth > windowHeight) {
    createCanvas(windowHeight, windowHeight);
  }
  else {
    createCanvas(windowWidth, windowWidth);
  }
    grid = createEmptyGrid(cols, rows);
    grid[playerOneY][playerOneX] = "player one";
    grid[playerTwoY][playerTwoX] = "player two";
    cellSize = width / cols;
    checker = emptyGridCheck(cols, rows);
    
}

class Bomb {
  constructor(x, y, rangeUp){
    
    this.x = x;
    this.y = y;
    this.size = cellSize;
    this.range = cellSize * rangeUp;
  }
  display(){
    if (key === " "){
      image(bomb, this.x, this.y, this.size, this.size);
    
    // }
  // }
  // explode(){
      for (let i = 0; i <= rangeUp1; i++){
        let explosion = (this.size * i + cellSize)
        image(animation1, this.x -explosion, this.y, this.size, this.size); //bombs left
        image(animation1,this.x + explosion, this.y, this.size, this.size); //bombs right
        image(animation1,this.x, this.y - explosion, this.size, this.size); //bombs up
        image(animation1,this.x, this.y + explosion, this.size, this.size); //bombs down
        
        let gridLocationX = floor(this.x / cellSize);
        let gridLocationY = floor(this.y / cellSize);
        let gridLeftExplosion = floor((this.x / cellSize - 1) - i)
        let gridRightExplosion = floor((this.x / cellSize + 1) + i)
        let gridUpExplosion = floor((this.y / cellSize - 1) - i)
        let gridDownExplosion = floor((this.y / cellSize + 1) + i)

        grid[gridLocationY][gridLocationX] = "bomb";
        if (this.x > 0){
          grid[gridLocationY][gridLeftExplosion] = "explosion";
        }
        if (this.x < rows * cellSize){  
          grid[gridLocationY][gridRightExplosion] = "explosion";
        }
        if (this.y > 0){
          grid[gridUpExplosion + i][gridLocationX] = "explosion";
        }
        if (this.y < 9){
          grid[gridDownExplosion][gridLocationX] = "explosion";
        }
      }
    }
  } //COMMENT OUT IF MAKING EXPLODE FUNCTION ACTIVE 

  display2(){

    if (keyCode === ENTER){
      image(bomb, this.x, this.y, this.size, this.size);
      
      for (let i = 0; i <= rangeUp2; i++){
        let explosion = (this.size * i + cellSize)
        image(animation1, this.x -explosion, this.y, this.size, this.size); //bombs left
        image(animation1,this.x + explosion, this.y, this.size, this.size); //bombs right
        image(animation1,this.x, this.y - explosion, this.size, this.size); //bombs up
        image(animation1,this.x, this.y + explosion, this.size, this.size); //bombs down
        
        let gridLocationX = floor(this.x / cellSize);
        let gridLocationY = floor(this.y / cellSize);
        let gridLeftExplosion = floor((this.x / cellSize - 1) - i)
        let gridRightExplosion = floor((this.x / cellSize + 1) + i)
        let gridUpExplosion = floor((this.y / cellSize - 1) - i)
        let gridDownExplosion = floor((this.y / cellSize + 1) + i)
        
        grid[gridLocationY][gridLocationX] = "bomb";
        if (this.x > 0){
          grid[gridLocationY][gridLeftExplosion] = "explosion";
        }
        if (this.x < rows * cellSize){  
          grid[gridLocationY][gridRightExplosion] = "explosion";
        }
        if (this.y > 0){
          grid[gridUpExplosion + i][gridLocationX] = "explosion";
        }
        if (this.y < 9){
          grid[gridDownExplosion][gridLocationX] = "explosion";
        }
      } 
    }
  }
}


//Draws grid, players, bombs
function draw() {
  let timer;
  background(menuBackground);
  if (state === "mainMenu"){
    mainMenu();
  }
  else if (state === "Game"){
    displayGrid(grid, rows, cols);
    playerOne = new Bomb(playerOneX * cellSize, playerOneY * cellSize, rangeUp1);
    playerOne.display();
    // if (key === " "){
    //   bombPlaced = true;
    //   if (bombPlaced === true){
    //     if (millis() > timer + 1000) {        //FIX BOMBPLACED VARIABLE --IF TRUE IT STAYS TRUE, MAKE THE TIMER WORK!
    //       timer = millis();
    //       playerOne.explode();
    //       bombPlaced = false;
    //     }
    //   }
    // } 
  }
  
  playerTwo = new Bomb(playerTwoX * cellSize, playerTwoY * cellSize, rangeUp2);
  playerTwo.display2();

}

//Adjusts grid to window size.
function windowResized() {
  if (windowWidth > windowHeight) {
    createCanvas(windowHeight, windowHeight);
  }
  else {
    createCanvas(windowWidth, windowWidth);
  }
}

//Function to move player one through the grid, stops if at a wall or border.
function keyTyped() {
  // remove player from current spot.
  grid[playerOneY][playerOneX] = 0;

  // move player one, checks if direction has obstacle ahead.
  if (state === "Game"){
    if (key === "w" && playerOneY > 0 && grid[playerOneY-1][playerOneX] !== "unbreakable wall" && grid[playerOneY-1][playerOneX] !== "breakable object" ) { 
      playerOneY -= 1;
    }
    if (key === "s" && playerOneY < rows - 1 && grid[playerOneY+1][playerOneX] !== "unbreakable wall" && grid[playerOneY+1][playerOneX] !== "breakable object") {
      playerOneY += 1;
    }
    if (key === "d" && playerOneX < cols - 1 && grid[playerOneY][playerOneX+1] !== "unbreakable wall" && grid[playerOneY][playerOneX+1] !== "breakable object") {
      playerOneX += 1;
    }
    if (key === "a" && playerOneX > 0 && grid[playerOneY][playerOneX-1] !== "unbreakable wall" && grid[playerOneY][playerOneX-1] !== "breakable object") {
      playerOneX -= 1;
    }
    // put player back into grid.
    grid[playerOneY][playerOneX] = "player one";
  }
}

//Function to move player two through the grid with arrow keys, stops if at a wall or border.
function keyPressed(){
  // remove player from current spot.
  grid[playerTwoY][playerTwoX] = 0;

  // move player two, checks if direction has obstacle ahead.
  if (state === "Game"){
    if (keyCode === UP_ARROW && playerTwoY > 0 && grid[playerTwoY-1][playerTwoX] !== "unbreakable wall" && grid[playerTwoY-1][playerTwoX] !== "breakable object") { 
      playerTwoY -= 1;
    }
    if (keyCode === DOWN_ARROW && playerTwoY < rows - 1 && grid[playerTwoY+1][playerTwoX] !== "unbreakable wall" && grid[playerTwoY+1][playerTwoX] !== "breakable object") {
      playerTwoY += 1;
    }
    if (keyCode === RIGHT_ARROW && playerTwoX < cols - 1 && grid[playerTwoY][playerTwoX+1] !== "unbreakable wall" && grid[playerTwoY][playerTwoX+1] !== "breakable object") {
      playerTwoX += 1;
    }
    if (keyCode === LEFT_ARROW && playerTwoX > 0 && grid[playerTwoY][playerTwoX-1] !== "unbreakable wall" && grid[playerTwoY][playerTwoX-1] !== "breakable object") {
      playerTwoX -= 1;
    }
  
    // put player back into grid.
    grid[playerTwoY][playerTwoX] = "player two";
  }
}

//Creates 2d array.
function createEmptyGrid() {
  let emptyGrid = [];
  for (let x = 0; x < cols; x++) {
    emptyGrid.push([]);
    for (let y = 0; y < rows; y++) {
      emptyGrid[x].push(0);
    }
  }
  return emptyGrid;
}

//Displays the grid, makes starting zone for each player, breakable walls, and non-breakable walls.
function displayGrid(grid, rows, cols) {
  let cellSize = width / cols;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (y === playerOneY && x === playerOneX) {
        fill("blue");
      }
      else if (y % 2 !== 0 && x % 2 !== 0){
        grid[y][x] = "unbreakable wall";
        fill(0)
      }
      else if (y === 0 && x === 0 || y === 0 && x === 1 || y === 1 && x === 0 || y === 8 && x === 8 || y === 8 && x === 7 || y === 7 && x === 8){
        grid[y][x] = "open space";
        fill(255);
      }
      else if (grid[y][x] === "explosion"){
        arrayCheck[y][x] = 1
        grid[y][x] = "open space";
      }
      else if (arrayCheck[y][x] === 1){
        grid[y][x] = "open space";
        fill(255);
      }
      else{
        grid[y][x] = "breakable object"; //breakable object  
        // image(breakable, x * cellSize, y * cellSize, cellSize, cellSize)
        fill("gray")
      }
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
      if (y === playerTwoY && x === playerTwoX){
        fill("red");
      }
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }
}

function emptyGridCheck(){     //NEEDS TO BE CHANGED COMPLETELY TO MAKE NEW 2D ARRAY
  
  for (let x = 0; x < cols; x++) {
    arrayCheck.push([]);
    for (let y = 0; y < rows; y++) {
      arrayCheck[x].push(0);
    }
  }
  return arrayCheck;
}


function mainMenu(){
  // image(title, width/2 - 300, 50, 600, 250)
  fill("yellow")
  rect(width/2 - 125, 300, 250, 50, 20)
  fill(0)
  textSize(30)
  textFont("Comic Sans Ms")
  text("Single Player", width/2 - 90, 335)
  if (mouseIsPressed && mouseX >width/2-125 && mouseX < width/2+125 && mouseY > 300 && mouseY < 375){
    state = "Game"
  }
}