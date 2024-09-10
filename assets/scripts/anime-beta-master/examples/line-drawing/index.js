// @ts-nocheck
import {
  animate,
  svg,
  createTimeline,
  stagger,
  utils,
} from '../../lib/anime.esm.js';

// import {
//   inspect
// } from '../../lib/gui/index.js';

function generateLines(numberOfLines) {
  const svgWidth = 1100;
  const svgHeight = 1100;
  const margin = 50; // Margin from the edges of the SVG
  const spacing = (svgWidth - margin * 2) / (numberOfLines - 1);

  let svgContent = `<svg width="${svgWidth}px" height="${svgHeight}px" viewBox="0 0 ${svgWidth} ${svgHeight}">
      <g id="lines" stroke="none" stroke-line-cap="round" stroke-width="1" fill="none" fill-rule="evenodd">`;
  for (let i = 0; i < numberOfLines; i++) {
    const x = margin + i * spacing;
    svgContent += `<line x1="${x}" y1="${margin}" x2="${x}" y2="${svgHeight - margin}" class="grid-line" stroke="#545454" stroke-line-cap="round" stroke-width="2"></line>`;
  }
  for (let i = 0; i < numberOfLines; i++) {
    const x = margin + i * spacing;
    svgContent += `<line x1="${x}" y1="${margin}" x2="${x}" y2="${svgHeight - margin}" class="line-v" stroke="#FF4B4B" stroke-line-cap="round" stroke-width="8"></line>`;
  }

  svgContent += `</g></svg>`;

  return svgContent;
}

function generateCircles(numberOfCircles) {
  const svgWidth = 1100;
  const svgHeight = 1100;
  const centerX = svgWidth / 2;
  const centerY = svgHeight / 2;
  const maxRadius = 500;
  const step = maxRadius / numberOfCircles;

  let svgContent = `<svg width="${svgWidth}px" height="${svgHeight}px" viewBox="0 0 ${svgWidth} ${svgHeight}">
      <g id="circles" stroke="none" stroke-line-cap="round" stroke-width="1" fill="none" fill-rule="evenodd">`;

  for (let i = 0; i < numberOfCircles; i++) {
    const radius = (i + 1) * step;
    svgContent += `<circle class="circle-line" stroke="#545454" stroke-line-cap="round" stroke-width="2" cx="${centerX}" cy="${centerY}" r="${radius}"></circle>`;
    svgContent += `<circle class="circle" stroke="#FF4B4B" stroke-line-cap="round" stroke-width="8" cx="${centerX}" cy="${centerY}" r="${radius}"></circle>`;
  }

  svgContent += `</g></svg>`;

  return svgContent;
}

const svgLines = generateLines(100);
const svgCircles = generateCircles(50);

document.body.innerHTML += svgLines;
document.body.innerHTML += svgCircles;

// Function based solution for performance comparaison

// const isLineSymbol = Symbol();

// function createLine() {
//   const compute = (type) => (start, end) => ($el) => {
//     const pathLength = $el.getTotalLength();
//     const P = 100000;
//     const bleed = (P / pathLength);
//     const os = utils.round((start * -P), 2);
//     const d1 = utils.round((end * P) + os, 2);
//     const d2 = utils.round(P - d1, 2) + (d1 === P ? 0 : bleed);
//     if (!$el[isLineSymbol]) {
//       $el.setAttribute('pathLength', `${P}`);
//       $el[isLineSymbol] = true;
//     }
//     return type === 'offset' ? `${os}` : `${d1} ${d2}`;
//   }
//   return {
//     start: compute('offset'),
//     end: compute('dash')
//   }
// }

// const { start, end } = createLine();

// createTimeline()
// .add('circle', {
//   strokeDashoffset: [start(-.5, -.5), start(.5, 1), start(2, 2)],
//   strokeDasharray: [end(-.5, -.5), end(.5, 1), end(2, 2)],
//   duration: 6000,
//   ease: 'linear',
//   loop: true,
// }, stagger([0, 6000], { start: 0, ease: 'out(1)', from: 'last' }))

// createTimeline()
// .add(svg.createDrawable('.circle'), {
//   draw: ['-.5 -.5', '.5 1', '2 2'],
//   duration: 6000,
//   ease: 'linear',
//   loop: true,
// }, stagger([0, 6000], { start: 0, ease: 'out(1)', from: 'last' }))

createTimeline({
  playbackEase: 'out(4)',
  loop: 2,
  defaults: {
    delay: () => utils.random(0, 500),
    duration: 10000,
    loop: 1,
  }
})
.add(svg.createDrawable('.line-v'), {
  draw: ['1 1', '0 1', '0 0'],
  stroke: '#55FF55',
  ease: 'inOut(6)',
}, stagger([0, 4000], { start: 0, from: 'first' }))
.add(svg.createDrawable('.circle'), {
  draw: [
    () => { const v = utils.random(-1, -.5, 2); return `${v} ${v}`},
    () => `${utils.random(0, .25, 2)} ${utils.random(.5, .75, 2)}`,
    () => { const v = utils.random(1, 1.5, 2); return `${v} ${v}`},
  ],
  stroke: '#55FF55',
  ease: 'inOut(1)',
}, stagger([0, 3000], { start: 0 }))
.init()
