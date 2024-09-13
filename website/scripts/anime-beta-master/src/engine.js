/// <reference path='./types.js' />

import {
  tickModes,
  isBrowser,
} from './consts.js';

import {
  now,
  forEachChildren,
  removeChild,
} from './helpers.js';

import {
  Clock,
} from './clock.js';

import {
  additive,
} from './additive.js';

import {
  tick,
} from './render.js';

/**
 * @type {Function}
 * @return {Number}
 */
export const engineTickMethod = isBrowser ? requestAnimationFrame : setImmediate;

/**
 * @type {Function}
 * @return {Number}
 */
export const engineCancelMethod = isBrowser ? cancelAnimationFrame : clearImmediate;

export class Engine extends Clock {
  constructor() {
    super();

    // Clock's parameters
    const initTime = now();
    this.currentTime = initTime;
    this._elapsedTime = initTime;
    this._startTime = initTime;
    this._lastTime = initTime;

    // Engine's parameters
    this.useDefaultMainLoop = true;
    this.suspendWhenHidden = true;
    this._reqId = 0;
    this._stopped = false;
    this._suspended = false;
    /** @type {Tickable} */
    this._head = null;
    /** @type {Tickable} */
    this._tail = null;
  }

  update() {
    const time = this.currentTime = now();
    if (this.requestTick(time)) {
      this.computeDeltaTime(time);
      const engineSpeed = this._speed;
      const engineFps = this._fps;
      let activeTickable = this._head;
      while (activeTickable) {
        const nextTickable = activeTickable._next;
        if (!activeTickable.paused) {
          tick(
            activeTickable,
            (time - activeTickable._startTime) * activeTickable._speed * engineSpeed,
            0, // !muteCallbacks
            0, // !internalRender
            // Only process the tick of the child clock if its frameRate is lower than the engine
            activeTickable._fps < engineFps ? activeTickable.requestTick(time) : tickModes.AUTO
          );
        } else {
          removeChild(engine, activeTickable);
          this._hasChildren = !!this._tail;
          activeTickable._running = false;
          if (activeTickable.completed && !activeTickable._cancelled) {
            activeTickable.cancel();
          }
        }
        activeTickable = nextTickable;
      }
      additive.update();
    }
  }

  stop() {
    this._stopped = true;
    return killEngine();
  }

  start() {
    if (this._suspended || this._stopped) {
      forEachChildren(this, (/** @type {Tickable} */child) => child.resetTime());
      this._suspended = false;
      this._stopped = false;
    }
    if (this.useDefaultMainLoop && !this._reqId) {
      this._reqId = engineTickMethod(tickEngine);
    }
    return this;
  }

  suspend() {
    this._suspended = true;
    return killEngine();
  }

  resume() {
    return this._stopped ? this : this.start();
  }

  get playbackRate() {
    return super.playbackRate;
  }

  set playbackRate(playbackRate) {
    super.playbackRate = playbackRate;
    // Forces children time to reset by reseting their playbackRate
    forEachChildren(this, (/** @type {Tickable} */child) => child.playbackRate = child._speed);
  }
}

export const engine = new Engine();

const tickEngine = () => {
  if (engine._head) {
    engine._reqId = engineTickMethod(tickEngine);
    engine.update();
  } else {
    engine._reqId = 0;
  }
}

const killEngine = () => {
  engineCancelMethod(engine._reqId);
  engine._reqId = 0;
  return engine;
}
