import { animate, createTimeline, defaults, utils } from '../anime-beta-master/lib/anime.esm.js';

//from Moving Letters - by Tobias Ahlin

// Wrap every letter in a span
var textWrapper = document.querySelector('.ml7 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

createTimeline({loop: true})
  .add('.ml7 .letter', {
    translateY: ["1.1em", 0],
    translateX: ["0.55em", 0],
    translateZ: 0,
    rotateZ: [180, 0],
    duration: 750,
    ease: "outExpo",
    delay: (el, i) => 50 * i
  }).add('.ml7', {
    opacity: 0,
    duration: 1000,
    ease: "outExpo",
    delay: 1000
  });