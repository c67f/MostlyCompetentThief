import { animate, createTimeline, defaults, utils } from '../anime-beta-master/lib/anime.esm.min.js';

//from Moving Letters - by Tobias Ahlin

createTimeline({loop: false})
  .add('.ml5 .line', {
    opacity: [0.5,1],
    scaleX: [0, 1],
    ease: "inOutExpo",
    duration: 700
  }).add('.ml5 .line', {
    duration: 600,
    ease: "outExpo",
    translateY: (el, i) => (-0.625 + 0.625*2*i) + "em"
  }).add('.ml5 .ampersand', {
    opacity: [0,1],
    scaleY: [0.5, 1],
    ease: "outExpo",
    duration: 600,
    offset: '-=600'
  }).add('.ml5 .letters-left', {
    opacity: [0,1],
    translateX: ["0.5em", 0],
    ease: "outExpo",
    duration: 600,
    offset: '-=300'
  }).add('.ml5 .letters-right', {
    opacity: [0,1],
    translateX: ["-0.5em", 0],
    ease: "outExpo",
    duration: 600,
    offset: '-=600'
  });