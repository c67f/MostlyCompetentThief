import { animate, createTimeline, defaults, utils } from '../anime-beta-master/lib/anime.min.esm.js';

let elementsTimedRevealOtherArray = document.getElementsByClassName("timed-reveal-other");
//console.log(elementsTimedRevealOtherArray[0]);

//console.log(shownElement.dataset.dataTimer);
for (let i = 0; i < elementsTimedRevealOtherArray.length; i++) {
    const elementTimedRevealOther = elementsTimedRevealOtherArray[i];
    //console.log(elementTimedRevealOther);
    elementTimedRevealOther.addEventListener("click", (event) => {
        console.log("starting reveal");
        let revealTarget = document.getElementById(elementTimedRevealOther.dataset.revealTarget);
        //console.log(revealTarget);
        revealTarget.style.display = "flex";
        revealTarget.style.opacity = 0;
        let delay = 1000 * Number(elementTimedRevealOther.dataset.otherTimer);
        createTimeline({
            defaults: {
                delay: delay,
                duration: 2000,
                easing: 'linear',
            }
        }).add(revealTarget, {
            opacity: [0,1],
        });
    });

    //console.log(shownElement.dataset.timer);
    
}