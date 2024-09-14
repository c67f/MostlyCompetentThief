import { animate, createTimeline, defaults, utils } from '../anime-beta-master/lib/anime.esm.min.js';


createTimeline({
    defaults: {
        duration: 4000,
    }
}).add('.fadeaway', { //don't need getElementsByClassName!
    delay: (target) => {
        console.log(target);
        return target.dataset.delay*1000;
    },
    opacity: [1,0],
});
