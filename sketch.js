//Grid Assignment
//Donovan Simmons.
//Nov 12, 2019


//Settings for grid, player coordinates.
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

let wall;
let breakable;
let bomb;
let rangeUp = 0;
//Preloads images for aesthetic, only bomb works.
function preload(){
  wall = loadImage("assets/wall.png");
  breakable = loadImage("assets/breakable_wall.png")
  bomb = loadImage("assets/bomb.jpg")
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
}

class BombOne {
  constructor(x, y){
    
    this.x = playerOneX * cellSize;
    this.y = playerOneY * cellSize;
    this.fillColor = color("orange");
    this.size = cellSize;
    this.range = cellSize * rangeUp;
    
  }
  display(){
    if (key === " "){
      fill(this.fillColor);
      rect(this.x, this.y, this.size, this.size);
      
      for (let i = 0; i <= rangeUp; i++){
        let explosion = (this.size * i + cellSize)
        rect(this.x -explosion, this.y, this.size, this.size);  //bomb left
        rect(this.x + explosion, this.y, this.size, this.size); //bomb right
        rect(this.x, this.y - explosion, this.size, this.size); //bomb up
        rect(this.x, this.y + explosion, this.size, this.size); //bomb down
                                       
        grid[this.y][this.x] = "bomb";
        // grid[this.x][this.y] = "bomb";                             // WIP        
        // console.log(grid[this.y][this.x])                          // WIP
        // grid[this.y-(this.size*i+cellSize)][this.x] = "explosion"; // WIP
      } 
    }
  }
}


//Draws grid, players, bombs
function draw() {
  background(220);
  displayGrid(grid, rows, cols);
  playerOne = new BombOne(playerOneX, playerOneY);
  playerOne.display();

  playerTwoBomb();
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

//Function to move player two through the grid with arrow keys, stops if at a wall or border.
function keyPressed(){
  // remove player from current spot.
  grid[playerTwoY][playerTwoX] = 0;

  // move player two, checks if direction has obstacle ahead.
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
      else{
        grid[y][x] = "open space";  
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

//Places a bomb at player one's location, unfinished. Bomb disappears after a key is pressed and doesn't do anything.
function playerOneBomb(){
  let bombX = cellSize * playerOneX;
  let bombY = cellSize * playerOneY;
  let bombPlanted = false;
  if (key === " "){
    bombPlanted = true;
    if (bombPlanted = true){
      grid[playerOneY][playerOneX] = image(bomb, bombX, bombY, cellSize, cellSize);
    }
  }
}

//Places a bomb at player two's location, unfinished. Bomb disappears after a key is pressed and doesn't do anything.
function playerTwoBomb(){
  let bombX = cellSize * playerTwoX;
  let bombY = cellSize * playerTwoY;
  if (keyCode === ENTER){
    grid[playerTwoY][playerTwoX] = image(bomb, bombX, bombY, cellSize, cellSize)
  }
}
