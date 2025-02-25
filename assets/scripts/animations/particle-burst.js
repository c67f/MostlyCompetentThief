import { Animatable, animate, createAnimatable, createTimeline, utils, stagger } from "../anime-beta-master/lib/anime.esm.min.js";

const emittersArray = document.getElementsByClassName('particle-burst');

for (let i = 0; i < emittersArray.length; i++){
  const animationWrapper = emittersArray[i];

  function animateParticle(targetParticle){
    const t1 = createTimeline();
    t1.add(targetParticle, {
      translateX: utils.random(-25, 25),
      translateY: utils.random(-20, 20),
      duration: 400,
      ease: 'outCirc',
    }).add(targetParticle, {
      duration: 600,
      opacity: [1, 0],
      onComplete: () => {
        console.log(targetParticle);
        targetParticle.remove();
      },
    })
  }

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    utils.set(particle, { color: '#FFFFFF' });
    animationWrapper.appendChild(particle);
    animateParticle(particle);
    //utils.set(particle, { x: 500 })
    
  }
}





//Animatable stuff below:
/*


let w = window.innerWidth;
let h = window.innerHeight;
let hw = w / 2;
let hh = h / 2;
//const [ particlesArray ] = utils.$('.particles');
//


for (let i = 0; i <5; i++) {
  const particle = createAnimatable('.particles div', {
    x: 500,
    y: 500,
    ease: 'out(3)',
  });
  //particlesArray.appendChild(document.createElement('div'));
  utils.set(particle, { x: i*100});
  //animationWrapper.appendChild(particlesArray[i]);
  //console.log(particle);
  /*particlesArray[i].x(utils.random(50, 500), 500);
  console.log(particlesArray[i].x());
  particlesArray[i].y(utils.random(50, 500), 500);/
}*/


/*utils.$('.particles').forEach(p => {
  utils.set(p, { x: utils.random(50, 500) });
});*/

//particles.x(50, 500);
//particles.y(50, 500);
  //particles.rotate(-Math.atan2(hw - clientX, hh - clientY));
  //console.log(particles.x())

//console.log(particlesArray);
//console.log(particles);

//particles.x(utils.random(50, 500));
//particlesArray[0].x(250, 500, 'out(2)');
//particlesArray[1].x(250, 500, 'out(2)');
//particlesArray[2].x(250, 500, 'out(2)');
//particlesArray[3].x(200, 100, 'out(2)');
//particlesArray[4].x(250, 500, 'out(2)');











/*let container = document.getElementById("emitter");

for (let i = 0; i < 50; i++) {
    let particle = document.createElement("div");
    particle.style.width = 15;
    particle.style.height = 15;
    particle.style.left = 
    particle.classList.add("particle")
    container.appendChild(particle);
}
let particlesAll = document.querySelectorAll(".element");
let particleBurstAnimation = anime.timeline({
    targets: particlesAll,
    translateX: anime.random(50, 500),
    translateY: anime.random(50, 500),
})*/







/*canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function createParticle(x, y){
    var p = {};
    p.x = x,
    p.y = y,
    p.color = "#999999",
    p.radius = anime.random(24, 48)
    p.draw = function(){
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true); //draws a circle, I think (an arc that goes from 0 to 2pi)
        ctx.fillStyle = p.color;
        ctx.fill();
    }
    return p;
}

var particles = [];
for (var i=0; i<32; i++) {
    var particle = createParticle();
    particles.push(particle);
}

var particlesAnimation = anime({
    targets: particles,
    x: function(particle){
      return particle.x + anime.random(20, -20);
    },
    y: function(particle){
      return particle.y + anime.random(20 * 1.15, -20 * 1.15);
    },
    r: 0,
    easing: "easeOutExpo",
    duration: anime.random(1000,1300),
    //complete: removeAnimation
  });
*/