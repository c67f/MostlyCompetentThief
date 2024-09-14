import { Animatable, animate, createAnimatable, createTimeline, utils, stagger, createTimer } from "../anime-beta-master/lib/anime.esm.min.js";

const emittersArray = document.getElementsByClassName('particle-burst-mouse-over');

let burstOnCooldown = false;


for (let i = 0; i < emittersArray.length; i++){
  const animationWrapper = emittersArray[i];
  function animateParticle(targetParticle){
    let xMove = utils.random(-75, 75);
    let yMove = utils.random(-45, 15);
    const t1 = createTimeline();
    t1.add(targetParticle, {
      translateX: xMove,
      translateY: yMove,
      duration: 300,
      ease: 'outCirc',
    }).add(targetParticle, {
      translateX: utils.random(xMove-6, xMove+6),
      translateY: utils.random(yMove+130, yMove+80),
      ease:'irregular',
      duration: 400,
    }).add(targetParticle, {
      duration: 100,
      opacity: [1, 0],
    })
  }
  animationWrapper.addEventListener('mouseenter', (e) => { //this also triggers on mouse touching any of the particles because they're children of the animationWrapper
    console.log("moused over");
    if (!burstOnCooldown){
      burstOnCooldown = true;
      let burstCooldown = createTimer({
        duration: 3000,
        onComplete: () => {
          burstOnCooldown = false;
        },
      })
  
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        utils.set(particle, { background: animationWrapper.dataset.particleColor });
        animationWrapper.appendChild(particle);
        animateParticle(particle);
      }
    }
    
  })
  
}

