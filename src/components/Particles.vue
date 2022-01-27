<template>
  <canvas
    ref="canvas"
  />
</template>

<script>
import { mapState } from 'vuex';
import Particle from '@/classes/Particle';
import { BLOCK_SIZE, THEME_CONFIGS } from '@/utils/constants';

const NUM_ON_OPEN = 24;
const MAX = 200;

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
    ...mapState([
      'minefieldCoords',
      'theme',
    ]),
  },
  
  mounted() {
    this.initCanvas();
    this.drawLoop();

    this.emitter.on('flag', coords => {
      this.flag(coords.row, coords.col);
    });

    this.emitter.on('open', coords => {
      this.explode(coords.row, coords.col);
    });
  },

  methods: {
    explode(row, col) {
      let reduceCount = Math.floor(this.particles.length / 10);
      const {x, y} = this.getCoordsFromRowCol(row, col);
      const color = THEME_CONFIGS[this.theme].blockColor;

      for (let i = 0; i < NUM_ON_OPEN - reduceCount; i++) {
        if (this.particles.length < MAX) {
          this.particles.push(new Particle({x, y, color}));  
        }
      }
    },

    flag(row, col) {
      const {x , y} = this.getCoordsFromRowCol(row, col);
      const color = THEME_CONFIGS[this.theme].flagColor;
      
      const c = {
        x,
        y,
        color,
        gravity: 0,
        lifespan: 25,
        drag: 0.9,
      }

      const dist1 = 10;
      const dist2 = 7.5;

      // Emit particles in circle
      this.particles.push(new Particle({...c, velX: 0, velY: -dist1,}));
      this.particles.push(new Particle({...c, velX: dist1, velY: 0,}));  
      this.particles.push(new Particle({...c, velX: 0, velY: dist1,}));
      this.particles.push(new Particle({...c, velX: -dist1, velY: 0,}));  
      
      this.particles.push(new Particle({...c, velX: dist2, velY: -dist2,}));
      this.particles.push(new Particle({...c, velX: dist2, velY: dist2,}));  
      this.particles.push(new Particle({...c, velX: -dist2, velY: dist2,}));
      this.particles.push(new Particle({...c, velX: -dist2, velY: -dist2,}));  
    },

    getCoordsFromRowCol(row, col) {
      const halfBlock = BLOCK_SIZE / 2;
      return {
        x: this.minefieldCoords.x + (col * BLOCK_SIZE) + halfBlock - window.scrollX,
        y: this.minefieldCoords.y + (row * BLOCK_SIZE) + halfBlock - window.scrollY,
      }
    },

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
  },

}
</script>
