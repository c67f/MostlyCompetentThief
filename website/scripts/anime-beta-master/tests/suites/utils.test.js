import {
  utils
} from '../../src/anime.js';

import {
  expect,
  addChild,
  removeChild
} from '../utils.js';

import {
  testObject,
} from '../setup.js';

suite('Utils', () => {

  test('Get a single DOM element', () => {
    const [ $target ] = utils.$('#target-id');
    expect($target).to.deep.equal(document.querySelector('#target-id'));
  });

  test('Get a multiple DOM elements', () => {
    const $targets = utils.$('.target-class');
    const $query = document.querySelectorAll('.target-class');
    expect($targets).to.deep.equal([$query[0], $query[1], $query[2], $query[3]]);
  });

  test('Get Object properties', () => {
    const plainValue = utils.get(testObject, 'plainValue');
    const valueWithUnit = utils.get(testObject, 'valueWithUnit');
    const multiplePLainValues = utils.get(testObject, 'multiplePLainValues');
    const multipleValuesWithUnits = utils.get(testObject, 'multipleValuesWithUnits');

    expect(plainValue).to.equal(10);
    expect(valueWithUnit).to.equal('10px');
    expect(multiplePLainValues).to.equal('16 32 64 128');
    expect(multipleValuesWithUnits).to.equal('16px 32em 64% 128ch');
  });

  test('Set Object properties', () => {
    utils.set(testObject, {
      plainValue: 42,
      valueWithUnit: '42px',
      multiplePLainValues: '40 41 42 43',
      multipleValuesWithUnits: '40px 41em 42% 43ch',
    });

    expect(testObject.plainValue).to.equal(42);
    expect(testObject.valueWithUnit).to.equal('42px');
    expect(testObject.multiplePLainValues).to.equal('40 41 42 43');
    expect(testObject.multipleValuesWithUnits).to.equal('40px 41em 42% 43ch');
  });

  test('Get DOM attributes', () => {
    const withWithAttributeWidth = utils.get('.with-width-attribute', 'width');
    const withWithAttributeIndex = utils.get('.with-width-attribute', 'data-index');
    const inputNumberMin = utils.get('#input-number', 'min');
    const inputNumberMax = utils.get('#input-number', 'max');

    expect(withWithAttributeWidth).to.equal('16px'); // 1rem
    expect(withWithAttributeIndex).to.equal('1');
    expect(inputNumberMin).to.equal('0');
    expect(inputNumberMax).to.equal('100');
  });

  test('Set DOM attributes', () => {
    utils.set('.with-width-attribute', {
      width: 41,
      'data-index': 42
    });

    utils.set('#input-number', {
      min: 41,
      max: 42
    });

    const withWithAttributeWidth = utils.get('.with-width-attribute', 'width');
    const withWithAttributeIndex = utils.get('.with-width-attribute', 'data-index');
    const inputNumberMin = utils.get('#input-number', 'min');
    const inputNumberMax = utils.get('#input-number', 'max');

    expect(withWithAttributeWidth).to.equal('41px');
    expect(withWithAttributeIndex).to.equal('42');
    expect(inputNumberMin).to.equal('41');
    expect(inputNumberMax).to.equal('42');
  });

  test('Get CSS properties', () => {
    const targetIdWidth = utils.get('#target-id', 'width');
    const cssPrpertiesWidth = utils.get('.css-properties', 'width');
    const withInlineStylesWidth = utils.get('.with-inline-styles', 'width');

    expect(targetIdWidth).to.equal('16px'); // 1rem
    expect(cssPrpertiesWidth).to.equal('150px');
    expect(withInlineStylesWidth).to.equal('200px');
  });

  test('Set CSS properties', () => {
    utils.set(['#target-id', '.css-properties', '.with-inline-styles'], {
      width: 42
    })

    expect(utils.get('#target-id', 'width')).to.equal('42px');
    expect(utils.get('.css-properties', 'width')).to.equal('42px');
    expect(utils.get('.with-inline-styles', 'width')).to.equal('42px');
  });

  test('Get CSS transforms', () => {
    utils.set(['#target-id', '.with-inline-transforms'], {
      translateX: 41,
      translateY: 1, // has inline rem unit
      rotate: 42,
      scale: 1,
    });

    expect(utils.get('.with-inline-transforms', 'translateX')).to.equal('41px');
    expect(utils.get('.with-inline-transforms', 'translateY')).to.equal('1rem');
    expect(utils.get('.with-inline-transforms', 'rotate')).to.equal('42deg');
    expect(utils.get('.with-inline-transforms', 'scale')).to.equal('1');
  });

  test('Get CSS transforms', () => {
    expect(utils.get('.with-inline-transforms', 'translateX')).to.equal('10px');
    expect(utils.get('.with-inline-transforms', 'translateY')).to.equal('-0.5rem'); // Has rem
  });

  test('Get Object properties and convert unit', () => {
    expect(utils.get('#target-id', 'width', 'rem')).to.equal('1rem');
    expect(utils.get('#target-id', 'width', 'px')).to.equal('16px');
  });

  test('Set Object properties to specific unit', () => {
    const anim = utils.set(testObject, {
      plainValue: '42px',
      valueWithUnit: '42rem',
      multiplePLainValues: '40% 41px 42rem 43vh',
      multipleValuesWithUnits: '40% 41px 42rem 43vh',
    });

    expect(testObject.plainValue).to.equal('42px');
    expect(testObject.valueWithUnit).to.equal('42rem');
    expect(testObject.multiplePLainValues).to.equal('40% 41px 42rem 43vh');
    expect(testObject.multipleValuesWithUnits).to.equal('40% 41px 42rem 43vh');
  });

  test('Add child to linked list', () => {
    const parentList = {
      _head: null,
      _tail: null,
    }

    const child1 = { id: 1, _prev: null, _next: null, _priority: 1 };
    const child2 = { id: 2, _prev: null, _next: null, _priority: 1 };
    const child3 = { id: 3, _prev: null, _next: null, _priority: 1 };

    addChild(parentList, child1);

    expect(parentList._head.id).to.equal(1);
    expect(parentList._tail.id).to.equal(1);

    addChild(parentList, child2);

    expect(parentList._head.id).to.equal(1);
    expect(parentList._tail.id).to.equal(2);
    expect(child1._prev).to.equal(null);
    expect(child1._next.id).to.equal(2);
    expect(child2._prev.id).to.equal(1);
    expect(child2._next).to.equal(null);

    addChild(parentList, child3);

    expect(parentList._head.id).to.equal(1);
    expect(parentList._tail.id).to.equal(3);
    expect(child1._prev).to.equal(null);
    expect(child1._next.id).to.equal(2);
    expect(child2._prev.id).to.equal(1);
    expect(child2._next.id).to.equal(3);
    expect(child3._prev.id).to.equal(2);
    expect(child3._next).to.equal(null);
  });

  test('Add child to linked list with sorting', () => {
    const parentList = {
      _head: null,
      _tail: null,
    }

    const child1 = { id: 1, _prev: null, _next: null, _priority: 999 };
    const child2 = { id: 2, _prev: null, _next: null, _priority: 42 };
    const child3 = { id: 3, _prev: null, _next: null, _priority: 100 };

    const sortMethod = (prev, child) => prev._priority > child._priority;

    addChild(parentList, child1, sortMethod);

    expect(parentList._head.id).to.equal(1);
    expect(parentList._tail.id).to.equal(1);

    addChild(parentList, child2, sortMethod);

    expect(parentList._head.id).to.equal(2);
    expect(parentList._tail.id).to.equal(1);

    expect(child2._prev).to.equal(null);
    expect(child2._next.id).to.equal(1);

    expect(child1._prev.id).to.equal(2);
    expect(child1._next).to.equal(null);

    addChild(parentList, child3, sortMethod);

    expect(parentList._head.id).to.equal(2);
    expect(parentList._tail.id).to.equal(1);
    expect(child2._prev).to.equal(null);
    expect(child2._next.id).to.equal(3);

    expect(child3._prev.id).to.equal(2);
    expect(child3._next.id).to.equal(1);

    expect(child1._prev.id).to.equal(3);
    expect(child1._next).to.equal(null);
  });

  test('Remove child from linked list', () => {
    const parentList = {
      _head: null,
      _tail: null,
    }

    const child1 = { id: 1, _prev: null, _next: null, _priority: 999 };
    const child2 = { id: 2, _prev: null, _next: null, _priority: 42 };
    const child3 = { id: 3, _prev: null, _next: null, _priority: 100 };

    addChild(parentList, child1);
    addChild(parentList, child2);
    addChild(parentList, child3);

    removeChild(parentList, child1);

    expect(child1._prev).to.equal(null);
    expect(child1._next).to.equal(null);

    expect(parentList._head.id).to.equal(2);
    expect(parentList._tail.id).to.equal(3);

    expect(child2._prev).to.equal(null);
    expect(child2._next.id).to.equal(3);

    expect(child3._prev.id).to.equal(2);
    expect(child3._next).to.equal(null);

    removeChild(parentList, child3);

    expect(child3._prev).to.equal(null);
    expect(child3._next).to.equal(null);

    expect(parentList._head.id).to.equal(2);
    expect(parentList._tail.id).to.equal(2);

    expect(child2._prev).to.equal(null);
    expect(child2._next).to.equal(null);
  });

  test('utils.shuffle', () => {
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    const sum = array.reduce((a, b) => a + b, 0);
    const a = [...array];
    for (let i = 0; i < 100; i++) {
      const s = utils.shuffle(a);
      expect(s.reduce((a, b) => a + b, 0)).to.equal(sum);
      expect(s.length).to.equal(array.length);
      expect(array).to.not.deep.equal(s);
    }
  });

  test('utils.snap', () => {
    const array = [25, 100, 400];
    const snap = 25;
    expect(utils.snap(10, snap)).to.equal(0);
    expect(utils.snap(20, snap)).to.equal(25);
    expect(utils.snap(50, snap)).to.equal(50);
    expect(utils.snap(60, snap)).to.equal(50);
    expect(utils.snap(70, snap)).to.equal(75);
    expect(utils.snap(10, array)).to.equal(25);
    expect(utils.snap(20, array)).to.equal(25);
    expect(utils.snap(50, array)).to.equal(25);
    expect(utils.snap(63, array)).to.equal(100);
    expect(utils.snap(75, array)).to.equal(100);
    expect(utils.snap(200, array)).to.equal(100);
    expect(utils.snap(300, array)).to.equal(400);
    expect(utils.snap(1000, array)).to.equal(400);
  });
});
