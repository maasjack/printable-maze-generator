// Development-only checks. End users only need index.html; Node has no dependencies here.
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];

function setup() {
  function element() {
    return {
      value: '', textContent: '', children: [], attributes: {}, events: {}, properties: {},
      classList: { toggle() {} },
      style: { setProperty(key, value) { this[key] = value; } },
      addEventListener(key, callback) { this.events[key] = callback; },
      setAttribute(key, value) { this.attributes[key] = String(value); },
      appendChild(child) { this.children.push(child); },
      replaceChildren() { this.children = []; }
    };
  }
  const nodes = {};
  for (const id of html.matchAll(/id="([^"]+)"/g)) nodes['#' + id[1]] = element();
  nodes['#sizeSelect'].value = '20x20';
  nodes['#customWidth'].value = nodes['#customHeight'].value = '20';
  const radios = ['easy', 'normal', 'hard'].map(value => Object.assign(element(), { value }));
  let selected = radios[1];
  const context = {
    window: {}, document: {
      querySelector(selector) { return selector.includes(':checked') ? selected : nodes[selector]; },
      querySelectorAll() { return radios; },
      createElementNS() { return element(); }
    }
  };
  vm.runInNewContext(script, context);
  function generate(width, height, difficulty) {
    nodes['#sizeSelect'].value = 'custom';
    nodes['#customWidth'].value = String(width);
    nodes['#customHeight'].value = String(height);
    selected = radios.find(input => input.value === difficulty);
    nodes['#generateButton'].events.click();
    return context.window.__mazeTestState;
  }
  return { nodes, radios, generate, state: () => context.window.__mazeTestState };
}

function validate(state, nodes) {
  const { width: w, height: h, cells, openings } = state;
  const directions = [[0,-1,1,4],[1,0,2,8],[0,1,4,1],[-1,0,8,2]];
  const adjacency = cells.map(() => []);
  let edges = 0;
  for (let i = 0; i < cells.length; i++) {
    for (const [dx,dy,bit,opposite] of directions) {
      const x = i % w + dx, y = Math.floor(i / w) + dy;
      if (x < 0 || x >= w || y < 0 || y >= h) { assert.ok(cells[i] & bit); continue; }
      const j = y * w + x;
      assert.equal(Boolean(cells[i] & bit), Boolean(cells[j] & opposite));
      if (!(cells[i] & bit)) { adjacency[i].push(j); if (j > i) edges++; }
    }
  }
  assert.equal(edges, w * h - 1);
  const start = openings.entrance.y * w + openings.entrance.x;
  const end = openings.exit.y * w + openings.exit.x;
  const distance = new Map([[start, 0]]), queue = [start];
  for (let head = 0; head < queue.length; head++) {
    for (const next of adjacency[queue[head]]) if (!distance.has(next)) {
      distance.set(next, distance.get(queue[head]) + 1); queue.push(next);
    }
  }
  assert.equal(distance.size, w * h);
  assert.equal(distance.get(end) + 1, state.metrics.pathLength);
  assert.ok(distance.get(end) >= Math.floor((w + h) * .55));
  const outward = { top:[0,-1], right:[1,0], bottom:[0,1], left:[-1,0] };
  const svg = nodes['#mazeSvg'];
  const arrows = svg.children.filter(child => child.attributes['data-kind']);
  assert.equal(arrows.length, 2);
  for (const arrow of arrows) {
    const line = arrow.children[0].attributes;
    const direction = outward[arrow.attributes['data-side']];
    const dot = (+line.x2 - +line.x1) * direction[0] + (+line.y2 - +line.y1) * direction[1];
    assert.ok(arrow.attributes['data-kind'] === 'entrance' ? dot < 0 : dot > 0);
  }
  const printW = parseFloat(nodes['#mazeStage'].style['--print-width']);
  const printH = parseFloat(nodes['#mazeStage'].style['--print-height']);
  assert.ok(printW <= 190 && printH <= 276);
  assert.ok(Math.abs(printW / printH - (w + 3.1) / (h + 3.1)) < .002);
  assert.equal(svg.attributes.preserveAspectRatio, 'xMidYMid meet');
}

test('default, all presets, custom extremes: solvable trees, arrows and A4 geometry', () => {
  const app = setup();
  assert.equal(app.state().width, 20);
  assert.equal(app.state().difficulty, 'normal');
  for (const [w,h] of [[5,5],[10,10],[15,15],[20,20],[25,25],[30,30],[50,50],[5,50],[50,5]]) {
    for (const difficulty of ['easy','normal','hard']) {
      for (let i = 0; i < 3; i++) validate(app.generate(w,h,difficulty), app.nodes);
    }
  }
});

test('custom validation, fresh generation, and summary follows generated maze', () => {
  const app = setup();
  const first = JSON.stringify(app.generate(20,20,'normal').cells);
  assert.notEqual(first, JSON.stringify(app.generate(20,20,'normal').cells));
  assert.equal(app.generate(1,99,'hard').width, 5);
  assert.equal(app.state().height, 50);
  assert.equal(app.nodes['#mazeSummary'].textContent, '5 × 50 · 困难');
  assert.equal(app.generate('',7.7,'easy').width, 20);
  assert.equal(app.state().height, 8);
  app.generate(50,50,'hard');
  assert.match(app.nodes['#printNote'].textContent, /细铅笔/);
});

test('difficulty sample has ascending average path length', () => {
  const app = setup();
  const means = ['easy','normal','hard'].map(difficulty => {
    let total = 0;
    for (let i=0; i<24; i++) total += app.generate(20,20,difficulty).metrics.pathLength;
    return total / 24;
  });
  console.log('20×20 mean solution lengths:', means.map(n => n.toFixed(1)).join(' / '));
  assert.ok(means[0] < means[1] && means[1] < means[2]);
});

test('offline resources and print stylesheet invariants (not browser pagination)', () => {
  assert.doesNotMatch(html, /<(?:script|link|img)[^>]+(?:src|href)="https?:/);
  const print = html.slice(html.indexOf('@media print'));
  assert.match(print, /width: auto; height: auto/);
  assert.match(print, /display: none !important/);
  assert.match(print, /stroke-width: \.38mm/);
  assert.match(html, /@page \{ size: A4 portrait; margin: 10mm; \}/);
});
