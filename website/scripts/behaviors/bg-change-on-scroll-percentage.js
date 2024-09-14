import { Animatable, animate, createAnimatable, createTimeline, utils, stagger, onScroll } from "../anime-beta-master/lib/anime.esm.min.js";

animate(document.body, {
    backgroundColor: ['#FF4B4B', '#A4FF4F', '#33B3F1', '#FF4FCF'],
    autoplay: onScroll({
        sync: true,
        debug: false,
        enter:  'start max',
        leave: 'end min',
    })
})