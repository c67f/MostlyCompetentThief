import {
  utils,
  animate,
  onScroll,
  stagger,
} from '../../../src/anime.js';

animate('#section-01 .card', {
  rotate: [stagger(utils.random(-1, 1, 2)), stagger(15)],
  transformOrigin: ['75% 75%', '75% 75%'],
  ease: 'inOut(2)',
  autoplay: onScroll({
    // enter: 100,
    // leave: 200,
    sync: 1,
    debug: true,
  }),
});

animate('#section-02 .card', {
  rotate: [stagger(utils.random(-1, 1, 2)), stagger(15)],
  transformOrigin: ['75% 75%', '75% 75%'],
  ease: 'inOut(2)',
  autoplay: onScroll({
    // enter: '100 200',
    // leave: '800 400',
    sync: 1,
    debug: true,
  }),
});
