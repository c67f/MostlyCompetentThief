declare function cleanInlineStyles<T extends Renderable>(renderable: T): T;
declare class Animation extends Timer {
    constructor(targets: TargetsParam, parameters: AnimationParams, parent?: Timeline, parentPosition?: number, fastSet?: boolean, index?: number, length?: number);
    _head: Tween;
    _tail: Tween;
    targets: TargetsArray;
    onRender: AnimationCallback;
    _ease: EasingFunction;
    _inlineStyles: {};
    stretch(newDuration: number): this;
    refresh(): this;
    revert(): this;
    then(callback?: AnimationCallback): Promise<any>;
}
declare class Timer extends Clock {
    constructor(parameters?: TimerParams, parent?: Timeline, parentPosition?: number);
    id: string | number;
    parent: Timeline;
    duration: number;
    paused: boolean;
    began: boolean;
    completed: boolean;
    reversed: number;
    onBegin: TimerCallback;
    onUpdate: TimerCallback;
    onLoop: TimerCallback;
    onComplete: TimerCallback;
    _autoplay: boolean | ScrollObserver;
    _offset: number;
    _delay: number;
    _loopDelay: number;
    _iterationTime: number;
    _iterationDuration: number;
    _iterationCount: number;
    _currentIteration: number;
    _resolve: Function;
    _running: boolean;
    _cancelled: number;
    _reversed: number;
    _alternate: boolean;
    _backwards: boolean;
    _prev: Renderable;
    _next: Renderable;
    set progress(progress: number);
    get progress(): number;
    reset(internalRender?: number): this;
    init(internalRender?: number): this;
    resetTime(): this;
    pause(): this;
    play(): this;
    restart(): this;
    seek(time: number, muteCallbacks?: boolean | number, internalRender?: boolean | number): this;
    reverse(): this;
    playForward(): this;
    playBackward(): this;
    cancel(): this;
    stretch(newDuration: number): this;
    revert(): this;
    then(callback?: TimerCallback): Promise<any>;
}
declare class Clock {
    currentTime: number;
    deltaTime: number;
    _elapsedTime: number;
    _startTime: number;
    _lastTime: number;
    _scheduledTime: number;
    _frameDuration: number;
    _fps: number;
    _speed: number;
    _hasChildren: boolean;
    set frameRate(frameRate: number);
    get frameRate(): number;
    set playbackRate(playbackRate: number);
    get playbackRate(): number;
    requestTick(time: number): tickModes;
    computeDeltaTime(time: number): number;
}
declare const doc: Document;
type tweenTypes = number;
declare namespace tweenTypes {
    let INVALID: number;
    let OBJECT: number;
    let ATTRIBUTE: number;
    let CSS: number;
    let TRANSFORM: number;
    let CSS_VAR: number;
}
type valueTypes = number;
declare namespace valueTypes {
    let NUMBER: number;
    let UNIT: number;
    let COLOR: number;
    let COMPLEX: number;
}
type tickModes = number;
declare namespace tickModes {
    let NONE: number;
    let AUTO: number;
    let FORCE: number;
}
type compositionTypes = number;
declare namespace compositionTypes {
    let replace: number;
    let none: number;
    let blend: number;
}
declare function noop(): void;
type $Animation = Animation;
declare class Animatable {
    constructor(targets: TargetsParam, parameters: AnimatableParams);
    targets: (HTMLElement | SVGElement | JSTarget)[];
    animations: {};
    revert(): void;
}
type $Animatable = Animatable;
type Renderable = $Animation | Timeline;
type Tickable = Timer | Renderable;
type Revertible = Tickable | $Animatable | Draggable | ScrollObserver | Scope;
type FunctionValue = (target?: Target, index?: number, length?: number) => number | string | TweenObjectValue | Array<number | string | TweenObjectValue> | void;
type EasingFunction = (time: number) => number;
type SpringEasing = {
    duration: number;
    solver: EasingFunction;
};
type EaseStringParamNames = ('linear' | 'linear(x1, x2 25%, x3)' | 'in' | 'out' | 'inOut' | 'outIn' | 'inQuad' | 'outQuad' | 'inOutQuad' | 'outInQuad' | 'inCubic' | 'outCubic' | 'inOutCubic' | 'outInCubic' | 'inQuart' | 'outQuart' | 'inOutQuart' | 'outInQuart' | 'inQuint' | 'outQuint' | 'inOutQuint' | 'outInQuint' | 'inSine' | 'outSine' | 'inOutSine' | 'outInSine' | 'inCirc' | 'outCirc' | 'inOutCirc' | 'outInCirc' | 'inExpo' | 'outExpo' | 'inOutExpo' | 'outInExpo' | 'inBounce' | 'outBounce' | 'inOutBounce' | 'outInBounce' | 'inBack' | 'outBack' | 'inOutBack' | 'outInBack' | 'inElastic' | 'outElastic' | 'inOutElastic' | 'outInElastic' | 'irregular' | 'cubicBezier' | 'steps' | 'in(p = 1.675)' | 'out(p = 1.675)' | 'inOut(p = 1.675)' | 'outIn(p = 1.675)' | 'inBack(overshoot = 1.70158)' | 'outBack(overshoot = 1.70158)' | 'inOutBack(overshoot = 1.70158)' | 'outInBack(overshoot = 1.70158)' | 'inElastic(amplitude = 1, period = .3)' | 'outElastic(amplitude = 1, period = .3)' | 'inOutElastic(amplitude = 1, period = .3)' | 'outInElastic(amplitude = 1, period = .3)' | 'irregular(length = 10, randomness = 1)' | 'cubicBezier(x1, y1, x2, y2)' | 'steps(steps = 10)');
type EasingParam = (string & {}) | EaseStringParamNames | EasingFunction | SpringEasing;
type DOMTarget = HTMLElement | SVGElement | SVGGeometryElement;
type JSTarget = Record<string, any>;
type Target = DOMTarget | JSTarget;
type TargetSelector = Target | NodeList | string;
type DOMTargetSelector = DOMTarget | NodeList | string;
type DOMTargetsParam = Array<DOMTargetSelector> | DOMTargetSelector;
type DOMTargetsArray = Array<DOMTarget>;
type JSTargetsParam = Array<JSTarget> | JSTarget;
type JSTargetsArray = Array<JSTarget>;
type TargetsParam = Array<TargetSelector> | TargetSelector;
type TargetsArray = Array<Target>;
type TweenModifier = (value: number) => number | string;
type ColorArray = [number, number, number, number];
type Tween = {
    id: number;
    parent: Animation;
    property: string;
    target: Target;
    _value: string | number;
    _func: Function | null;
    _ease: EasingFunction;
    _fromNumbers: Array<number>;
    _toNumbers: Array<number>;
    _strings: Array<string>;
    _fromNumber: number;
    _toNumber: number;
    _numbers: Array<number>;
    _number: number;
    _unit: string;
    _modifier: TweenModifier;
    _currentTime: number;
    _delay: number;
    _updateDuration: number;
    _startTime: number;
    _changeDuration: number;
    _absoluteStartTime: number;
    _tweenType: tweenTypes;
    _valueType: valueTypes;
    _composition: number;
    _isOverlapped: number;
    _isOverridden: number;
    _renderTransforms: number;
    _prevRep: Tween;
    _nextRep: Tween;
    _prevAdd: Tween;
    _nextAdd: Tween;
    _prev: Tween;
    _next: Tween;
};
type TweenDecomposedValue = {
    /**
     * - Type
     */
    t: number;
    /**
     * - Single number value
     */
    n: number;
    /**
     * - Value unit
     */
    u: string;
    /**
     * - Value operator
     */
    o: string;
    /**
     * - Array of Numbers (in case of complex value type)
     */
    d: Array<number>;
    /**
     * - Strings (in case of complex value type)
     */
    s: Array<string>;
};
type TweenPropertySiblings = {
    _head: null | Tween;
    _tail: null | Tween;
};
type TweenLookups = Record<string, TweenPropertySiblings>;
type TweenReplaceLookups = WeakMap<Target, TweenLookups>;
type TweenAdditiveLookups = Map<Target, TweenLookups>;
type TimerOptions = {
    id?: number | string;
    duration?: TweenParamValue;
    delay?: TweenParamValue;
    loopDelay?: number;
    reversed?: boolean;
    alternate?: boolean;
    loop?: boolean | number;
    autoplay?: boolean | ScrollObserver;
    frameRate?: number;
    playbackRate?: number;
};
type TimerCallback = (self: Timer) => any;
type TimerCallbacks = {
    onComplete?: TimerCallback;
    onLoop?: TimerCallback;
    onBegin?: TimerCallback;
    onUpdate?: TimerCallback;
};
type TimerParams = TimerOptions & TimerCallbacks;
type TweenParamValue = number | string | FunctionValue;
type TweenPropValue = TweenParamValue | [TweenParamValue, TweenParamValue];
type TweenComposition = 'none' | 'replace' | 'blend' | compositionTypes;
type TweenParamsOptions = {
    duration?: TweenParamValue;
    delay?: TweenParamValue;
    ease?: EasingParam;
    modifier?: TweenModifier;
    composition?: TweenComposition;
};
type TweenValues = {
    from?: TweenParamValue;
    to?: TweenPropValue;
    fromTo?: TweenPropValue;
};
type TweenKeyValue = TweenParamsOptions & TweenValues;
type ArraySyntaxValue = Array<TweenKeyValue | TweenPropValue>;
type TweenOptions = TweenParamValue | (TweenPropValue | TweenKeyValue)[] | TweenKeyValue;
type TweenObjectValue = Partial<{
    to: TweenParamValue | Array<TweenParamValue>;
    from: TweenParamValue | Array<TweenParamValue>;
    fromTo: TweenParamValue | Array<TweenParamValue>;
}>;
type PercentageKeyframeOptions = {
    ease?: EasingParam;
};
type PercentageKeyframeParams = Record<string, TweenParamValue>;
type PercentageKeyframes = Record<string, PercentageKeyframeParams & PercentageKeyframeOptions>;
type DurationKeyframes = Array<Record<string, TweenOptions | TweenModifier | boolean> & TweenParamsOptions>;
type AnimationOptions = {
    keyframes?: PercentageKeyframes | DurationKeyframes;
    playbackEase?: EasingParam;
};
type AnimationCallback = (self: Animation) => any;
type AnimationCallbacks = {
    onComplete?: AnimationCallback;
    onLoop?: AnimationCallback;
    onRender?: AnimationCallback;
    onBegin?: AnimationCallback;
    onUpdate?: AnimationCallback;
};
type AnimationParams = Record<string, TweenOptions | AnimationCallback | TweenModifier | boolean | PercentageKeyframes | (Record<string, boolean | TweenModifier | TweenOptions> & TweenParamsOptions)[] | ScrollObserver> & TimerOptions & AnimationOptions & TweenParamsOptions & AnimationCallbacks;
type DefaultsParams = TimerOptions & AnimationOptions & TweenParamsOptions & TimerCallbacks & AnimationCallbacks & TimelineCallbacks;
type TimelineOptions = {
    defaults?: DefaultsParams;
    playbackEase?: EasingParam;
};
type TimelineCallback = (self: Timeline) => any;
type TimelineCallbacks = {
    onComplete?: TimelineCallback;
    onLoop?: TimelineCallback;
    onRender?: TimelineCallback;
    onBegin?: TimelineCallback;
    onUpdate?: TimelineCallback;
};
type TimelineParams = TimerOptions & TimelineOptions & TimelineCallbacks;
type ScopeParams = {
    root?: DOMTargetSelector;
    defaults?: DefaultsParams;
    mediaQueries?: Record<string, string>;
};
type AnimatablePropertySetter = (to: number | Array<number>, duration?: number, ease?: EasingParam) => AnimatableObject;
type AnimatablePropertyGetter = () => number | Array<number>;
type AnimatableProperty = AnimatablePropertySetter & AnimatablePropertyGetter;
type AnimatableObject = Animatable & Record<string, AnimatableProperty>;
type AnimatablePropertyParamsOptions = {
    unit?: string;
    duration?: TweenParamValue;
    ease?: EasingParam;
    modifier?: TweenModifier;
    composition?: TweenComposition;
};
type AnimatableParams = Record<string, TweenParamValue | EasingParam | TweenModifier | TweenComposition | AnimatablePropertyParamsOptions> & AnimatablePropertyParamsOptions;
type DraggableCallback = (self: Draggable) => any;
type DraggableAxisParam = {
    mapTo?: string;
    modifier?: TweenModifier;
    composition?: TweenComposition;
    snap?: number;
};
type DraggableParams = {
    trigger?: DOMTargetSelector;
    container?: DOMTargetSelector | Array<number>;
    x?: boolean | DraggableAxisParam;
    y?: boolean | DraggableAxisParam;
    modifier?: TweenModifier;
    snap?: number | Array<number>;
    containerPadding?: number | Array<number>;
    containerFriction?: number;
    releaseVelocity?: number;
    releaseStiffness?: number;
    releaseEase?: EasingParam;
    dragSpeed?: number;
    scrollSpeed?: number;
    scrollThreshold?: number;
    onGrab?: DraggableCallback;
    onDrag?: DraggableCallback;
    onRelease?: DraggableCallback;
    onUpdate?: DraggableCallback;
    onSettle?: DraggableCallback;
    onSnap?: DraggableCallback;
};
/**
 * @param {TargetsParam} targets
 * @param {AnimationParams} parameters
 * @return {Animation}
 */
declare function animate(targets: TargetsParam, parameters: AnimationParams): Animation;
/**
 * @param {TimelineParams} [parameters]
 * @return {Timeline}
 */
declare function createTimeline(parameters?: TimelineParams): Timeline;
/**
 * @param {TimerParams} [parameters]
 * @return {Timer}
 */
declare function createTimer(parameters?: TimerParams): Timer;
/**
 * @param {TargetsParam} targets
 * @param {AnimatableParams} parameters
 * @return {AnimatableObject}
 */
declare function createAnimatable(targets: TargetsParam, parameters: AnimatableParams): AnimatableObject;
/**
 * @param {TargetsParam} target
 * @param {DraggableParams} [parameters]
 * @return {Draggable}
 */
declare function createDraggable(target: TargetsParam, parameters?: DraggableParams): Draggable;
/**
 * @param {ScopeParams} [params]
 * @return {Scope}
 */
declare function createScope(params?: ScopeParams): Scope;
declare const defaults: DefaultsParams;
declare namespace globals {
    export { defaults };
    export { doc as root };
    declare class Scope {
        constructor(parameters?: ScopeParams);
        defaults: DefaultsParams;
        root: Document | DOMTarget;
        constructors: Array<Function>;
        revertConstructors: Array<Function>;
        revertibles: Array<Revertible>;
        methods: Record<string, any>;
        matches: Record<string, boolean>;
        mediaQueryLists: Record<string, MediaQueryList>;
        execute(cb: (scope: this) => any): this;
        refresh(): this;
        add(a1: string, a2: Function): this;
        add(a1: (self?: Scope) => any): this;
        handleEvent(e: Event): void;
        revert(): void;
    }
    export let scope: Scope;
}
declare const scrollContainers: Map<any, any>;
declare class ScrollObserver {
    constructor(parameters: ScrollObserverParams);
    id: number;
    container: ScrollContainer;
    target: HTMLElement;
    linked: Tickable;
    repeat: boolean;
    horizontal: boolean;
    enter: ScrollThresholdParam | ScrollThresholdValue | ScrollThresholdCallback;
    leave: ScrollThresholdParam | ScrollThresholdValue | ScrollThresholdCallback;
    sync: boolean;
    syncEase: EasingFunction;
    syncSmooth: number;
    onSyncEnter: ScrollObserverCallback | typeof noop;
    onSyncLeave: ScrollObserverCallback | typeof noop;
    onSyncEnterForward: ScrollObserverCallback | typeof noop;
    onSyncLeaveForward: ScrollObserverCallback | typeof noop;
    onSyncEnterBackward: ScrollObserverCallback | typeof noop;
    onSyncLeaveBackward: ScrollObserverCallback | typeof noop;
    onEnter: ScrollObserverCallback | typeof noop;
    onLeave: ScrollObserverCallback | typeof noop;
    onEnterForward: ScrollObserverCallback | typeof noop;
    onLeaveForward: ScrollObserverCallback | typeof noop;
    onEnterBackward: ScrollObserverCallback | typeof noop;
    onLeaveBackward: ScrollObserverCallback | typeof noop;
    onUpdate: ScrollObserverCallback | typeof noop;
    onSyncComplete: ScrollObserverCallback | typeof noop;
    completed: boolean;
    began: boolean;
    isInView: boolean;
    offsets: Array<number>;
    offset: number;
    offsetStart: number;
    offsetEnd: number;
    distance: number;
    thresholds: any[];
    coords: [
        number,
        number,
        number,
        number
    ];
    debugStyles: $Animation;
    $debug: HTMLElement;
    _params: ScrollObserverParams;
    _debug: boolean;
    _next: ScrollObserver;
    _prev: ScrollObserver;
    link(linked: Tickable): this;
    get velocity(): number;
    get backward(): boolean;
    get scroll(): number;
    get progress(): number;
    refresh(): this;
    removeDebug(): void;
    debug(): void;
    updateBounds(): void;
    handleScroll(): void;
    revert(): this;
}
declare function onScroll(parameters?: ScrollObserverParams): ScrollObserver;
type ScrollThresholdValue = string | number;
type ScrollObserverCallback = (self: ScrollObserver) => any;
type ScrollThresholdParam = {
    target?: ScrollThresholdValue;
    container?: ScrollThresholdValue;
};
type ScrollObserverAxisCallback = (self: ScrollObserver) => "x" | "y";
type ScrollThresholdCallback = (self: ScrollObserver) => ScrollThresholdValue | ScrollThresholdParam;
type ScrollObserverParams = {
    sync?: boolean | number | string | EasingParam;
    container?: TargetsParam;
    target?: TargetsParam;
    axis?: "x" | "y" | ScrollObserverAxisCallback;
    enter?: ScrollThresholdValue | ScrollThresholdParam | ScrollThresholdCallback;
    leave?: ScrollThresholdValue | ScrollThresholdParam | ScrollThresholdCallback;
    repeat?: boolean;
    debug?: boolean;
    onEnter?: ScrollObserverCallback;
    onLeave?: ScrollObserverCallback;
    onEnterForward?: ScrollObserverCallback;
    onLeaveForward?: ScrollObserverCallback;
    onEnterBackward?: ScrollObserverCallback;
    onLeaveBackward?: ScrollObserverCallback;
    onUpdate?: ScrollObserverCallback;
    onSyncComplete?: ScrollObserverCallback;
};
declare class ScrollContainer {
    constructor($el: HTMLElement);
    element: HTMLElement;
    useWin: boolean;
    winWidth: number;
    winHeight: number;
    width: number;
    height: number;
    left: number;
    top: number;
    zIndex: number;
    scrollX: number;
    scrollY: number;
    prevScrollX: number;
    prevScrollY: number;
    scrollWidth: number;
    scrollHeight: number;
    velocity: number;
    backwardX: boolean;
    backwardY: boolean;
    scrollTicker: Timer;
    dataTimer: Timer;
    resizeTicker: Timer;
    wakeTicker: Timer;
    _head: ScrollObserver;
    _tail: ScrollObserver;
    resizeObserver: ResizeObserver;
    updateScrollCoords(): void;
    updateWindowBounds(): void;
    updateBounds(): void;
    refreshScrollObservers(): void;
    refresh(): void;
    handleScroll(): void;
    handleEvent(e: Event): void;
    revert(): void;
}
declare class Engine extends Clock {
    useDefaultMainLoop: boolean;
    suspendWhenHidden: boolean;
    _reqId: number;
    _stopped: boolean;
    _suspended: boolean;
    _head: Tickable;
    _tail: Tickable;
    update(): void;
    stop(): Engine;
    start(): this;
    suspend(): Engine;
    resume(): this;
}
declare const engine: Engine;
declare function cubicBezier(mX1?: number, mY1?: number, mX2?: number, mY2?: number): EasingFunction;
declare function steps(steps?: number, fromStart?: boolean): EasingFunction;
declare const eases: EasesFunctions;
type PowerEasing = (power?: number) => EasingFunction;
type BackEasing = (overshoot?: number) => EasingFunction;
type ElasticEasing = (amplitude?: number, period?: number) => EasingFunction;
type EasesFunctions = {
    linear?: typeof linear;
    irregular?: typeof irregular;
    steps?: typeof steps;
    cubicBezier?: typeof cubicBezier;
    in?: PowerEasing;
    out?: PowerEasing;
    inOut?: PowerEasing;
    outIn?: PowerEasing;
    inQuad?: EasingFunction;
    outQuad?: EasingFunction;
    inOutQuad?: EasingFunction;
    outInQuad?: EasingFunction;
    inCubic?: EasingFunction;
    outCubic?: EasingFunction;
    inOutCubic?: EasingFunction;
    outInCubic?: EasingFunction;
    inQuart?: EasingFunction;
    outQuart?: EasingFunction;
    inOutQuart?: EasingFunction;
    outInQuart?: EasingFunction;
    inQuint?: EasingFunction;
    outQuint?: EasingFunction;
    inOutQuint?: EasingFunction;
    outInQuint?: EasingFunction;
    inSine?: EasingFunction;
    outSine?: EasingFunction;
    inOutSine?: EasingFunction;
    outInSine?: EasingFunction;
    inCirc?: EasingFunction;
    outCirc?: EasingFunction;
    inOutCirc?: EasingFunction;
    outInCirc?: EasingFunction;
    inExpo?: EasingFunction;
    outExpo?: EasingFunction;
    inOutExpo?: EasingFunction;
    outInExpo?: EasingFunction;
    inBounce?: EasingFunction;
    outBounce?: EasingFunction;
    inOutBounce?: EasingFunction;
    outInBounce?: EasingFunction;
    inBack?: BackEasing;
    outBack?: BackEasing;
    inOutBack?: BackEasing;
    outInBack?: BackEasing;
    inElastic?: ElasticEasing;
    outElastic?: ElasticEasing;
    inOutElastic?: ElasticEasing;
    outInElastic?: ElasticEasing;
};
declare function linear(...args?: (string | number)[]): EasingFunction;
declare function irregular(length?: number, randomness?: number): EasingFunction;
declare function spring(mass?: number, stiffness?: number, damping?: number, velocity?: number): SpringEasing;
declare function stagger(val: number | string | [
    number | string,
    number | string
], params?: StaggerParameters): StaggerFunction;
type StaggerParameters = {
    start?: number | string;
    from?: number | "first" | "center" | "last";
    reversed?: boolean;
    grid?: Array<number>;
    axis?: ("x" | "y");
    ease?: EasingParam;
    modifier?: TweenModifier;
};
type StaggerFunction = (target?: Target, index?: number, length?: number, tl?: Timeline) => number | string;
declare class Timeline extends Timer {
    constructor(parameters?: TimelineParams);
    labels: {};
    defaults: DefaultsParams;
    onRender: TimelineCallback;
    _ease: EasingFunction;
    _head: Renderable;
    _tail: Renderable;
    add(a1: TargetsParam, a2: AnimationParams, a3?: TimePosition): this;
    add(a1: TimerParams, a2?: TimePosition): this;
    add(a1: string, a2?: TimePosition): this;
    add(a1: TimerCallback, a2?: TimePosition): this;
    set(targets: TargetsParam, parameters: AnimationParams, position?: TimePosition): this;
    stretch(newDuration: number): this;
    refresh(): this;
    revert(): this;
    then(callback?: TimelineCallback): Promise<any>;
}
type TimePosition = number | string | Function;
declare namespace svg {
    export { morphTo };
    export { createMotionPath };
    export { createDrawable };
}
type morphCallback = ($path1: SVGGeometryElement) => Array<string>;
declare function morphTo(path2: TargetsParam, precision?: number): morphCallback;
declare function createMotionPath(path: TargetsParam): {
    x: FunctionValue;
    y: FunctionValue;
    angle: FunctionValue;
};
declare function createDrawable(selector: TargetsParam, start?: number, end?: number): Array<ProxyConstructor>;
declare function getTargetValue(targetSelector: DOMTargetSelector, propName: string): string;
declare function getTargetValue(targetSelector: JSTargetsParam, propName: string): number | string;
declare function getTargetValue(targetSelector: DOMTargetsParam, propName: string, unit: string): string;
declare function getTargetValue(targetSelector: TargetsParam, propName: string, unit: boolean): number;
declare function setTargetValues(targets: TargetsParam, parameters: AnimationParams): Animation;
declare function remove(targets: TargetsParam, parent?: Renderable | Engine): TargetsArray;
declare function lerp(start: number, end: number, amount: number, renderable?: Renderable | boolean): number;
declare namespace utils {
    export { registerTargets as $ };
    export { getTargetValue as get };
    export { setTargetValues as set };
    export { remove };
    export { cleanInlineStyles };
    export { random };
    export { randomPick };
    export { shuffle };
    export { lerp };
    export let clamp: ((v: number, min: number, max: number) => number) & ChainedClamp;
    export let round: ((v: number, decimalLength: number) => number) & ChainedRound;
    export let snap: ((v: number, increment: number | number[]) => number) & ChainedSnap;
    export let wrap: ((v: number, min: number, max: number) => number) & ChainedWrap;
    export let interpolate: ((start: number, end: number, progress: number) => number) & ChainedInterpolate;
    export let mapRange: ((value: number, inLow: number, inHigh: number, outLow: number, outHigh: number) => number) & ChainedMapRange;
    export let roundPad: ((v: string | number, decimalLength: number) => string) & ChainedRoundPad;
    export let padStart: ((v: number, totalLength: number, padString: string) => string) & ChainedPadStart;
    export let padEnd: ((v: number, totalLength: number, padString: string) => string) & ChainedPadEnd;
    export let degToRad: ((degrees: number) => number) & ChainedDegToRad;
    export let radToDeg: ((radians: number) => number) & ChainedRadToDeg;
}
type ChainedUtilsResult = (value: number) => number;
type ChainableUtils = {
    clamp: ChainedClamp;
    round: ChainedRound;
    snap: ChainedSnap;
    wrap: ChainedWrap;
    interpolate: ChainedInterpolate;
    mapRange: ChainedMapRange;
    roundPad: ChainedRoundPad;
    padStart: ChainedPadStart;
    padEnd: ChainedPadEnd;
    degToRad: ChainedDegToRad;
    radToDeg: ChainedRadToDeg;
};
type ChainableUtil = ChainableUtils & ChainedUtilsResult;
type ChainedClamp = (min: number, max: number) => ChainableUtil;
type ChainedRound = (decimalLength: number) => ChainableUtil;
type ChainedSnap = (increment: number) => ChainableUtil;
type ChainedWrap = (min: number, max: number) => ChainableUtil;
type ChainedInterpolate = (start: number, end: number) => ChainableUtil;
type ChainedMapRange = (inLow: number, inHigh: number, outLow: number, outHigh: number) => ChainableUtil;
type ChainedRoundPad = (decimalLength: number) => ChainableUtil;
type ChainedPadStart = (totalLength: number, padString: string) => ChainableUtil;
type ChainedPadEnd = (totalLength: number, padString: string) => ChainableUtil;
type ChainedDegToRad = () => ChainableUtil;
type ChainedRadToDeg = () => ChainableUtil;
declare function registerTargets(targets: DOMTargetsParam): DOMTargetsArray;
declare function registerTargets(targets: JSTargetsParam): JSTargetsArray;
declare function registerTargets(targets: TargetsParam): TargetsArray;
declare function random(min: number, max: number, decimalLength?: number): number;
declare function randomPick(items: string | any[]): any;
declare function shuffle(items: any[]): any[];
declare class Draggable {
    constructor(target: TargetsParam, parameters?: DraggableParams);
    snapX: number | number[];
    snapY: number | number[];
    scrollSpeed: number;
    scrollThreshold: number;
    dragSpeed: number;
    releaseEase: EasingFunction;
    releaseStiffness: number;
    releaseVelocity: number;
    container: number[];
    $target: DOMTarget;
    $trigger: DOMTarget;
    fixed: boolean;
    $container: DOMTarget;
    containerPadding: Array<number>;
    containerFriction: number;
    onGrab: DraggableCallback;
    onDrag: DraggableCallback;
    onRelease: DraggableCallback;
    onUpdate: DraggableCallback;
    onSettle: DraggableCallback;
    onSnap: DraggableCallback;
    disabled: number[];
    animate: Animatable;
    xProp: string;
    yProp: string;
    destX: number;
    destY: number;
    deltaX: number;
    deltaY: number;
    progresses: number[];
    scroll: {
        x: number;
        y: number;
    };
    coords: number[];
    snapped: number[];
    pointer: number[];
    scrollView: number[];
    dragArea: number[];
    containerBounds: number[];
    scrollBounds: number[];
    targetBounds: number[];
    window: number[];
    velocity: number;
    angle: number;
    triggerStyles: Animation;
    bodyStyles: Animation;
    targetStyles: Animation;
    transforms: Transforms;
    updateTicker: Timer;
    grabbed: boolean;
    dragged: boolean;
    updated: boolean;
    released: boolean;
    contained: boolean;
    canScroll: boolean;
    useWin: boolean;
    $scrollContainer: any;
    isFinePointer: boolean;
    enabled: boolean;
    set x(x: number);
    get x(): number;
    set y(y: number);
    get y(): number;
    set progressX(x: number);
    get progressX(): number;
    set progressY(y: number);
    get progressY(): number;
    updateScrollCoords(): void;
    updateBoundingValues(): void;
    isOutOfBounds(bounds: any[], x: number, y: number): boolean;
    update(): void;
    scrollInView(gap: number, duration?: number, ease?: EasingParam): void;
    handleHover(): void;
    animateInView(duration?: number, ease?: EasingFunction): void;
    handleDown(e: PointerEvent): void;
    handleMove(e: PointerEvent): void;
    handleUp(): void;
    reset(): this;
    enable(): this;
    touchActionStyles: Animation;
    disable(): this;
    revert(): this;
    handleEvent(e: PointerEvent): void;
}
declare class Transforms {
    constructor($el: DOMTarget | DOMProxy);
    $el: DOMTarget | DOMProxy;
    inlineTransforms: any[];
    point: DOMPoint;
    inversedMatrix: DOMMatrix;
    normalizePoint(x: number, y: number): DOMPoint;
    traverseUp(cb: ($el: DOMTarget, i: number) => any): void;
    getMatrix(): DOMMatrix;
    remove(): void;
    revert(): void;
}
declare class DOMProxy {
    constructor(el: any);
    el: any;
    zIndex: number;
    parentElement: any;
    classList: {
        add: () => void;
        remove: () => void;
    };
    set x(v: any);
    get x(): any;
    set y(v: any);
    get y(): any;
    set width(v: any);
    get width(): any;
    set height(v: any);
    get height(): any;
    getBoundingClientRect(): {
        top: any;
        right: any;
        bottom: any;
        left: any;
    };
}
export { $Animation, $Animatable, Renderable, Tickable, Revertible, FunctionValue, EasingFunction, SpringEasing, EaseStringParamNames, EasingParam, DOMTarget, JSTarget, Target, TargetSelector, DOMTargetSelector, DOMTargetsParam, DOMTargetsArray, JSTargetsParam, JSTargetsArray, TargetsParam, TargetsArray, TweenModifier, ColorArray, Tween, TweenDecomposedValue, TweenPropertySiblings, TweenLookups, TweenReplaceLookups, TweenAdditiveLookups, TimerOptions, TimerCallback, TimerCallbacks, TimerParams, TweenParamValue, TweenPropValue, TweenComposition, TweenParamsOptions, TweenValues, TweenKeyValue, ArraySyntaxValue, TweenOptions, TweenObjectValue, PercentageKeyframeOptions, PercentageKeyframeParams, PercentageKeyframes, DurationKeyframes, AnimationOptions, AnimationCallback, AnimationCallbacks, AnimationParams, DefaultsParams, TimelineOptions, TimelineCallback, TimelineCallbacks, TimelineParams, ScopeParams, AnimatablePropertySetter, AnimatablePropertyGetter, AnimatableProperty, AnimatableObject, AnimatablePropertyParamsOptions, AnimatableParams, DraggableCallback, DraggableAxisParam, DraggableParams, animate, createTimeline, createTimer, createAnimatable, createDraggable, createScope, defaults, onScroll, scrollContainers, engine, eases, spring, stagger, svg, utils, Clock, Engine, Timer, Animation, Timeline, Animatable, Draggable, ScrollObserver, Scope };
