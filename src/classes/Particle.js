const VELOCITY = 12;
const LIFESPAN = 24;

export default class Particle {
  constructor(c) { // config
    this.lifespan = ('lifespan' in c) ? c.lifespan : Math.floor(Math.random() * LIFESPAN);

    this.x = ('x' in c) ? c.x : 0;
    this.y = ('y' in c) ? c.y : 0;
    this.color = ('color' in c) ? c.color : '#ffffff';

    this.size = ('size' in c) ? c.size : 6;

    this.velX = ('velX' in c) ? c.velX : Math.random() * VELOCITY - (VELOCITY/2); 
    this.velY = ('velY' in c) ? c.velY : Math.random() * VELOCITY - (VELOCITY/2); 
        
    // multiply the velocity by this every frame to create
    // drag. A number between 0 and 1, closer to one is 
    // more slippery, closer to 0 is more sticky. values
    // below 0.6 are pretty much stuck :) 
    this.drag = ('drag' in c) ? c.drag : 0.99; 

    // add this to the yVel every frame to simulate gravity
    this.gravity = ('gravity' in c) ? c.gravity : 0.5; 
  }

  update() {
    this.lifespan--;

    // simulate drag
    this.velX *= this.drag; 
    this.velY *= this.drag;
    
    // add gravity force to the y velocity 
    this.velY += this.gravity; 
    
    // and the velocity to the position
    this.x += this.velX;
    this.y += this.velY;             
  }

  draw(ctx) {

    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(this.x, this.y, this.size, this.size); 
   
    ctx.restore();
    ctx.fill(); 
  }
}
