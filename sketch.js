//Major Project -- Bomberman
//Donovan Simmons.
//Jan 21, 2019


//Settings for grid, player coordinates.
let menuBackground;
let state = "mainMenu";
let grid;
let rows = 9;
let cols = 9;
let cellSize;

let playerOne;
let playerTwo;
let bot;

let playerOneX = 0;
let playerOneY = 0;
let playerTwoX = 8;
let playerTwoY = 8;

let winner;

//Map images.
let wall;
let breakable;
let bomb;
let ground;

//Computer timer
let timer = 0;
let wait = 400;
let timeToMove = true;

//Checks array for environment interaction.
let checker;
let arrayCheck = [];

//Nice to have - Range power-ups (not working).
let rangeUp = 0;
let rangeUp1 = 0;
let rangeUp2 = 0;

//Nice to have images for animation, not implemented.
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

//Preloads images for aesthetic.
function preload(){
  menuBackground = loadImage("assets/titlebackground.png");
  wall = loadImage("assets/wall.png");
  breakable = loadImage("assets/breakable_wall.png");
  bomb = loadImage("assets/bomb.jpg");
  ground = loadImage("assets/floor.png");
  winner = loadImage("assets/gameover.jpg");
  //Nice to have for animation on bombs.
  animation1 = loadImage("assets/animation1.png");
  animation2 = loadImage("assets/animation2.png");
  animation3 = loadImage("assets/animation3.png");
  animation4 = loadImage("assets/animation4.png");
  animation5 = loadImage("assets/animation5.png");
  animation6 = loadImage("assets/animation6.png");
  animation7 = loadImage("assets/animation7.png");
  animation8 = loadImage("assets/animation8.png");
  animation9 = loadImage("assets/animation9.png");
  animation10 = loadImage("assets/animation10.png");


}

//Sets grid dimensions and player location.
function setup() {
  if (windowWidth > windowHeight) {
    createCanvas(windowHeight, windowHeight);
  }
  else {
    createCanvas(windowWidth, windowWidth);
  }
  //Creates grid with set size, places player within.
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
    //Creates bomb image and explosion surrounding area when key is pressed.
    if (key === " "){
      image(bomb, this.x, this.y, this.size, this.size);

      //Creates explosion image based on player's range.
      for (let i = 0; i <= rangeUp1; i++){
        let explosion = (this.size * i + cellSize)
        image(animation1, this.x -explosion, this.y, this.size, this.size); //bombs left
        image(animation1,this.x + explosion, this.y, this.size, this.size); //bombs right
        image(animation1,this.x, this.y - explosion, this.size, this.size); //bombs up
        image(animation1,this.x, this.y + explosion, this.size, this.size); //bombs down

        //Rounds decimal of explosion locations.
        let gridLocationX = floor(this.x / cellSize);
        let gridLocationY = floor(this.y / cellSize);
        let gridLeftExplosion = floor((this.x / cellSize - 1) - i)
        let gridRightExplosion = floor((this.x / cellSize + 1) + i)
        let gridUpExplosion = floor((this.y / cellSize - 1) - i)
        let gridDownExplosion = floor((this.y / cellSize + 1) + i)
        
        //Sets position of grid to become an explosion or bomb.
        grid[gridLocationY][gridLocationX] = "bomb";

        //Turns grid position left into an explosion in array.
        if (this.x > 0){
          if (grid[gridLocationY][gridLocationX-1] !== "unbreakable wall"){ //Array left.
            grid[gridLocationY][gridLeftExplosion] = "explosion";
          }
        }

        //Turns grid position right into an explosion in array.
        if (this.x < rows * cellSize){
          if (grid[gridLocationY][gridLocationX+1] !== "unbreakable wall"){ //Array right.
            grid[gridLocationY][gridRightExplosion] = "explosion";
          }
        }

        //Turns grid position above into an explosion in array.
        if (this.y > rangeUp1){
          if (grid[gridLocationY-1][gridLocationX] !== "unbreakable wall"){ //Array up.
            grid[gridUpExplosion][gridLocationX] = "explosion";
          }
        }

        //Turns grid position down into an explosion in array, goes farther if the player has a rangeUp bonus.
        if (rangeUp1 > 0){
          if (this.y + (rangeUp1 * cellSize) > cols * cellSize){ // Needs fixing
            gridDownExplosion--;
            if (grid[gridLocationY+1][gridLocationX] !== "unbreakable wall"){ //Array down with power-up collected.
              grid[gridDownExplosion][gridLocationX] = "explosion";
            }
          }

          //Needs fixing for explosion to affect all map properly.
          else{
            if (grid[gridLocationY+1][gridLocationX] !== "unbreakable wall" && gridLocationY+rangeUp1 < cols-2){
              grid[gridDownExplosion][gridLocationX] = "explosion";
              }
            }
          }
        //Turns grid position down into an explosion in array.
        else if (this.y < cols * cellSize - cellSize){
          if (grid[gridLocationY+1][gridLocationX] !== "unbreakable wall"){ //Array down.
            grid[gridDownExplosion][gridLocationX] = "explosion";
          }
        }
      }
    }
  }

  //Places a bomb for player two / AI when key is pressed - same function as display, for secondary player.
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
        let gridLeftExplosion = floor((this.x / cellSize - 1) - i);
        let gridRightExplosion = floor((this.x / cellSize + 1) + i);
        let gridUpExplosion = floor((this.y / cellSize - 1) - i);
        let gridDownExplosion = floor((this.y / cellSize + 1) + i);
        
        
        grid[gridLocationY][gridLocationX] = "bomb";
        if (this.x > 0){
          if (grid[gridLocationY][gridLocationX-1] !== "unbreakable wall"){ //Array left.)
            grid[gridLocationY][gridLeftExplosion] = "explosion";
          }
        }

        if (this.x < rows * cellSize){ 
          if (grid[gridLocationY][gridLocationX+1] !== "unbreakable wall"){ //Array right.
            grid[gridLocationY][gridRightExplosion] = "explosion";
          }
        }
        if (this.y > 0){
          if (grid[gridLocationY-1][gridLocationX] !== "unbreakable wall"){ //Array up.
            grid[gridUpExplosion + i][gridLocationX] = "explosion";
          }
        }

        if (this.y < 0){
          if (grid[gridLocationY+1][gridLocationX-1] !== "unbreakable wall"){ //Array down with power-up collected.
            grid[gridDownExplosion][gridLocationX] = "explosion";
          }
        }

        else if (this.y < cols * cellSize - cellSize){
          if (grid[gridLocationY+1][gridLocationX] !== "unbreakable wall"){ //Array down.
            grid[gridDownExplosion][gridLocationX] = "explosion";
          }
        }
      } 
    }
  }
}


//Checks state of game - menu, singleplayer, multiplayer, controls, win-situation. Draws level, players, and bombs.
function draw() {
  background(menuBackground);
  gameOver();
  if (state === "mainMenu"){
    mainMenu();
  }

  //Creates player one and the AI, using a timer to set the AI move speed.
  else if (state === "Solo"){
    displayGrid(grid, rows, cols);
    playerOne = new Bomb(playerOneX * cellSize, playerOneY * cellSize, rangeUp1);
    playerOne.display();
    bot = new Bomb(playerTwoX * cellSize, playerTwoY * cellSize, rangeUp2);
    bot.display2();
    if (timeToMove){
      if (millis() > timer + wait){
        computer();
        timer = millis();
      }
    }
  }

  //Creates both controllable players.
  else if (state === "Multi"){
    displayGrid(grid, rows, cols);
    playerOne = new Bomb(playerOneX * cellSize, playerOneY * cellSize, rangeUp1);
    playerOne.display();
    playerTwo = new Bomb(playerTwoX * cellSize, playerTwoY * cellSize, rangeUp2);
    playerTwo.display2();
  }

  //Displays controls on how to play.
  else if (state === "Options"){
    fill("yellow");
    textSize(30);
    textFont("Algerian");
    text("Player One:\nWASD, Spacebar Places Bomb", 175, height/2);
    text("Player Two:\nArrow Keys, Shift Places Bomb", 175, height/2 + 100);
  }

  //Victory message for player 1.
  else if (state === "P1W"){
    background(winner);
    fill("white");
    textSize(35);
    textFont("Algerian");
    text("Player One Wins! Take that, Player Two!", 25, height/2 - 150);
  }

  //Victory message for player 2 or AI.
  else if (state === "P2W"){
    background(winner);
    fill("white");
    textSize(35);
    textFont("Algerian");
    text("Player Two Wins! Get good, Player One!", 25, height/2 - 150);
  }
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

//Function to move player one through the grid, stops if at a wall or border. Controls for player one.
function keyTyped() {
  // remove player from current spot.
  grid[playerOneY][playerOneX] = 0;

  // move player one, checks if direction has obstacle ahead.
  if (state === "Solo" || state === "Multi"){
    if (key === "w" && playerOneY > 0 && grid[playerOneY-1][playerOneX] !== "unbreakable wall" && grid[playerOneY-1][playerOneX] !== "breakable wall" ) { 
      playerOneY -= 1;
    }
    if (key === "s" && playerOneY < rows - 1 && grid[playerOneY+1][playerOneX] !== "unbreakable wall" && grid[playerOneY+1][playerOneX] !== "breakable wall") {
      playerOneY += 1;
    }
    if (key === "d" && playerOneX < cols - 1 && grid[playerOneY][playerOneX+1] !== "unbreakable wall" && grid[playerOneY][playerOneX+1] !== "breakable wall") {
      playerOneX += 1;
    }
    if (key === "a" && playerOneX > 0 && grid[playerOneY][playerOneX-1] !== "unbreakable wall" && grid[playerOneY][playerOneX-1] !== "breakable wall") {
      playerOneX -= 1;
    }

    // put player back into grid.
    grid[playerOneY][playerOneX] = "player one";
  }
}

//Function to move player two through the grid, stops if at a wall or border. Controls for player two.
function keyPressed(){
  // remove player from current spot.
  grid[playerTwoY][playerTwoX] = 0;

  // move player two, checks if direction has obstacle ahead.
  if (state === "Multi"){
    if (keyCode === UP_ARROW && playerTwoY > 0 && grid[playerTwoY-1][playerTwoX] !== "unbreakable wall" && grid[playerTwoY-1][playerTwoX] !== "breakable wall") { 
      playerTwoY -= 1;
    }
    if (keyCode === DOWN_ARROW && playerTwoY < rows - 1 && grid[playerTwoY+1][playerTwoX] !== "unbreakable wall" && grid[playerTwoY+1][playerTwoX] !== "breakable wall") {
      playerTwoY += 1;
    }
    if (keyCode === RIGHT_ARROW && playerTwoX < cols - 1 && grid[playerTwoY][playerTwoX+1] !== "unbreakable wall" && grid[playerTwoY][playerTwoX+1] !== "breakable wall") {
      playerTwoX += 1;
    }
    if (keyCode === LEFT_ARROW && playerTwoX > 0 && grid[playerTwoY][playerTwoX-1] !== "unbreakable wall" && grid[playerTwoY][playerTwoX-1] !== "breakable wall") {
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
        rect(x*cellSize, y*cellSize, cellSize, cellSize);
      }

      //Sets all even positioned spots as unbreakable objects, not including the border.
      else if (y % 2 !== 0 && x % 2 !== 0){ 
        grid[y][x] = "unbreakable wall";
        image(wall, x * cellSize, y * cellSize, cellSize, cellSize);
      }

      //Starting zone for both players.
      else if (y === 0 && x === 0 || y === 0 && x === 1 || y === 1 && x === 0 || y === 8 && x === 8 || y === 8 && x === 7 || y === 7 && x === 8){
        grid[y][x] = "open space";
        image(ground, x * cellSize, y * cellSize, cellSize, cellSize); 
      }

      //Checks to see if it has been affected by a bomb in the past - sets position to become an open space.
      else if (arrayCheck[y][x] === 1){
        grid[y][x] = "open space";
        image(ground, x * cellSize, y * cellSize, cellSize, cellSize);  
      }

      //Set breakable objects hit by bombs to be open spaces.
      else if (grid[y][x] === "explosion"){
        arrayCheck[y][x] = 1;
        grid[y][x] = "open space";
      }

      //Fills all remaining spots as breakable walls that can be affected by bombs.
      else{
        grid[y][x] = "breakable wall";
        image(breakable, x * cellSize, y * cellSize, cellSize, cellSize) 
      }

      //Displays player two in the set coordinates.
      if (y === playerTwoY && x === playerTwoX){
        fill("red");
        rect(x*cellSize, y*cellSize, cellSize, cellSize);
      }
    }
  }
}

//Creates empty grid that is used to check if blocks have exploded.
function emptyGridCheck(){
  for (let x = 0; x < cols; x++) {
    arrayCheck.push([]);
    for (let y = 0; y < rows; y++) {
      arrayCheck[x].push(0);
    }
  }
  return arrayCheck;
}

//Places buttons on main menu to choose single player, multiplayer, or controls.
function mainMenu(){
  fill("yellow");
  rect(width/2 - 125, height/2 - 45, 250, 50, 20);
  fill(0);
  textSize(30);
  textFont("Algerian");
  text("Single Player", width/2 - 110, height/2 - 10);
  if (mouseIsPressed && mouseX >width/2-125 && mouseX < width/2+125 && mouseY > 350 && mouseY < 400){
    state = "Solo";
  }

  fill("yellow");
  rect(width/2 - 125, height/2 + 30, 250, 50, 20);
  fill(0);
  textSize(30);
  textFont("Algerian");
  text("Multiplayer", width/2 - 95, height/2 + 65);
  if (mouseIsPressed && mouseX >width/2-125 && mouseX < width/2+125 && mouseY > 425 && mouseY < 475){
    state = "Multi";
  }

  fill("yellow");
  rect(width/2 - 125, height/2 + 105, 250, 50, 20);
  fill(0);
  textSize(30);
  textFont("Algerian");
  text("Controls", width/2 - 70, height/2 + 140);
  if (mouseIsPressed && mouseX >width/2-125 && mouseX < width/2+125 && mouseY > 500 && mouseY < 550){
    state = "Options";
  }
}

//Called when there is a winner.
function gameOver(){
  if (grid[playerTwoY][playerTwoX] === "explosion"){
    state = "P1W";
  }
  if (grid[playerOneY][playerOneX] === "explosion"){
    state = "P2W";
  }
}

//Controls for computer.
function computer(){
  let move = random(100);
  if (move <= 25  && playerTwoY > 0){
    if (grid[playerTwoY-1][playerTwoX] === "open space" || grid[playerTwoY-1][playerTwoX] === "explosion"){ //Up
      playerTwoY -= 1;
    }

    else if (grid[playerTwoY-1][playerTwoX] === "breakable wall"){
      keyCode = ENTER;
      if (keyCode === ENTER){
        keyCode = UP_ARROW;
      }
    } 
  }

  else if (move > 25 && move <= 50 && playerTwoY < 8){
    if (grid[playerTwoY+1][playerTwoX] === "open space" || grid[playerTwoY+1][playerTwoX] === "explosion"){ //Down
      playerTwoY += 1;
    }

    else if (grid[playerTwoY+1][playerTwoX] === "breakable wall"){
      keyCode = ENTER;
      if (grid[playerOneY+1][playerTwoX] === "explosion"){
        keyCode = DOWN_ARROW;
      }
    } 
  }

  else if (move > 50 && move <= 75 && playerTwoX > 0){
    if (grid[playerTwoY][playerTwoX-1] === "open space" || grid[playerTwoY][playerTwoX-1] === "explosion"){ //Left
      playerTwoX -= 1;
    }

    else if (grid[playerTwoY][playerTwoX-1] === "breakable wall"){
      keyCode = ENTER;
      if (grid[playerOneY][playerTwoX-1] === "explosion"){
        keyCode = LEFT_ARROW;
      }
    } 
  }

  else if (move > 75 && playerTwoX < 8){
    if (grid[playerTwoY][playerTwoX+1] === "open space" || grid[playerTwoY][playerTwoX+1] === "explosion"){ //Right
      playerTwoX += 1;
    }

    else if (grid[playerTwoY][playerTwoX+1] === "breakable wall"){
      keyCode = ENTER;
      if (grid[playerOneY][playerTwoX+1] === "explosion"){
        keyCode = RIGHT_ARROW;
      }
    } 
  }

  else {
    move = random(100);
  }
}