const VELOCITY = 12;
const LIFESPAN = 24;

export default class Particle {
  constructor(posX = 0, posY = 0) {
    this.lifespan = Math.floor(Math.random() * LIFESPAN);

    this.posX = posX; 
    this.posY = posY; 

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
    this.gravity = 0.1; 
    
    // the amount to rotate every frame
    this.spin = Math.random() * 20 - 10; 

    // the current rotation
    this.rotation = Math.random() * 180 - 90; 
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
            
    // rotate the particle by the spin amount. 
    this.rotation += this.spin; 
  }

  draw(ctx) {

    ctx.beginPath();
    ctx.rect(this.posX, this.posY, 4, 4);
 
    //ctx.rotate(45 * deg);
    // console.log(this.rotation);
    
    ctx.save();

    // ctx.rotate((Math.PI / 180) * this.rotation);

    ctx.restore();

    ctx.fillStyle = '#5084E2';
    ctx.fill(); 
  }
}
