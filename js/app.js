// Add border to canvas that flashes or changes on win or death.
// add controls to change player-character sprite
// add a score and methods to change it
// add another type of enemy that moves 20% faster but stops randomly for .5 second that
// only apears at a score of ~10 or higher, gold or blue shell?
// add "gems" to collect at score 3 (+2 and +5 points)

// set up a grid system
var row = {
    r0: 0,
    r1: 50,
    r2: 125,
    r3: 213,
    r4: 290,
    r5: 375,
}
var col = {
    c0: 0,
    c1: 100,
    c2: 200,
    c3: 300,
    c4: 400,
}
var score = 0;

var currentChar = "boy";

    // this function draws the updated score to the canvas
function printScore(score) {
        ctx.fillStyle = 'rgb(0,0,0)';
        ctx.fillRect(100, 0, 450, 100);
        ctx.fillStyle = 'rgb(200,200,200)';
        ctx.font = '36px sans-serif';
        ctx.fillText('Score:  ' + score, 320, 35);
}
function collision(){
    //reset player to initial position, subtract 5 from score
    player.x = col.c2;
    player.y = row.r5;
    score = scoreDown(5);
}
function scoreUp(pts){
    var newScore;
    newScore = score + pts;
    console.log("score is:  " + newScore);
    printScore(newScore);
    return newScore;
}
function scoreDown(pts){
    var newScore;
    newScore = score;
    if (score >= 5){
        newScore = score - pts;
    }
    console.log("score is:  " + newScore);
    printScore(newScore);
    return newScore;
}


// Enemies our player must avoid
var Enemy = function(posY, speed, name) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    var initialPosition = [],
        initialPosition = [-100, posY];
    this.name = name;
    this.speed = speed;

    if (this.name === "bug4"){
        initalPosition = [-500, posY];
    } else {}

    this.x = initialPosition[0];
    this.y = initialPosition[1];

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    //create new subclass of bug, golden that runs a bit faster and moves UP the rows instead of down.

    if (this.name === "bug4" || this.name === "bug2"){
        this.sprite = 'images/enemy-bug2.png';
    } else {
       this.sprite = 'images/enemy-bug.png';
    }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var moveSpeed = this.speed;
        this.width = 75;
        this.height = 55;
    var moveAmount = 200 * dt * moveSpeed;
    if (this.x < 550){
        this.x = this.x + moveAmount;
    }
    else {
        this.x = -100;
        if(this.y > 210){
            this.y = row.r1;
        } else if(this.y < 55){
            this.y = row.r2;
        } else if(this.y = 125){
            this.y = row.r3;
        }
    }
    this.render();
    //check collisions with player object
    if (this.x < player.x + player.width  && this.x + this.width  > player.x &&
        this.y < player.y + player.height && this.y + this.height > player.y) {
    // The objects are touching
    console.log("Collision Detected with: " + this.name);
    collision();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
enemy1 = new Enemy(row.r1, 1.1, "bug1");
enemy2 = new Enemy(row.r2, 1.45, "bug2");
enemy3 = new Enemy(row.r3, 1.25, "bug3");
enemy4 = new Enemy(row.r3, .95, "bug4")
var allEnemies = [enemy1, enemy2, enemy3, enemy4];


// Place the player object in a variable called player
var Player = function(){
    if (currentChar === "boy") {
        this.sprite = 'images/char-boy.png'
    } else if (currentChar === "girl1"){
        this.sprite = 'images/char-cat-girl.png'
    } else if (currentChar === "girl2"){
        this.sprite = 'images/char-horn-girl.png'
    } else if (currentChar === "girl3"){
        this.sprite = 'images/char-pink-girl.png'
    } else {
        this.sprite = 'images/char-boy.png'
    }

    this.x = 200;
    this.y = 375;
    this.width = 65;
    this.height = 75;

}
Player.prototype.update = function(direction){
    //check direction of keypress and boundries of game board, and assign new values for x & y positions
    if ((direction === "left") && (this.x >= 100)){
        this.x -= 100;
    } else if ((direction === "right") && (this.x < 400)){
        this.x += 100;
    } else if ((direction === "up") && (this.y >= 15)){
        this.y -= 85;
    } else if ((direction === "down") && (this.y < 375)){
        this.y += 85;
    } else {direction = "invalid";}
    var posX = this.x,
        posY = this.y;
    if (this.y < 15){
        player.reachEnd();
    }
    player.render();
    // console.log("players new position: " + this.x + ", " + this.y);
}
Player.prototype.reachEnd = function(){
    this.x = 200;
    this.y = 375;
    score = scoreUp(5);
}
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.handleInput = function(key){
    var keyPress = key;
    var direction = "";
    switch (keyPress) {
        case 'left':
          direction = "left";
          break;
        case 'right':
          direction = "right";
          break;
        case 'up':
          direction = "up";
          break;
        case 'down':
          direction = "down";
          break;
        default:
          direction = "invalid";
    }
    player.update(direction);
}
player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
