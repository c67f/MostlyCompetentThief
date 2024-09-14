import { Animatable, animate, createAnimatable, createTimeline, utils, stagger } from "../anime-beta-master/lib/anime.esm.js";

const container = document.getElementById('transitionContainerPixelBoth');


let colors=['#1D2B53', '#7E2553', '#008751', '#FFFF00', '#AB5236', '#5F574F', '#C2C3C7', '#FFF1E8', '#FF004D', '#FFA300', '#FFEC27', '#00E436', '#29ADFF', '#83769C', '#FF77A8', '#FFCCAA']
console.log(utils.randomPick(colors));
console.log(utils.randomPick(colors));
console.log(utils.randomPick(colors));

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const pixelSize = 40; //size of .pixel in styles.css
const pixelCountWidth = Math.ceil(windowWidth/pixelSize);
const pixelCountHeight = Math.ceil(windowHeight/pixelSize)
let grid=[pixelCountHeight, pixelCountWidth];

for (let i = 0; i < pixelCountWidth; i++){
    //console.log(pixel);
    for (let j = 0; j < pixelCountHeight; j++) {
        let pixel = document.createElement('div');
        pixel.classList.add('pixel');
        container.appendChild(pixel);

        utils.set(pixel, {backgroundColor: utils.randomPick(colors)});
        utils.set(pixel, {translateX: i*pixelSize});
        utils.set(pixel, {translateY: j*pixelSize});
    }
}

const t1 = createTimeline();

t1.add('.pixel', {
    rotate: '1turn',
    delay: stagger(100, {grid: grid}), //don't fully understand what "grid: grid" actually does here, but it works
    opacity: [0, 1],
    //backgroundColor: utils.randomPick(colors)
}).add('.pixel'), {
    rotate: '-1turn',
    delay: 5000 + stagger(100, {grid: grid}),  //(pixelCountWidth*100)
    opacity: [1, 0],
}