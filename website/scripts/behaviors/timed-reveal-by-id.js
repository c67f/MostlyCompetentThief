import { animate, createTimeline, defaults, utils } from '../anime-beta-master/lib/anime.esm.js';

let elementsTimedRevealOtherArray = document.getElementsByClassName("timed-reveal-other");

let revealed = false;

for (let i = 0; i < elementsTimedRevealOtherArray.length; i++) {
    const elementTimedRevealOther = elementsTimedRevealOtherArray[i];
    elementTimedRevealOther.addEventListener("click", (event) => {
        if (!revealed){
            revealed = true;
            console.log("starting reveal");
            let revealTarget = document.getElementById(elementTimedRevealOther.dataset.revealTarget);
            revealTarget.style.display = "flex";
            revealTarget.style.opacity = 0;

            let delay = 1000 * Number(elementTimedRevealOther.dataset.delay);
            createTimeline({
                defaults: {
                    delay: delay,
                    duration: 3000,
                    easing: 'linear',
                }
            }).add(revealTarget, {
                opacity: [0,1],
            });
        }
    });
    
}