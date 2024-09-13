import {
  utils,
  animate,
  onScroll,
  stagger,
} from '../../../src/anime.js';

// Sync

const sections = utils.$('section');

 sections.forEach(($section, i) => {
  animate($section.querySelectorAll('.card'), {
    z: [i * 10, i * 10],
    rotate: [stagger(utils.random(-1, 1, 2)), stagger(15)],
    transformOrigin: ['75% 75%', '75% 75%'],
    ease: 'inOut(1)',
    autoplay: onScroll({
      sync: true,
      debug: true,
      enter:  'start max',
      leave: 'end min',
    }),
  });
});
