import { animate, createTimeline, defaults, utils } from '../anime-beta-master/lib/anime.esm.js';

//from Moving Letters - by Tobias Ahlin

// Wrap every letter in a span
var textWrapper = document.querySelector('.ml1 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

animate('.ml1 .letter', {
    opacity: 0,
    duration: 0
    
})

const t1 = createTimeline({loop: false});
t1.add('.ml1 .letter', {
    scale: [0.3,1],
    opacity: [0,1],
    translateZ: 0,
    ease: "outExpo",
    duration: 600,
    delay: (el, i) => 70 * (i+1)
}).add('.ml1 .line', {
    scaleX: [0,1],
    opacity: [0.5,1],
    ease: "outExpo",
    duration: 700,
    offset: '-=875',
    delay: (el, i, l) => 80 * (l - i)
});