window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d')
    canvas.width = 800
    canvas.height = 720

    // applies event listeners to keyboard events and
    // holds array of all currently active keys
    class InputHandler {
        constructor(){
            this.keys = []
            // this EL will be automatically executed when new instance of class created
            window.addEventListener('keydown', 
               // use arrow function or bind method to bind this to parent scope; lexical scoping 
             e => {
                if ((   e.key === 'ArrowDown' || 
                        e.key === 'ArrowUp' || 
                        e.key === 'ArrowLeft' || 
                        e.key === 'ArrowRight') 
                && this.keys.indexOf(e.key) === -1){
                    this.keys.push(e.key)
                }
                console.log(e.key, this.keys);
            })
            window.addEventListener('keyup', 
            // use arrow function or bind method to bind this to parent scope; lexical scoping 
          e => {
             if ((  e.key === 'ArrowDown' || 
                    e.key === 'ArrowUp' || 
                    e.key === 'ArrowLeft' || 
                    e.key === 'ArrowRight')){
                 this.keys.splice(this.keys.indexOf(e.key, 1))
             }
             console.log(e.key, this.keys);
         })
        }
    }

    // reacts to keyboard events from InputHandler,
    // draws and updates the player
    class Player {

    }

    // handles endlessly scrolling backgrounds
    class Background {

    }

    // generates Enemies
    class Enemy {

    }

    // handles adding, animating, & removing enemies
    function handleEnemies(){

    } 

    // handles displaying score/game over message
    function displayStatusText() {

    }


    const input = new InputHandler()

    // main animation loop; runs 60x/second
    function animate() {

    }


})