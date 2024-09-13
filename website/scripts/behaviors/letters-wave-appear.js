import { animate, createTimeline, defaults, utils } from '../anime-beta-master/lib/anime.esm.js';

//from Moving Letters - by Tobias Ahlin

// Wrap every letter in a span
var textWrapper = document.querySelector('.ml6 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

animate('.ml6 .letter', {
    translateY: "1.1em",
    duration: 0
    
})

createTimeline({loop: false})
.add('.ml6 .letter', {
    translateY: ["1.1em", 0],
    translateZ: 0,
    duration: 750,
    delay: (el, i) => 50 * i
});