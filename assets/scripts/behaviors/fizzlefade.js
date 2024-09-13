import { animate, createTimeline, defaults, utils } from '../anime-beta-master/lib/anime.esm.js';

class DizzleEffect {
  constructor(width = 620, height = 600) {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.width = width;
    this.height = height;
    this.totalPixels = this.width * this.height;
    this.currentIndex = 0;
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this._progress = 0;

    const pixelsToFizzle = [];
    let i = 0;
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        pixelsToFizzle[i++] = {x, y};
      }
    }

    this.pixelsToFizzle = utils.shuffle(pixelsToFizzle);
  }

  get progress() {
    return this._progress;
  }

  set progress(value) {
    this._progress = value;
    const pixelIndex = Math.floor(this.totalPixels * value);
    for (let i = this.currentIndex; i < pixelIndex; i++) {
      const pixel = this.pixelsToFizzle[i];
      this.ctx.fillStyle = 'rgba(255,0,0,1)';
      this.ctx.fillRect(pixel.x, pixel.y, 1, 1);
      this.currentIndex = i;
    }
  }
}

console.log(window.innerHeight);
const dizzleEffect = new DizzleEffect(window.innerWidth, window.innerHeight);
console.log(dizzleEffect.height);

document.body.appendChild(dizzleEffect.canvas);

animate(dizzleEffect, { progress: 1, duration: 2000, ease: 'linear' });