import {
  animate,
  utils,
  onScroll,
  createScope,
  createAnimatable,
  createDraggable,
  createTimeline,
  stagger,
} from '../../../lib/anime.esm.js';

import {
  inspect,
} from '../../../lib/gui/index.js';




  utils.$('.square').forEach($el => {
    $el.onmouseenter = () => {
      animate($el, {
        opacity: .5,
        onComplete: self => console.log(`enter ${self.id} completed`)
      });
    }
    $el.onmouseleave = () => {
      animate($el, {
        opacity: 1,
        onComplete: self => console.log(`leave ${self.id} completed`)
      });
    }
  })

  const [ $test1 ] = utils.$('.test-1');
  const [ $test2 ] = utils.$('.test-2');

  const [ $triggerTest1 ] = utils.$('.trigger-test-1');
  const [ $triggerTest2 ] = utils.$('.trigger-test-2');

  utils.set('li button', { scale: 0 });

  let tl1, tl2;

  function openTest1() {
    tl1 = createTimeline().add('.test-1 li button', { scale: 1, ease: 'linear' }, stagger(100, { from: 'last' }))
  };

  function closeTest1() {
    tl2 = createTimeline().add('.test-1 li button', { scale: 0, ease: 'linear' }, stagger(100, { from: 'last' }))
    // inspect(tl1);
  };

  function toggleTags1() {
    if ($test1.classList.contains('is-active')) {
      closeTest1();
      $test1.classList.remove('is-active')
    } else {
      openTest1();
      $test1.classList.add('is-active')
    }
  };

  $triggerTest1.addEventListener('click', toggleTags1, false);

  function openTest2() {
    animate('.test-2 li button', { scale: 1, ease: 'linear', delay: stagger(100), composition: 'replace' });
  };

  function closeTest2() {
    animate('.test-2 li button', { scale: 0, ease: 'linear', delay: stagger(100), composition: 'replace' });
  };

  function toggleTags2() {
    if ($test2.classList.contains('is-active')) {
      closeTest2();
      $test2.classList.remove('is-active')
    } else {
      openTest2();
      $test2.classList.add('is-active')
    }
  };

  $triggerTest2.addEventListener('click', toggleTags2, false);

  // setTimeout(() => {
  //   console.log('01 START');
  //   toggleTags1();
  //   toggleTags2();
  // }, 500)

  // setTimeout(() => {
  //   console.log('02 START');
  //   toggleTags1();
  //   toggleTags2();
  // }, 1000)


// const tlTest = createTimeline()
// // .add('.test-1 li button', { scale: 1, ease: 'linear' }, stagger(100))
// // .add('.test-1 li button', { scale: 0, ease: 'linear' }, stagger(100, { start: 700 })).init()
// .add('.test-1 li button', { scale: 1, ease: 'linear', delay: stagger(100) }, 0)
// .add('.test-1 li button', { scale: 0, ease: 'linear', delay: stagger(100) }, 500).init()
// inspect(tlTest);
