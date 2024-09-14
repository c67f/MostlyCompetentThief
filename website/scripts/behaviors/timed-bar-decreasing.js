import { Animatable, animate, createAnimatable, createTimeline, utils, stagger } from "../anime-beta-master/lib/anime.esm.min.js";

let decreasingBarElementsArray = document.getElementsByClassName("timed-bar-decreasing");

for (let i = 0; i < decreasingBarElementsArray.length; i++) {
    const decreasingBarElement = decreasingBarElementsArray[i];
    decreasingBarElement.style.width = decreasingBarElement.dataset.barWidth;
    decreasingBarElement.style.height = decreasingBarElement.dataset.barHeight;
    decreasingBarElement.style.backgroundColor = decreasingBarElement.dataset.barColor;
    console.log(decreasingBarElement.style);
    console.log(1000 * Number(decreasingBarElement.dataset.barTime));
    const t1 = createTimeline({});
    t1.add(decreasingBarElement, {
        duration: 1000 * Number(decreasingBarElement.dataset.barTime),
        width: 0,
        ease: 'linear',
    })
}