'use strict';

var row = {
    r0: 0,
    r1: 50,
    r2: 125,
    r3: 213,
    r4: 290,
    r5: 375
};
var col = {
    c0: 0,
    c1: 100,
    c2: 200,
    c3: 300,
    c4: 400
};

//A score object is created with methods to change and print the score to screen and instantiated.
var Score = function(){
    this.points = 0;
};
Score.prototype.scoreUp = function(pts){
        var newScore;
        newScore = this.points + pts;
        this.points = newScore;
        this.printScore(this.points);
        return;
};
Score.prototype.scoreDown = function(pts){
        var newScore;
        newScore = this.points;
        //score can't go below 0 points
        if (this.points >= 5){
            newScore = this.points - pts;
        }
        this.points = newScore;
        this.printScore(newScore);
        return;
};
Score.prototype.printScore = function(score) {
        ctx.fillStyle = 'rgb(0,0,0)';
        ctx.fillRect(100, 0, 450, 100);
        ctx.fillStyle = 'rgb(200,200,200)';
        ctx.font = '36px sans-serif';
        ctx.fillText('Score:  ' + this.points, 320, 35);
        return;
};
var score = new Score();


// Enemies our player must avoid
var Enemy = function(posY, speed, name) {
    this.name = name;
    this.speed = speed;
    this.x = -100;
    this.y = posY;

    if (this.name === 'bug4'){
        this.x = -300;
    } else if (this.name === 'bug3'){
        this.x = -200;
    }
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    //create new subclass of bug, golden that runs a bit faster and moves UP the rows instead of down.

    if (this.name === 'bug4' || this.name === 'bug2'){
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
        } else if(this.y === 125){
            this.y = row.r3;
        }
    }
    this.render();
    //check collisions with player object
    if (this.x < player.x + player.width  && this.x + this.width  > player.x &&
        this.y < player.y + player.height && this.y + this.height > player.y) {
        // The objects are touching, call collision handler
        player.collision();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Place the player object in a variable called player
var Player = function(){
    //generate sprite, collision dimensions and initial position.
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 375;
    this.width = 65;
    this.height = 75;
};

Player.prototype.update = function(direction){
    //check direction of keypress and boundries of game board, and assign new values for x & y positions
    if ((direction === 'left') && (this.x >= 100)){
        this.x -= 100;
    } else if ((direction === 'right') && (this.x < 400)){
        this.x += 100;
    } else if ((direction === 'up') && (this.y >= 15)){
        this.y -= 85;
    } else if ((direction === 'down') && (this.y < 375)){
        this.y += 85;
    } else {direction = 'invalid';}
    if (this.y < 15){
        this.reachEnd();
    }
    this.render();
    // console.log("players new position: " + this.x + ", " + this.y);
};
Player.prototype.reachEnd = function(){
    //reset the player on reaching the end of the map.
    this.x = 200;
    this.y = 375;
    score.scoreUp(5);
};
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(key){
    var direction = key;
    this.update(direction);
};
Player.prototype.collision = function(){
    //reset player to initial position, subtract 5 from score
    this.x = col.c2;
    this.y = row.r5;
    score.scoreDown(5);
};

//instantiate new enemy objects
var enemy1 = new Enemy(row.r1, 1.1, 'bug1');
var enemy2 = new Enemy(row.r2, 1.45, 'bug2');
var enemy3 = new Enemy(row.r3, 1.25, 'bug3');
var enemy4 = new Enemy(row.r3, 0.95, 'bug4');

var allEnemies = [enemy1, enemy2, enemy3, enemy4];

//instantiate new player object
var player = new Player();

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
