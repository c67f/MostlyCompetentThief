import { animate, createTimeline, defaults, utils } from '../anime-beta-master/lib/anime.esm.js';

//from Moving Letters - by Tobias Ahlin

// Wrap every letter in a span
var textWrapper = document.querySelector('.ml3');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

animate('.ml3 .letter', {
    opacity: 0,
    duration: 0
    
})

createTimeline({loop: false})
.add('.ml3 .letter', {
    opacity: [0,1],
    ease: "inOutQuad",
    duration: 2250,
    delay: (el, i) => 150 * (i+1)
});