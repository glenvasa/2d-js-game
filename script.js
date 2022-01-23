window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 800;
  canvas.height = 720;

  // applies event listeners to keyboard events and
  // holds array of all currently active keys
  class InputHandler {
    constructor() {
      this.keys = [];
      // this EL will be automatically executed when new instance of class created
      window.addEventListener(
        "keydown",
        // use arrow function or bind method to bind this to parent scope; lexical scoping
        (e) => {
          if (
            (e.key === "ArrowDown" ||
              e.key === "ArrowUp" ||
              e.key === "ArrowLeft" ||
              e.key === "ArrowRight") &&
            this.keys.indexOf(e.key) === -1
          ) {
            this.keys.push(e.key);
          }
          console.log(e.key, this.keys);
        }
      );
      window.addEventListener(
        "keyup",
        // use arrow function or bind method to bind this to parent scope; lexical scoping
        (e) => {
          if (
            e.key === "ArrowDown" ||
            e.key === "ArrowUp" ||
            e.key === "ArrowLeft" ||
            e.key === "ArrowRight"
          ) {
            this.keys.splice(this.keys.indexOf(e.key, 1));
          }
          console.log(e.key, this.keys);
        }
      );
    }
  }

  // reacts to keyboard events from InputHandler,
  // draws and updates the player
  class Player {
    constructor(gameWidth, gameHeight) {
      // so that player doesn't run off screen
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.width = 200;
      this.height = 200;
      this.x = 0;
      this.y = this.gameHeight - this.height;
      this.image = document.getElementById("playerImage");
      this.frameX = 0;
      this.frameY = 0;
      this.speed = 0;
      this.vy = 0 // the velocity player is traveling in y direction
      this.weight = 1 // gravity effect to naturally bring player down when up key not pressed
    }
    draw(context) {
      context.fillStyle = "white";
      context.fillRect(this.x, this.y, this.width, this.height);
      // arguments 2,3,4,5 are sourcex, sy, sw, sh are the source image properties (spritesheet)
      // 0,0 for sx, sy give us top left image in spritesheet
      context.drawImage(
        this.image,
        this.frameX * this.width,
        this.frameY * this.height,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
    update(input) {
     // evaluate input keys
      if (input.keys.indexOf("ArrowRight") > -1) {
        this.speed = 5;
      } else if (input.keys.indexOf("ArrowLeft") > -1) {
        this.speed = -5;
      } else if (input.keys.indexOf('ArrowUp') > -1 && this.onGround()) { // this.onGround() ensures player can only jump when on ground
          this.vy -= 32
      } else {
        this.speed = 0;
      }

      // horizontal movement  
      this.x += this.speed;
      if (this.x < 0) this.x = 0
      else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width

      // vertical movement
      this.y += this.vy
      if (!this.onGround()){
          this.vy += this.weight
          this.frameY = 1
      } else {
          this.vy = 0
          this.frameY = 0
      }
      if (this.y > this.gameHeight -this.height) this.y = this.gameHeight - this.height
    }
    onGround(){
        return this.y >= this.gameHeight - this.height
    }
  }

  // handles endlessly scrolling backgrounds
  class Background {
      constructor(gameWidth, gameHeight){
          this.gameWidth = gameWidth
          this.gameHeight = gameHeight
          this.image = document.getElementById('backgroundImage')
          this.x = 0
          this.y = 0
          this.width = 2400
          this.height = 720
          this.speed = 10
      }
      draw(context){
          context.drawImage(this.image, this.x, this.y, this.width, this.height)
          // 2nd background drawn on x axis right after 1st image so looks like uninterupted scrolling
          // subtracting this.speed below prevents noticing any minor gap between images
          context.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width, this.height)
      }
      update(){
          this.x -= this.speed
          if (this.x < 0 - this.width) this.x = 0
      }
  }

  // generates Enemies
  class Enemy {}

  // handles adding, animating, & removing enemies
  function handleEnemies() {}

  // handles displaying score/game over message
  function displayStatusText() {}

  const input = new InputHandler();
  const player = new Player(canvas.width, canvas.height);
  const background = new Background(canvas.width, canvas.height)

  // main animation loop; runs 60x/second
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw(ctx)
    // background.update()
    player.update(input);
    player.draw(ctx);
    requestAnimationFrame(animate);
  }

  animate();
});
