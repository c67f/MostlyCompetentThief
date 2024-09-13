/*
 * anime.js v4.0.0-beta.95 - ESM
 * (c) 2024 Julian Garnier
 * Released under the MIT license
 * animejs.com
 */

const Types = {};

/** @typedef {Clock} Types.Clock */
/** @typedef {Engine} Types.Engine */
/** @typedef {Timer} Types.Timer */
/** @typedef {Animation} Types.Animation */
/** @typedef {Timeline} Types.Timeline */
/** @typedef {Draggable} Types.Draggable */

/** @typedef {Types.Timer|Types.Animation|Types.Timeline} Types.Renderable */

/**
 * @callback Types.UtilityFunction
 * @param {...(Number|String)} args
 * @return {Number|String}
 */

/**
 * @callback Types.FunctionValue
 * @param {Types.Target} [target] - The animated target
 * @param {Number} [index] - The target index
 * @param {Number} [length] - The total number of animated targets
 * @return {Number|String|void}
 */

/**
 * @callback Types.EasingFunction
 * @param {Number} time
 * @return {Number}
 */

/**
 * @typedef {Object} Types.SpringEasing
 * @property {Number} duration
 * @property {Types.EasingFunction} solver
 */

/**
 * @typedef {('linear'|'linear(x1, x2 25%, x3)'|'in'|'out'|'inOut'|'outIn'|'inQuad'|'outQuad'|'inOutQuad'|'outInQuad'|'inCubic'|'outCubic'|'inOutCubic'|'outInCubic'|'inQuart'|'outQuart'|'inOutQuart'|'outInQuart'|'inQuint'|'outQuint'|'inOutQuint'|'outInQuint'|'inSine'|'outSine'|'inOutSine'|'outInSine'|'inCirc'|'outCirc'|'inOutCirc'|'outInCirc'|'inExpo'|'outExpo'|'inOutExpo'|'outInExpo'|'inBounce'|'outBounce'|'inOutBounce'|'outInBounce'|'inBack'|'outBack'|'inOutBack'|'outInBack'|'inElastic'|'outElastic'|'inOutElastic'|'outInElastic'|'irregular'|'cubicBezier'|'steps'|'in(p = 1.675)'|'out(p = 1.675)'|'inOut(p = 1.675)'|'outIn(p = 1.675)'|'inBack(overshoot = 1.70158)'|'outBack(overshoot = 1.70158)'|'inOutBack(overshoot = 1.70158)'|'outInBack(overshoot = 1.70158)'|'inElastic(amplitude = 1, period = .3)'|'outElastic(amplitude = 1, period = .3)'|'inOutElastic(amplitude = 1, period = .3)'|'outInElastic(amplitude = 1, period = .3)'|'irregular(length = 10, randomness = 1)'|'cubicBezier(x1, y1, x2, y2)'|'steps(steps = 10)')} Types.EaseStringParamNames
 */

// A hack to get both ease names suggestions AND allow any strings
// https://github.com/microsoft/TypeScript/issues/29729#issuecomment-460346421
/** @typedef {(String & {})|Types.EaseStringParamNames|Types.EasingFunction|Types.SpringEasing} Types.EasingParam */

/** @typedef {HTMLElement|SVGElement|SVGGeometryElement} Types.DOMTarget */
/** @typedef {Record<String, any>} Types.JSTarget */
/** @typedef {Types.DOMTarget|Types.JSTarget} Types.Target */
/** @typedef {Types.Target|NodeList|String} Types.TargetSelector */
/** @typedef {Array.<Types.TargetSelector>|Types.TargetSelector} Types.TargetsParam */
/** @typedef {Array.<Types.Target>} Types.TargetsArray */

/**
 * @typedef {Object} Types.MotionPath
 * @property {Boolean} inSvg
 * @property {Number} n
 * @property {Types.EasingFunction} p
 */

/**
 * @callback Types.Tween.Modifier
 * @param {Number} value - The animated value
 * @return {Number}
 */

/** @typedef {[Number, Number, Number, Number]} Types.ColorArray */

/**
 * @typedef {Object} Types.Tween
 * @property {Number} id
 * @property {Types.Animation} parent
 * @property {String} property
 * @property {Types.Target} target
 * @property {String|Number} _value
 * @property {Number} _delay
 * @property {Number} _endDelay
 * @property {Types.EasingFunction} _ease
 * @property {Array.<Number>} _fromNumbers
 * @property {Array.<Number>} _toNumbers
 * @property {Array.<String>} _strings
 * @property {Number} _fromNumber
 * @property {Number} _toNumber
 * @property {Array.<Number>} _numbers
 * @property {Number} _number
 * @property {String} _unit
 * @property {Types.MotionPath} _path
 * @property {Types.Tween.Modifier} _modifier
 * @property {Number} _currentTime
 * @property {Number} _updateDuration
 * @property {Number} _changeStartTime
 * @property {Number} _changeDuration
 * @property {Number} _absoluteStartTime
 * @property {Number} _absoluteChangeStartTime
 * @property {Number} _absoluteChangeEndTime
 * @property {Number} _tweenType
 * @property {Number} _valueType
 * @property {Number} _composition
 * @property {Number} _isOverlapped
 * @property {Number} _isOverridden
 * @property {Number} _renderTransforms
 * @property {Types.Tween} _prevRep
 * @property {Types.Tween} _nextRep
 * @property {Types.Tween} _prevAdd
 * @property {Types.Tween} _nextAdd
 * @property {Types.Tween} _prev
 * @property {Types.Tween} _next
 */

/**
 * @callback AnimatablePropertySetter
 * @param  {Number} [to]
 * @param  {Number} [duration]
 * @param  {Types.EasingParam} [ease]
 * @return {Types.Animation}
 *
 * @callback AnimatablePropertyGetter
 * @return {Number}
 *
 * @typedef {AnimatablePropertySetter & AnimatablePropertyGetter} Types.AnimatableProperty
 *
 * @typedef {Animatable & Record<String, Types.AnimatableProperty>} Types.Animatable
 */

/**
 * @typedef Types.Tween.Value
 * @property {Number} t - Type
 * @property {Number} n - Single number value
 * @property {String} u - Value unit
 * @property {String} o - Value operator
 * @property {Array.<Number>} d - Array of Numbers (in case of complex value type)
 * @property {Array.<String>} s - Strings (in case of complex value type)
 * @property {Types.MotionPath} p - Path object
 */

/** @typedef {{_head: null|Types.Tween, _tail: null|Types.Tween}} Types.Tween.PropertySiblings */
/** @typedef {Record<String, Types.Tween.PropertySiblings>} Types.Tween.Lookups */
/** @typedef {WeakMap.<Types.Target, Types.Tween.Lookups>} Types.Tween.ReplaceLookups */
/** @typedef {Map.<Types.Target, Types.Tween.Lookups>} Types.Tween.AdditiveLookups */

/**
 * @typedef {Object} Types.TimerOptions
 * @property {Number|String} [id]
 * @property {Number} [beginDelay]
 * @property {Number} [duration]
 * @property {Boolean} [reversed]
 * @property {Boolean} [alternate]
 * @property {Boolean|Number} [loop]
 * @property {Boolean} [autoplay]
 * @property {Number} [frameRate]
 * @property {Number} [playbackRate]
 */

/**
 * @callback Types.TimerCallback
 * @param {Types.Timer} self - Returns itself
 * @return {*}
 */

/**
 * @typedef {Object} Types.TimerCallbacks
 * @property {Types.TimerCallback} [onComplete]
 * @property {Types.TimerCallback} [onLoop]
 * @property {Types.TimerCallback} [onRender]
 * @property {Types.TimerCallback} [onBegin]
 * @property {Types.TimerCallback} [onUpdate]
 */

/**
 * @typedef {Types.TimerOptions & Types.TimerCallbacks} Types.TimerParams
 */

/**
 * @typedef {Number|String|Types.FunctionValue} Types.PropertyValue
 */

/**
 * @typedef {Array.<Partial<{to: Types.PropertyValue; from: Types.PropertyValue;}>>} Types.KeyframesArray
 */

/**
 * @callback Types.AnimationCallback
 * @param {Types.Animation} self - Returns itself
 * @return {*}
 */

/**
 * @typedef {Object} Types.AnimationOptions
 * @property {Types.KeyframesArray} [keyframes]
 * @property {Types.PropertyValue} [duration]
 * @property {Types.PropertyValue} [delay]
 * @property {Types.PropertyValue} [endDelay]
 * @property {Types.EasingParam} [ease]
 * @property {Types.Tween.Modifier} [modifier]
 * @property {'none'|'replace'|'blend'|compositionTypes} [composition]
 * @property {Types.AnimationCallback} [onComplete]
 * @property {Types.AnimationCallback} [onLoop]
 * @property {Types.AnimationCallback} [onRender]
 * @property {Types.AnimationCallback} [onBegin]
 * @property {Types.AnimationCallback} [onUpdate]
 */

/**
 * @typedef {Types.TimerOptions & Types.AnimationOptions & Record<String, any>} Types.AnimationParams
 */

/**
 * @callback Types.TimelineCallback
 * @param {Types.Timeline} [self] - Returns itself
 * @return {*}
 */

/**
 * @typedef {Types.TimerOptions & Types.AnimationOptions} Types.TimelineChildrenDefaults
 */

/**
 * @typedef {Object} Types.TimelineOptions
 * @property {Types.TimelineChildrenDefaults} [defaults]
 * @property {Types.TimelineCallback} [onComplete]
 * @property {Types.TimelineCallback} [onLoop]
 * @property {Types.TimelineCallback} [onRender]
 * @property {Types.TimelineCallback} [onBegin]
 * @property {Types.TimelineCallback} [onUpdate]
 */

/**
 * @typedef {Types.TimerOptions & Types.TimelineOptions} Types.TimelineParams
 */

// Environments

// TODO: Do we need to check if we're running inside a worker ?
const isBrowser = typeof window !== 'undefined';

/** @type {Object|Null} */
const win = isBrowser ? window : null;

/** @type {Object|Null} */
const doc = isBrowser ? document : null;

// Enums

/** @enum {Number} */
const tweenTypes = {
  INVALID: 0,
  OBJECT: 1,
  ATTRIBUTE: 2,
  CSS: 3,
  TRANSFORM: 4,
  CSS_VAR: 5,
};

/** @enum {Number} */
const valueTypes = {
  NUMBER: 0,
  UNIT: 1,
  COLOR: 2,
  PATH: 3,
  COMPLEX: 4,
};

/** @enum {Number} */
const tickModes = {
  NONE: 0,
  AUTO: 1,
  FORCE: 2,
};

/** @enum {Number} */
const compositionTypes = {
  replace: 0,
  none: 1,
  blend: 2,
};

// Cache symbols

const isRegisteredTargetSymbol = Symbol();
const isDomSymbol = Symbol();
const isSvgSymbol = Symbol();
const transformsSymbol = Symbol();
const morphPointsSymbol = Symbol();

// Numbers

const minValue = 1e-11;
const maxValue = 1e12;
const K = 1e3;
const maxFps = 120;

// Strings

const emptyString = '';

const shortTransforms = new Map();

shortTransforms.set('x', 'translateX');
shortTransforms.set('y', 'translateY');
shortTransforms.set('z', 'translateZ');

const validTransforms = [
  'translateX',
  'translateY',
  'translateZ',
  'rotate',
  'rotateX',
  'rotateY',
  'rotateZ',
  'scale',
  'scaleX',
  'scaleY',
  'scaleZ',
  'skew',
  'skewX',
  'skewY',
  'perspective',
  'matrix',
  'matrix3d',
];

const transformsFragmentStrings = validTransforms.reduce((a, v) => ({...a, [v]: v + '('}), {});

// Functions

/** @type {Function} */
const noop = () => {};

// Regex

const hexTestRgx = /(^#([\da-f]{3}){1,2}$)|(^#([\da-f]{4}){1,2}$)/i;
const rgbExecRgx = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i;
const rgbaExecRgx = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i;
const hslExecRgx = /hsl\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*\)/i;
const hslaExecRgx = /hsla\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i;
const digitWithExponentRgx = /[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?/g;
const unitsExecRgx = /^([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?)+([a-z]+|%)$/i;
const lowerCaseRgx = /([a-z])([A-Z])/g;
// Match inline transforms with cacl() values, returns the value wrapped in ()
const transformsExecRgx = /(\w+)(\([^)]+\)+)/g;
// Old version for reference
// export const transformsExecRgx = /(\w+)\(([^)]*)\)/g;
const relativeValuesExecRgx = /(\*=|\+=|-=)/;

const defaults = {
  /** @type {Number|String} */
  id: null,
  /** @type {Array.<object>} */
  keyframes: null,
  playbackRate: 1,
  frameRate: maxFps,
  /** @type {Number|Boolean} */
  loop: 0,
  reversed: false,
  alternate: false,
  autoplay: true,
  beginDelay: 0,
  duration: K,
  delay: 0,
  endDelay: 0,
  /** @type {String|Types.EasingFunction} */
  ease: 'outQuad',
  /** @type {String|compositionTypes} */
  composition: compositionTypes.replace,
  /** @type {Types.Tween.Modifier} */
  modifier: v => v,
  onBegin: noop,
  onUpdate: noop,
  onTick: noop,
  onRender: noop,
  onLoop: noop,
  onComplete: noop,
};

// Strings

/**
 * @param  {String} str
 * @return {String|void}
 */
const selectString = str => {
  try {
    const nodes = doc.querySelectorAll(str);
    return nodes;
  } catch(e) {
    return;
  }
};

/**
 * @param  {String} str
 * @return {String}
 */
const toLowerCase = str => str.replace(lowerCaseRgx, '$1-$2').toLowerCase();

/**
 * Prioritize this method instead of regex when possible
 * @param  {String} str
 * @param  {String} sub
 * @return {Boolean}
 */
const stringStartsWith = (str, sub) => str.indexOf(sub) === 0;

// Time
// Note: Date.now is used instead of performance.now since it is precise enough for timings calculations, performs slightly faster and works in Node.js environement.
const now = Date.now;

// Types checkers

/**@param {any} a @return {Boolean} */
const isArr = a => Array.isArray(a);
/**@param {any} a @return {Boolean} */
const isObj = a => a && a.constructor === Object;
/**@param {any} a @return {Boolean} */
const isNum = a => typeof a === 'number' && !isNaN(a);
/**@param {any} a @return {Boolean} */
const isStr = a => typeof a === 'string';
/**@param {any} a @return {Boolean} */
const isFnc = a => typeof a === 'function';
/**@param {any} a @return {Boolean} */
const isUnd = a => typeof a === 'undefined';
/**@param {any} a @return {Boolean} */
const isNil = a => isUnd(a) || a === null;
/**@param {any} a @return {Boolean} */
const isSvg = a => isBrowser && a instanceof SVGElement;
/**@param {any} a @return {Boolean} */
const isHex = a => hexTestRgx.test(a);
/**@param {any} a @return {Boolean} */
const isRgb = a => stringStartsWith(a, 'rgb');
/**@param {any} a @return {Boolean} */
const isHsl = a => stringStartsWith(a, 'hsl');
/**@param {any} a @return {Boolean} */
const isCol = a => isHex(a) || isRgb(a) || isHsl(a);
/**@param {any} a @return {Boolean} */
const isKey = a => !defaults.hasOwnProperty(a);

// Number

/**
 * @param  {Number|String} str
 * @return {Number}
 */
const parseNumber = str => isStr(str) ?
  parseFloat(/** @type {String} */(str)) :
  /** @type {Number} */(str);

// Math

const pow = Math.pow;
const sqrt = Math.sqrt;
const sin = Math.sin;
const cos = Math.cos;
const abs = Math.abs;
const exp = Math.exp;
const ceil = Math.ceil;
const floor = Math.floor;
const asin = Math.asin;
const max = Math.max;
const atan2 = Math.atan2;
const PI = Math.PI;

/**
 * @param  {Number} v
 * @param  {Number} min
 * @param  {Number} max
 * @return {Number}
 */
const clamp = (v, min, max) => v < min ? min : v > max ? max : v;

/**
 * @param  {Number} v
 * @param  {Number} [decimalLength]
 * @return {Number}
 */
const round = (v, decimalLength) => { const m = 10 ** (decimalLength || 0); return Math.round(v * m) / m; };

/**
 * @param  {Number} v
 * @param  {Number} [increment]
 * @return {Number}
 */
const snap = (v, increment) => increment ? Math.round(v / increment) * increment : v;

/**
 * @param  {Number} start
 * @param  {Number} end
 * @param  {Number} progress
 * @return {Number}
 */
const interpolate = (start, end, progress) => start + (end - start) * progress;

/**
 * @param  {Number} v
 * @return {Number}
 */
const clampInfinity = v => v === Infinity ? maxValue : v;

/**
 * @param  {Number} v
 * @return {Number}
 */
const clampZero = v => v < minValue ? minValue : v;

// Arrays

/**
 * @param  {any} v
 * @return {Array}
 */
const toArray = v => {
  if (!isBrowser) return [v];
  if (isStr(v)) v = selectString(v) || v;
  if (v instanceof NodeList || v instanceof HTMLCollection) return [].slice.call(v);
  return [v];
};

/**
 * @param  {Array} a
 * @return {Array}
 */
const cloneArray = a => isArr(a) ? [ ...a ] : a;

// Objects

/**
 * @param  {Object} o1
 * @param  {Object} o2
 * @return {Object}
 */
const mergeObjects = (o1, o2) => {
  const merged = { ...o1 };
  for (let p in o2) merged[p] = isUnd(o1[p]) ? o2[p] : o1[p];
  return merged;
};

// Linked lists

/**
 * @param  {Object}   parent
 * @param  {Function} callback
 * @param  {Boolean}  [reverse]
 * @param  {String}   [prevProp]
 * @param  {String}   [nextProp]
 * @return {void}
 */
const forEachChildren = (parent, callback, reverse, prevProp = '_prev', nextProp = '_next') => {
  let next = parent._head;
  let adjustedNextProp = nextProp;
  if (reverse) {
    next = parent._tail;
    adjustedNextProp = prevProp;
  }
  while (next) {
    const currentNext = next[adjustedNextProp];
    callback(next);
    next = currentNext;
  }
};

/**
 * @param  {Object} parent
 * @param  {Object} child
 * @param  {String} [prevProp]
 * @param  {String} [nextProp]
 * @return {void}
 */
const removeChild = (parent, child, prevProp = '_prev', nextProp = '_next') => {
  const prev = child[prevProp];
  const next = child[nextProp];
  prev ? prev[nextProp] = next : parent._head = next;
  next ? next[prevProp] = prev : parent._tail = prev;
  child[prevProp] = null;
  child[nextProp] = null;
};

/**
 * @param  {Object} parent
 * @param  {Object} child
 * @param  {Function} [sortMethod]
 * @param  {String} prevProp
 * @param  {String} nextProp
 * @return {void}
 */
const addChild = (parent, child, sortMethod, prevProp = '_prev', nextProp = '_next') => {
  let prev = parent._tail;
  while (prev && sortMethod && sortMethod(prev, child)) prev = prev[prevProp];
  const next = prev ? prev[nextProp] : parent._head;
  prev ? prev[nextProp] = child : parent._head = child;
  next ? next[prevProp] = child : parent._tail = child;
  child[prevProp] = prev;
  child[nextProp] = next;
};

/**
 * Base class inherited by Engine and Timer (and by consequence, Animation and Timeline too).
 */
class Clock {

  constructor() {
    /** @type {Number} */
    this.deltaTime = 0;
    /** @type {Number} */
    this._elapsedTime = 0;
    /** @type {Number} */
    this._startTime = 0;
    /** @type {Number} */
    this._lastTime = 0;
    /** @type {Number} */
    this._scheduledTime = 0;
    /** @type {Number} */
    this._frameDuration = K / maxFps;
    /** @type {Number} */
    this._fps = maxFps;
    /** @type {Number} */
    this._speed = 1;
    /** @type {Boolean} */
    this._hasChildren = false;
  }

  get frameRate() {
    return this._fps;
  }

  set frameRate(frameRate) {
    const previousFrameDuration = this._frameDuration;
    const fr = +frameRate;
    const fps = fr < minValue ? minValue : fr;
    const frameDuration = K / fps;
    this._fps = fps;
    this._frameDuration = frameDuration;
    this._scheduledTime += frameDuration - previousFrameDuration;
  }

  get playbackRate() {
    return this._speed;
  }

  set playbackRate(playbackRate) {
    const pbr = +playbackRate;
    this._speed = pbr < minValue ? minValue : pbr;
  }

  /**
   * @param  {Number} time
   * @return {tickModes}
   */
  requestTick(time) {
    const scheduledTime = this._scheduledTime;
    const elapsedTime = this._elapsedTime;
    this._elapsedTime += (time - elapsedTime);
    // If the elapsed time is lower than the scheduled time
    // this means not enough time has passed to hit one frameDuration
    // so skip that frame
    if (elapsedTime < scheduledTime) return tickModes.NONE;
    const frameDuration = this._frameDuration;
    const frameDelta = elapsedTime - scheduledTime;
    // Ensures that _scheduledTime progresses in steps of at least 1 frameDuration.
    // Skips ahead if the actual elapsed time is higher.
    this._scheduledTime += frameDelta < frameDuration ? frameDuration : frameDelta;
    return tickModes.AUTO;
  }

  /**
   * @param  {Number} time
   * @return {Number}
   */
  computeDeltaTime(time) {
    const delta = time - this._lastTime;
    this.deltaTime = delta;
    this._lastTime = time;
    return delta;
  }

}

/**
 * @param  {Types.Timer|Types.Animation|Types.Timeline} renderable
 * @param  {Number} time
 * @param  {Number} muteCallbacks
 * @param  {Number} internalRender
 * @param  {tickModes} tickMode
 * @return {Number}
 */
const update = (renderable, time, muteCallbacks, internalRender, tickMode) => {

  const duration = renderable.duration;
  const currentTime = renderable.currentTime;
  const _beginDelay = renderable._beginDelay;
  const _currentIteration = renderable._currentIteration;
  const _iterationChangeStartTime = renderable._iterationChangeStartTime;
  const _iterationChangeEndTime = renderable._iterationChangeEndTime;
  const _iterationDuration = renderable._iterationDuration;
  const _iterationCount = renderable._iterationCount;
  const _reversed = renderable._reversed;
  const _alternate = renderable._alternate;
  const _hasChildren = renderable._hasChildren;

  // const animationInteralTime = time - _beginDelay;
  // const animationTime = clamp(animationInteralTime, 0, duration);
  const animationTime = clamp(time - _beginDelay, -_beginDelay, duration);
  const forceTick = tickMode === tickModes.FORCE;
  const autoTick = tickMode === tickModes.AUTO;
  const deltaTime = animationTime - currentTime;
  // Time has jumped more than 200ms so consider this tick manual (Note the manual abs is faster than Math.abs())
  // TODO: Check id the time jump should be relative to engine._frameDuration
  const isManual = forceTick || (deltaTime < 0 ? deltaTime * -1 : deltaTime) >= 200;

  let isOdd = 0;
  let iterationElapsedTime = animationTime;

  // Execute the "expensive" iterations calculations only when necessary
  if (_iterationCount > 1) {
    // bitwise NOT operator seems to be generally faster than Math.floor() across browsers
    renderable._currentIteration = ~~(animationTime / _iterationDuration);
    // Prevent the iteration count to go above the max iterations when reaching the end of the animation
    if (animationTime >= duration) {
      renderable._currentIteration--;
    }
    isOdd = renderable._currentIteration % 2;
    iterationElapsedTime = animationTime % _iterationDuration;
  }

  // Checks if exactly one of _reversed and (_alternate && isOdd) is true
  const isReversed = _reversed ^ (_alternate && isOdd);
  const iterationTime = animationTime >= duration ? isReversed ? 0 : duration : isReversed ? _iterationDuration - iterationElapsedTime : iterationElapsedTime;
  const isRunningBackwards = iterationTime < renderable._iterationTime;
  // 0 = automatic, 1 = manual forward, 2 = manual backward
  const seekMode = isManual ? isRunningBackwards ? 2 : 1 : 0;

  renderable._iterationTime = iterationTime;
  // timer._internalTime = animationInteralTime;
  renderable._backwards = isRunningBackwards && !isReversed;

  if (!muteCallbacks && !renderable.began && animationTime > 0) {
    renderable.began = true;
    renderable.onBegin(renderable);
  }

  // Update animation.currentTime only after the children have been updated to prevent wrong seek direction calculatiaon
  renderable.currentTime = animationTime;

  // Render checks
  // Used to also check if the children have rendered in order to trigger the onRender callback on the parent timer
  let hasRendered = 0;

  if (
    forceTick ||
    autoTick && (
      time >= _iterationChangeStartTime && time <= _iterationChangeEndTime || // Normal render
      time <= _iterationChangeStartTime && currentTime !== 0 || // Playhead is before the animation start time so make sure the animation is at its initial state
      time >= _iterationChangeEndTime && currentTime !== duration // Playhead is after the animation end time so make sure the animation is at its end state
    ) ||
    iterationTime >= _iterationChangeEndTime && currentTime !== duration ||
    iterationTime <= _iterationChangeStartTime && currentTime !== 0 ||
    time <= currentTime && currentTime === duration && renderable.completed // Force a render if a seek occurs on an completed animation
  ) {

    // Trigger onUpdate callback before rendering
    if (!muteCallbacks) {
      renderable.computeDeltaTime(currentTime);
      renderable.onUpdate(renderable);
    }

    // Start tweens rendering
    if (!_hasChildren) {

      // Only Animtion can have tweens, Timer returns undefined
      let tween = /** @type {Types.Animation} */(renderable)._head;
      let tweenTarget;
      let tweenStyle;
      let tweenTargetTransforms;
      let tweenTargetTransformsProperties;
      let tweenTransformsNeedUpdate = 0;

      const absoluteTime = renderable._offset + iterationTime;

      while (tween) {

        const tweenComposition = tween._composition;
        const tweenCurrentTime = tween._currentTime;
        const tweenChangeDuration = tween._changeDuration;
        const tweenIsAdditive = tweenComposition === compositionTypes.blend;
        const tweenHasNoComposition = tweenComposition === compositionTypes.none;

        if ((seekMode || (
            (tweenCurrentTime !== tweenChangeDuration || absoluteTime <= tween._absoluteChangeEndTime) &&
            (tweenCurrentTime !== 0 || absoluteTime >= tween._absoluteChangeStartTime)
          )) && (tweenHasNoComposition || (
            !tween._isOverridden &&
            (!tween._isOverlapped || absoluteTime <= tween._absoluteChangeEndTime) &&
            (!tween._nextRep || (tween._nextRep._isOverridden || absoluteTime <= tween._nextRep._absoluteStartTime)) &&
            (!tween._prevRep || (tween._prevRep._isOverridden || absoluteTime >= tween._prevRep._absoluteChangeEndTime))
          ))
        ) {

          const tweenNewTime = tween._currentTime = clamp(iterationTime - tween._changeStartTime, 0, tweenChangeDuration);
          const tweenProgress = tween._ease(tweenNewTime / tween._updateDuration);
          const tweenModifier = tween._modifier;
          const tweenValueType = tween._valueType;

          // Recompose tween value
          let /** @type {String|Number} */value, /** @type {Number} */number;

          if (tweenValueType === valueTypes.NUMBER) {
            value = number = tweenModifier(interpolate(tween._fromNumber, tween._toNumber, tweenProgress));
          } else if (tweenValueType === valueTypes.UNIT) {
            // NOTE: Rounding the values speed up string composition
            number = tweenModifier(round(interpolate(tween._fromNumber, tween._toNumber, tweenProgress), 3));
            value = `${number}${tween._unit}`;
          } else if (tweenValueType === valueTypes.COLOR) {
            const fn = tween._fromNumbers;
            const tn = tween._toNumbers;
            const r = round(clamp(tweenModifier(interpolate(fn[0], tn[0], tweenProgress)), 0, 255), 0);
            const g = round(clamp(tweenModifier(interpolate(fn[1], tn[1], tweenProgress)), 0, 255), 0);
            const b = round(clamp(tweenModifier(interpolate(fn[2], tn[2], tweenProgress)), 0, 255), 0);
            const a = clamp(tweenModifier(interpolate(fn[3], tn[3], tweenProgress)), 0, 1);
            value = `rgba(${r},${g},${b},${a})`;
            // if (tweenIsAdditive) {
            //   const ns = tween._numbers;
            //   ns[0] = r;
            //   ns[1] = g;
            //   ns[2] = b;
            //   ns[3] = a;
            // }
          } else if (tweenValueType === valueTypes.PATH) {
            number = tweenModifier(tween._path.p(tweenProgress));
            // number = tweenModifier(tween._path.p(tweenProgress * tween._toNumber));
            value = number + tween._unit;
          } else if (tweenValueType === valueTypes.COMPLEX) {
            value = tween._strings[0];
            for (let j = 0, l = tween._toNumbers.length; j < l; j++) {
              // NOTE: Rounding the values speed up string composition
              const n = tweenModifier(round(interpolate(tween._fromNumbers[j], tween._toNumbers[j], tweenProgress), 3));
              const s = tween._strings[j + 1];
              value += `${s ? n + s : n}`;
              if (tweenIsAdditive) {
                tween._numbers[j] = n;
              }
            }
          }

          // For additive tweens and Animatables
          if (!tweenHasNoComposition) tween._number = number;

          if (!internalRender && !tweenIsAdditive) {

            const tweenProperty = tween.property;
            const tweenType = tween._tweenType;
            tweenTarget = tween.target;

            if (tweenType === tweenTypes.OBJECT) {
              tweenTarget[tweenProperty] = value;
            } else if (tweenType === tweenTypes.ATTRIBUTE) {
              tweenTarget.setAttribute(tweenProperty, value);
            } else {
              tweenStyle = /** @type {Types.DOMTarget} */(tweenTarget).style;
              if (tweenType === tweenTypes.TRANSFORM) {
                if (tweenTarget !== tweenTargetTransforms) {
                  tweenTargetTransforms = tweenTarget;
                  // NOTE: Referencing the cachedTransforms in the tween property directly can be a little bit faster but appears to increase memory usage.
                  tweenTargetTransformsProperties = tweenTarget[transformsSymbol];
                }
                tweenTargetTransformsProperties[tweenProperty] = value;
                tweenTransformsNeedUpdate = 1;
              } else if (tweenType === tweenTypes.CSS) {
                tweenStyle[tweenProperty] = value;
              } else if (tweenType === tweenTypes.CSS_VAR) {
                tweenStyle.setProperty(tweenProperty, /** @type {String} */(value));
              }
            }

            hasRendered = 1;

          } else {
            // Used for composing timeline tweens without having to do a real render
            tween._value = value;
          }

        }

        // NOTE: Possible improvement: Use translate(x,y) / translate3d(x,y,z) syntax
        // to reduce memory usage on string composition
        if (tweenTransformsNeedUpdate && tween._renderTransforms) {
          let str = emptyString;
          for (let key in tweenTargetTransformsProperties) {
            str += `${transformsFragmentStrings[key]}${tweenTargetTransformsProperties[key]}) `;
          }
          tweenStyle.transform = str;
          tweenTransformsNeedUpdate = 0;
        }

        tween = tween._next;
      }

      if (renderable.began && hasRendered) {
        renderable.onRender(renderable);
      }
    }

  }

  // End tweens rendering

  // Start onComplete, onLoop callbacks and resolve Promise
  if (renderable.began) {
    if (animationTime >= duration) {
      if (_iterationCount === Infinity) {
        // Offset the timer _startTime with its duration to reset the currentTime to 0 and continue the infinite timer
        renderable._startTime -= renderable.duration;
      } else if (renderable._currentIteration >= _iterationCount - 1) {
        // By setting paused to true, we tell the engine loop to not render this animation and it will take care of remoning it
        renderable.paused = true;
        if (!renderable.completed) {
          renderable.completed = true;
          renderable.onComplete(renderable);
          renderable._resolve(renderable);
        }
      }
    } else if (renderable._currentIteration !== _currentIteration) {
      renderable.onLoop(renderable);
      // Reset all children on loop to get the callbacks working and initial proeprties properly set on each iteration
      if (renderable._hasChildren) {
        forEachChildren(renderable, (/** @type {Types.Timer} */child) => child.reset(), true);
      }
    }
  }

  return hasRendered;
};

/**
 * @param  {Types.Renderable} rendarable
 * @param  {Number} time
 * @param  {Number} muteCallbacks
 * @param  {Number} internalRender
 * @param  {Number} tickMode
 * @return {void}
 */
const render = (rendarable, time, muteCallbacks, internalRender, tickMode) => {
  update(rendarable, time, muteCallbacks, internalRender, tickMode);
  if (rendarable._hasChildren) {
    let hasRendered = 0;
    // Don't use the iteration time with internalRender
    // otherwise it will be converted twice further down the line
    const childrenTime = internalRender ? time : rendarable._iterationTime;
    const childrenTickTime = now();
    forEachChildren(rendarable, (/** @type {Types.Renderable} */child) => {
      hasRendered += update(
        child,
        childrenTime - child._offset,
        muteCallbacks,
        internalRender,
        child._fps < rendarable._fps ? child.requestTick(childrenTickTime) : tickMode
      );
    }, rendarable._backwards);

    if (rendarable.began && hasRendered) {
      rendarable.onRender(rendarable);
    }
  }
};

const additive = {
  animation: null,
  render: noop,
};

/**
 * @typedef AdditiveAnimation
 * @property {Number} duration
 * @property {Number} _beginDelay
 * @property {Types.Tween} _head
 * @property {Types.Tween} _tail
 */

/**
 * @param  {Types.Tween.AdditiveLookups} lookups
 * @return {AdditiveAnimation}
 */
const addAdditiveAnimation = lookups => {
  let animation = additive.animation;
  if (!animation) {
    animation = {
      duration: minValue,
      _beginDelay: 0,
      _head: null,
      _tail: null,
    };
    additive.animation = animation;
    additive.render = () => {
      lookups.forEach(propertyTweens => {
        for (let propertyName in propertyTweens) {
          const tweens = propertyTweens[propertyName];
          const lookupTween = tweens._head;
          const additiveValues = lookupTween._valueType === valueTypes.COMPLEX ? cloneArray(lookupTween._fromNumbers) : null;
          let additiveValue = lookupTween._fromNumber;
          let tween = tweens._tail;
          while (tween && tween !== lookupTween) {
            if (additiveValues) {
              tween._numbers.forEach((value, i) => additiveValues[i] += value);
            } else {
              additiveValue += tween._number;
            }
            tween = tween._prevAdd;
          }
          lookupTween._toNumber = additiveValue;
          lookupTween._toNumbers = additiveValues;
        }
      });
      render(animation, 1, 1, 0, tickModes.FORCE);
    };
  }
  return animation;
};

/**
 * @type {Function}
 * @return {Number}
 */
const engineTickMethod = isBrowser ? requestAnimationFrame : setImmediate;

/**
 * @type {Function}
 * @return {Number}
 */
const engineCancelMethod = isBrowser ? cancelAnimationFrame : clearImmediate;

class Engine extends Clock {
  constructor() {
    super();

    // Clock's parameters
    const initTime = now();
    this._elapsedTime = initTime;
    this._startTime = initTime;
    this._lastTime = initTime;

    // Engine's parameters
    this.useDefaultMainLoop = true;
    this.suspendWhenHidden = true;
    this._reqId = 0;
    /** @type {Types.Renderable} */
    this._head = null;
    /** @type {Types.Renderable} */
    this._tail = null;
  }

  tick() {
    const time = now();
    if (this.requestTick(time)) {
      this.computeDeltaTime(time);
      const engineSpeed = this._speed;
      const engineFps = this._fps;
      let activeRenderable = this._head;
      while (activeRenderable) {
        const nextRenderable = activeRenderable._next;
        if (!activeRenderable.paused) {
          render(
            activeRenderable,
            (time + activeRenderable._startTime) * activeRenderable._speed * engineSpeed,
            0, // !muteCallbacks
            0, // !internalRender
            // Only process the tick of the child clock if its frameRate is lower than the engine
            activeRenderable._fps < engineFps ? activeRenderable.requestTick(time) : tickModes.AUTO
          );
        } else {
          removeChild(engine, activeRenderable);
          this._hasChildren = !!this._tail;
          activeRenderable._running = false;
          if (activeRenderable.completed && !activeRenderable._cancelled) {
            activeRenderable.cancel();
          }
        }
        activeRenderable = nextRenderable;
      }
      additive.render();
    }
  }

  start() {
    return this.useDefaultMainLoop && !this._reqId ? this._reqId = engineTickMethod(mainLoop) : 0;
  }

  resume() {
    forEachChildren(this, (/** @type {Types.Renderable} */child) => child.resetTime());
    return this.start();
  }

  suspend() {
    this._reqId = engineCancelMethod(this._reqId);
    return this;
  }

  get playbackRate() {
    return super.playbackRate;
  }

  set playbackRate(playbackRate) {
    super.playbackRate = playbackRate;
    // Forces children time to reset by reseting their playbackRate
    forEachChildren(this, (/** @type {Types.Renderable} */child) => child.playbackRate = child._speed);
  }
}

const engine = new Engine();

const mainLoop = () => {
  if (engine._head) {
    engine._reqId = engineTickMethod(mainLoop);
    engine.tick();
  } else {
    engine._reqId = 0;
  }
};

/**
 * @param  {Types.DOMTarget} target
 * @param  {String} propName
 * @param  {Object} animationInlineStyles
 * @return {String}
 */
const parseInlineTransforms = (target, propName, animationInlineStyles) => {
  const inlineTransforms = target.style.transform;
  let inlinedStylesPropertyValue;
  if (inlineTransforms) {
    const cachedTransforms = target[transformsSymbol];
    let t; while (t = transformsExecRgx.exec(inlineTransforms)) {
      const inlinePropertyName = t[1];
      // const inlinePropertyValue = t[2];
      const inlinePropertyValue = t[2].slice(1, -1);
      cachedTransforms[inlinePropertyName] = inlinePropertyValue;
      if (inlinePropertyName === propName) {
        inlinedStylesPropertyValue = inlinePropertyValue;
        // Store the new parsed inline styles if animationInlineStyles is provided
        if (animationInlineStyles) {
          animationInlineStyles[propName] = inlinePropertyValue;
        }
      }
    }
  }
  return inlineTransforms && !isUnd(inlinedStylesPropertyValue) ? inlinedStylesPropertyValue :
    stringStartsWith(propName, 'scale') ? '1' :
    stringStartsWith(propName, 'rotate') || stringStartsWith(propName, 'skew') ? '0deg' : '0px';
};

/**
 * @param  {Types.TargetsParam} targets
 * @return {Types.TargetsArray}
 */
const parseTargets = targets => {
  if (isNil(targets)) return;
  if (isArr(targets)) {
    const targetsArray = /** @type {Array} */(targets);
    // TODO: Remove spread operator?
    const parsed = [].concat(...targetsArray.map(toArray));
     // TODO: Test again if Set is more performant than indexOf
    return parsed.filter((t, index) => parsed.indexOf(t) === index);
  } else {
    return toArray(targets);
  }
};

/**
 * @param  {Types.TargetsParam} targets
 * @return {Types.TargetsArray}
 */
const registerTargets = targets => {
  if (isNil(targets)) return;
  const parsedTargetsArray = parseTargets(targets);
  for (let i = 0, l = parsedTargetsArray.length; i < l; i++) {
    const target = parsedTargetsArray[i];
    if (!target[isRegisteredTargetSymbol]) {
      target[isRegisteredTargetSymbol] = true;
      const isSvgType = isSvg(target);
      const isDom = target.nodeType || isSvgType;
      if (isDom) {
        target[isDomSymbol] = true;
        target[isSvgSymbol] = isSvgType;
        target[transformsSymbol] = {};
      }
    }
  }
  return parsedTargetsArray;
};

/**
 * @param  {Types.TargetsParam} path
 * @return {SVGGeometryElement|undefined}
 */
const getPath = path => {
  const parsedTargets = parseTargets(path);
  const $parsedSvg = /** @type {SVGGeometryElement} */(parsedTargets[0]);
  if (!$parsedSvg || !isSvg($parsedSvg)) return;
  return $parsedSvg;
};

/**
 * @callback morphCallback
 * @param {SVGGeometryElement} $path1
 * @return {Array.<String>}
 *
 * @param  {Types.TargetsParam} path2
 * @param  {Number} [precision]
 * @return {morphCallback}
 */
const morphTo = (path2, precision = .33) => ($path1) => {
  const $path2 = /** @type {SVGGeometryElement} */(getPath(path2));
  if (!$path2) return;
  const isPath = $path1.tagName === 'path';
  const separator = isPath ? ' ' : ',';
  const previousPoints = $path1[morphPointsSymbol];
  if (previousPoints) $path1.setAttribute(isPath ? 'd' : 'points', previousPoints);

  let v1 = '', v2 = '';

  if (!precision) {
    v1 = $path1.getAttribute(isPath ? 'd' : 'points');
    v2 = $path2.getAttribute(isPath ? 'd' : 'points');
  } else {
    const length1 = $path1.getTotalLength();
    const length2 = $path2.getTotalLength();
    const maxPoints = Math.max(Math.ceil(length1 * precision), Math.ceil(length2 * precision));
    for (let i = 0; i < maxPoints; i++) {
      const t = i / (maxPoints - 1);
      const pointOnPath1 = $path1.getPointAtLength(length1 * t);
      const pointOnPath2 = $path2.getPointAtLength(length2 * t);
      const prefix = isPath ? (i === 0 ? 'M' : 'L') : '';
      v1 += prefix + round(pointOnPath1.x, 3) + separator + pointOnPath1.y + ' ';
      v2 += prefix + round(pointOnPath2.x, 3) + separator + pointOnPath2.y + ' ';
    }
  }

  $path1[morphPointsSymbol] = v2;

  return [v1, v2];
};

/**
 * @callback drawLineCallback
 * @param {SVGGeometryElement} $el
 * @return {Array.<Number>}
 *
 * @param  {('in'|'out')} [direction]
 * @return {drawLineCallback}
 */
const drawLine = (direction = 'in') => ($el) => {
  const pathLength = +$el.getTotalLength();
  $el.setAttribute('stroke-dasharray', pathLength + emptyString);
  return direction === 'out' ? [pathLength * 2, pathLength] : [pathLength, 0];
};

// Path animation

/**
 * @param {SVGGeometryElement} $path
 */
const getPathParentSvg = $path => {
  let $parentSvg = /** @type {SVGGeometryElement} */($path.parentNode);
  while (isSvg($parentSvg)) {
    const parentNode = $parentSvg.parentNode;
    if (!isSvg(parentNode)) break;
    $parentSvg = /** @type {SVGGeometryElement} */(parentNode);
  }
  const rect = $parentSvg.getBoundingClientRect();
  const viewBoxAttr = $parentSvg.getAttribute('viewBox');
  const w = +rect.width;
  const h = +rect.height;
  const viewBox = viewBoxAttr ? viewBoxAttr.split(' ') : [0, 0, w, h];
  return {
    w,
    h,
    x: +viewBox[0] / 1,
    y: +viewBox[1] / 1,
    vW: +viewBox[2],
    vH: +viewBox[3]
  }
};

/**
 * @param  {SVGGeometryElement} $path
 * @param  {Number} progress
 * @param  {Number} lookup
 * @return {DOMPoint}
 */
const getPathPoint = ($path, progress, lookup = 0) => {
  return $path.getPointAtLength(progress + lookup >= 1 ? progress + lookup : 0);
};

/**
 * @param  {SVGGeometryElement} $path
 * @param  {String} pathProperty
 * @return {Types.MotionPath}
 */
const getPathProgess = ($path, pathProperty) => {
  const parentSvg = getPathParentSvg($path);
  const totalLength = +($path.getTotalLength());
  return {
    inSvg: false,
    n: totalLength,
    p: function(/** @type {Number} */progress) {
      const progressValue = totalLength * progress;
      if (pathProperty === 'a') {
        const p0 = getPathPoint($path, progressValue, -1);
        const p1 = getPathPoint($path, progressValue, +1);
        return atan2(p1.y - p0.y, p1.x - p0.x) * 180 / PI;
      } else {
        const p = getPathPoint($path, progressValue, 0);
        return pathProperty === 'x' ?
          (p.x - parentSvg.x) * (this.inSvg ? 1 : parentSvg.w / parentSvg.vW) :
          (p.y - parentSvg.y) * (this.inSvg ? 1 : parentSvg.h / parentSvg.vH);
      }
    }
  }
};

/**
 * @param {Types.TargetsParam} path
 */
const createMotionPath = path => {
  const $path = getPath(path);
  if (!$path) return;
  return {
    x: getPathProgess($path, 'x'),
    y: getPathProgess($path, 'y'),
    angle: getPathProgess($path, 'a'),
  }
};

// Check for valid SVG attribute

const cssReservedProperties = ['opacity', 'rotate', 'overflow', 'color'];

/**
 * @param  {Types.Target} el
 * @param  {String} propertyName
 * @return {Boolean}
 */
const isValidSVGAttribute = (el, propertyName) => {
  // Return early and use CSS opacity animation instead (already better default values (opacity: 1 instead of 0)) and rotate should be considered a transform
  if (cssReservedProperties.includes(propertyName)) return false;
  if (propertyName in /** @type {Types.DOMTarget} */(el).style || propertyName in el) {
    if (propertyName === 'scale') { // Scale
      const elParentNode = /** @type {SVGGeometryElement} */(el.parentNode);
      // Only consider scale as a valid SVG attribute on filter element
      return elParentNode && elParentNode.tagName === 'filter';
    }
    return true;
  }
};

const svg = {
  morphTo,
  drawLine,
  createMotionPath,
};

/**
 * RGB / RGBA Color value string -> RGBA values array
 * @param  {String} rgbValue
 * @return {Types.ColorArray}
 */
const rgbToRgba = rgbValue => {
  const rgba = rgbExecRgx.exec(rgbValue) || rgbaExecRgx.exec(rgbValue);
  const a = !isUnd(rgba[4]) ? +rgba[4] : 1;
  return [
    +rgba[1],
    +rgba[2],
    +rgba[3],
    a
  ]
};

/**
 * HEX3 / HEX3A / HEX6 / HEX6A Color value string -> RGBA values array
 * @param  {String} hexValue
 * @return {Types.ColorArray}
 */
const hexToRgba = hexValue => {
  const hexLength = hexValue.length;
  const isShort = hexLength === 4 || hexLength === 5;
  return [
    +('0x' + hexValue[1] + hexValue[isShort ? 1 : 2]),
    +('0x' + hexValue[isShort ? 2 : 3] + hexValue[isShort ? 2 : 4]),
    +('0x' + hexValue[isShort ? 3 : 5] + hexValue[isShort ? 3 : 6]),
    ((hexLength === 5 || hexLength === 9) ? +(+('0x' + hexValue[isShort ? 4 : 7] + hexValue[isShort ? 4 : 8]) / 255).toFixed(3) : 1)
  ]
};

/**
 * @param  {Number} p
 * @param  {Number} q
 * @param  {Number} t
 * @return {Number}
 */
const hue2rgb = (p, q, t) => {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  return t < 1 / 6 ? p + (q - p) * 6 * t :
         t < 1 / 2 ? q :
         t < 2 / 3 ? p + (q - p) * (2 / 3 - t) * 6 :
         p;
};

/**
 * HSL / HSLA Color value string -> RGBA values array
 * @param  {String} hslValue
 * @return {Types.ColorArray}
 */
const hslToRgba = hslValue => {
  const hsla = hslExecRgx.exec(hslValue) || hslaExecRgx.exec(hslValue);
  const h = +hsla[1] / 360;
  const s = +hsla[2] / 100;
  const l = +hsla[3] / 100;
  const a = !isUnd(hsla[4]) ? +hsla[4] : 1;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < .5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = round(hue2rgb(p, q, h + 1 / 3) * 255, 0);
    g = round(hue2rgb(p, q, h) * 255, 0);
    b = round(hue2rgb(p, q, h - 1 / 3) * 255, 0);
  }
  return [r, g, b, a];
};

/**
 * All in one color converter that converts a color string value into an array of RGBA values
 * @param  {String} colorString
 * @return {Types.ColorArray}
 */
const convertColorStringValuesToRgbaArray = colorString => {
  return isRgb(colorString) ? rgbToRgba(colorString) :
         isHex(colorString) ? hexToRgba(colorString) :
         isHsl(colorString) ? hslToRgba(colorString) :
         [0, 0, 0, 1];
};

/**
 * @template T, D
 * @param {T|undefined} targetValue
 * @param {D} defaultValue
 * @return {T|D}
 */
const setValue = (targetValue, defaultValue) => {
  return isUnd(targetValue) ? defaultValue : targetValue;
};

/**
 * @param  {Number|String|Function} value
 * @param  {Types.Target} target
 * @param  {Number} index
 * @param  {Number} total
 * @return {any}
 */
const computeValue = (value, target, index, total) => {
  if (isFnc(value)) {
    const computed = /** @type {Function} */(value)(target, index, total);
    // Fallback to 0 if the function returns undefined / NaN / null / false / 0
    return !isNaN(+computed) ? +computed : computed || 0;
  } else {
    return value;
  }
};

/**
 * @param  {Number|String|Function} value
 * @param  {Types.Target} target
 * @param  {Number} index
 * @param  {Number} total
 * @return {any}
 */
const getFunctionValue = (value, target, index, total) => {
  let computed = computeValue(value, target, index, total);
  if (isArr(value)) {
    computed = computed.map(
      (/** @type {Number|String|Function} */v) => computeValue(v, target, index, total)
    );
    // TODO: investigate if from to value check was necessary here
    // if (value.length === 1) value = value[0];
  }
  return computed;
};

/**
 * @param  {Types.Target} target
 * @param  {String} prop
 * @return {tweenTypes}
 */
const getTweenType = (target, prop) => {
  const type = !target[isDomSymbol] ? tweenTypes.OBJECT :
    // Handle SVG attributes
    target[isSvgSymbol] && isValidSVGAttribute(target, prop) ? tweenTypes.ATTRIBUTE :
    // Handle CSS Transform properties differently than CSS to allow individual animations
    validTransforms.includes(prop) || shortTransforms.get(prop) ? tweenTypes.TRANSFORM :
    // CSS variables
    stringStartsWith(prop, '--') ? tweenTypes.CSS_VAR :
    // All other CSS properties
    prop in /** @type {Types.DOMTarget} */(target).style ? tweenTypes.CSS :
    // Handle DOM Attributes
    !isNil(target.getAttribute(prop)) ? tweenTypes.ATTRIBUTE :
    !isUnd(target[prop]) ? tweenTypes.OBJECT : tweenTypes.INVALID;
    if (type === tweenTypes.INVALID) console.warn(`Can't find property '${prop}' on target '${target}'.`);
  return type;
};

/**
 * @param  {Types.DOMTarget} target
 * @param  {String} propName
 * @param  {Object} animationInlineStyles
 * @return {String}
 */
const getCSSValue = (target, propName, animationInlineStyles) => {
  const inlineStyles = target.style[propName];
  if (inlineStyles && animationInlineStyles) {
    animationInlineStyles[propName] = inlineStyles;
  }
  const value = inlineStyles || getComputedStyle(target).getPropertyValue(propName);
  return value === 'auto' ? '0' : value;
};

/**
 * @param {Types.Target} target
 * @param {String} propName
 * @param {tweenTypes} [tweenType]
 * @param {Object|void} [animationInlineStyles]
 * @return {String|Number}
 */
const getOriginalAnimatableValue = (target, propName, tweenType, animationInlineStyles) => {
  const type = !isUnd(tweenType) ? tweenType : getTweenType(target, propName);
  return type === tweenTypes.OBJECT ? target[propName] || 0 :
         type === tweenTypes.ATTRIBUTE ? target.getAttribute(propName) :
         type === tweenTypes.TRANSFORM ? parseInlineTransforms(/** @type {Types.DOMTarget} */(target), propName, animationInlineStyles) :
         type === tweenTypes.CSS_VAR ? getCSSValue(/** @type {Types.DOMTarget} */(target), propName, animationInlineStyles).trimStart() :
         getCSSValue(/** @type {Types.DOMTarget} */(target), propName, animationInlineStyles);
};

/**
 * @param  {Number} x
 * @param  {Number} y
 * @param  {String} operator
 * @return {Number}
 */
const getRelativeValue = (x, y, operator) => {
  return operator === '-' ? x - y :
         operator === '+' ? x + y :
         x * y;
};

/** @return {Types.Tween.Value} */
const createDecomposedValueTargetObject = () => {
  return {
    t: valueTypes.NUMBER,
    n: 0,
    u: null,
    o: null,
    d: null,
    s: null,
    p: null,
  }
};

/**
 * @param  {String|Number|Types.MotionPath} rawValue
 * @param  {Types.Tween.Value} targetObject
 * @return {Types.Tween.Value}
 */
const decomposeRawValue = (rawValue, targetObject) => {
  targetObject.t = valueTypes.NUMBER;
  targetObject.n = 0;
  targetObject.u = null;
  targetObject.o = null;
  targetObject.d = null;
  targetObject.s = null;
  targetObject.p = null;
  if (!rawValue) return targetObject;
  let val = rawValue;
  const numberedVal = +val;
  // It's a number
  if (!isNaN(numberedVal)) {
    targetObject.n = numberedVal;
    return targetObject;
  // It's a motion path
  } else if (!isUnd(/** @type {Types.MotionPath} */(rawValue).inSvg)) {
    targetObject.t = valueTypes.PATH;
    targetObject.n = /** @type {Types.MotionPath} */(rawValue).n;
    targetObject.u = emptyString;
    targetObject.p = /** @type {Types.MotionPath} */(rawValue);
    return targetObject;
  } else {
    // NOTE: Test if it's possible to use string starts with instead?
    const matchedRelativeOperator = relativeValuesExecRgx.exec(/** @type {String} */(val));
    if (matchedRelativeOperator) {
      val = /** @type {String} */(val).slice(2);
      targetObject.o = matchedRelativeOperator[0][0];
    }
    const unitMatch = unitsExecRgx.exec(/** @type {String} */(val));
    // Has a number and a unit
    if (unitMatch) {
      targetObject.t = valueTypes.UNIT;
      targetObject.n = +unitMatch[1];
      targetObject.u = unitMatch[2];
      return targetObject;
    // Has an operator like +=, -=, *=
    } else if (targetObject.o) {
      targetObject.n = +val;
      return targetObject;
    // Is a color
    } else if (isCol(val)) {
      targetObject.t = valueTypes.COLOR;
      targetObject.d = convertColorStringValuesToRgbaArray(/** @type {String} */(val));
      return targetObject;
    // Is a more complex string
    } else {
      const stringifiedVal = val + emptyString;
      const matchedNumbers = stringifiedVal.match(digitWithExponentRgx);
      targetObject.t = valueTypes.COMPLEX;
      targetObject.d = matchedNumbers ? matchedNumbers.map(Number) : [];
      targetObject.s = stringifiedVal.split(digitWithExponentRgx) || [];
      return targetObject;
    }
  }
};

/**
 * @param  {Types.Tween} tween
 * @param  {Types.Tween.Value} targetObject
 * @return {Types.Tween.Value}
 */
const decomposeTweenValue = (tween, targetObject) => {
  targetObject.t = tween._valueType;
  targetObject.n = tween._toNumber;
  targetObject.u = tween._unit;
  targetObject.o = null;
  targetObject.d = cloneArray(tween._toNumbers);
  targetObject.s = cloneArray(tween._strings);
  targetObject.p = tween._path;
  return targetObject;
};

const decomposedOriginalValue = createDecomposedValueTargetObject();

const lookups = {
  /** @type {Types.Tween.ReplaceLookups} */
  _rep: new WeakMap(),
  /** @type {Types.Tween.AdditiveLookups} */
  _add: new Map(),
};

/**
 * @param  {Types.Target} target
 * @param  {String} property
 * @param  {String} lookup
 * @return {Types.Tween.PropertySiblings}
 */
const getTweenSiblings = (target, property, lookup = '_rep') => {
  const lookupMap = lookups[lookup];
  let targetLookup = lookupMap.get(target);
  if (!targetLookup) {
    targetLookup = {};
    lookupMap.set(target, targetLookup);
  }
  return targetLookup[property] ? targetLookup[property] : targetLookup[property] = {
    _head: null,
    _tail: null,
  }
};

/**
 * @param  {Types.Tween} p
 * @param  {Types.Tween} c
 * @return {Number|Boolean}
 */
const addTweenSortMethod = (p, c) => p._isOverridden || p._absoluteStartTime > c._absoluteStartTime;

/**
 * @param {Types.Tween} tween
 */
const overrideTween = tween => {
  tween._isOverlapped = 1;
  tween._isOverridden = 1;
  tween._changeDuration = minValue;
  tween._currentTime = minValue;
};

/**
 * @param  {Types.Tween} tween
 * @param  {Types.Tween.PropertySiblings} siblings
 * @return {Types.Tween}
 */
const composeTween = (tween, siblings) => {

  const tweenCompositionType = tween._composition;

  // Handle replaced tweens

  if (tweenCompositionType === compositionTypes.replace) {

    const tweenAbsStartTime = tween._absoluteStartTime;

    addChild(siblings, tween, addTweenSortMethod, '_prevRep', '_nextRep');

    const prevSibling = tween._prevRep;

    // Update the previous siblings for composition replace tweens

    if (prevSibling) {

      const prevParent = prevSibling.parent;

      // Handle looped animations tween

      if (
        // Check if the previous tween is from a different animation
        tween.parent.id !== prevParent.id &&
        // Check if the animation has loops
        prevParent._iterationCount > 1 &&
        // Check if _absoluteChangeEndTime of last loop overlaps the current tween
        prevSibling._absoluteChangeEndTime + (prevParent.duration - prevParent._iterationDuration) > tweenAbsStartTime
      ) {

        // TODO: Find a way to only override the iterations overlapping with the tween
        overrideTween(prevSibling);

        let prevPrevSibling = prevSibling._prevRep;

        // If the tween was part of a set of keyframes, override its siblings
        while (prevPrevSibling && prevPrevSibling.parent.id === prevParent.id) {
          overrideTween(prevPrevSibling);
          prevPrevSibling = prevPrevSibling._prevRep;
        }

      }

      if (prevSibling._absoluteChangeEndTime > tweenAbsStartTime) {

        const prevChangeStartTime = prevSibling._changeStartTime;
        const prevTLOffset = prevSibling._absoluteChangeEndTime - (prevChangeStartTime + prevSibling._updateDuration);

        prevSibling._absoluteChangeEndTime = tweenAbsStartTime;
        prevSibling._changeDuration = tweenAbsStartTime - prevTLOffset - prevChangeStartTime;
        prevSibling._currentTime = prevSibling._changeDuration;
        prevSibling._isOverlapped = 1;

        if (prevSibling._changeDuration < minValue) {
          overrideTween(prevSibling);
        }
      }

      // Pause (and cancel) the parent if it only contains overriden tweens

      let parentActiveTweens = 0;

      forEachChildren(prevParent, (/** @type Types.Tween */t) => {
        parentActiveTweens -= t._isOverridden - 1;
      });

      if (parentActiveTweens === 0) {
        // Calling .cancel() on a TL child might alter the other children render order
        // So instead, we mark it as completed + .pause()
        // This way we let the engine taking care of removing it safely
        prevParent.completed = true;
        prevParent.pause();
      }

    }

    let nextSibling = tween._nextRep;

    // All the next siblings are automatically overridden

    if (nextSibling && nextSibling._absoluteStartTime >= tweenAbsStartTime) {
      while (nextSibling) {
        overrideTween(nextSibling);
        nextSibling = nextSibling._nextRep;
      }
    }

  // Handle additive tweens composition

  } else if (tweenCompositionType === compositionTypes.blend) {

    const additiveTweenSiblings = getTweenSiblings(tween.target, tween.property, '_add');
    const additiveAnimation = addAdditiveAnimation(lookups._add);

    let lookupTween = additiveTweenSiblings._head;

    if (!lookupTween) {
      lookupTween = { ...tween };
      lookupTween._composition = compositionTypes.replace;
      lookupTween._updateDuration = minValue;
      lookupTween._changeStartTime = 0;
      lookupTween._numbers = cloneArray(tween._fromNumbers);
      lookupTween._number = 0;
      lookupTween._next = null;
      lookupTween._prev = null;
      addChild(additiveTweenSiblings, lookupTween);
      addChild(additiveAnimation, lookupTween);
    }

    // Convert the values of TO to FROM and set TO to 0

    const toNumber = tween._toNumber;
    tween._fromNumber = lookupTween._fromNumber - toNumber;
    tween._toNumber = 0;
    tween._numbers = cloneArray(tween._fromNumbers);
    tween._number = 0;
    lookupTween._fromNumber = toNumber;

    if (tween._toNumbers) {
      const toNumbers = cloneArray(tween._toNumbers);
      if (toNumbers) {
        toNumbers.forEach((value, i) => {
          tween._fromNumbers[i] = lookupTween._fromNumbers[i] - value;
          tween._toNumbers[i] = 0;
        });
      }
      lookupTween._fromNumbers = toNumbers;
    }

    addChild(additiveTweenSiblings, tween, null, '_prevAdd', '_nextAdd');

  }

  return tween;

};

/**
 * @param  {Types.Tween} tween
 * @return {Types.Tween}
 */
const removeTweenSliblings = tween => {
  const tweenComposition = tween._composition;
  if (tweenComposition !== compositionTypes.none) {
    const tweenTarget = tween.target;
    const tweenProperty = tween.property;
    const tweenSiblings = getTweenSiblings(tweenTarget, tweenProperty);
    removeChild(tweenSiblings, tween, '_prevRep', '_nextRep');
    if (tweenComposition === compositionTypes.blend) {
      const additiveTweenSliblings = getTweenSiblings(tweenTarget, tweenProperty, '_add');
      removeChild(additiveTweenSliblings, tween, '_prevAdd', '_nextAdd');
    }
  }
  return tween;
};

/**
 * @param  {Timer} timer
 * @return {Timer}
 */
const resetTimerProperties = timer => {
  timer.paused = true;
  timer.began = false;
  timer.completed = false;
  return timer;
};

/**
 * @param  {Timer} timer
 * @return {Timer}
 */
const reviveTimer = timer => {
  if (!timer._cancelled) return timer;
  if (timer._hasChildren) {
    forEachChildren(timer, reviveTimer);
  } else {
    forEachChildren(timer, (/** @type {Types.Tween} tween*/tween) => {
      if (tween._composition !== compositionTypes.none) {
        composeTween(tween, getTweenSiblings(tween.target, tween.property));
      }
    });
  }
  timer._cancelled = 0;
  return timer;
};

let timerId = 0;

/**
 * Base class used to create Timers, Animations and Timelines
 */
class Timer extends Clock {
  /**
   * @param {Types.TimerParams} [parameters]
   * @param {Types.Timeline} [parent]
   */
  constructor(parameters = {}, parent) {

    super();

    const {
      id,
      beginDelay,
      duration,
      reversed,
      alternate,
      loop,
      autoplay,
      frameRate,
      playbackRate,
      onComplete,
      onLoop,
      onRender,
      onBegin,
      onUpdate,
    } = parameters;

    const timerDefaults = parent ? parent.defaults : defaults;
    // TODO: Should timers duration inherit parent defaults in timeline?
    // const timerDuration = setValue(duration, parent ? timerDefaults.duration : Infinity);
    const timerDuration = setValue(duration, Infinity);
    const timerLoop = setValue(loop, timerDefaults.loop);
    const timerBeginDelay = setValue(beginDelay, timerDefaults.beginDelay);
    const iterationCount = timerLoop === true || timerLoop === Infinity || /** @type {Number} */(timerLoop) < 0 ? Infinity : /** @type {Number} */(timerLoop) + 1;
    const initTime = parent ? 0 : engine._elapsedTime;
    const startDelay = parent ? 0 : timerBeginDelay;

    // Timer's parameters
    this.id = !isUnd(id) ? id : duration === minValue ? 0 : ++timerId;
    // Total duration of the timer
    this.duration = clampInfinity(timerDuration * iterationCount);
    // this.currentTime = 0;
    // The curent time relative to the timer total duration [0 to timer duration]
    this.currentTime = -startDelay;
    this.paused = true;
    this.began = false;
    this.completed = false;
    this.onBegin = onBegin || timerDefaults.onBegin;
    this.onUpdate = onUpdate || timerDefaults.onUpdate;
    this.onRender = onRender || timerDefaults.onRender;
    this.onLoop = onLoop || timerDefaults.onLoop;
    this.onComplete = onComplete || timerDefaults.onComplete;
    /** @type {Boolean} */
    this._hasChildren = false;
    /** @type {Boolean} */
    this._running = false;
    /** @type {Boolean} */
    this._autoplay = setValue(autoplay, timerDefaults.autoplay);
    /** @type {Number} */
    this._cancelled = 0;
    /** @type {Number} */
    this._reversed = +setValue(reversed, timerDefaults.reversed);
    /** @type {Boolean} */
    this._alternate = setValue(alternate, timerDefaults.alternate);
    /** @type {Boolean} */
    this._backwards = false;
    // TODO: Rename to this._position or this._offsetTime since its not always related to a TL
    /** @type {Number} */
    this._offset = timerBeginDelay + (parent ? 0 : engine._elapsedTime - engine._startTime);
    /** @type {Number} */
    this._beginDelay = startDelay;
    /** @type {Number} */
    this._iterationTime = 0;
    /** @type {Number} */
    this._iterationDuration = timerDuration; // Duration of one loop
    /** @type {Number} */
    this._iterationChangeStartTime = 0;
    /** @type {Number} */
    this._iterationChangeEndTime = timerDuration;
    /** @type {Number} */
    this._iterationCount = iterationCount; // Number of loops
    /** @type {Number} */
    this._currentIteration = 0; // Current loop index
    /** @type {Function} */
    this._resolve = noop; // Used by utils.promisify
    /** @type {Types.Renderable} */
    this._prev = null;
    /** @type {Types.Renderable} */
    this._next = null;

    // Clock's parameters
    this._elapsedTime = initTime;
    this._startTime = initTime;
    this._lastTime = initTime;
    /** @type {Number} */
    this._fps = setValue(frameRate, timerDefaults.frameRate);
    /** @type {Number} */
    this._speed = setValue(playbackRate, timerDefaults.playbackRate);
  }

  /**
   * @param  {Number} internalRender
   * @return {this}
   */
  reset(internalRender = 0) {
    // If cancelled, revive the timer before rendering in order to have propertly composed tweens siblings
    reviveTimer(this);
    // Render timer before changing completed parameters to prevent skips and to make sure the properties are not overridden
    // Setting the iterationTime at the end to force the rendering to happend backwards
    // Otherwise calling .reset() on Timelines might not render children in the right order
    // NOTE: This is only required for Timelines and might be better to move to the Timeline class?
    this._iterationTime = this._iterationDuration;
    // Set tickMode to tickModes.FORCE to force rendering
    render(this, 0, 1, internalRender, tickModes.FORCE);
    // Reset timer properties after revive / render to make sure the props are not updated again
    resetTimerProperties(this);
    // Also reset children properties
    if (this._hasChildren) {
      forEachChildren(this, resetTimerProperties);
    }
    return this;
  }

  /**
   * @param  {Number} internalRender
   * @return {this}
   */
  init(internalRender = 0) {
    this.frameRate = this._fps;
    this.playbackRate = this._speed;
    // Manually calling .init() on timelines should render all children intial state
    // Foring a render at the end of the timeline, forces all children to render once then render to 0 when reseted
    if (!internalRender && this._hasChildren) {
      render(this, this.duration, 1, internalRender, tickModes.FORCE);
    }
    this.reset(internalRender);
    // Make sure to set autoplay to false on tl.add()
    if (this._autoplay) {
      this.play();
    }
    return this;
  }

  /**
   * @return {this}
   */
  resetTime() {
    const timeScale = 1 / (this._speed * engine._speed);
    // const currentInternalTime = this._internalTime + this._beginDelay;
    // Offset by 12 ms to reduce the lag between the initialization and the rendering of the first frame
    this._startTime = (this.currentTime + this._beginDelay) * timeScale - now() + 12;
    return this;
  }

  /**
   * @return {this}
   */
  pause() {
    if (this.paused) return this;
    this.paused = true;
    return this;
  }

  /**
   * @return {this}
   */
  play() {
    if (!this.paused) return this;
    if (this.completed || this._cancelled) this.reset(0);
    this.paused = false;
    if (this.duration <= minValue) {
      // timer, time = 1, muteCallbacks = 0, internalRendering = 0, tickMode = 0
      render(this, 1, 0, 0, tickModes.FORCE);
    } else {
      if (!this._running) {
        addChild(engine, this);
        engine._hasChildren = true;
        this._running = true;
      }
      this.resetTime();
      engine.start();
    }
    return this;
  }

  /**
   * @return {this}
   */
  restart() {
    return this.reset(0).play();
  }

  /**
   * @param  {Number} time
   * @param  {Boolean|Number} [muteCallbacks]
   * @return {this}
   */
  seek(time, muteCallbacks) {
    // Recompose the tween siblings in case the timer has been cancelled
    reviveTimer(this);
    // If you seek a completed animation, otherwise the next play will starts at 0
    this.completed = false;
    const isPaused = this.paused;
    this.paused = true;
    // timer, time, muteCallbacks, internalRendering, tickMode
    render(this, time, ~~muteCallbacks, 0, tickModes.AUTO);
    return isPaused ? this : this.play();
  }

  /**
   * @return {this}
   */
  reverse() {
    const reversed = this._reversed;
    this._reversed = +(this._alternate && !(this._iterationCount % 2) ? reversed : !reversed);
    this.seek(this.duration - this.currentTime);
    this.resetTime();
    return this;
  }

  // TODO: Move all the animation / tweens / children related code to Animation / Timeline

  /**
   * @return {this}
   */
  cancel() {
    if (this._hasChildren) {
      forEachChildren(this, (/** @type {Timer} */child) => child.cancel(), true);
    } else {
      forEachChildren(this, removeTweenSliblings);
    }
    this._cancelled = 1;
    // Pausing the timer removes it from the global timeline
    return this.pause();
  }

  /**
   * @param  {Number} newDuration
   * @return {this}
   */
  stretch(newDuration) {
    const currentDuration = this.duration;
    if (currentDuration === newDuration) return this;
    const timeScale = newDuration / currentDuration;
    this.duration = clampZero(clampInfinity(currentDuration * timeScale));
    this._iterationDuration = clampZero(clampInfinity(this._iterationDuration * timeScale));
    this._offset *= timeScale;
    this._beginDelay *= timeScale;
    this._iterationChangeStartTime *= timeScale;
    this._iterationChangeEndTime *= timeScale;
    return this;
  }

  get progress() {
    return round(this.currentTime / this.duration, 3);
  }

  set progress(progress) {
    const paused = this.paused;
    this.pause().seek(this.duration * +progress);
    if (!paused) this.play();
  }

  // get currentTime() {
  //   return this._time;
  // }

  // set currentTime(time) {
  //   this.seek(+time);
  // }

  get playbackRate() {
    return super.playbackRate;
  }

  set playbackRate(playbackRate) {
    super.playbackRate = playbackRate;
    this.resetTime();
  }

}

/** @type {Types.EasingFunction} */
const none = t => t;

// Cubic Bezier solver adapted from https://github.com/gre/bezier-ease
// © Gaëtan Renaudeau

/**
 * @param  {Number} aT
 * @param  {Number} aA1
 * @param  {Number} aA2
 * @return {Number}
 */
const calcBezier = (aT, aA1, aA2) => (((1 - 3 * aA2 + 3 * aA1) * aT + (3 * aA2 - 6 * aA1)) * aT + (3 * aA1)) * aT;

/**
 * @param  {Number} aX
 * @param  {Number} mX1
 * @param  {Number} mX2
 * @return {Number}
 */
const binarySubdivide = (aX, mX1, mX2) => {
  let aA = 0, aB = 1, currentX, currentT, i = 0;
  do {
    currentT = aA + (aB - aA) / 2;
    currentX = calcBezier(currentT, mX1, mX2) - aX;
    if (currentX > 0) {
      aB = currentT;
    } else {
      aA = currentT;
    }
  } while (abs(currentX) > .0000001 && ++i < 10);
  return currentT;
};

/**
 * @param  {Number} mX1
 * @param  {Number} mY1
 * @param  {Number} mX2
 * @param  {Number} mY2
 * @return {Types.EasingFunction}
 */
const cubicBezier = (mX1, mY1, mX2, mY2) => (mX1 === mY1 && mX2 === mY2) ? none :
  t => t === 0 || t === 1 ? t :
  calcBezier(binarySubdivide(t, mX1, mX2), mY1, mY2);

/**
 * Steps ease implementation https://developer.mozilla.org/fr/docs/Web/CSS/transition-timing-function
 * Only covers 'end' and 'start' jumpterms
 * @param  {Number} steps
 * @param  {Boolean} [fromStart]
 * @return {Types.EasingFunction}
 */
const steps = (steps = 10, fromStart) => {
  const roundMethod = fromStart ? ceil : floor;
  return t => roundMethod(clamp(t, 0, 1) * steps) * (1 / steps);
};

// Robert Penner's ease functions adapted from http://www.robertpenner.com/ease

/**
 * @callback PowerEasing
 * @param {Number} [power=1.675]
 * @return {Types.EasingFunction}
 */

/**
 * @callback BackEasing
 * @param {Number} [overshoot=1.70158]
 * @return {Types.EasingFunction}
 */

/**
 * @callback ElasticEasing
 * @param {Number} [amplitude=1]
 * @param {Number} [period=.3]
 * @return {Types.EasingFunction}
 */

/**
 * @callback EaseFactory
 * @param {Number} [paramA]
 * @param {Number} [paramB]
 * @return {Types.EasingFunction|Number}
 */

/** @typedef {PowerEasing|BackEasing|ElasticEasing} EasesFactory */

const halfPI = PI / 2;
const doublePI = PI * 2;
/** @type {PowerEasing} */
const easeInPower = (p = 1.675) => t => pow(t, +p);

/** @type {Record<String, EasesFactory|Types.EasingFunction>} */
const easeInFunctions = {
  [emptyString]: easeInPower,
  Quad: easeInPower(2),
  Cubic: easeInPower(3),
  Quart: easeInPower(4),
  Quint: easeInPower(5),
  /** @type {Types.EasingFunction} */
  Sine: t => 1 - cos(t * halfPI),
  /** @type {Types.EasingFunction} */
  Circ: t => 1 - sqrt(1 - t * t),
  /** @type {Types.EasingFunction} */
  Expo: t => t ? pow(2, 10 * t - 10) : 0,
  /** @type {Types.EasingFunction} */
  Bounce: t => {
    let pow2, b = 4;
    while (t < ((pow2 = pow(2, --b)) - 1) / 11);
    return 1 / pow(4, 3 - b) - 7.5625 * pow((pow2 * 3 - 2) / 22 - t, 2);
  },
  /** @type {BackEasing} */
  Back: (overshoot = 1.70158) => t => (+overshoot + 1) * t * t * t - +overshoot * t * t,
  /** @type {ElasticEasing} */
  Elastic: (amplitude = 1, period = .3) => {
    const a = clamp(+amplitude, 1, 10);
    const p = clamp(+period, minValue, 2);
    const s = (p / doublePI) * asin(1 / a);
    const e = doublePI / p;
    return t => t === 0 || t === 1 ? t : -a * pow(2, -10 * (1 - t)) * sin(((1 - t) - s) * e);
  }
};

/**
 * @callback EaseType
 * @param {Types.EasingFunction} Ease
 * @return {Types.EasingFunction}
 */

/** @type {Record<String, EaseType>} */
const easeTypes = {
  in: easeIn => t => easeIn(t),
  out: easeIn => t => 1 - easeIn(1 - t),
  inOut: easeIn => t => t < .5 ? easeIn(t * 2) / 2 : 1 - easeIn(t * -2 + 2) / 2,
  outIn: easeIn => t => t < .5 ? (1 - easeIn(1 - t * 2)) / 2 : (easeIn(t * 2 - 1) + 1) / 2,
};

/**
 * Without parameters, the linear function creates a non-eased transition.
 * Parameters, if used, creates a piecewise linear easing by interpolating linearly between the specified points.
 * @param  {...String|Number} [args] - Points
 * @return {Types.EasingFunction}
 */
const linear = (...args) => {
  const argsLength = args.length;
  if (!argsLength) return none;
  const totalPoints = argsLength - 1;
  const firstArg = args[0];
  const lastArg = args[totalPoints];
  const xPoints = [0];
  const yPoints = [parseNumber(firstArg)];
  for (let i = 1; i < totalPoints; i++) {
    const arg = args[i];
    const splitValue = isStr(arg) ?
    /** @type {String} */(arg).trim().split(' ') :
    [arg];
    const value = splitValue[0];
    const percent = splitValue[1];
    xPoints.push(!isUnd(percent) ? parseNumber(percent) / 100 : i / totalPoints);
    yPoints.push(parseNumber(value));
  }
  yPoints.push(parseNumber(lastArg));
  xPoints.push(1);
  return function easeLinear(t) {
    for (let i = 1, l = xPoints.length; i < l; i++) {
      const currentX = xPoints[i];
      if (t <= currentX) {
        const prevX = xPoints[i - 1];
        const prevY = yPoints[i - 1];
        return prevY + (yPoints[i] - prevY) * (t - prevX) / (currentX - prevX);
      }
    }
    return yPoints[yPoints.length - 1];
  }
};

/**
 * Generate random steps
 * @param  {Number} [length] - The number of steps
 * @param  {Number} [randomness] - How strong the randomness is
 * @return {Types.EasingFunction}
 */
const irregular = (length = 10, randomness = 1) => {
  const values = [0];
  const total = length - 1;
  for (let i = 1; i < total; i++) {
    const previousValue = values[i - 1];
    const spacing = i / total;
    const segmentEnd = (i + 1) / total;
    const randomVariation = spacing + (segmentEnd - spacing) * Math.random();
    // Mix the even spacing and random variation based on the randomness parameter
    const randomValue = spacing * (1 - randomness) + randomVariation * randomness;
    values.push(clamp(randomValue, previousValue, 1));
  }
  values.push(1);
  return linear(...values);
};

/**
 * @typedef  {Object} EasesFunctions
 * @property {typeof linear} [linear]
 * @property {typeof irregular} [irregular]
 * @property {typeof steps} [steps]
 * @property {typeof cubicBezier} [cubicBezier]
 * @property {PowerEasing} [in]
 * @property {PowerEasing} [out]
 * @property {PowerEasing} [inOut]
 * @property {PowerEasing} [outIn]
 * @property {Types.EasingFunction} [inQuad]
 * @property {Types.EasingFunction} [outQuad]
 * @property {Types.EasingFunction} [inOutQuad]
 * @property {Types.EasingFunction} [outInQuad]
 * @property {Types.EasingFunction} [inCubic]
 * @property {Types.EasingFunction} [outCubic]
 * @property {Types.EasingFunction} [inOutCubic]
 * @property {Types.EasingFunction} [outInCubic]
 * @property {Types.EasingFunction} [inQuart]
 * @property {Types.EasingFunction} [outQuart]
 * @property {Types.EasingFunction} [inOutQuart]
 * @property {Types.EasingFunction} [outInQuart]
 * @property {Types.EasingFunction} [inQuint]
 * @property {Types.EasingFunction} [outQuint]
 * @property {Types.EasingFunction} [inOutQuint]
 * @property {Types.EasingFunction} [outInQuint]
 * @property {Types.EasingFunction} [inSine]
 * @property {Types.EasingFunction} [outSine]
 * @property {Types.EasingFunction} [inOutSine]
 * @property {Types.EasingFunction} [outInSine]
 * @property {Types.EasingFunction} [inCirc]
 * @property {Types.EasingFunction} [outCirc]
 * @property {Types.EasingFunction} [inOutCirc]
 * @property {Types.EasingFunction} [outInCirc]
 * @property {Types.EasingFunction} [inExpo]
 * @property {Types.EasingFunction} [outExpo]
 * @property {Types.EasingFunction} [inOutExpo]
 * @property {Types.EasingFunction} [outInExpo]
 * @property {Types.EasingFunction} [inBounce]
 * @property {Types.EasingFunction} [outBounce]
 * @property {Types.EasingFunction} [inOutBounce]
 * @property {Types.EasingFunction} [outInBounce]
 * @property {BackEasing} [inBack]
 * @property {BackEasing} [outBack]
 * @property {BackEasing} [inOutBack]
 * @property {BackEasing} [outInBack]
 * @property {ElasticEasing} [inElastic]
 * @property {ElasticEasing} [outElastic]
 * @property {ElasticEasing} [inOutElastic]
 * @property {ElasticEasing} [outInElastic]
 */

/** @type {EasesFunctions} */
const eases = { linear, irregular, steps, cubicBezier };
const easesLookups = { linear: none };

for (let type in easeTypes) {
  for (let name in easeInFunctions) {
    const easeIn = easeInFunctions[name];
    const easeType = easeTypes[type];
    const hasParams = name === emptyString || name === 'Back' || name === 'Elastic';
    /** @type {EasesFactory|Types.EasingFunction} */
    const easeFactory = hasParams ?
      (a, b) => easeType(/** @type {EasesFactory} */(easeIn)(a, b)) :
      easeType(/** @type {Types.EasingFunction} */(easeIn));
    const easeName = type + name;
    eases[easeName] = easeFactory;
    // Apply default parameters for built-in eases so they can be called without '()'
    /** @type {EaseFactory} */
    easesLookups[easeName] = hasParams ? /** @type {EasesFactory} */(easeFactory)() : easeFactory;
  }
}

/**
 * @param  {String} string
 * @return {Types.EasingFunction}
 */
const parseEaseString = string => {
  if (string.indexOf('(') <= -1) return none;
  const split = string.slice(0, -1).split('(');
  const parsedFn = eases[split[0]];
  const result = parsedFn ? easesLookups[string] = parsedFn(...split[1].split(',')) : none;
  return result;
};

/**
 * @param  {Types.EasingParam} ease
 * @return {Types.EasingFunction}
 */
const parseEasings = ease => isFnc(ease) ? ease :
  isStr(ease) ? easesLookups[ease] ? easesLookups[ease] :
  parseEaseString(/** @type {String} */(ease)) : none;

const propertyNamesCache = {};

/**
 * @param  {String} propertyName
 * @param  {Types.Target} target
 * @param  {tweenTypes} tweenType
 * @return {String}
 */
const sanitizePropertyName = (propertyName, target, tweenType) => {
  if (tweenType === tweenTypes.TRANSFORM) {
    const t = shortTransforms.get(propertyName);
    return t ? t : propertyName;
  } else if (
    tweenType === tweenTypes.CSS ||
    // Handle special cases where properties like "strokeDashoffset" needs to be set as "stroke-dashoffset"
    // but properties like "baseFrequency" should stay in lowerCamelCase
    (tweenType === tweenTypes.ATTRIBUTE && (isSvg(target) && propertyName in target.style))
  ) {
    const cachedPropertyName = propertyNamesCache[propertyName];
    if (cachedPropertyName) {
      return cachedPropertyName;
    } else {
      const lowerCaseName = toLowerCase(propertyName);
      propertyNamesCache[propertyName] = lowerCaseName;
      return lowerCaseName;
    }
  } else {
    return propertyName;
  }
};

const angleUnitsMap = { 'deg': 1, 'rad': 180 / PI, 'turn': 360 };
/**
 * @param  {HTMLElement} el
 * @return {Number}
 */
const getOffsetWidth = el => (el.offsetWidth || 0) / 100;
const convertedValuesCache = {};

/**
 * @param  {Types.Target} el
 * @param  {Types.Tween.Value} decomposedValue
 * @param  {String} unit
 * @return {Types.Tween.Value}
 */
const convertValueUnit = (el, decomposedValue, unit) => {
  const valueUnit = decomposedValue.u;
  const valueNumber = decomposedValue.n;
  if (decomposedValue.t === valueTypes.UNIT && valueUnit === unit) { // TODO: Check if checking against the same unit string is necessary
    return decomposedValue;
  }
  const cachedKey = valueNumber + valueUnit + unit;
  const cached = convertedValuesCache[cachedKey];
  if (!isUnd(cached)) {
    decomposedValue.n = cached;
  } else {
    let convertedValue;
    if (valueUnit in angleUnitsMap) {
      convertedValue = valueNumber * angleUnitsMap[valueUnit] / angleUnitsMap[unit];
    } else {
      const baseline = 100;
      /** @type {HTMLElement} */
      const tempEl = doc.createElement(el.tagName);
      const tempStyle = tempEl.style;
      const parentNode = el.parentNode;
      const parentEl = (parentNode && (parentNode !== doc)) ? parentNode : doc.body;
      parentEl.appendChild(tempEl);
      tempStyle.position = 'absolute';
      tempStyle.width = baseline + valueUnit;
      const currentUnitWidth = getOffsetWidth(tempEl);
      tempStyle.width = baseline + unit;
      const newUnitWidth = getOffsetWidth(tempEl);
      const factor = currentUnitWidth / newUnitWidth;
      parentEl.removeChild(tempEl);
      convertedValue = factor * valueNumber;
    }
    decomposedValue.n = convertedValue;
    convertedValuesCache[cachedKey] = convertedValue;
  }
  decomposedValue.t === valueTypes.UNIT;
  decomposedValue.u = unit;
  return decomposedValue;
};

/**
 * @param  {Animation|Types.Timeline} parent
 * @return {Animation|Types.Timeline}
 */
const cleanInlineStyles = parent => {
  // Allow cleanInlineStyles() to be called on timelines
  if (parent._hasChildren) {
    forEachChildren(parent, cleanInlineStyles, true);
  } else {
    const animation = /** @type {Animation} */(parent);
    animation.pause();
    forEachChildren(animation, (/** @type {Types.Tween} */tween) => {
      const tweenProperty = tween.property;
      const tweenTarget = tween.target;
      if (tweenTarget[isDomSymbol]) {
        const targetStyle = /** @type {Types.DOMTarget} */(tweenTarget).style;
        const originalInlinedValue = animation._inlineStyles[tweenProperty];
        if (tween._tweenType === tweenTypes.TRANSFORM) {
          const cachedTransforms = tweenTarget[transformsSymbol];
          if (isUnd(originalInlinedValue) || originalInlinedValue === emptyString) {
            delete cachedTransforms[tweenProperty];
          } else {
            cachedTransforms[tweenProperty] = originalInlinedValue;
          }
          if (tween._renderTransforms) {
            if (!Object.keys(cachedTransforms).length) {
              targetStyle.removeProperty('transform');
            } else {
              let str = emptyString;
              for (let key in cachedTransforms) {
                str += transformsFragmentStrings[key] + cachedTransforms[key] + ') ';
              }
              targetStyle.transform = str;
            }
          }
        } else {
          if (isUnd(originalInlinedValue) || originalInlinedValue === emptyString) {
            targetStyle.removeProperty(tweenProperty);
          } else {
            targetStyle[tweenProperty] = originalInlinedValue;
          }
        }
        if (animation._tail === tween) {
          animation.targets.forEach((/** @type {Types.Target} */t) => {
            if (t.getAttribute('style') === emptyString) t.removeAttribute('style');
          });
        }
      }
    });
  }
  return parent;
};

// Defines decomposed values target objects only once and mutate their properties later to avoid GC
// TODO: Maybe move the objects creation to values.js and use the decompose function to create the base object
const fromTargetObject = createDecomposedValueTargetObject();
const toTargetObject = createDecomposedValueTargetObject();
const keyframesTargetArray = [null];
const fastSetValuesArray = [null, null];
const keyObjectTarget = { to: null };

let tweenId = 0;
let keyframes;
let key;

/**
 * @param {Types.KeyframesArray} keyframes
 * @return {Types.AnimationParams}
 */
const flattenKeyframesArray = keyframes => {
  const properties = {};
  const propertyNames = [].concat(...keyframes.map(key => Object.keys(key))).filter(isKey);
  for (let i = 0, l = propertyNames.length; i < l; i++) {
    const propName = propertyNames[i];
    properties[propName] = keyframes.map(key => {
      const newKey = {};
      for (let p in key) {
        if (isKey(p)) {
          if (p === propName) {
            newKey.to = key[p];
          }
        } else {
          newKey[p] = key[p];
        }
      }
      return newKey;
    });
  }
  return properties;
};

class Animation extends Timer {
  /**
   * @param {Types.TargetsParam} targets
   * @param {Types.TimerParams|Types.AnimationParams} parameters
   * @param {Types.Timeline} [parent]
   * @param {boolean} [fastSet]
   */
  constructor(targets, parameters, parent, fastSet) {

    super(/** @type {Types.TimerParams} */(parameters), parent);

    /** @type {Types.Tween} */
    this._head = null;
    /** @type {Types.Tween} */
    this._tail = null;

    // if (targets._isLayout) return targets(params); // API mockup for layout animation

    const parsedTargets = registerTargets(targets);

    // If the parameters object contains a "keyframes" property, convert all the keyframes values to regular properties

    const kParams = /** @type {Types.AnimationParams} */(parameters).keyframes;
    /** @type {Types.AnimationParams} */
    const params = kParams ? mergeObjects(flattenKeyframesArray(kParams), parameters) : parameters;

    const { delay, duration, endDelay, ease, modifier, composition } = params;

    const animDefaults = parent ? parent.defaults : defaults;
    const hasSpringEasing = !isUnd(ease) && isObj(ease);
    const tEasing = hasSpringEasing ? /** @type {Types.SpringEasing} */(ease).solver : setValue(ease, animDefaults.ease);
    const tDuration = hasSpringEasing ? /** @type {Types.SpringEasing} */(ease).duration : setValue(duration, animDefaults.duration);
    const tDelay = setValue(delay, animDefaults.delay);
    const tEndDelay = setValue(endDelay, animDefaults.endDelay);
    const tModifier = modifier || animDefaults.modifier;
    // If no composition is defined and the targets length is high (>= 1000) set the composition to 'none' (0) for faster tween creation
    const tComposition = isUnd(composition) && parsedTargets.length >= K ? compositionTypes.none :
    !isUnd(composition) ? isNum(composition) ? composition : compositionTypes[composition] :
    isNum(animDefaults.composition) ? animDefaults.composition : compositionTypes[animDefaults.composition];
    // TODO: Do not create an empty object until we know the animation will create inline styles
    const animInlineStyles = {};
    const animTlPosition = this._offset;

    let iterationDur = 0;
    let iterationCST = NaN;
    let iterationCET = 0;
    let animationTweensLength = 0;

    for (let targetIndex = 0, targetsLength = parsedTargets.length; targetIndex < targetsLength; targetIndex++) {

      const target = parsedTargets[targetIndex];

      let lastTransformGroupIndex = NaN;
      let lastTransformGroupLength = NaN;

      for (let p in params) {

        if (isKey(p)) {

          const tweenType = getTweenType(target, p);

          if (tweenType !== tweenTypes.INVALID) {

            const propName = sanitizePropertyName(p, target, tweenType);
            let propValue = params[p];
            // Normalize property values to valid keyframe syntax:
            // [x, y] to [{to: [x, y]}] or {to: x} to [{to: x}] or keep keys syntax [{}, {}, {}...]
            // const keyframes = isArr(propValue) ? propValue.length === 2 && !isObj(propValue[0]) ? [{ to: propValue }] : propValue : [propValue];

            if (fastSet) {
              fastSetValuesArray[0] = propValue;
              fastSetValuesArray[1] = propValue;
              propValue = fastSetValuesArray;
            }

            if (isArr(propValue)) {
              // [x, y] to [{to: [x, y]}]
              if (propValue.length === 2 && !isObj(propValue[0])) {
                keyObjectTarget.to = propValue;
                keyframesTargetArray[0] = keyObjectTarget;
                keyframes = keyframesTargetArray;
              } else {
                // [{}, {}, {}...]
                keyframes = propValue;
              }
            } else {
              keyframesTargetArray[0] = propValue;
              keyframes = keyframesTargetArray;
            }

            let siblings = null;
            let prevTween = null;
            let firstTweenChangeStartTime = NaN;
            let lastTweenChangeEndTime  = 0;
            let lastTweenEndTime = 0;
            let tweenIndex = 0;

            for (let l = keyframes.length; tweenIndex < l; tweenIndex++) {

              const keyframe = keyframes[tweenIndex];

              if (isObj(keyframe) && isUnd(keyframe.inSvg)) {
                key = keyframe;
              } else {
                keyObjectTarget.to = keyframe;
                key = keyObjectTarget;
              }

              const tweenStartTime = prevTween ? lastTweenEndTime : 0;
              const absoluteStartTime = animTlPosition + tweenStartTime;
              const keyEasing = key.ease;
              const tweenToValue = getFunctionValue(key.to, target, targetIndex, targetsLength);
              const tweenFromValue = getFunctionValue(key.from, target, targetIndex, targetsLength);
              const hasSpringEasing = !isUnd(keyEasing) && isObj(keyEasing);
              // Easing are treated differently and don't accept function based value to prevent
              // having to pass a function wrapper that returns an other function all the time
              const tweenEasing = hasSpringEasing ? keyEasing.solver : keyEasing || tEasing;
              // Calculate default individual keyframe duration by dividing the targetsLength of keyframes
              const tweenDuration = hasSpringEasing ? keyEasing.duration : getFunctionValue(setValue(key.duration, (l > 1 ? getFunctionValue(tDuration, target, targetIndex, targetsLength) / l : tDuration)), target, targetIndex, targetsLength);
              // Default delay value should only be applied to the first tween
              const tweenDelay = getFunctionValue(setValue(key.delay, (!tweenIndex ? tDelay : 0)), target, targetIndex, targetsLength);
              // Default endDelay value should only be applied to the last tween
              const tweenEndDelay = getFunctionValue(setValue(key.endDelay, (tweenIndex === l - 1 ? tEndDelay : 0)), target, targetIndex, targetsLength);
              const tweenComposition = getFunctionValue(setValue(key.composition, tComposition), target, targetIndex, targetsLength);
              // Modifiers are treated differently and don't accept function based value to prevent having to pass a function wrapper
              const tweenModifier = key.modifier || tModifier;
              const isFromToArray = isArr(tweenToValue);
              const isFromToValue = isFromToArray || (!isUnd(tweenFromValue) && !isUnd(tweenToValue));

              let prevSibling = prevTween;

              if (tweenComposition !== compositionTypes.none) {
                if (!siblings) siblings = getTweenSiblings(target, propName);
                let nextSibling = siblings._head;
                while (nextSibling && !nextSibling._isOverridden && nextSibling._absoluteStartTime <= absoluteStartTime) {
                  prevSibling = nextSibling;
                  nextSibling = nextSibling._nextRep;
                }
              }

              // Decompose values
              if (isFromToValue) {
                decomposeRawValue(isFromToArray ? tweenToValue[0] : tweenFromValue, fromTargetObject);
                decomposeRawValue(isFromToArray ? tweenToValue[1] : tweenToValue, toTargetObject);
                if (fromTargetObject.t === valueTypes.NUMBER) {
                  if (prevSibling) {
                    if (prevSibling._valueType === valueTypes.UNIT) {
                      fromTargetObject.t = valueTypes.UNIT;
                      fromTargetObject.u = prevSibling._unit;
                    }
                  } else {
                    decomposeRawValue(
                      getOriginalAnimatableValue(target, propName, tweenType, animInlineStyles),
                      decomposedOriginalValue
                    );
                    if (decomposedOriginalValue.t === valueTypes.UNIT) {
                      fromTargetObject.t = valueTypes.UNIT;
                      fromTargetObject.u = decomposedOriginalValue.u;
                    }
                  }
                }
              } else {
                if (!isUnd(tweenToValue)) {
                  decomposeRawValue(tweenToValue, toTargetObject);
                } else {
                  if (prevTween) {
                    decomposeTweenValue(prevTween, toTargetObject);
                  } else {
                    decomposeRawValue(parent && prevSibling ? prevSibling._value :
                    // No need to get and parse the original value if the tween is part of a timeline and has a previous sibling
                    getOriginalAnimatableValue(target, propName, tweenType, animInlineStyles), toTargetObject);
                  }
                }
                if (!isUnd(tweenFromValue)) {
                  decomposeRawValue(tweenFromValue, fromTargetObject);
                } else {
                  if (prevTween) {
                    decomposeTweenValue(prevTween, fromTargetObject);
                  } else {
                    decomposeRawValue(parent && prevSibling ? prevSibling._value :
                    // No need to get and parse the original value if the tween is part of a timeline and has a previous sibling
                    getOriginalAnimatableValue(target, propName, tweenType, animInlineStyles), fromTargetObject);
                  }
                }
              }

              // Apply operators
              if (fromTargetObject.o) {
                fromTargetObject.n = getRelativeValue(
                  !prevSibling ? decomposeRawValue(
                    getOriginalAnimatableValue(target, propName, tweenType, animInlineStyles),
                    decomposedOriginalValue
                  ).n : prevSibling._toNumber,
                  fromTargetObject.n,
                  fromTargetObject.o
                );
              }

              if (toTargetObject.o) {
                toTargetObject.n = getRelativeValue(fromTargetObject.n, toTargetObject.n, toTargetObject.o);
              }

              // Values omogenisation in cases of type difference between "from" and "to"
              if (fromTargetObject.t !== toTargetObject.t) {
                if (fromTargetObject.t === valueTypes.COMPLEX || toTargetObject.t === valueTypes.COMPLEX) {
                  const complexValue = fromTargetObject.t === valueTypes.COMPLEX ? fromTargetObject : toTargetObject;
                  const notComplexValue = fromTargetObject.t === valueTypes.COMPLEX ? toTargetObject : fromTargetObject;
                  notComplexValue.t = valueTypes.COMPLEX;
                  notComplexValue.s = cloneArray(complexValue.s);
                  notComplexValue.d = complexValue.d.map(() => notComplexValue.n);
                } else if (fromTargetObject.t === valueTypes.UNIT && toTargetObject.t === valueTypes.PATH) {
                  toTargetObject.u = fromTargetObject.u;
                } else if (fromTargetObject.t === valueTypes.UNIT || toTargetObject.t === valueTypes.UNIT) {
                  const unitValue = fromTargetObject.t === valueTypes.UNIT ? fromTargetObject : toTargetObject;
                  const notUnitValue = fromTargetObject.t === valueTypes.UNIT ? toTargetObject : fromTargetObject;
                  notUnitValue.t = valueTypes.UNIT;
                  notUnitValue.u = unitValue.u;
                } else if (fromTargetObject.t === valueTypes.COLOR || toTargetObject.t === valueTypes.COLOR) {
                  const colorValue = fromTargetObject.t === valueTypes.COLOR ? fromTargetObject : toTargetObject;
                  const notColorValue = fromTargetObject.t === valueTypes.COLOR ? toTargetObject : fromTargetObject;
                  notColorValue.t = valueTypes.COLOR;
                  notColorValue.s = colorValue.s;
                  notColorValue.d = [0, 0, 0, 1];
                }
              }

              // Unit conversion
              if (fromTargetObject.u !== toTargetObject.u) {
                let valueToConvert = toTargetObject.u ? fromTargetObject : toTargetObject;
                valueToConvert = convertValueUnit(target, valueToConvert, toTargetObject.u ? toTargetObject.u : fromTargetObject.u);
                // TODO:
                // convertValueUnit(target, to.u ? from : to, to.u ? to.u : from.u);
              }

              // Fill in non existing complex values
              if (toTargetObject.d && fromTargetObject.d && (toTargetObject.d.length !== fromTargetObject.d.length)) {
                const longestValue = fromTargetObject.d.length > toTargetObject.d.length ? fromTargetObject : toTargetObject;
                const shortestValue = longestValue === fromTargetObject ? toTargetObject : fromTargetObject;
                // TODO: Check if n should be used instead of 0 for default complex values
                shortestValue.d = longestValue.d.map((_, i) => isUnd(shortestValue.d[i]) ? 0 : shortestValue.d[i]);
                shortestValue.s = cloneArray(longestValue.s);
              }

              // Check if target is a children of an SVG element for path animation
              if (toTargetObject.t === valueTypes.PATH) {
                // toTargetObject.n = toTargetObject.p.n;
                if (target[isSvgSymbol]) toTargetObject.p.inSvg = true;
              }

              // Tween factory

              const tweenUpdateDuration = +tweenDuration || minValue;
              const tweenChangeEndTime = tweenStartTime + tweenDelay + tweenUpdateDuration;

              /** @type {Types.Tween} */
              const tween = {
                parent: this,
                id: tweenId++,
                property: propName,
                target: target,
                _value: null,
                // Not used internally but usefull for GUI
                _delay: +tweenDelay,
                // Not used internally but usefull for GUI
                _endDelay: +tweenEndDelay,
                _ease: parseEasings(tweenEasing),
                _fromNumbers: cloneArray(fromTargetObject.d),
                _toNumbers: cloneArray(toTargetObject.d),
                _strings: cloneArray(toTargetObject.s),
                _fromNumber: fromTargetObject.n,
                _toNumber: toTargetObject.n,
                _numbers: null, // For additive tween and animatables
                _number: 0, // For additive tween and animatables
                _unit: toTargetObject.u,
                _path: p ? { ...toTargetObject.p } : null,
                _modifier: tweenModifier,
                _currentTime: 0,
                _updateDuration: tweenUpdateDuration,
                _changeStartTime: tweenStartTime + tweenDelay,
                _changeDuration: tweenUpdateDuration,
                _absoluteStartTime: absoluteStartTime,
                // TODO: replace with : _absoluteStartTime + _delay
                _absoluteChangeStartTime: absoluteStartTime + tweenDelay,
                _absoluteChangeEndTime: animTlPosition + tweenChangeEndTime,
                // NOTE: Investigate bit packing to stores ENUM / BOOL
                _tweenType: /** @type {tweenTypes} */(tweenType),
                _valueType: toTargetObject.t,
                _composition: tweenComposition,
                _isOverlapped: 0,
                _isOverridden: 0,
                _renderTransforms: 0,
                _prevRep: null, // For replaced tween
                _nextRep: null, // For replaced tween
                _prevAdd: null, // For additive tween
                _nextAdd: null, // For additive tween
                _prev: null,
                _next: null,
              };

              if (tweenComposition !== compositionTypes.none) {
                composeTween(tween, siblings);
              }

              if (isNaN(firstTweenChangeStartTime)) {
                firstTweenChangeStartTime = tween._changeStartTime;
              }

              lastTweenChangeEndTime = tweenChangeEndTime;
              lastTweenEndTime = tweenChangeEndTime + tweenEndDelay;
              prevTween = tween;
              animationTweensLength++;

              addChild(this, tween);

            }

            // Update animation timings with the added tweens properties

            if (isNaN(iterationCST) || firstTweenChangeStartTime < iterationCST) iterationCST = firstTweenChangeStartTime;
            if (lastTweenEndTime > iterationDur) iterationDur = lastTweenEndTime;
            if (lastTweenChangeEndTime > iterationCET) iterationCET = lastTweenChangeEndTime;

            // TODO: Find a way to inline tween._renderTransforms = 1 here

            if (tweenType === tweenTypes.TRANSFORM) {
              lastTransformGroupIndex = animationTweensLength - tweenIndex;
              lastTransformGroupLength = animationTweensLength;
            }

          }

        }

      }

      // Set _renderTransforms to last transform property to correctly render the transforms list

      if (!isNaN(lastTransformGroupIndex)) {
        let i = 0;
        forEachChildren(this, (/** @type {Types.Tween} */tween) => {
          if (i >= lastTransformGroupIndex && i < lastTransformGroupLength) {
            tween._renderTransforms = 1;
            if (tween._composition === compositionTypes.blend) {
              forEachChildren(additive.animation, (/** @type {Types.Tween} */additiveTween) => {
                if (additiveTween.id === tween.id) {
                  additiveTween._renderTransforms = 1;
                }
              });
            }
          }
          i++;
        });
      }

    }

    // If no animatable props have been provided iterationDur will be 0
    // If a loop param has been provided this will results with NaN
    if (!iterationDur) {
      iterationDur = minValue;
      this._iterationCount = 0;
    }

    this.targets = parsedTargets;
    this.duration = clampInfinity(iterationDur * this._iterationCount) || minValue;
    this._iterationDuration = iterationDur;
    this._iterationChangeStartTime = iterationCST;
    this._iterationChangeEndTime = iterationCET;
    this._inlineStyles = animInlineStyles;
  }

  /**
   * @param  {Number} newDuration
   * @return {this}
   */
  stretch(newDuration) {
    const currentDuration = this.duration;
    if (currentDuration === newDuration) return this;
    const timeScale = newDuration / currentDuration;
    forEachChildren(this, (/** @type {Types.Tween} */tween) => {
      tween._updateDuration = clampZero(tween._updateDuration * timeScale);
      tween._changeDuration = clampZero(tween._changeDuration * timeScale);
      tween._delay *= timeScale;
      tween._endDelay *= timeScale;
      tween._currentTime *= timeScale;
      tween._changeStartTime *= timeScale;
      tween._absoluteStartTime *= timeScale;
      tween._absoluteChangeStartTime *= timeScale;
      tween._absoluteChangeEndTime *= timeScale;
    });
    return super.stretch(newDuration);
  }

  /**
   * @return {this}
   */
  revert() {
    // animation = this, time = 0, muteCallbacks = 1, internalRendering = 0, tickMode = force
    render(this, 0, 1, 0, tickModes.FORCE);
    cleanInlineStyles(this);
    return this.cancel();
  }

}

/**
 * @typedef {Number|String|Function} TimePosition
 */

/**
 * Timeline's children offsets positions parser
 * @param  {Timeline} timeline
 * @param  {String} timePosition
 * @return {Number}
 */
const getPreviousAnimationOffset = (timeline, timePosition) => {
  if (stringStartsWith(timePosition, '<')) {
    const goToPrevAnimationOffset = timePosition[1] === '<';
    const prevAnimation = timeline._tail;
    const prevOffset = prevAnimation ? prevAnimation._offset : 0;
    return goToPrevAnimationOffset ? prevOffset : prevOffset + prevAnimation.duration;
  }
};

/**
 * @param  {Timeline} timeline
 * @param  {TimePosition} [timePosition]
 * @return {Number}
 */
const parseTimelinePosition = (timeline, timePosition) => {
  let tlDuration = timeline._iterationDuration;
  if (tlDuration === minValue) tlDuration = 0;
  if (isUnd(timePosition)) return tlDuration;
  if (isNum(+timePosition)) return +timePosition;
  const timePosStr = /** @type {String} */(timePosition);
  const tlLabels = timeline ? timeline.labels : null;
  const hasLabels = !isNil(tlLabels);
  const prevOffset = getPreviousAnimationOffset(timeline, timePosStr);
  const hasSibling = !isUnd(prevOffset);
  const matchedRelativeOperator = relativeValuesExecRgx.exec(timePosStr);
  if (matchedRelativeOperator) {
    const fullOperator = matchedRelativeOperator[0];
    const split = timePosStr.split(fullOperator);
    const labelOffset = hasLabels && split[0] ? tlLabels[split[0]] : tlDuration;
    const parsedOffset = hasSibling ? prevOffset : hasLabels ? labelOffset : tlDuration;
    const parsedNumericalOffset = +split[1];
    return getRelativeValue(parsedOffset, parsedNumericalOffset, fullOperator[0]);
  } else {
    return hasSibling ? prevOffset :
           hasLabels ? !isUnd(tlLabels[timePosStr]) ? tlLabels[timePosStr] :
           tlDuration : tlDuration;
  }
};

/**
 * @overload
 * @param  {Types.TimerParams} childParams
 * @param  {Timeline} tl
 * @param  {Number} parsedTLPosition
 * @return {Timeline}
 *
 * @overload
 * @param  {Types.AnimationParams} childParams
 * @param  {Timeline} tl
 * @param  {Number} parsedTLPosition
 * @param  {Types.TargetsParam} targets
 * @return {Timeline}
 *
 * @param  {Types.TimerParams|Types.AnimationParams} childParams
 * @param  {Timeline} tl
 * @param  {Number} parsedTLPosition
 * @param  {Types.TargetsParam} [targets]
 */
function addTlChild(childParams, tl, parsedTLPosition, targets) {
  // Offset the tl position with -minValue for 0 duration animations or .set() calls in order to align their end value with the defined position
  const TLPosition = isNum(childParams.duration) && /** @type {Number} */(childParams.duration) <= minValue ? parsedTLPosition - minValue : parsedTLPosition;
  // Clone the params object in cases where the same params object is used to create multiple children
  // NOTE: This might be avoided by separating the TL position from the beginDelay value
  const newChildParams = { ...childParams };
  const childBeginDelay = childParams.beginDelay;
  newChildParams.beginDelay = TLPosition + (!isUnd(childBeginDelay) ? childBeginDelay : 0);
  // Make sure the animation doesn't try to play by itself
  newChildParams.autoplay = false;
  render(tl, TLPosition, 1, 1, tickModes.AUTO);
  const tlChild = targets ?
    new Animation(targets, newChildParams, tl, false) :
    new Timer(/** @type {Types.TimerParams} */(newChildParams), tl);
  // TODO: framerate / playbackspeed should be init here maybe?
  tlChild.init(1);
  // TODO: Might be better to insert at a position relative to startTime?
  addChild(tl, tlChild);
  forEachChildren(tl, (/** @type {Types.Timer|Types.Animation} */child) => {
    const childTLOffset = child._offset;
    const childCST = childTLOffset + child._iterationChangeStartTime;
    if (isNaN(tl._iterationChangeStartTime) || childCST < tl._iterationChangeStartTime) tl._iterationChangeStartTime = childCST;
    const childDur = childTLOffset + child.duration;
    if (childDur > tl._iterationDuration) tl._iterationDuration = childDur;
    const childCET = childTLOffset + (child.duration - (child._iterationDuration - child._iterationChangeEndTime));
    if (childCET > tl._iterationChangeEndTime) tl._iterationChangeEndTime = childCET;
  });
  tl.duration = clampInfinity(tl._iterationDuration * tl._iterationCount);
  return tl;
}

class Timeline extends Timer {

  /**
   * @param {Types.TimerParams|Types.TimelineParams} [parameters]
   */
  constructor(parameters = {}) {
    super(/** @type {Types.TimerParams} */(parameters));
    this.duration = 0; // TL duration starts at 0 and grows when adding children
    this.labels = {}; // TODO: Do not create an Object until we actually add a label
    /** @type {Types.TimelineChildrenDefaults} */
    const defaultsParams = /** @type {Types.TimelineParams} */(parameters).defaults;
    this.defaults = parameters && defaultsParams ? mergeObjects(defaultsParams, defaults) : defaults;
    this._iterationDuration = 0;
    this._iterationChangeStartTime = NaN;
    this._iterationChangeEndTime = 0;
    /** @type {Types.Timer|Types.Animation} */
    this._head = null;
    /** @type {Types.Timer|Types.Animation} */
    this._tail = null;
  }

  /**
   * @overload
   * @param {Types.TargetsParam} a1
   * @param {Types.AnimationParams} [a2]
   * @param {TimePosition} [a3]
   * @return {this}
   *
   * @overload
   * @param {Types.TimerParams} a1
   * @param {TimePosition} [a2]
   * @return {this}
   *
   * @overload
   * @param {String} a1
   * @param {TimePosition} [a2]
   * @return {this}
   *
   * @overload
   * @param {Function} a1
   * @param {TimePosition} [a2]
   * @return {this}
   *
   * @param {Types.TargetsParam|Types.TimerParams|String|Function} a1
   * @param {Types.AnimationParams|TimePosition} [a2]
   * @param {TimePosition} [a3]
   */
  add(a1, a2, a3) {
    const isAnim = isObj(a2);
    const isTimer = isObj(a1);
    const isFunc = isFnc(a1);
    if (isAnim || isTimer || isFunc) {
      this._hasChildren = true;
      if (isAnim) {
        const childParams = /** @type {Types.AnimationParams} */(a2);
        // Check for function for children stagger positions
        if (isFnc(a3)) {
          const staggeredPosition = /** @type {Function} */(a3);
          const parsedTargetsArray = parseTargets(a1);
          // Store initial duration before adding new children that will change the duration
          const tlDuration = this.duration;
          // Store initial _iterationDuration before adding new children that will change the duration
          const tlIterationDuration = this._iterationDuration;
          // Store the original id in order to add specific indexes to the new animations ids
          const id = childParams.id;
          let i = 0;
          parsedTargetsArray.forEach((/** @type {Types.Target} */target) => {
            // Create a new parameter object for each staggered children
            const staggeredChildParams = { ...childParams };
            // Reset the duration of the timeline iteration before each stagger to prevent wrong start value calculation
            this.duration = tlDuration;
            this._iterationDuration = tlIterationDuration;
            if (!isUnd(id)) staggeredChildParams.id = id + '-' + i;
            addTlChild(
              staggeredChildParams,
              this,
              staggeredPosition(target, i++, parsedTargetsArray.length, this),
              target,
            );
          });
        } else {
          addTlChild(
            childParams,
            this,
            parseTimelinePosition(this, a3),
            a1,
          );
        }
      } else {
        // It's a Timer or a Function
        addTlChild(
          /** @type Types.TimerParams */(isTimer ? a1 : { onComplete: a1, duration: minValue }),
          this,
          parseTimelinePosition(this,/** @type TimePosition */(a2)),
        );
      }
      this.init(1); // 1 = internalRender
      return this._autoplay ? this.play() : this;
    } else if (isStr(a1)) {
      this.labels[a1] = parseTimelinePosition(this,/** @type TimePosition */(a2));
      return this;
    }
  }

  /**
   * @param {Types.TargetsParam} targets
   * @param {Types.AnimationParams} parameters
   * @param {TimePosition} [position]
   * @return {this}
   */
  set(targets, parameters, position) {
    if (isUnd(parameters)) return this;
    parameters.duration = minValue;
    parameters.composition = compositionTypes.replace;
    return this.add(targets, parameters, position);
  }

  /**
   * @param  {Number} newDuration
   * @return {this}
   */
  stretch(newDuration) {
    const currentDuration = this.duration;
    if (currentDuration === newDuration) return this;
    const timeScale = newDuration / currentDuration;
    const labels = this.labels;
    forEachChildren(this, (/** @type {Animation} */child) => {
      child.stretch(child.duration * timeScale);
    });
    for (let labelName in labels) {
      labels[labelName] *= timeScale;
    }
    return super.stretch(newDuration);
  }

  /**
   * @return {this}
   */
  revert() {
    render(this, 0, 1, 0, tickModes.FORCE);
    cleanInlineStyles(this);
    forEachChildren(this, (/** @type {Animation} */child) => child.revert, true);
    return this.cancel();
  }
}

/**
 * @overload
 * @param  {Types.DOMTarget|NodeList|String} targetSelector
 * @param  {String} propName
 * @return {String}
 *
 * @overload
 * @param  {Record<String, any>} targetSelector
 * @param  {String} propName
 * @return {Number}
 *
 * @overload
 * @param  {Types.TargetsParam} targetSelector
 * @param  {String} propName
 * @param  {String} unit
 * @return {String}
 *
 * @overload
 * @param  {Types.TargetsParam} targetSelector
 * @param  {String} propName
 * @param  {Boolean} unit
 * @return {Number}
 *
 * @param  {Types.TargetsParam} targetSelector
 * @param  {String} propName
 * @param  {String|Boolean} [unit]
 */
function getTargetValue(targetSelector, propName, unit) {
  const targets = registerTargets(targetSelector);
  if (isNil(targets) || isArr(targets) && !targets.length) return;
  if (targets && targets.length) {
    const [ target ] = targets;
    const tweenType = getTweenType(target, propName);
    const normalizePropName = sanitizePropertyName(propName, target, tweenType);
    let originalValue = getOriginalAnimatableValue(target, normalizePropName);
    if (isUnd(unit)) {
      return originalValue;
    } else {
      decomposeRawValue(originalValue, decomposedOriginalValue);
      if (decomposedOriginalValue.t === valueTypes.NUMBER || decomposedOriginalValue.t === valueTypes.UNIT) {
        if (unit === false) {
          return decomposedOriginalValue.n;
        } else {
          const convertedValue = convertValueUnit(target, decomposedOriginalValue, /** @type {String} */(unit));
          return `${round(convertedValue.n, 3)}${convertedValue.u}`;
        }
      }
    }
  }
}

/**
 * @param {Types.TargetsParam} targets
 * @param {Types.AnimationParams} parameters
 * @return {Animation}
 */
const setTargetValues = (targets, parameters) => {
  if (isUnd(parameters)) return;
  parameters.duration = minValue;
  // Do not overrides currently active tweens by default
  parameters.composition = setValue(parameters.composition, compositionTypes.none);
  // Skip init() and force rendering by playing the animation
  return new Animation(targets, parameters, null, true).play();
};

/**
 * @param  {Types.TargetsArray} targetsArray
 * @param  {Types.Animation} animation
 * @return {Boolean}
 */
const removeTargetsFromAnimation = (targetsArray, animation) => {
  let tweensMatchesTargets = false;
  forEachChildren(animation, (/**@type {Types.Tween} */tween) => {
    if (targetsArray.includes(tween.target)) {
      removeChild(animation, tween);
      tweensMatchesTargets = true;
    }
  }, true);
  return tweensMatchesTargets;
};

/**
 * @param  {Types.TargetsParam} targets
 * @param  {Types.Animation|Types.Timeline|Types.Engine} [parent]
 * @return {Types.TargetsArray}
 */
const remove = (targets, parent) => {
  const targetsArray = parseTargets(targets);
  const parentClock = parent ? parent : engine;
  let removeMatches;
  if (parentClock._hasChildren) {
    forEachChildren(parentClock, (/**@type {Types.Animation|Types.Timeline} */child) => {
      if (!child._hasChildren) {
        removeMatches = removeTargetsFromAnimation(targetsArray, /**@type {Types.Animation} */(child));
        // Remove the child from its parent if he has no tweens and no children left after the removal
        if (removeMatches && !child._head) removeChild(parentClock, child);
      }
      // Make sure to also remove engine's children targets
      // NOTE: Avoid recursion?
      if (child._head) {
        remove(targets, child);
      } else {
        child._hasChildren = false;
      }
    }, true);
  } else {
    removeMatches = removeTargetsFromAnimation(
      targetsArray,
      /**@type {Types.Animation} */(parentClock)
    );
  }

  if (removeMatches && !parentClock._head) {
    parentClock._hasChildren = false;
    const pausableTimer = /**@type {Types.Animation|Types.Timeline} */(parentClock);
    // Pause the parent if there are no tweens and no children left after the removal
    // Only pause {Types.Animation|Types.Timeline} by checking if the pause function exists
    // NOTE: Find a way to homogenize
    if (pausableTimer.pause) pausableTimer.pause();
  }

  return targetsArray;
};

/**
 * @param  {Number} min
 * @param  {Number} max
 * @param  {Number} [decimalLength]
 * @return {Number}
 */
const random = (min, max, decimalLength) => { const m = 10 ** (decimalLength || 0); return floor((Math.random() * (max - min + (1 / m)) + min) * m) / m };

/**
 * @param  {String|Array} items
 * @return {any}
 */
const randomPick = items => items[random(0, items.length - 1)];

/**
 * https://bost.ocks.org/mike/shuffle/
 * @param  {Array} items
 * @return {Array}
 */
const shuffle = items => {
  let m = items.length - 1, t, i;
  while (m) { i = random(0, m--); t = items[m]; items[m] = items[i]; items[i] = t; }
  return items;
};

/**
 * @param  {Number} v
 * @param  {Number} decimalLength
 * @return {String}
 */
const roundPad = (v, decimalLength) => v.toFixed(decimalLength);

/**
 * @param  {Number} v
 * @param  {Number} totalLength
 * @param  {String} padString
 * @return {String}
 */
const padStart = (v, totalLength, padString) => `${v}`.padStart(totalLength, padString);

/**
 * @param  {Number} v
 * @param  {Number} totalLength
 * @param  {String} padString
 * @return {String}
 */
const padEnd = (v, totalLength, padString) => `${v}`.padEnd(totalLength, padString);

/**
 * @param  {Number} v
 * @param  {Number} min
 * @param  {Number} max
 * @return {Number}
 */
const wrap = (v, min, max) => (((v - min) % (max - min) + (max - min)) % (max - min)) + min;

/**
 * @param  {Number} value
 * @param  {Number} inLow
 * @param  {Number} inHigh
 * @param  {Number} outLow
 * @param  {Number} outHigh
 * @return {Number}
 */
const mapRange = (value, inLow, inHigh, outLow, outHigh) => outLow + ((value - inLow) / (inHigh - inLow)) * (outHigh - outLow);

/**
 * @param  {Number} degrees
 * @return {Number}
 */
const degToRad = degrees => degrees * PI / 180;

/**
 * @param  {Number} radians
 * @return {Number}
 */
const radToDeg = radians => radians * 180 / PI;

/**
 * https://www.rorydriscoll.com/2016/03/07/frame-rate-independent-damping-using-lerp/
 * @param  {Number} start
 * @param  {Number} end
 * @param  {Number} amount
 * @param  {Types.Timer|Types.Animation|Types.Timeline} [clock]
 * @return {Number}
 */
const lerp = (start, end, amount, clock) => {
  const activeTimer = clock || (engine._hasChildren && engine);
  let delta = amount;
  if (activeTimer && activeTimer.deltaTime) {
    delta = 1 - Math.exp(-amount * activeTimer.deltaTime * .1);
  }
  return (1 - delta) * start + delta * end;
};

/**
 * @param  {Object} timer
 * @return {Object}
 */
const promisify = timer => new Promise(resolve => timer.completed ? resolve(timer) : timer._resolve = resolve);

// Chain-able utilities

/**
 * @callback UtilityFunction
 * @param {...*} args
 * @return {Number|String}
 *
 * @param {UtilityFunction} fn
 * @param {Number} [last=0]
 * @return {function(...(Number|String)): function(Number|String): (Number|String)}
 */
const curry = (fn, last = 0) => (...args) => last ? v => fn(...args, v) : v => fn(v, ...args);

/**
 * @param {Function} fn
 * @return {function(...(Number|String))}
 */
const chain = fn => {
   return (...args) => {
    const result = fn(...args);
    return new Proxy(noop, {
      apply: (_, __, [v]) => result(v),
      get: (_, prop) => chain(/**@param {...Number|String} nextArgs */(...nextArgs) => {
        const nextResult = utils[prop](...nextArgs);
        return (/**@type {Number|String} */v) => nextResult(result(v));
      })
    });
  }
};

/**
 * @param {UtilityFunction} fn
 * @param {Number} [right]
 * @return {function(...(Number|String)): UtilityFunction}
 */
const makeChainable = (fn, right = 0) => (...args) => (args.length < fn.length ? chain(curry(fn, right)) : fn)(...args);

/**
 * @callback ChainedUtilsResult
 * @param {Number} value
 * @return {Number}
 *
 * @typedef {Object} ChainableUtils
 * @property {ChainedClamp} clamp
 * @property {ChainedRound} round
 * @property {ChainedSnap} snap
 * @property {ChainedWrap} wrap
 * @property {ChainedInterpolate} interpolate
 * @property {ChainedMapRange} mapRange
 * @property {ChainedRoundPad} roundPad
 * @property {ChainedPadStart} padStart
 * @property {ChainedPadEnd} padEnd
 * @property {ChainedDegToRad} degToRad
 * @property {ChainedRadToDeg} radToDeg
 *
 * @typedef {ChainableUtils & ChainedUtilsResult} ChainableUtil
 *
 * @callback ChainedClamp
 * @param {Number} min
 * @param {Number} max
 * @return {ChainableUtil}
 *
 * @callback ChainedRound
 * @param {Number} decimalLength
 * @return {ChainableUtil}
 *
 * @callback ChainedSnap
 * @param {Number} increment
 * @return {ChainableUtil}
 *
 * @callback ChainedWrap
 * @param {Number} min
 * @param {Number} max
 * @return {ChainableUtil}
 *
 * @callback ChainedInterpolate
 * @param {Number} start
 * @param {Number} end
 * @return {ChainableUtil}
 *
 * @callback ChainedMapRange
 * @param {Number} inLow
 * @param {Number} inHigh
 * @param {Number} outLow
 * @param {Number} outHigh
 * @return {ChainableUtil}
 *
 * @callback ChainedRoundPad
 * @param {Number} decimalLength
 * @return {ChainableUtil}
 *
 * @callback ChainedPadStart
 * @param {Number} totalLength
 * @param {String} padString
 * @return {ChainableUtil}
 *
 * @callback ChainedPadEnd
 * @param {Number} totalLength
 * @param {String} padString
 * @return {ChainableUtil}
 *
 * @callback ChainedDegToRad
 * @return {ChainableUtil}
 *
 * @callback ChainedRadToDeg
 * @return {ChainableUtil}
 */

const utils = {
  $: registerTargets,
  get: getTargetValue,
  set: setTargetValues,
  remove,
  cleanInlineStyles,
  promisify,
  random,
  randomPick,
  shuffle,
  lerp,
  clamp: /** @type {typeof clamp & ChainedClamp} */(makeChainable(clamp)),
  round: /** @type {typeof round & ChainedRound} */(makeChainable(round)),
  snap: /** @type {typeof snap & ChainedSnap} */(makeChainable(snap)),
  wrap: /** @type {typeof wrap & ChainedWrap} */(makeChainable(wrap)),
  interpolate: /** @type {typeof interpolate & ChainedInterpolate} */(makeChainable(interpolate, 1)),
  mapRange: /** @type {typeof mapRange & ChainedMapRange} */(makeChainable(mapRange)),
  roundPad: /** @type {typeof roundPad & ChainedRoundPad} */(makeChainable(roundPad)),
  padStart: /** @type {typeof padStart & ChainedPadStart} */(makeChainable(padStart)),
  padEnd: /** @type {typeof padEnd & ChainedPadEnd} */(makeChainable(padEnd)),
  degToRad: /** @type {typeof degToRad & ChainedDegToRad} */(makeChainable(degToRad)),
  radToDeg: /** @type {typeof radToDeg & ChainedRadToDeg} */(makeChainable(radToDeg)),
};

/** @type {Map.<Array, Types.SpringEasing>} */
const springsCache = new Map();

/**
 * Spring ease solver adapted from https://webkit.org/demos/spring/spring.js
 * Webkit Copyright © 2016 Apple Inc
 * Improved by Jake Archibald https://github.com/juliangarnier/anime/issues/850#issuecomment-1476603393
 *
 * @param {Number} [mass=1] - The mass of the spring
 * @param {Number} [stiffness=100] - The stiffness of the spring
 * @param {Number} [damping=10] - The damping of the spring
 * @param {Number} [velocity=0] - The initial velocity of the spring
 * @returns {Types.SpringEasing}
 */
const spring = (mass = 1, stiffness = 100, damping = 10, velocity = 0) => {

  const parameters = [mass, stiffness, damping, velocity];
  let springEasing = springsCache.get(parameters);

  if (!springEasing) {

    const m = clamp(mass, 0, K);
    const s = clamp(stiffness, 1, K);
    const d = clamp(damping, .1, K);
    const w0 = clamp(sqrt(s / m), minValue, K);
    const zeta = d / (2 * sqrt(s * m));
    const wd = zeta < 1 ? w0 * sqrt(1 - zeta * zeta) : 0;
    const b = zeta < 1 ? (zeta * w0 + -velocity) / wd : -velocity + w0;
    const step = K / 60 / 100;
    const threshold = 0.0001;

    /** @type {Types.EasingFunction} */
    const solver = t => {
      if (zeta < 1) {
        t = exp(-t * zeta * w0) * (1 * cos(wd * t) + b * sin(wd * t));
      } else {
        t = (1 + b * t) * exp(-t * w0);
      }
      return 1 - t;
    };

    const duration = (() => {
      let time = 0;
      while (true) {
        if (abs(1 - solver(time)) < threshold) {
          const restStart = time;
          let restSteps = 1;
          while (true) {
            time += step;
            if (abs(1 - solver(time)) >= threshold) break;
            restSteps++;
            if (restSteps === 16) return restStart;
          }
        }
        time += step;
      }
    })();

    springEasing = {
      duration: round(duration * K, 0),
      solver: t => round(solver(duration * t), 3),
    };

    springsCache.set(parameters, springEasing);

  }

  return springEasing;
};

/**
 * @typedef  {Object} Stagger.Parameters
 * @property {Number|String} [start]
 * @property {Number|'first'|'center'|'last'} [from]
 * @property {Boolean} [reversed]
 * @property {[Number,Number]} [grid]
 * @property {('x'|'y')} [axis]
 * @property {Types.EasingParam} [ease]
 * @property {Types.Tween.Modifier} [modifier]
 */

/**
 * @callback Stagger.function
 * @param {Types.Target} [target]
 * @param {Number} [index]
 * @param {Number} [length]
 * @param {Timeline} [tl]
 * @return {Number|String}
 */

/**
 * @param  {Number|String|[Number,Number]} val
 * @param  {Stagger.Parameters} params
 * @return {Stagger.function}
 */
const stagger = (val, params = {}) => {
  let values = [];
  let maxValue = 0;
  const from = params.from;
  const reversed = params.reversed;
  const ease = params.ease;
  const hasEasing = !isUnd(ease);
  const hasSpring = hasEasing ? isObj(ease) : false;
  const staggerEase = hasSpring ?
    /** @type {Types.SpringEasing} */(ease).solver : hasEasing ?
    parseEasings(ease) : null;
  const grid = params.grid;
  const axis = params.axis;
  const fromFirst = isUnd(from) || from === 0 || from === 'first';
  const fromCenter = from === 'center';
  const fromLast = from === 'last';
  const isRange = isArr(val);
  const val1 = isRange ? parseNumber(val[0]) : parseNumber(/** @type {String|Number} */(val));
  const val2 = isRange ? parseNumber(val[1]) : 0;
  const unitMatch = unitsExecRgx.exec(isRange ? val[1] : val);
  const start = params.start || 0 + (isRange ? val1 : 0);
  let fromIndex = fromFirst ? 0 : isNum(from) ? /** @type {Number} */(from) : 0;
  return (_, i, t, tl) => {
    if (fromCenter) fromIndex = (t - 1) / 2;
    if (fromLast) fromIndex = t - 1;
    if (!values.length) {
      for (let index = 0; index < t; index++) {
        if (!grid) {
          values.push(abs(fromIndex - index));
        } else {
          const fromX = !fromCenter ? fromIndex % grid[0] : (grid[0] - 1) / 2;
          const fromY = !fromCenter ? floor(fromIndex / grid[0]) : (grid[1] - 1) / 2;
          const toX = index % grid[0];
          const toY = floor(index / grid[0]);
          const distanceX = fromX - toX;
          const distanceY = fromY - toY;
          let value = sqrt(distanceX * distanceX + distanceY * distanceY);
          if (axis === 'x') value = -distanceX;
          if (axis === 'y') value = -distanceY;
          values.push(value);
        }
        maxValue = max(...values);
      }
      if (staggerEase) values = values.map(val => staggerEase(val / maxValue) * maxValue);
      if (reversed) values = values.map(val => axis ? (val < 0) ? val * -1 : -val : abs(maxValue - val));
    }
    const spacing = isRange ? (val2 - val1) / maxValue : val1;
    const offset = tl ? parseTimelinePosition(tl, isUnd(params.start) ? tl._iterationDuration : start) : /** @type {Number} */(start);
    /** @type {String|Number} */
    let output = offset + ((spacing * round(values[i], 2)) || 0);
    if (params.modifier) output = params.modifier(output);
    if (unitMatch) output = `${output}${unitMatch[2]}`;
    return output;
  }
};

class Animatable {
  /**
   * @param {Types.TargetsParam} targets
   * @param {Types.AnimationParams} parameters
   */
  constructor(targets, parameters) {
    const globalParams = {};
    const properties = {};
    if (isUnd(targets) || isUnd(parameters)) return;
    for (let propName in parameters) {
      const paramValue = parameters[propName];
      if (isKey(propName)) {
        properties[propName] = paramValue;
      } else {
        globalParams[propName] = paramValue;
      }
    }
    for (let propName in properties) {
      const propValue = properties[propName];
      const isObjValue = isObj(propValue);
      let propParams = {};
      let to = '+=0';
      if (isObjValue) {
        // Handle specific unit definition like this { to: 'rem' }
        if (isStr(propValue.to)) to += propValue.to;
      } else {
        propParams.duration = propValue;
      }
      propParams[propName] = isObjValue ? mergeObjects({ to }, propValue) : to;
      const animParams = mergeObjects(globalParams, propParams);
      const animation = new Animation(targets, animParams, null, false).init();
      /** @type {Types.AnimatableProperty} */
      this[propName] = (to, duration, ease) => {
        if (isUnd(to)) {
          const tween = animation._head;
          return tween._modifier(tween._number);
        } else {
          const easeFunction = !isUnd(ease) ? parseEasings(ease) : null;
          forEachChildren(animation, (/** @type {Types.Tween} */tween) => {
            tween._fromNumber = tween._number;
            tween._toNumber = to;
            tween._currentTime = 0;
            if (easeFunction) tween._ease = easeFunction;
          });
          if (!isUnd(duration)) animation.stretch(duration);
          return animation.seek(0).resetTime().play();
        }
      };
    }
  }
}

class Transforms {
  /**
   * @param {Types.DOMTarget} $el
   */
  constructor($el) {
    this.$el = $el;
    this.inlineTransforms = [];
    this.point = new DOMPoint();
    this.inversedMatrix = this.getMatrix().inverse();
  }

  /**
   * @param {Number} x
   * @param {Number} y
   * @return {DOMPoint}
   */
  normalizePoint(x, y) {
    this.point.x = x;
    this.point.y = y;
    return this.point.matrixTransform(this.inversedMatrix);
  }

  /**
   * @callback TraverseParentsCallback
   * @param {Types.DOMTarget} $el
   * @param {Number} i
   */

  /**
   * @param {TraverseParentsCallback} cb
   */
  traverseUp(cb) {
    let $el = /** @type {Types.DOMTarget} */(this.$el.parentNode), i = 0;
    while ($el && $el !== doc) {
      cb($el, i);
      $el = /** @type {Types.DOMTarget} */($el.parentNode);
      i++;
    }
  }

  getMatrix() {
    const matrix = new DOMMatrix();
    this.traverseUp($el => {
      const elMatrix = new DOMMatrix(/** @type {String} */(getTargetValue($el, 'transform')));
      matrix.preMultiplySelf(elMatrix);
    });
    return matrix;
  }

  remove() {
    this.traverseUp(($el, i) => {
      this.inlineTransforms[i] = $el.style.transform;
      $el.style.transform = 'none';
    });
  }

  revert() {
    this.traverseUp(($el, i) => {
      const ct = this.inlineTransforms[i];
      if (ct === '') {
        $el.style.removeProperty('transform');
      } else {
        $el.style.transform = ct;
      }
    });
  }
}

let zIndex = 0;

class Draggable {
  /**
   * @param {Types.TargetsParam} target
   * @param {Types.AnimationParams} [parameters]
   */
  constructor(target, parameters = {}) {
    if (!target) return;
    const animatableParams = {};
    const paramX = parameters.x;
    const paramY = parameters.y;
    const trigger = parameters.trigger;
    const modifier = parameters.modifier;
    const container = parameters.container;
    const ease = parameters.ease;
    const xProp = isObj(paramX) && !isUnd(paramX.mapTo) ? paramX.mapTo : 'x';
    const yProp = isObj(paramY) && !isUnd(paramY.mapTo) ? paramY.mapTo : 'y';
    if (modifier) animatableParams.modifier = modifier;
    this.margin = setValue(parameters.margin, 0);
    this.snap = setValue(parameters.snap, 0);
    this.scrollSpeed = setValue(parameters.scrollSpeed, 15);
    this.dragSpeed = setValue(parameters.dragSpeed, 1);
    this.ease = ease ? parseEasings(ease) : eases.out(5);
    this.onGrab = parameters.onGrab || noop;
    this.onDrag = parameters.onDrag || noop;
    this.onDrop = parameters.onDrop || noop;
    this.onSnap = parameters.onSnap || noop;
    this.disabled = [0, 0];
    this.containerBoundsFriction = setValue(parameters.boundsFriction, .125);
    if (isUnd(paramX)) {
      animatableParams[xProp] = 0;
    } else if (isObj(paramX)) {
      animatableParams[xProp] = paramX;
    } else if (paramX === false) {
      animatableParams[xProp] = 0;
      this.disabled[0] = 1;
    }
    if (isUnd(paramY)) {
      animatableParams[yProp] = 0;
    } else if (isObj(paramY)) {
      animatableParams[yProp] = paramY;
    } else if (paramY === false) {
      animatableParams[yProp] = 0;
      this.disabled[1] = 1;
    }
    this.container = isArr(container) ? container : null;
    this.$target = /** @type {Types.DOMTarget} */(parseTargets(target)[0]);
    this.$trigger = /** @type {Types.DOMTarget} */(parseTargets(trigger ? trigger : target)[0]);
    this.$container = /** @type {Types.DOMTarget} */(container && !this.container ? parseTargets(container)[0] : doc.body);
    const animatable = new Animatable(this.$target, animatableParams);
    this.x = animatable[xProp];
    this.y = animatable[yProp];
    this.destX = 0;
    this.destY = 0;
    this.scroll = {x: 0, y: 0};
    this.coords = [this.x(), this.y()]; // x, y, w, h
    this.snapped = [0, 0]; // x, y, w, h
    this.pointer = [0, 0, 0, 0]; // x, y, temp x, temp y
    this.scrollView = [0, 0]; // w, h
    this.dragArea = [0, 0, 0, 0]; // x, y, w, h
    this.containerBounds = [-maxValue, -maxValue, maxValue, maxValue]; // l, t, r, b
    this.scrollBounds = [0, 0, 0, 0]; // l, t, r, b
    this.targetBounds = [0, 0, 0, 0]; // l, t, r, b
    this.window = [0, 0]; // w, h
    this.speed = 0;
    this.angle = 0;
    this.touchActionStyles = setTargetValues(this.$trigger, { touchAction: 'none' });
    this.triggerStyles = null;
    this.bodyStyles = null;
    this.targetStyles = null;
    this.transforms = new Transforms(this.$target);
    this.containerScroll = setValue(parameters.containerScroll, 50);
    this.updateTicker = new Timer({ autoplay: false, onUpdate: () => this.update() }).init();
    this.dragging = false;
    this.contained = !isUnd(container);
    this.useWin = this.$container === doc.body;
    this.$scrollContainer = this.useWin ? win : this.$container;
    this.isFinePointer = matchMedia('(pointer:fine)').matches;
    this.$trigger.addEventListener('pointerdown', this, false);
    this.$trigger.addEventListener('mouseenter', this, false);
  }

  destroy() {
    this.touchActionStyles.revert();
    if (this.triggerStyles) {
      this.triggerStyles.revert();
      this.triggerStyles = null;
    }
    if (this.bodyStyles) {
      this.bodyStyles.revert();
      this.bodyStyles = null;
    }
    if (this.targetStyles) {
      this.targetStyles.revert();
      this.targetStyles = null;
    }
    this.updateTicker.cancel();
    this.$trigger.removeEventListener('pointerdown', this);
    doc.removeEventListener('pointermove', this);
    doc.removeEventListener('pointerup', this);
    doc.removeEventListener('pointercancel', this);
    win.removeEventListener('selectstart', this);
  }

  /**
   * @param {Number} x
   * @param {Number} y
   * @param {Number} [duration]
   * @param {Types.EasingParam} [ease]
   */
  setPosition(x, y, duration, ease) {
    if (!this.disabled[0]) {
      this.destX = x;
      this.snapped[0] = snap(x, this.snap);
      this.x(x, duration, ease);
    }
    if (!this.disabled[1]) {
      this.destY = y;
      this.snapped[1] = snap(y, this.snap);
      this.y(y, duration, ease);
    }
  }

  updateScrollCoords() {
    const sx = round(this.useWin ? win.scrollX : this.$container.scrollLeft);
    const sy = round(this.useWin ? win.scrollY : this.$container.scrollTop);
    const cm = this.margin;
    this.scroll.x = sx;
    this.scroll.y = sy;
    this.scrollBounds[0] = sx - this.targetBounds[0] + cm;
    this.scrollBounds[1] = sy - this.targetBounds[1] + cm;
    this.scrollBounds[2] = sx - this.targetBounds[2] - cm;
    this.scrollBounds[3] = sy - this.targetBounds[3] - cm;
  }

  updateBoundingValues() {
    const cx = this.x();
    const cy = this.y();
    const iw = this.window[0] = win.innerWidth;
    const ih = this.window[1] = win.innerHeight;
    const uw = this.useWin;
    const cs = this.containerScroll;
    const cm = this.margin;
    const sw = this.$container.scrollWidth;
    const sh = this.$container.scrollHeight;
    const transformContainerRect = this.$container.getBoundingClientRect();
    this.dragArea[0] = uw ? 0 : transformContainerRect.left;
    this.dragArea[1] = uw ? 0 : transformContainerRect.top;
    this.scrollView[0] = uw ? clamp(sw, iw, sw) : sw;
    this.scrollView[1] = uw ? clamp(sh, ih, sh) : sh;
    this.setPosition(0, 0, 0);
    this.transforms.remove();
    this.updateScrollCoords();
    const { width, height, left, top, right, bottom } = this.$container.getBoundingClientRect();
    this.dragArea[2] = round(uw ? clamp(width, iw, iw) : width);
    this.dragArea[3] = round(uw ? clamp(height, ih, ih) : height);
    if (this.contained) {
      const sx = this.scroll.x;
      const sy = this.scroll.y;
      const targetRect = this.$target.getBoundingClientRect();
      const hiddenLeft = cs ? uw ? 0 : this.$container.scrollLeft : 0;
      const hiddenTop = cs ? uw ? 0 : this.$container.scrollTop : 0;
      const hiddenRight = cs ? this.scrollView[0] - hiddenLeft - width : 0;
      const hiddenBottom = cs ? this.scrollView[1] - hiddenTop - height : 0;
      this.targetBounds[0] = (targetRect.left + sx) - (uw ? 0 : left);
      this.targetBounds[1] = (targetRect.top + sy) - (uw ? 0 : top);
      this.targetBounds[2] = (targetRect.right + sx) - (uw ? iw : right);
      this.targetBounds[3] = (targetRect.bottom + sy) - (uw ? ih : bottom);
      if (this.container) {
        this.containerBounds[0] = this.container[0];
        this.containerBounds[1] = this.container[1];
        this.containerBounds[2] = this.container[2];
        this.containerBounds[3] = this.container[3];
      } else {
        this.containerBounds[0] = -round(targetRect.left - left + hiddenLeft - cm);
        this.containerBounds[1] = -round(targetRect.top - top + hiddenTop - cm);
        this.containerBounds[2] = -round(targetRect.right - right - hiddenRight + cm);
        this.containerBounds[3] = -round(targetRect.bottom - bottom - hiddenBottom + cm);
      }

    }
    this.transforms.revert();
    this.setPosition(cx, cy, 0);
  }

  /**
   * @param  {Array} bounds
   * @param  {Number} x
   * @param  {Number} y
   * @return {Boolean}
   */
  isOutOfBounds(bounds, x, y) {
    if (!this.contained) return false;
    const [ bl, bt, br, bb ] = bounds;
    const [ dx, dy ] = this.disabled;
    return !dx && x < bl || !dx && x > br || !dy && y < bt || !dy && y > bb;
  }

  update() {
    const [ px, py ] = this.pointer;
    const [ cl, ct, cr, cb ] = this.containerBounds;
    const scrollPad = this.containerScroll;
    const bf = this.containerBoundsFriction;
    this.updateScrollCoords();
    if (!this.container && this.contained && scrollPad) {
      const [ sw, sh ] = this.scrollView;
      const csx = this.scroll.x;
      const csy = this.scroll.y;
      const daw = this.dragArea[2];
      const dah = this.dragArea[3];
      const nsw = this.$container.scrollWidth;
      const nsh = this.$container.scrollHeight;
      const csw = this.useWin ? clamp(nsw, this.window[0], nsw) : nsw;
      const csh = this.useWin ? clamp(nsh, this.window[1], nsh) : nsh;
      const swd = sw - csw;
      const shd = sh - csh;
      // Handle cases where the scrollarea dimensions changes during drag
      if (swd > 0 || shd > 0) {
        if (swd > 0) {
          this.coords[0] -= swd;
          this.scrollView[0] = csw;
        }
        if (shd > 0) {
          this.coords[1] -= shd;
          this.scrollView[1] = csh;
        }
      // Handle autoscroll when target is at the edges of the scroll bounds
      } else {
        const s = this.scrollSpeed;
        const [ x, y ] = this.coords;
        const [ sl, st, sr, sb ] = this.scrollBounds;
        const l = round(clamp((x - sl) / scrollPad, -1, 0) * s);
        const r = round(clamp((x - sr) / scrollPad, 0, 1) * s);
        const t = round(clamp((y - st) / scrollPad, -1, 0) * s);
        const b = round(clamp((y - sb) / scrollPad, 0, 1) * s);
        if (l || t || r || b) {
          const scrollX = round(clamp(csx + (l || r), 0, sw - daw));
          const scrollY = round(clamp(csy + (t || b), 0, sh - dah));
          this.coords[0] -= csx - scrollX;
          this.coords[1] -= csy - scrollY;
          this.$scrollContainer.scrollTo(scrollX, scrollY);
        }
      }
    }
    this.coords[0] += (px - this.pointer[2]) * this.dragSpeed;
    this.coords[1] += (py - this.pointer[3]) * this.dragSpeed;
    this.pointer[2] = px;
    this.pointer[3] = py;
    const [ cx, cy ] = this.coords;
    const [ sx, sy ] = this.snapped;
    this.setPosition(
      // Apply friction if out of bounds
      cx > cr ? cr + (cx - cr) * bf : cx < cl ? cl + (cx - cl) * bf : cx,
      cy > cb ? cb + (cy - cb) * bf : cy < ct ? ct + (cy - ct) * bf : cy,
      0
    );
    const [ nsx, nsy ] = this.snapped;
    if (nsx !== sx || nsy !== sy) {
      this.onSnap(this);
    }
  }

  handleHover() {
    if (this.isFinePointer && !this.triggerStyles) {
      this.triggerStyles = setTargetValues(this.$trigger, { cursor: 'grab' });
    }
  }

  /**
   * @param {PointerEvent} e
   */
  handleDown(e) {
    if (this.dragging) return;
    const { x, y } = this.transforms.normalizePoint(e.clientX, e.clientY);
    this.dragging = true;
    this.updateBoundingValues();
    this.x(this.x(), 0);
    this.y(this.y(), 0);
    this.coords[0] = this.x();
    this.coords[1] = this.y();
    this.pointer[2] = x;
    this.pointer[3] = y;
    this.speed = 0;
    this.angle = 0;
    if (this.targetStyles) {
      this.targetStyles.revert();
      this.targetStyles = null;
    }
    const z = /** @type {Number} */(getTargetValue(this.$target, 'zIndex', false));
    zIndex = z > zIndex ? z : zIndex + 1;
    this.targetStyles = setTargetValues(this.$target, { zIndex });
    if (this.isFinePointer) {
      if (this.triggerStyles) {
        this.triggerStyles.revert();
        this.targetStyles = null;
      }
      this.bodyStyles = setTargetValues(doc.body, { cursor: 'grabbing' });
    }
    doc.addEventListener('pointermove', this, false);
    doc.addEventListener('pointerup', this, false);
    doc.addEventListener('pointercancel', this, false);
    win.addEventListener('selectstart', this, false);
    this.onGrab(this);
  }

  /**
   * @param {PointerEvent} e
   */
  handleMove(e) {
    if (!this.dragging) return;
    e.preventDefault();
    if (!this.triggerStyles) {
      this.triggerStyles = setTargetValues(this.$trigger, { pointerEvents: 'none' });
    }
    const { x, y } = this.transforms.normalizePoint(e.clientX, e.clientY);
    const dt = this.updateTicker.play().deltaTime;
    const dx = (x - this.pointer[2]);
    const dy = (y - this.pointer[3]);
    this.speed = dt > 0 ? Math.sqrt(dx * dx + dy * dy) / dt : 0;
    this.angle = Math.atan2(dy, dx);
    this.pointer[0] = x;
    this.pointer[1] = y;
    this.onDrag(this);
  }

  handleUp() {
    if (!this.dragging) return;
    this.dragging = false;
    this.updateTicker.pause();

    if (this.triggerStyles) {
      this.triggerStyles.revert();
      this.triggerStyles = null;
    }

    if (this.isFinePointer && this.bodyStyles) {
      this.bodyStyles.revert();
      this.bodyStyles = null;
    }

    const [ bl, bt, br, bb ] = this.containerBounds;
    const [ sx, sy ] = this.snapped;
    const cx = this.x();
    const cy = this.y();
    let destX = clamp(cx, bl, br);
    let destY = clamp(cy, bt, bb);
    let duration = 650;

    // The drag ends outside the container: smoothly animate back inside
    if (this.isOutOfBounds(this.containerBounds, cx, cy)) {
      this.setPosition(snap(destX, this.snap), snap(destY, this.snap), duration, this.ease);
    // The drag ends inside the container: check where the target position will ends
    } else {
      const s = this.speed;
      const ds = s * 100;
      const dx = s ? Math.cos(this.angle) * ds : 0;
      const dy = s ? Math.sin(this.angle) * ds : 0;
      const x = cx + dx;
      const y = cy + dy;
      const v = round(clamp(ds / 50, 0, 20), 2);
      const springEasing = spring(1, 80, 15, v);
      const springEase = springEasing.solver;
      duration = springEasing.duration;
      destX = clamp(x, bl, br);
      destY = clamp(y, bt, bb);
      // The target ends outside the container: apply spring easing
      if (this.isOutOfBounds(this.containerBounds, x, y)) {
        const bounceX = !this.disabled[0] && (x > br || x < bl);
        const bounceY = !this.disabled[1] && (y > bb || y < bt);
        const bx = bounceX && !bounceY;
        const by = bounceY && !bounceX;
        const bouncedX = by ? clamp(destX + ((destX - cx) * .25), bl, br) : destX;
        const bouncedY = bx ? clamp(destY + ((destY - cy) * .25), bt, bb) : destY;
        const easeX = by ? this.ease : springEase;
        const easeY = bx ? this.ease : springEase;
        destX = snap(bouncedX, this.snap);
        destY = snap(bouncedY, this.snap);
        if (!this.disabled[0]) this.x(destX, duration, easeX);
        if (!this.disabled[1]) this.y(destY, duration, easeY);
      // The target ends inside the container: simple ease
      } else {
        destX = snap(destX, this.snap);
        destY = snap(destY, this.snap);
        this.setPosition(destX, destY, duration * .65, this.ease);
      }
    }

    // Keep the target in view by scrollin the viewport
    if (!this.container && this.isOutOfBounds(this.scrollBounds, destX, destY)) {
      const [ sl, st, sr, sb ] = this.scrollBounds;
      const l = round(clamp(destX - sl, -maxValue, 0));
      const r = round(clamp(destX - sr, 0, maxValue));
      const t = round(clamp(destY - st, -maxValue, 0));
      const b = round(clamp(destY - sb, 0, maxValue));
      new Animation(this.scroll, {
        x: round(this.scroll.x + (l || r)),
        y: round(this.scroll.y + (t || b)),
        duration: duration * .75,
        ease: this.ease,
        onUpdate: () => this.$scrollContainer.scrollTo(this.scroll.x, this.scroll.y)
      }).init();
    }

    this.destX = destX;
    this.destY = destY;
    this.onDrop(this);
    if (destX !== sx || destY !== sy) {
      this.snapped[0] = destX;
      this.snapped[1] = destY;
      this.onSnap(this);
    }

    doc.removeEventListener('pointermove', this);
    doc.removeEventListener('pointerup', this);
    doc.removeEventListener('pointercancel', this);
    win.removeEventListener('selectstart', this);
  }

  /**
   * @param {PointerEvent} e
   */
  handleEvent(e) {
    switch (e.type) {
      case 'pointerdown':
        this.handleDown(e);
        break;
      case 'pointermove':
        this.handleMove(e);
        break;
      case 'pointerup':
        this.handleUp();
        break;
      case 'pointercancel':
        this.handleUp();
        break;
      case 'mouseenter':
        this.handleHover();
        break;
      case 'selectstart':
        e.preventDefault();
        break;
    }
  }
}

// Main methods

/**
 * @param {Types.TimerParams} [parameters]
 * @return {Timer}
 */
const createTimer = parameters => new Timer(parameters).init();

/**
 * @param {Types.TargetsParam} targets
 * @param {Types.AnimationParams} parameters
 * @return {Animation}
 */
const animate = (targets, parameters) => new Animation(targets, parameters, null, false).init();

/**
 * @param {Types.TimelineParams} [parameters]
 * @return {Timeline}
 */
const createTimeline = parameters => new Timeline(parameters).init();

/**
 * @param {Types.TargetsParam} targets
 * @param {Types.AnimationParams} parameters
 * @return {Types.Animatable}
 */
const createAnimatable = (targets, parameters) => /** @type {Types.Animatable} */(new Animatable(targets, parameters));

/**
 * @param {Types.TargetsParam} target
 * @param {Types.AnimationParams} [parameters]
 * @return {Draggable}
 */
const createDraggable = (target, parameters) => new Draggable(target, parameters);

// Global Object and visibility checks

if (isBrowser) {
  if (!win.AnimeJS) win.AnimeJS = [];
  win.AnimeJS.push({
    version: '4.0.0-beta.95',
    engine,
  });
  doc.addEventListener('visibilitychange',
    () => engine.suspendWhenHidden ? doc.hidden ? engine.suspend() : engine.resume() : 0
  );
}

export { Types, animate, createAnimatable, createDraggable, createTimeline, createTimer, defaults, eases, engine, spring, stagger, svg, utils };
