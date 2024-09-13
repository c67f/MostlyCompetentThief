import {
  expect,
} from '../utils.js';

import {
  animate,
  engine,
} from '../../src/anime.js';

suite('Engine', () => {
  test('Set useDefaultMainLoop to false should prevent animations from running', resolve => {

    engine.useDefaultMainLoop = false;

    let renderCheck = 0;

    const animation = animate('#target-id', {
      translateX: 100,
      onRender: () => {
        renderCheck++;
      },
    });

    setTimeout(() => {
      expect(animation.began).to.equal(false);
      expect(animation.currentTime).to.equal(0);
      expect(renderCheck).to.equal(0);
      engine.useDefaultMainLoop = true; // Reset
      resolve();
    }, 70);
  });

  test('Manually tick the engine with an external loop', resolve => {

    engine.useDefaultMainLoop = false;

    let raf = 0;

    function customLoop() {
      raf = requestAnimationFrame(customLoop);
      engine.update();
    }

    customLoop();

    let renderCheck = 0;

    const animation = animate('#target-id', {
      translateX: 100,
      onRender: () => {
        renderCheck++;
      },
      duration: 50,
    });

    setTimeout(() => {
      expect(animation.began).to.equal(true);
      expect(animation.completed).to.equal(true);
      expect(animation.currentTime).to.equal(50);
      expect(renderCheck).to.be.above(2);
      cancelAnimationFrame(raf);
      engine.useDefaultMainLoop = true; // Reset
      resolve();
    }, 70);
  });

  test('Pause and resume the engine', resolve => {

    let renderCheck = 0;

    const animation = animate('#target-id', {
      translateX: 100,
      onRender: () => {
        renderCheck++;
      },
      duration: 50,
    });

    engine.suspend();

    setTimeout(() => {
      expect(animation.began).to.equal(false);
      expect(animation.completed).to.equal(false);
      expect(animation.currentTime).to.equal(0);
      expect(renderCheck).to.equal(0);
      engine.resume();
      setTimeout(() => {
        expect(animation.began).to.equal(true);
        expect(animation.completed).to.equal(true);
        expect(animation.currentTime).to.equal(50);
        expect(renderCheck).to.be.above(2);
        resolve();
      }, 100);
    }, 50);
  });
});
