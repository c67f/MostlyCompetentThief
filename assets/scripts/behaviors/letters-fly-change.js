import { animate, createTimeline, defaults, utils } from '../anime-beta-master/lib/anime.esm.js';

//from Moving Letters - by Tobias Ahlin

var ml4 = {};
ml4.opacityIn = [0,1];
ml4.scaleIn = [0.2, 1];
ml4.scaleOut = 3;
ml4.durationIn = 800;
ml4.durationOut = 600;
ml4.delay = 500;

createTimeline({loop: true})
  .add('.ml4 .letters-1', {
    opacity: ml4.opacityIn,
    scale: ml4.scaleIn,
    duration: ml4.durationIn
  }).add('.ml4 .letters-1', {
    opacity: 0,
    scale: ml4.scaleOut,
    duration: ml4.durationOut,
    ease: "inExpo",
    delay: ml4.delay
  }).add('.ml4 .letters-2', {
    opacity: ml4.opacityIn,
    scale: ml4.scaleIn,
    duration: ml4.durationIn
  }).add('.ml4 .letters-2', {
    opacity: 0,
    scale: ml4.scaleOut,
    duration: ml4.durationOut,
    ease: "inExpo",
    delay: ml4.delay
  }).add('.ml4 .letters-3', {
    opacity: ml4.opacityIn,
    scale: ml4.scaleIn,
    duration: ml4.durationIn
  }).add('.ml4 .letters-3', {
    opacity: 0,
    scale: ml4.scaleOut,
    duration: ml4.durationOut,
    ease: "inExpo",
    delay: ml4.delay
  }).add('.ml4', {
    opacity: 0,
    duration: 500,
    delay: 500
  });