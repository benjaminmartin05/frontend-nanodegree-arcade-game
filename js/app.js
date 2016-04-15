// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //set enemy coordinates
    this.x = x;
    this.y = y;
    this.speed = speed;
    //set enemy speed between 1 and 6
    //this.speed = Math.random() * 5 + 1;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt; //this means our game will be running (this.speed) pixels per second
    this.checkCollision(player);
    //reset an enemy to the left side of the screen when its made it across, its a negative # so
    //the bug regenerates off the screen and is moving by the time it goes on the screen
    if (this.x > 550) {
        this.x = dt - 250;
    }
};

//handle collisions with player
Enemy.prototype.checkCollision = function(player) {
    if (player.x < this.x + 75 &&
        player.x + 65 > this.x &&
        player.y < this.y + 50 &&
        70 + player.y > this.y) {
        this.score--;
        player.reset();
        //updating the players score and attaching it to the newScore id in index.html
        //TODO: this.score does not appear to be subtracting 1 from score total though
        document.getElementById("newScore").innerHTML = player.score;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function(x, y) {
    //create a player image
    this.sprite = 'images/char-boy.png';
    //set player coordinates
    this.x = x;
    this.y = y;
    this.score = 0;
};
// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function(dt) {
    //will be similar to that of enemy
    this.x * (dt);
    this.y * (dt);
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

function placeScoreDiv(x_pos, y_pos) {
    var d = document.getElementById('scoreDiv');
    d.style.position = "absolute";
    d.style.left = x_pos + 'px';
    d.style.top = y_pos + 'px';
}

placeScoreDiv(450, 100);

Player.prototype.handleInput = function(modifier) {
    //take the players current location and adds the key stroke L,R,U,D to move the player
    if (modifier == 'left') {
        this.x -= 50;
    }
    if (modifier == 'up') {
        this.y -= 50;
    }
    if (modifier == 'right') {
        this.x += 50;
    }
    if (modifier == 'down') {
        this.y += 50;
    }
    //make something that doesn't allow player to move off the screen
    if (modifier == 'left' && this.x < 10) {
        this.x = 7;
    }
    if (modifier == 'up' && this.y < 10) {
        this.y = 7;
    }
    if (modifier == 'right' && this.x > 410) {
        this.x = 410;
    }
    if (modifier == 'down' && this.y > 400) {
        this.y = 400;
    }
    // If the player reaches the water the game should be reset
    // by moving the player back to the initial location
    // (you can write a separate reset Player method to handle that)
    if (this.y <= 7) {
        this.score++;
        player.reset();
        //updating the players score and attaching it to the newScore id in index.html
        document.getElementById("newScore").innerHTML = player.score;
        if (player.score === 2) {
            //TODO: score is not resetting to 0 until player has hit a bug after "you win" alert appears
            player.score = 0;
            alert("You Win");
        }
    }
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 380;
};

// Now instantiate your objects.
var allEnemies = [];
//enemyCreator will allow me to start multiple enemies at once to make the game more
//challenging depending on how many enemies I want to add
var enemyCreator = function(totalEnemies) {
    for (var i = 0; i <= totalEnemies; i++) {
        allEnemies.push(new Enemy(-250, 65, Math.floor(Math.random() * 250) + 2));
        allEnemies.push(new Enemy(-250, 150, Math.floor(Math.random() * 250) + 2));
        allEnemies.push(new Enemy(-250, 225, Math.floor(Math.random() * 250) + 2));
    }
};
//.push() in enemy creator must be called/located after the allEnemies array your trying
//to push towards has been made for proper function

//run enemyCreator multiple times to make the game more challenging
enemyCreator(2);

// Place the player object in a variable called player
var player = new Player(200, 380);

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