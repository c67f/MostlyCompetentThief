import { animate, createTimeline, defaults, utils } from '../anime-beta-master/lib/anime.min.esm.js';

let shownElementsArray = document.getElementsByClassName("timed-show");
console.log("test");

//console.log(shownElement.dataset.dataTimer);
for (let i = 0; i < shownElementsArray.length; i++) {
    let shownElement = shownElementsArray[i];
    //console.log(shownElement.dataset.timer);
    let delay = 1000 * Number(shownElement.dataset.timer);
    shownElement.style.opacity = 0;
    createTimeline({
        defaults: {
            delay: delay, //yesssss!!!
            duration: 2000,
            easing: 'linear',
        }
    }).add(shownElement, {
        opacity: [0,1],
    });
}

