import { animate, createTimeline, defaults, utils } from '../anime-beta-master/lib/anime.esm.js';

createTimeline({
    defaults: {
        duration:5000,
        easing: "linear",
    }
}).add('body', {
    backgroundColor: target => {
        console.log(target);
        let color1 = target.dataset.color1;
        let color2 = target.dataset.color2;
        console.log(color1);
        return [color1, color2];
    },
});