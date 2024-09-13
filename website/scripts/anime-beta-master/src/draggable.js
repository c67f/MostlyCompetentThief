/// <reference path='./types.js' />

import {
  globals,
} from './globals.js';

import {
  Animation,
} from './animation.js';

import {
  Animatable,
} from './animatable.js';

import {
  win,
  doc,
  maxValue,
  noop,
  draggableSymbol,
} from './consts.js';

import {
  parseTargets,
} from './targets.js';

import {
  snap,
  clamp,
  round,
  isObj,
  isUnd,
  isArr,
} from './helpers.js';

import {
  getTargetValue,
  setTargetValues,
  remove,
  mapRange,
} from './utils.js';

import {
  Timer,
} from './timer.js';

import {
  setValue,
} from './values.js';

import {
  eases,
  parseEasings,
} from './eases.js';

import {
  spring
} from './spring.js';

class DOMProxy {
  /** @param {Object} el */
  constructor(el) {
    this.el = el;
    this.zIndex = 0;
    this.parentElement = null;
    this.classList = {
      add: noop,
      remove: noop,
    }
  }

  get x() { return this.el.x || 0 };
  set x(v) { this.el.x = v };

  get y() { return this.el.y || 0 };
  set y(v) { this.el.y = v };

  get width() { return this.el.width || 0 };
  set width(v) { this.el.width = v };

  get height() { return this.el.height || 0 };
  set height(v) { this.el.height = v };

  getBoundingClientRect() {
    return {
      top: this.y,
      right: this.x,
      bottom: this.y + this.height,
      left: this.x + this.width,
    }
  }
}

class Transforms {
  /**
   * @param {DOMTarget|DOMProxy} $el
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
   * @param {DOMTarget} $el
   * @param {Number} i
   */

  /**
   * @param {TraverseParentsCallback} cb
   */
  traverseUp(cb) {
    let $el = /** @type {DOMTarget|Document} */(this.$el.parentElement), i = 0;
    while ($el && $el !== doc) {
      cb(/** @type {DOMTarget} */($el), i);
      $el = /** @type {DOMTarget} */($el.parentElement);
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

export class Draggable {
  /**
   * @param {TargetsParam} target
   * @param {DraggableParams} [parameters]
   */
  constructor(target, parameters = {}) {
    if (!target) return;
    if (globals.scope) globals.scope.revertibles.push(this);
    const paramX = parameters.x;
    const paramY = parameters.y;
    const trigger = parameters.trigger;
    const modifier = parameters.modifier;
    const container = parameters.container;
    const cp = parameters.containerPadding || 0;
    const containerPadding = /** @type {Array<Number>} */(isArr(cp) ? cp : [cp, cp, cp, cp]);
    const ease = parameters.releaseEase;
    const xProp = /** @type {String} */(isObj(paramX) && !isUnd(/** @type {Object} */(paramX).mapTo) ? /** @type {Object} */(paramX).mapTo : 'x');
    /** @type {String} */
    const yProp = isObj(paramY) && !isUnd(/** @type {Object} */(paramY).mapTo) ? /** @type {Object} */(paramY).mapTo : 'y';
    this.snapX = setValue(parameters.snap, 0);
    this.snapY = setValue(parameters.snap, 0);
    this.scrollSpeed = setValue(parameters.scrollSpeed, 1.5);
    this.scrollThreshold = setValue(parameters.scrollThreshold, 20);
    this.dragSpeed = setValue(parameters.dragSpeed, 1);
    this.releaseEase = ease ? parseEasings(ease) : null;
    this.releaseStiffness = setValue(parameters.releaseStiffness, 1);
    this.releaseVelocity = setValue(parameters.releaseVelocity, 1);
    this.container = isArr(container) ? container : null;
    this.$target = /** @type {DOMTarget} */(isObj(target) ? new DOMProxy(target) : parseTargets(target)[0]);
    this.$trigger = /** @type {DOMTarget} */(parseTargets(trigger ? trigger : target)[0]);
    this.fixed = getTargetValue(this.$target, 'position') === 'fixed';
    /** @type {DOMTarget} */
    this.$container = container && !this.container ? parseTargets(/** @type {DOMTarget} */(container))[0] : doc.body;
    /** @type {Array<Number>} */
    this.containerPadding = setValue(containerPadding, [0, 0, 0, 0]);
    this.containerFriction = clamp(0, setValue(parameters.containerFriction, .85), 1);
    this.onGrab = parameters.onGrab || noop;
    this.onDrag = parameters.onDrag || noop;
    this.onRelease = parameters.onRelease || noop;
    this.onUpdate = parameters.onUpdate || noop;
    this.onSettle = parameters.onSettle || noop;
    this.onSnap = parameters.onSnap || noop;
    this.disabled = [0, 0];
    /** @type {AnimatableParams} */
    const animatableParams = {};
    if (modifier) animatableParams.modifier = modifier;
    if (isUnd(paramX) || paramX === true) {
      animatableParams[xProp] = 0;
    } else if (isObj(paramX)) {
      const paramXObject = /** @type {DraggableAxisParam} */(paramX);
      const animatableXParams = {};
      if (paramXObject.modifier) animatableXParams.modifier = paramXObject.modifier;
      if (paramXObject.composition) animatableXParams.composition = paramXObject.composition;
      if (!isUnd(paramXObject.snap)) this.snapX = paramXObject.snap;
      animatableParams[xProp] = animatableXParams;
    } else if (paramX === false) {
      animatableParams[xProp] = 0;
      this.disabled[0] = 1;
    }
    if (isUnd(paramY) || paramY === true) {
      animatableParams[yProp] = 0;
    } else if (isObj(paramY)) {
      const paramYObject = /** @type {DraggableAxisParam} */(paramY);
      const animatableYParams = {};
      if (paramYObject.modifier) animatableYParams.modifier = paramYObject.modifier;
      if (paramYObject.composition) animatableYParams.composition = paramYObject.composition;
      if (!isUnd(paramYObject.snap)) this.snapY = paramYObject.snap;
      animatableParams[yProp] = animatableYParams;
    } else if (paramY === false) {
      animatableParams[yProp] = 0;
      this.disabled[1] = 1;
    }
    this.animate = new Animatable(this.$target, animatableParams);
    this.xProp = xProp;
    this.yProp = yProp;
    this.destX = 0;
    this.destY = 0;
    this.deltaX = 0;
    this.deltaY = 0;
    this.progresses = [0, 0]; // x, y
    this.scroll = {x: 0, y: 0};
    this.coords = [this.x, this.y, 0, 0]; // x, y, temp x, temp y
    this.snapped = [0, 0]; // x, y
    this.pointer = [0, 0, 0, 0]; // x, y, temp x, temp y
    this.scrollView = [0, 0]; // w, h
    this.dragArea = [0, 0, 0, 0]; // x, y, w, h
    this.containerBounds = [-maxValue, maxValue, maxValue, -maxValue]; // t, r, b, l
    this.scrollBounds = [0, 0, 0, 0]; // t, r, b, l
    this.targetBounds = [0, 0, 0, 0]; // t, r, b, l
    this.window = [0, 0]; // w, h
    this.velocity = 0;
    this.angle = 0;
    this.triggerStyles = null;
    this.bodyStyles = null;
    this.targetStyles = null;
    this.transforms = new Transforms(this.$target);
    this.updateTicker = new Timer({ autoplay: false, onUpdate: () => this.update() }, null, 0).init();
    this.grabbed = false;
    this.dragged = false;
    this.updated = false;
    this.released = false;
    this.contained = !isUnd(container);
    this.canScroll = false;
    this.useWin = this.$container === doc.body;
    this.$scrollContainer = this.useWin ? win : this.$container;
    this.isFinePointer = matchMedia('(pointer:fine)').matches;
    this.enabled = false;
    this.animate.animations[this.disabled[0] ? yProp : xProp ].onRender = () => {
      const hasMoved = this.grabbed && this.updated;
      const hasReleased = !hasMoved && this.released;
      if (hasMoved || hasReleased) {
        const x = this.x;
        const y = this.y;
        this.deltaX = this.coords[2] - x;
        this.deltaY = this.coords[3] - y;
        this.coords[2] = x;
        this.coords[3] = y;
        this.progresses[0] = mapRange(x, this.containerBounds[3], this.containerBounds[1], 0, 1);
        this.progresses[1] = mapRange(y, this.containerBounds[0], this.containerBounds[2], 0, 1);
      }
      if (hasMoved) {
        this.onUpdate(this);
        this.onDrag(this);
        this.updated = false;
      }
      if (hasReleased) {
        this.onUpdate(this);
      }
    }
    this.animate.animations[this.disabled[0] ? yProp : xProp ].onComplete = () => {
      if (!this.grabbed && this.released) {
        // Set eleased to false before calling onSettle to avoid recursion
        this.released = false;
        this.onSettle(this);
      }
    };
    this.enable();
    this.updateBoundingValues();
  }

  get x() {
    return round(this.animate[this.xProp](), 5);
  }

  set x(x) {
    if (this.disabled[0]) return;
    const v = round(x, 5);
    this.destX = v;
    this.snapped[0] = snap(v, this.snapX);
    this.animate[this.xProp](v, 0, eases.out(5));
  }

  get y() {
    return round(this.animate[this.yProp](), 5);
  }

  set y(y) {
    if (this.disabled[1]) return;
    const v = round(y, 5);
    this.destY = v;
    this.snapped[1] = snap(v, this.snapY);
    this.animate[this.yProp](v, 0, eases.out(5));
  }

  get progressX() {
    return this.progresses[0];
  }

  set progressX(x) {
    this.x = mapRange(x, 0, 1, this.containerBounds[3], this.containerBounds[1]);
    this.progresses[0] = x;
  }

  get progressY() {
    return this.progresses[1];
  }

  set progressY(y) {
    this.y = mapRange(y, 0, 1, this.containerBounds[0], this.containerBounds[2]);
    this.progresses[1] = y;
  }

  updateScrollCoords() {
    const sx = round(this.useWin ? win.scrollX : this.$container.scrollLeft, 0);
    const sy = round(this.useWin ? win.scrollY : this.$container.scrollTop, 0);
    const [ cpt, cpr, cpb, cpl ] = this.containerPadding;
    const threshold = this.scrollThreshold;
    this.scroll.x = sx;
    this.scroll.y = sy;
    this.scrollBounds[0] = sy - this.targetBounds[0] + cpt - threshold;
    this.scrollBounds[1] = sx - this.targetBounds[1] - cpr + threshold;
    this.scrollBounds[2] = sy - this.targetBounds[2] - cpb + threshold;
    this.scrollBounds[3] = sx - this.targetBounds[3] + cpl - threshold;
  }

  updateBoundingValues() {
    const cx = this.x;
    const cy = this.y;
    const iw = this.window[0] = win.innerWidth;
    const ih = this.window[1] = win.innerHeight;
    const uw = this.useWin;
    const sw = this.$container.scrollWidth;
    const sh = this.$container.scrollHeight;
    const fx = this.fixed;
    const transformContainerRect = this.$container.getBoundingClientRect();
    const [ cpt, cpr, cpb, cpl ] = this.containerPadding;
    this.dragArea[0] = uw ? 0 : transformContainerRect.left;
    this.dragArea[1] = uw ? 0 : transformContainerRect.top;
    this.scrollView[0] = uw ? clamp(sw, iw, sw) : sw;
    this.scrollView[1] = uw ? clamp(sh, ih, sh) : sh;
    this.x = 0;
    this.y = 0;
    this.transforms.remove();
    this.updateScrollCoords();
    const { width, height, left, top, right, bottom } = this.$container.getBoundingClientRect();
    this.dragArea[2] = round(uw ? clamp(width, iw, iw) : width, 0);
    this.dragArea[3] = round(uw ? clamp(height, ih, ih) : height, 0);
    this.canScroll = fx ? false : (sw > this.dragArea[2] + cpl - cpr || sh > this.dragArea[3] + cpt - cpb && !this.container && this.contained);
    if (this.contained) {
      const sx = this.scroll.x;
      const sy = this.scroll.y;
      const canScroll = this.canScroll;
      const targetRect = this.$target.getBoundingClientRect();
      const hiddenLeft = canScroll ? uw ? 0 : this.$container.scrollLeft : 0;
      const hiddenTop = canScroll ? uw ? 0 : this.$container.scrollTop : 0;
      const hiddenRight = canScroll ? this.scrollView[0] - hiddenLeft - width : 0;
      const hiddenBottom = canScroll ? this.scrollView[1] - hiddenTop - height : 0;
      this.targetBounds[0] = round((targetRect.top + sy) - (uw ? 0 : top), 0);
      this.targetBounds[1] = round((targetRect.right + sx) - (uw ? iw : right), 0);
      this.targetBounds[2] = round((targetRect.bottom + sy) - (uw ? ih : bottom), 0);
      this.targetBounds[3] = round((targetRect.left + sx) - (uw ? 0 : left), 0);
      if (this.container) {
        this.containerBounds[0] = this.container[0] + cpt;
        this.containerBounds[1] = this.container[1] - cpr;
        this.containerBounds[2] = this.container[2] - cpb;
        this.containerBounds[3] = this.container[3] + cpl;
      } else {
        this.containerBounds[0] = -round(targetRect.top - (fx ? clamp(top, 0, ih) : top) + hiddenTop - cpt, 0);
        this.containerBounds[1] = -round(targetRect.right - (fx ? clamp(right, 0, iw) : right) - hiddenRight + cpr, 0);
        this.containerBounds[2] = -round(targetRect.bottom - (fx ? clamp(bottom, 0, ih) : bottom) - hiddenBottom + cpb, 0);
        this.containerBounds[3] = -round(targetRect.left - (fx ? clamp(left, 0, iw) : left) + hiddenLeft - cpl, 0);
      }
    }
    const [ bt, br, bb, bl ] = this.containerBounds;
    this.transforms.revert();
    this.x = clamp(cx, bl, br);
    this.y = clamp(cy, bt, bb);
  }

  /**
   * @param  {Array} bounds
   * @param  {Number} x
   * @param  {Number} y
   * @return {Boolean}
   */
  isOutOfBounds(bounds, x, y) {
    if (!this.contained) return false;
    const [ bt, br, bb, bl ] = bounds;
    const [ dx, dy ] = this.disabled;
    return !dx && x < bl || !dx && x > br || !dy && y < bt || !dy && y > bb;
  }

  update() {
    this.updateScrollCoords();
    if (this.canScroll) {
      const [ cpt, cpr, cpb, cpl ] = this.containerPadding;
      const [ sw, sh ] = this.scrollView;
      const daw = this.dragArea[2];
      const dah = this.dragArea[3];
      const csx = this.scroll.x;
      const csy = this.scroll.y;
      const nsw = this.$container.scrollWidth;
      const nsh = this.$container.scrollHeight;
      const csw = this.useWin ? clamp(nsw, this.window[0], nsw) : nsw;
      const csh = this.useWin ? clamp(nsh, this.window[1], nsh) : nsh;
      const swd = sw - csw;
      const shd = sh - csh;
      // Handle cases where the scrollarea dimensions changes during drag
      if (this.dragged && (swd > 0 || shd > 0)) {
        if (swd > 0) {
          this.coords[0] -= swd;
          this.scrollView[0] = csw;
        }
        if (shd > 0) {
          this.coords[1] -= shd;
          this.scrollView[1] = csh;
        }
      }
      // // Handle autoscroll when target is at the edges of the scroll bounds
      // } else {
      const s = this.scrollSpeed * 10;
      const threshold = this.scrollThreshold;
      const [ x, y ] = this.coords;
      const [ st, sr, sb, sl ] = this.scrollBounds;
      const t = round(clamp((y - st + cpt) / threshold, -1, 0) * s, 0);
      const r = round(clamp((x - sr - cpr) / threshold, 0, 1) * s, 0);
      const b = round(clamp((y - sb - cpb) / threshold, 0, 1) * s, 0);
      const l = round(clamp((x - sl + cpl) / threshold, -1, 0) * s, 0);
      if (t || b || l || r) {
        const scrollX = round(clamp(csx + (l || r), 0, sw - daw), 0);
        const scrollY = round(clamp(csy + (t || b), 0, sh - dah), 0);
        this.coords[0] -= csx - scrollX;
        this.coords[1] -= csy - scrollY;
        this.$scrollContainer.scrollTo(scrollX, scrollY);
      }
      // }
    }
    const [ px, py ] = this.pointer;
    this.coords[0] += (px - this.pointer[2]) * this.dragSpeed;
    this.coords[1] += (py - this.pointer[3]) * this.dragSpeed;
    this.pointer[2] = px;
    this.pointer[3] = py;
    const [ nx, ny ] = this.disabled;
    const [ cx, cy ] = this.coords;
    const [ sx, sy ] = this.snapped;
    const [ ct, cr, cb, cl ] = this.containerBounds;
    const cf = (1 - this.containerFriction) * this.dragSpeed;
    if (!nx) {
      this.x = cx > cr ? cr + (cx - cr) * cf : cx < cl ? cl + (cx - cl) * cf : cx;
    }
    if (!ny) {
      this.y = cy > cb ? cb + (cy - cb) * cf : cy < ct ? ct + (cy - ct) * cf : cy;
    }
    const [ nsx, nsy ] = this.snapped;
    if (nsx !== sx && this.snapX || nsy !== sy && this.snapY) {
      this.onSnap(this);
    }
  }

  /**
   * @param {Number} gap
   * @param {Number} [duration]
   * @param {EasingParam} [ease]
   * @return {void}
   */
  scrollInView(gap, duration = 100, ease = eases.inOutQuad) {
    this.updateScrollCoords();
    const x = this.destX;
    const y = this.destY;
    const scroll = this.scroll;
    const scrollBounds = this.scrollBounds;
    const canScroll = this.canScroll;
    if (!this.container && this.isOutOfBounds(scrollBounds, x, y)) {
      const [ st, sr, sb, sl ] = scrollBounds;
      const t = round(clamp(y - st, -maxValue, 0), 0);
      const r = round(clamp(x - sr, 0, maxValue), 0);
      const b = round(clamp(y - sb, 0, maxValue), 0);
      const l = round(clamp(x - sl, -maxValue, 0), 0);
      new Animation(scroll, {
        x: round(scroll.x + (l ? l - gap : r ? r + gap : 0), 0),
        y: round(scroll.y + (t ? t - gap : b ? b + gap : 0), 0),
        duration,
        ease,
        onUpdate: () => {
          this.canScroll = false;
          this.$scrollContainer.scrollTo(scroll.x, scroll.y);
        }
      }).init().then(() => {
        this.canScroll = canScroll;
      })
    }
  }

  handleHover() {
    if (this.isFinePointer && !this.triggerStyles) {
      this.triggerStyles = setTargetValues(this.$trigger, { cursor: 'grab' });
    }
  }

  animateInView(duration = 350, ease = eases.out(5)) {
    this.updateBoundingValues();
    const x = this.x;
    const y = this.y;
    const [ cpt, cpr, cpb, cpl ] = this.containerPadding;
    const bt = this.scroll.y - this.targetBounds[0] + cpt;
    const br = this.scroll.x - this.targetBounds[1] - cpr;
    const bb = this.scroll.y - this.targetBounds[2] - cpb;
    const bl = this.scroll.x - this.targetBounds[3] + cpl;
    if (this.isOutOfBounds([bt, br, bb, bl], x, y)) {
      const [ disabledX, disabledY ] = this.disabled;
      const destX = clamp(snap(x, this.snapX), bl, br);
      const destY = clamp(snap(y, this.snapY), bt, bb);
      if (!disabledX) this.animate[this.xProp](destX, duration, ease);
      if (!disabledY) this.animate[this.yProp](destY, duration, ease);
    }
  }

  /**
   * @param {PointerEvent} e
   */
  handleDown(e) {
    const $eTarget = /** @type {HTMLInputElement}  */(e.target);
    if (this.grabbed || /** @type {HTMLInputElement}  */($eTarget).type === 'range' || ($eTarget[draggableSymbol] && $eTarget !== this.$trigger)) return;
    remove(this.scroll);
    const { x, y } = this.transforms.normalizePoint(e.clientX, e.clientY);
    this.grabbed = true;
    this.released = false;
    this.updateBoundingValues();
    // This cancel eventual ongoing release animations
    this.x = this.x;
    this.y = this.y;
    this.coords[0] = this.x;
    this.coords[1] = this.y;
    this.coords[2] = this.x;
    this.coords[3] = this.y;
    this.pointer[2] = x;
    this.pointer[3] = y;
    this.deltaX = 0;
    this.deltaY = 0;
    this.velocity = 0;
    this.angle = 0;
    if (this.targetStyles) {
      this.targetStyles.revert();
      this.targetStyles = null;
    }
    const z = /** @type {Number} */(getTargetValue(this.$target, 'zIndex', false));
    zIndex = (z > zIndex ? z : zIndex) + 1;
    this.targetStyles = setTargetValues(this.$target, { zIndex });
    if (this.isFinePointer) {
      if (this.triggerStyles) {
        this.triggerStyles.revert();
        this.targetStyles = null;
      }
      this.bodyStyles = setTargetValues(doc.body, { cursor: 'grabbing' });
    }
    this.scrollInView(0);
    this.onGrab(this);
    doc.addEventListener('pointermove', this, false);
    doc.addEventListener('pointerup', this, false);
    doc.addEventListener('pointercancel', this, false);
    win.addEventListener('selectstart', this, false);
  }

  /**
   * @param {PointerEvent} e
   */
  handleMove(e) {
    if (!this.grabbed) return;
    e.preventDefault();
    if (!this.triggerStyles) {
      this.triggerStyles = setTargetValues(this.$trigger, { pointerEvents: 'none' });
    }
    const { x, y } = this.transforms.normalizePoint(e.clientX, e.clientY);
    const dt = this.updateTicker.play().deltaTime;
    const dx = (x - this.pointer[2]);
    const dy = (y - this.pointer[3]);
    this.velocity = dt > 0 ? Math.sqrt(dx * dx + dy * dy) / dt : 0;
    this.angle = Math.atan2(dy, dx);
    this.pointer[0] = x;
    this.pointer[1] = y;
    this.dragged = true;
    this.updated = true;
    this.released = false;
  }

  handleUp() {
    if (!this.grabbed) return;

    this.updateTicker.pause();

    if (this.triggerStyles) {
      this.triggerStyles.revert();
      this.triggerStyles = null;
    }

    if (this.isFinePointer && this.bodyStyles) {
      this.bodyStyles.revert();
      this.bodyStyles = null;
    }

    const customEase = this.releaseEase;
    const ease = customEase ? customEase : eases.out(5);
    const [ bt, br, bb, bl ] = this.containerBounds;
    const [ sx, sy ] = this.snapped;
    const cx = this.x;
    const cy = this.y;
    const rv = this.releaseVelocity;
    const [ disabledX, disabledY ] = this.disabled;
    let destX = clamp(snap(cx, this.snapX), bl, br);
    let destY = clamp(snap(cy, this.snapY), bt, bb);
    let duration = 650;

    // if (this.isOutOfBounds(this.containerBounds, cx, cy)) {
    //   // The drag ends outside the container: smoothly animate back inside
    //   if (!disabledX) this.animate[this.xProp](destX, duration, ease);
    //   if (!disabledY) this.animate[this.yProp](destY, duration, ease);
    // } else {
      // The drag ends inside the container: check where the target position will ends
      const s = this.velocity;
      const cf = 1 - this.containerFriction;
      const ds = s * 100 * rv;
      const dx = s ? Math.cos(this.angle) * ds : 0;
      const dy = s ? Math.sin(this.angle) * ds : 0;
      const x = cx + dx;
      const y = cy + dy;
      const v = round(clamp(ds / 50, 0, 20), 2);
      const springEasing = spring(1, 80 * this.releaseStiffness, 15, v);
      const springEase = springEasing.solver;
      duration = !rv ? rv : springEasing.duration;
      destX = clamp(snap(x, this.snapX), bl, br);
      destY = clamp(snap(y, this.snapY), bt, bb);
      // The target ends outside the container: apply spring easing
      if (this.isOutOfBounds(this.containerBounds, x, y) && cf) {
        const bounceX = !disabledX && (x > br || x < bl);
        const bounceY = !disabledY && (y > bb || y < bt);
        const bx = bounceX && !bounceY;
        const by = bounceY && !bounceX;
        const bouncedX = by ? clamp(destX + ((destX - cx) * .25), bl, br) : destX;
        const bouncedY = bx ? clamp(destY + ((destY - cy) * .25), bt, bb) : destY;
        const easeX = by || customEase ? ease : springEase;
        const easeY = bx || customEase ? ease : springEase;
        destX = clamp(snap(bouncedX, this.snapX), bl, br);
        destY = clamp(snap(bouncedY, this.snapY), bt, bb);
        if (!disabledX) this.animate[this.xProp](destX, duration, easeX);
        if (!disabledY) this.animate[this.yProp](destY, duration, easeY);
      } else {
        // The target ends inside the container: simple ease
        const insideDur = duration * .5;
        if (!disabledX) this.animate[this.xProp](destX, insideDur, ease);
        if (!disabledY) this.animate[this.yProp](destY, insideDur, ease);
      }
    // }

    this.destX = destX;
    this.destY = destY;

    this.scrollInView(this.scrollThreshold, duration * .75, ease);
    this.onRelease(this);

    let hasSnapped = false;

    if (destX !== sx) {
      this.snapped[0] = destX;
      if (this.snapX) hasSnapped = true;
    }

    if (destY !== sy && this.snapY) {
      this.snapped[1] = destY;
      if (this.snapY) hasSnapped = true;
    }

    if (hasSnapped) this.onSnap(this);

    this.grabbed = false;
    this.dragged = false;
    this.released = true;

    doc.removeEventListener('pointermove', this);
    doc.removeEventListener('pointerup', this);
    doc.removeEventListener('pointercancel', this);
    win.removeEventListener('selectstart', this);
  }

  reset() {
    remove(this.scroll);
    this.grabbed = false;
    this.dragged = false;
    this.updated = false;
    this.released = false;
    this.canScroll = false;
    this.x = 0;
    this.y = 0;
    this.coords[0] = 0;
    this.coords[1] = 0;
    this.pointer[0] = 0;
    this.pointer[1] = 0;
    this.pointer[2] = 0;
    this.pointer[3] = 0;
    this.velocity = 0;
    this.angle = 0;
    return this;
  }

  enable() {
    if (!this.enabled) {
      this.enabled = true;
      this.$target[draggableSymbol] = true;
      this.$target.classList.remove('is-disabled');
      this.touchActionStyles = setTargetValues(this.$trigger, {touchAction: 'none'});
      this.$trigger.addEventListener('pointerdown', this);
      this.$trigger.addEventListener('mouseenter', this);
    }
    return this;
  }

  disable() {
    this.enabled = false;
    this.grabbed = false;
    this.dragged = false;
    this.updated = false;
    this.released = false;
    this.canScroll = false;
    this.$target[draggableSymbol] = false;
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
    remove(this.scroll);
    this.updateTicker.pause();
    this.$target.classList.add('is-disabled');
    this.$trigger.removeEventListener('pointerdown', this);
    this.$trigger.removeEventListener('mouseenter', this);
    doc.removeEventListener('pointermove', this);
    doc.removeEventListener('pointerup', this);
    doc.removeEventListener('pointercancel', this);
    win.removeEventListener('selectstart', this);
    return this;
  }

  revert() {
    this.reset();
    this.disable();
    this.$target.classList.remove('is-disabled');
    this.updateTicker.revert();
    return this;
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
