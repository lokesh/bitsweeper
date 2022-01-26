<template>
  <canvas
    ref="canvas"
  />
</template>

<script>
import Particle from '@/classes/Particle';

export default {
  name: 'FXCanvas',
  
  props: {
    msg: String
  },

  data() {
    return {
      ctx: null,
      particles: [],
    };
  },

  computed: {

  },
  
  mounted() {
    this.initCanvas();
    this.drawLoop();

    document.addEventListener( 'mousedown', this.onMouseDown, false);
  },

  methods: {
    drawLoop() {
      this.ctx.clearRect(0,0, this.screenWidth, this.screenHeight);

      this.particles = this.particles.filter(particle => {
        return particle.lifespan >= 0;
      });

      this.particles.forEach(particle => {
        particle.update();
        particle.draw(this.ctx)
      });
      
      // Queue up another update() method call on the next frame
      requestAnimationFrame(this.drawLoop.bind(this))
    },

    initCanvas() {
      this.screenWidth = window.innerWidth;
      this.screenHeight = window.innerHeight;

      const canvas = this.$refs.canvas;
      this.ctx =  canvas.getContext('2d');

      // Set actual size in memory (scaled to account for extra pixel density).
      const scale = window.devicePixelRatio; // <--- Change to 1 on retina screens to see blurry canvas.
      canvas.width = this.screenWidth * scale;
      canvas.height = this.screenHeight * scale;

      // Normalize coordinate system to use css pixels.
      this.ctx.scale(scale, scale);
    },

    onMouseDown(e) {
      for ( let i = 0; i < 50; i++) {
        this.particles.push(new Particle(e.clientX, e.clientY));  
      }
    },
  },

}
</script>
