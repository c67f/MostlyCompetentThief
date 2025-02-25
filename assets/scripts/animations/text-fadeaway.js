import { animate, createTimeline, defaults, utils } from '../anime-beta-master/lib/anime.esm.min.js';

console.log("test");

let fadingText = document.getElementsByClassName("fadeaway");
console.log(fadingText);
console.log(fadingText[0]);
//console.log(utils.get(fadingText));

//let animationFade = 
createTimeline({
    defaults: {
        duration: 5000,
    }
}).add(fadingText, {
    delay: (5000),
    opacity: [1,0],
});
