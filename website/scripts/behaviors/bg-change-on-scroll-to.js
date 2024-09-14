import { Animatable, animate, createAnimatable, createTimeline, utils, stagger, onScroll } from "../anime-beta-master/lib/anime.esm.min.js";

let bgChangeScrollElementsArray = document.getElementsByClassName('bg-change-scroll');


for (let i = 0; i < bgChangeScrollElementsArray.length; i++) {
    let bgChangeElement = bgChangeScrollElementsArray[i];
    console.log(bgChangeElement);
    onScroll({
        target: bgChangeElement,
        debug: false,
        enter: 'center max',
        leave: 'center min',
        onEnter: () => {
            console.log('section entered')
            animate(document.body, {
                backgroundColor: bgChangeElement.dataset.bgColor
            });
        }
    })
}
