import {
  animate,
  createTimer,
  createDraggable,
  createAnimatable,
  utils,
  stagger,
  eases,
} from '../../lib/anime.esm.js';

createDraggable('#fixed', {
  container: document.body,
  // container: [0, 400, 400, 0],
  // containerPadding: 50,
});

createDraggable('#body-snap', {
  container: document.body,
  x: { snap: 200 },
  y: { snap: 100 },
});

const [ $rangeX ] = utils.$('.range-x .draggable');

const rangeX = createDraggable($rangeX, {
  container: '.range-x',
  containerPadding: 10,
  snap: 200,
  y: false,
  onGrab: () => animateRangeX.pause(),
  onSettle: () => {
    console.log('on settle');
    animateRangeX.refresh().restart();
  }
});

const animateRangeX = animate(rangeX, {
  progressX: el => el.progressX > .5 ? 0 : 1,
  loop: true,
  duration: 1500,
  ease: 'inOut(3)',
  onLoop: self => self.refresh()
});

const rangeY = createDraggable('.range-y .draggable', {
  container: '.range-y',
  containerPadding: 10,
  snap: 200,
  x: false,
});

createDraggable('#container-scroll .draggable', {
  container: '#container-scroll',
  containerPadding: 10,
  scrollThreshold: 10,
});

createDraggable('#transformed-container .draggable', {
  container: '#transformed-container',
  containerPadding: 10,
});

createDraggable('#container-no-scroll .draggable', {
  container: '#container-no-scroll',
  containerPadding: 10,
});

createDraggable('#array-container .draggable', {
  container: [0, 200, 200, 0],
  containerPadding: 50,
});

// Bounded flick carousel

const boundedFlickLength = utils.$('#bounded-flick .carousel-item').length;
const boundedFlickWidth = 290;

const boundedFlicker = createDraggable('#bounded-flick .carousel', {
  container: [0, 0, 0, -boundedFlickWidth * (boundedFlickLength - 1)],
  y: false,
  snap: boundedFlickWidth,
});

utils.set('#bounded-flick .carousel', {
  width: `${boundedFlickLength * boundedFlickWidth - 10}`
});

// Snap carousel
const [ $snapCarousel ] = utils.$('#snap-carousel .carousel');
const snapCarouselItems = /** @type {Array<HTMLElement>} */(utils.$('#snap-carousel .carousel-item'));

const snapTo = snapCarouselItems.map($el => -$el.offsetLeft);

createDraggable($snapCarousel, {
  trigger: '#snap-carousel',
  x: { modifier: utils.wrap(snapTo[snapTo.length / 2], 0) },
  y: false,
  snap: snapTo
});

// Object target

const [ $flickCarousel ] = utils.$('#infinite-flick .carousel');
const flickLength = utils.$('#infinite-flick .carousel-item').length;
const flickData = { width: 290, speedX: 2, wheelY: 0 };

const flickAnimatable = createAnimatable($flickCarousel, {
  x: 0,
  modifier: utils.wrap(-flickData.width * (flickLength / 2), 0),
});

const flickDraggable = createDraggable(flickData, {
  trigger: $flickCarousel,
  releaseVelocity: 4,
  releaseStiffness: .1,
  y: false,
  onGrab: () => animate(flickData, { speedX: 0, duration: 500 }),
  onRelease: () => animate(flickData, { speedX: 2, duration: 500 }),
});

const flickerLoop = createTimer({
  onUpdate: () => {
    const { x } = flickAnimatable;
    x(/** @type {Number} */(x()) - flickData.speedX - flickDraggable.deltaX - flickData.wheelY)
  }
});

utils.set($flickCarousel, { width: `${flickLength * flickData.width - 10}` });

// Support mousewheel

const wheelDeltaAnim = animate(flickData, {
  wheelY: () => 0,
  duration: 500,
  autoplay: false,
});

/**
 * @type {EventListener}
 * @param {WheelEvent} e
 */
function onWheel(e) {
  e.preventDefault();
  flickData.wheelY = utils.lerp(flickData.wheelY, e.deltaY, .2);
  wheelDeltaAnim.refresh().restart()
}

$flickCarousel.addEventListener('wheel', onWheel, { passive: false });

// Draggable list

const list = [];
const snap = 60;

utils.$('#onsnap-callback .draggable').forEach(($listItem, itemIndex) => {
  const draggable = createDraggable($listItem, {
    container: '#onsnap-callback',
    x: false,
    containerPadding: 10,
    snap,
    onGrab: self => animate(self.$target, { scale: 1.05, duration: 350 }),
    onRelease: self => animate(self.$target, { scale: 1.00, duration: 450 }),
    onSnap: self => {
      const fromIndex = list.indexOf(self);
      const toIndex = utils.round(0).clamp(0, list.length - 1)(self.destY / snap);
      if (toIndex !== fromIndex) {
        list.splice(fromIndex, 1);
        list.splice(toIndex, 0, self);
        list.forEach((item, i) => {
          if (i !== toIndex) {
            item.animate.y(i * snap, 750, eases.outElastic(.8, 1));
          }
        });
      }
    }
  });
  draggable.y = itemIndex * snap;
  list.push(draggable);
});

utils.set('#onsnap-callback .list', { height: `${list.length * snap - 10}` });

// Map value carousel

const carouselItems = utils.$('#map-props .carousel-item');
const itemWidth = 150;
const itemAngle = 360 / carouselItems.length;

utils.set('#map-props .carousel-item', {
  top: '50%',
  rotateY: stagger(itemAngle),
  y: '-50%',
  z: 130,
  scale: .3,
});

const carousel = createDraggable('#map-props .carousel', {
  x: { mapTo: 'rotateY' },
  y: false,
  dragSpeed: .4,
  releaseStiffness: .1,
  snap: itemAngle,
  containerPadding: 10,
});

const [ $prev, $next ] = utils.$('.carousel-btn');

const prev = () => animate(carousel, { x: utils.snap(carousel.x + 200, itemAngle), duration: 1000 });
const next = () => animate(carousel, { x: utils.snap(carousel.x - 200, itemAngle), duration: 1000 });

// const prev = () => carousel.animate.rotateY(utils.snap(carousel.x + 200, itemAngle), 1000);
// const next = () => carousel.animate.rotateY(utils.snap(carousel.x - 200, itemAngle), 1000);

$prev.addEventListener('click', prev);
$next.addEventListener('click', next);

// Dynamic paddings

const dynamicDraggables = utils.$('.dynamic .draggable').map($el => {
  return createDraggable($el, {
    container: '.dynamic',
    snap: 1,
    containerFriction: 1,
  });
});

const [ left, right, center ] = dynamicDraggables;

// Set the initial padding values
center.containerPadding = [10, 20, 10, 20];
left.containerPadding = [10, 100, 10, 10];
right.containerPadding = [10, 10, 10, 100];
dynamicDraggables.forEach(draggable => draggable.updateBoundingValues());

// Update center and right padding on left drag
left.onUpdate = ({ x }) => {
  center.containerPadding[3] = x + 10;
  right.containerPadding[3] = x + 90;
  center.updateBoundingValues();
}

// Update center and left padding on right drag
right.onUpdate = ({ x }) => {
  center.containerPadding[1] = Math.abs(x - 10);
  left.containerPadding[1] = Math.abs(x - 90)
  center.updateBoundingValues();
}
