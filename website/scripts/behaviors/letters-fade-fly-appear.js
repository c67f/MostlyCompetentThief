import { animate, createTimeline, defaults, utils } from '../anime-beta-master/lib/anime.esm.min.js';

//from Moving Letters - by Tobias Ahlin

// Wrap every letter in a span
var textWrapper = document.querySelector('.ml12');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

createTimeline({loop: false})
  .add('.ml12 .letter', {
    translateX: [40,0],
    translateZ: 0,
    opacity: [0,1],
    ease: "outExpo",
    duration: 1200,
    delay: (el, i) => 500 + 30 * i
  });