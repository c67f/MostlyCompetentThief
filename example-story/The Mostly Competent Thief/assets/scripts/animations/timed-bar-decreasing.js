import { Animatable, animate, createAnimatable, createTimeline, utils, stagger } from "../anime-beta-master/lib/anime.min.esm.js";

let decreasingBarElementsArray = document.getElementsByClassName("timed-bar-decreasing");

for (let i = 0; i < decreasingBarElementsArray.length; i++) {
    const decreasingBarElement = decreasingBarElementsArray[i];
    const barWidth = decreasingBarElement.style.width;
    decreasingBarElement.style.background = decreasingBarElement.dataset.barColor;
    console.log(Number(decreasingBarElement.style));
    const t1 = createTimeline({
        //loop:10
    });
    t1.add(decreasingBarElement, {
        duration: Number(decreasingBarElement.dataset.barTime),
        width: 0,
    })
}