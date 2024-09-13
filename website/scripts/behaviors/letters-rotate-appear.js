import { animate, createTimeline, defaults, utils } from '../anime-beta-master/lib/anime.esm.js';

//from Moving Letters - by Tobias Ahlin

// Wrap every letter in a span
var textWrapper = document.querySelector('.ml7 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

animate('.ml7 .letter', {
  translateX: "0.55em",
  translateY: "1.1em",
  duration: 0
  
})


createTimeline({loop: false})
.add('.ml7 .letter', {
  translateY: ["1.1em", 0],
  translateX: ["0.55em", 0],
  translateZ: 0,
  rotateZ: [180, 0],
  duration: 750,
  ease: "outExpo",
  delay: (el, i) => 50 * i
});