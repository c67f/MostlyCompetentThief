import {
  expect,
  getChildAtIndex,
  getChildLength,
} from '../utils.js';

import {
  testObject,
  anOtherTestObject,
} from '../setup.js';

import {
  animate,
  createTimeline,
  createTimer,
  utils,
} from '../../src/anime.js';

suite('Targets', () => {
  test('Single element from CSS selector', () => {
    const animation = animate('#target-id', {
      x: 100,
      duration: 100
    });

    const targetEl = document.querySelector('#target-id');
    expect(getChildLength(animation)).to.equal(1);
    expect(animation.targets.includes(targetEl)).to.equal(true);
    expect(animation.targets.length).to.equal(1);
  });

  test('Multiple elements from CSS selector', () => {
    const animation = animate('.target-class', {
      x: 100,
      duration: 100
    });

    const targetEls = document.querySelectorAll('.target-class');
    expect(getChildLength(animation)).to.equal(4);
    let i = 0;
    animation.targets.forEach( el => {
      expect(targetEls[i++]).to.equal(el);
    });
  });

  test('Single element from domNode', () => {
    const targetEl = document.querySelector('#target-id');
    const animation = animate(targetEl, {
      x: 100,
      duration: 100
    });

    expect(getChildLength(animation)).to.equal(1);
    expect(animation.targets.includes(targetEl)).to.equal(true);
    expect(animation.targets.length).to.equal(1);
  });

  test('Multiple elements from nodeList', () => {
    const targetEls = document.querySelectorAll('.target-class');
    const animation = animate(targetEls, {
      x: 100,
      duration: 100
    });

    expect(getChildLength(animation)).to.equal(4);
    let i = 0;
    animation.targets.forEach( el => {
      expect(targetEls[i++]).to.equal(el);
    });
  });

  test('Single object from JS Object', () => {
    const animation = animate(testObject, {
      plainValue: 200,
      duration: 100
    });

    expect(getChildLength(animation)).to.equal(1);
    expect(animation.targets.includes(testObject)).to.equal(true);
    expect(animation.targets.length).to.equal(1);
  });

  test('Multiple elements from an Array of mixed CSS selectors', () => {
    const animation = animate(['#target-id', '.target-class', 'div[data-index="0"]'], {
      x: 100,
      duration: 100
    });

    const targetIdEl = document.querySelector('#target-id');
    const targetClassEls = document.querySelectorAll('.target-class');
    const targetDataEl = document.querySelector('div[data-index="0"]');
    expect(getChildLength(animation)).to.equal(4);
    expect(animation.targets.includes(targetIdEl)).to.equal(true);
    expect(animation.targets.includes(targetDataEl)).to.equal(true);
    let i = 0;
    animation.targets.forEach( el => {
      expect(targetClassEls[i++]).to.equal(el);
    });
  });

  test('Multiple elements and object from an Array of mixed target types', () => {
    const targetClassEls = document.querySelectorAll('.target-class');
    const animation = animate([testObject, '#target-id', targetClassEls, 'div[data-index="0"]'], {
      x: 100,
      duration: 100
    });

    const targetIdEl = document.querySelector('#target-id');
    const targetDataEl = document.querySelector('div[data-index="0"]');
    expect(getChildLength(animation)).to.equal(5);
    expect(animation.targets.includes(testObject)).to.equal(true);
    expect(animation.targets.includes(targetIdEl)).to.equal(true);
    expect(animation.targets.includes(targetDataEl)).to.equal(true);
    expect(animation.targets.length).to.equal(5);
  });

  test('Multiple elements in nested arrays', () => {
    const targetClassEls = document.querySelectorAll('.target-class');
    const targetIdEl = document.querySelector('#target-id');
    const animation = animate([targetClassEls, targetIdEl, [testObject, anOtherTestObject]], {
      x: 100,
      duration: 100
    });
    expect(getChildLength(animation)).to.equal(6);
    expect(animation.targets.includes(testObject)).to.equal(true);
    expect(animation.targets.includes(anOtherTestObject)).to.equal(true);
    expect(animation.targets.includes(targetIdEl)).to.equal(true);
    expect(animation.targets.length).to.equal(6);
  });

  test('Multiple elements in arrays with null or undefined values', () => {
    const targetClassEls = document.querySelectorAll('.target-class');
    const targetIdEl = document.querySelector('#target-id');
    const animation = animate([testObject, anOtherTestObject, null, undefined], {
      x: 100,
      duration: 100
    });
    expect(getChildLength(animation)).to.equal(2);
    expect(animation.targets.includes(testObject)).to.equal(true);
    expect(animation.targets.includes(anOtherTestObject)).to.equal(true);
    expect(animation.targets.length).to.equal(2);
  });

  test('Multiple elements in nested arrays with null or undefined values', () => {
    const targetClassEls = document.querySelectorAll('.target-class');
    const targetIdEl = document.querySelector('#target-id');
    const animation = animate([targetClassEls, targetIdEl, [testObject, anOtherTestObject, null, undefined], null, undefined], {
      x: 100,
      duration: 100
    });
    expect(getChildLength(animation)).to.equal(6);
    expect(animation.targets.includes(testObject)).to.equal(true);
    expect(animation.targets.includes(anOtherTestObject)).to.equal(true);
    expect(animation.targets.includes(targetIdEl)).to.equal(true);
    expect(animation.targets.length).to.equal(6);
  });

  test('Animations without targets (Clocks)', () => {
    const animation = createTimer({ duration: 40 });
    animation.seek(animation.duration);
    // @ts-ignore
    expect(animation._head).to.equal(undefined);
    // @ts-ignore
    expect(animation._tail).to.equal(undefined);
    // @ts-ignore
    expect(animation.targets).to.equal(undefined);
    expect(animation.duration).to.equal(40);
    expect(animation._iterationDuration).to.equal(40);
  });

  test('Remove targets with Objects ref', () => {
    const animation = animate([testObject, anOtherTestObject], {
      plainValue: 200,
      duration: 100
    });
    expect(getChildLength(animation)).to.equal(2);

    utils.remove(testObject);
    expect(getChildLength(animation)).to.equal(1);

    utils.remove(anOtherTestObject);
    expect(getChildLength(animation)).to.equal(0);
    expect(animation._hasChildren).to.equal(false);
  });

  test('Remove targets from multiple animations at once', () => {
    const animation1 = animate([testObject, anOtherTestObject], {
      plainValue: 200,
      duration: 100
    });
    const animation2 = animate(anOtherTestObject, {
      plainValue: 300,
      duration: 100
    });
    expect(getChildLength(animation1)).to.equal(2);
    expect(getChildLength(animation2)).to.equal(1);

    utils.remove(testObject);
    expect(getChildLength(animation1)).to.equal(1);
    expect(getChildLength(animation2)).to.equal(1);

    utils.remove(anOtherTestObject);
    expect(getChildLength(animation1)).to.equal(0);
    expect(getChildLength(animation2)).to.equal(0);
  });


  test('Remove targets from timeline', () => {
    const tl = createTimeline({
      duration: 100
    })
    .add([testObject, anOtherTestObject], {
      plainValue: 200,
    })
    .add(anOtherTestObject, {
      plainValue: 300,
    })

    expect(tl._hasChildren).to.equal(true);
    expect(getChildLength(getChildAtIndex(tl, 0))).to.equal(2);
    expect(getChildLength(getChildAtIndex(tl, 1))).to.equal(1);

    utils.remove(testObject);
    expect(getChildLength(getChildAtIndex(tl, 0))).to.equal(1);
    expect(getChildLength(getChildAtIndex(tl, 1))).to.equal(1);
    expect(tl._hasChildren).to.equal(true);

    utils.remove(anOtherTestObject);
    expect(tl._head).to.equal(null);
    expect(tl._tail).to.equal(null);
    expect(tl._hasChildren).to.equal(false);
  });

  test('Remove targets on a specific animation', () => {
    const animation1 = animate([testObject, anOtherTestObject], {
      plainValue: 200,
      duration: 100
    });
    const animation2 = animate([anOtherTestObject, testObject], {
      plainValue: 300,
      duration: 100
    });
    expect(getChildLength(animation1)).to.equal(2);
    expect(getChildLength(animation2)).to.equal(2);

    utils.remove(anOtherTestObject, animation1);
    expect(getChildLength(animation1)).to.equal(1);
    expect(getChildLength(animation2)).to.equal(2);

    utils.remove(testObject, animation2);
    expect(getChildLength(animation1)).to.equal(1);
    expect(getChildLength(animation2)).to.equal(1);

    utils.remove(testObject, animation1);
    expect(getChildLength(animation1)).to.equal(0);
    expect(getChildLength(animation2)).to.equal(1);

    utils.remove(anOtherTestObject, animation2);
    expect(getChildLength(animation1)).to.equal(0);
    expect(getChildLength(animation2)).to.equal(0);
  });

  test('Remove targets with CSS selectors', () => {
    const animation = animate(['#target-id', '.target-class', 'div[data-index="0"]'], {
      x: 100,
      duration: 100
    });
    expect(getChildLength(animation)).to.equal(4);

    utils.remove('#target-id');
    expect(getChildLength(animation)).to.equal(3);

    utils.remove('[data-index="2"]');
    expect(getChildLength(animation)).to.equal(2);

    utils.remove('.target-class');
    expect(getChildLength(animation)).to.equal(0);
  });

  test('Do not pause animations with no targets when calling remove', resolve => {
    createTimer({
      duration: 100,
      onComplete: () => {
        resolve();
      }
    });

    const animation = animate('#target-id', {
      x: 100,
    });
    expect(getChildLength(animation)).to.equal(1);

    utils.remove('#target-id');
    expect(getChildLength(animation)).to.equal(0);
  });
});
