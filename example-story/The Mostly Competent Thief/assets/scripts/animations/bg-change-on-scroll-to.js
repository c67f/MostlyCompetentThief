import { Animatable, animate, createAnimatable, createTimeline, utils, stagger, onScroll } from "../anime-beta-master/lib/anime.esm.js";

let bgChangeScrollElementsArray = document.getElementsByClassName('bg-change-scroll');

let testArray = [1, 2, 3, 4];
testArray.forEach(element => {
    console.log(element);
})

//const debug = true;

for (let i = 0; i < bgChangeScrollElementsArray.length; i++) {
    let bgChangeElement = bgChangeScrollElementsArray[i];
    onScroll({
        target: bgChangeElement,
        debug: true,
        enter: 'center max',
        leave: 'center min',
        onEnter: () => {
            console.log('entered section');
            animate(document.body, {
                backgroundColor: bgChangeElement.dataset.bgColor
            });
        }
    })
}

/*bgChangeScrollElementsArray.forEach((bgChangeElement, i) => {
    
});*/

/*for (let i = 0; i < bgChangeScrollElementsArray.length; i++) {
    const bgChangeScrollElement = bgChangeScrollElementsArray[i];
    //const [ container ] = utils.$(bgChangeScrollElement);
    //console.log([container])
    const bodyArray = document.getElementsByTagName('body');
    const body = bodyArray[0]
    //console.log(body);
    animate (body, {
        background: bgChangeScrollElement.dataset.bgColor,
        duration: 3000,
        autoplay: onScroll({
            target: bgChangeScrollElement,
            container: body,
        })
    })
}*/