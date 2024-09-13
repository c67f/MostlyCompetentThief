import { animate, createTimeline, defaults, utils } from '../anime-beta-master/lib/anime.esm.js';

//from Moving Letters - by Tobias Ahlin

const t1 = createTimeline({loop: true});
t1.add('.ml8 .circle-white', {
    scale: [0, 3],
    opacity: [1, 0],
    ease: "outExpo",
    rotateZ: 360,
    duration: 1100
  }).add('.ml8 .circle-container', {
    scale: [0, 1],
    duration: 1100,
    ease: "outExpo",
    offset: '-=1000'
  }).add('.ml8 .circle-dark', {
    scale: [0, 1],
    duration: 1100,
    ease: "outExpo",
    offset: '-=600'
  }).add('.ml8 .letters-left', {
    scale: [0, 1],
    duration: 1200,
    offset: '-=550'
  }).add('.ml8 .bang', {
    scale: [0, 1],
    rotateZ: [45, 15],
    duration: 1200,
    offset: '-=1000'
  }).add('.ml8', {
    opacity: 0,
    duration: 1000,
    ease: "outExpo",
    delay: 1400
  });

animate('.ml8 .circle-dark-dashed', {
  rotateZ: 360,
  duration: 8000,
  ease: "linear",
  loop: true
});