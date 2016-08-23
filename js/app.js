// Enemies our player must avoid
var gridW = 101;
var gridH = 83;
var gridHOffset = 60;

var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed*dt;
    if(this.x > gridW*5) {
        this.x = gridW*(Math.random()*-3);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-cat-girl.png';
    this.x = gridW*2;
    this.y = gridHOffset + gridH*4;
};

//Update player position on map. Check collision with all enemies.
//Reset player if collide with an enemy.
Player.prototype.update = function(allEnemies) {
    var i, len = allEnemies.length;
    for (i=0; i<len; i++) {
        if(this.collision(allEnemies[i])) {
            this.reset();
            break;
        }
    }
};

//Draw player on map.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Reset player to the bottom of the map.
Player.prototype.reset = function() {
    this.x = gridW*2;
    this.y = gridHOffset + gridH*4;
};

//Move character according to keyboard input. Do not move if at
//boundary. Reset player if reaches the river.
Player.prototype.handleInput = function(key) {
    if(key == 'left') {
        if(this.x > 0) {
            this.x -= gridW;
        }
    }
    if(key == 'right') {
        if(this.x < gridW*4) {
            this.x += gridW;
        }
    }
  // If player reaches the river reset player to the bottom.
    if(key == 'up') {
        if(this.y > gridHOffset) {
            this.y -= gridH;
        } else if (this.y <= gridHOffset) {
            this.reset();
        }
    }
    if(key == 'down') {
        if(this.y < gridHOffset + gridH*4) {
          this.y += gridH;
        }
    }
};

// A helper function to check collision. Input player and an emeny.
// Output true or false.
Player.prototype.collision = function(enemy) {
    if(
        this.y == enemy.y &&
        this.x <= enemy.x + 81 &&
        this.x >= enemy.x - 81
    ) {
        return true;
    } else {
        return false;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
//Start each enemy at a random x coordinate on map.
var allEnemies = [
  enemy1 = new Enemy(gridW * (-1 + Math.random()*6), gridHOffset + gridH*2, 150),
  enemy2 = new Enemy(gridW * (-1 + Math.random()*6), gridHOffset + gridH, 200),
  enemy3 = new Enemy(gridW * (-1 + Math.random()*6), gridHOffset, 500),
  enemy4 = new Enemy(gridW * (-1 + Math.random()*6), gridHOffset + gridH*2, 150),
  enemy5 = new Enemy(gridW * (-1 + Math.random()*6), gridHOffset + gridH, 200)
]

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
