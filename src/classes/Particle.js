const VELOCITY = 12;
const LIFESPAN = 24;

export default class Particle {
  constructor(posX = 0, posY = 0, color = '#ffffff') {
    this.lifespan = Math.floor(Math.random() * LIFESPAN);

    this.posX = posX; 
    this.posY = posY; 
    this.color = color;

    // this.velX = Math.random() * 20 - 10; 
    // this.velY = Math.random() * 20 - 10; 
    this.velX = Math.random() * VELOCITY - (VELOCITY/2); 
    this.velY = Math.random() * VELOCITY - (VELOCITY/2); 
        
    // multiply the velocity by this every frame to create
    // drag. A number between 0 and 1, closer to one is 
    // more slippery, closer to 0 is more sticky. values
    // below 0.6 are pretty much stuck :) 
    this.drag = 0.99; 
    
    // add this to the yVel every frame to simulate gravity
    this.gravity = 0.5; 
  }

  update() {
    this.lifespan--;

    // simulate drag
    this.velX *= this.drag; 
    this.velY *= this.drag;
    
    // add gravity force to the y velocity 
    this.velY += this.gravity; 
    
    // and the velocity to the position
    this.posX += this.velX;
    this.posY += this.velY;             
  }

  draw(ctx) {

    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(this.posX, this.posY, 4, 4); 
   
    ctx.restore();
    ctx.fill(); 
  }
}
