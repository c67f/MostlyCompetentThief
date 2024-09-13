import { animate, createTimeline, defaults, utils } from '../anime-beta-master/lib/anime.esm.js';

//from Moving Letters - by Tobias Ahlin

// Wrap every letter in a span
var textWrapper = document.querySelector('.ml2');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

animate('.ml2 .letter', {
    opacity: 0,
    duration: 0
    
})

createTimeline({loop: true})
  .add('.ml2 .letter', {
    scale: [4,1],
    opacity: [0,1],
    translateZ: 0,
    ease: "outExpo",
    duration: 950,
    delay: (el, i) => 70*i
  }).add('.ml2',{
    opacity: 0,
    duration: 1000,
    ease: "outExpo",
    delay: 1000
  });