// ============================================
// Etymology OS Engine — D3.js Network Module
// ============================================

import { ROOTS } from '../data/roots.js';
import { WORDS } from '../data/words.js';
import { getRootMasteryLevel, getWordMasteryLevel } from '../utils/storage.js';

let simulation = null;
let svg = null;
let currentRoot = null;

export function initNetwork() {
  renderRootSelector();
  // Default: show 'port' network
  showRootNetwork('port');
}

function renderRootSelector() {
  const container = document.getElementById('root-selector');
  if (!container) return;

  const rootKeys = Object.keys(ROOTS).filter(r => {
    // Only show roots that have words in our WORDS database
    return ROOTS[r].relatedWords.some(w => WORDS[w]);
  }).sort();

  container.innerHTML = rootKeys.map(root => {
    const data = ROOTS[root];
    const wordCount = data.relatedWords.filter(w => WORDS[w]).length;
    return `<button class="root-chip ${root === 'port' ? 'active' : ''}" 
            data-root="${root}" 
            title="${data.meaning} — ${data.meaningJa} (${wordCount}語)">
      ${root}
    </button>`;
  }).join('');

  container.addEventListener('click', (e) => {
    const chip = e.target.closest('.root-chip');
    if (chip) {
      container.querySelectorAll('.root-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      showRootNetwork(chip.dataset.root);
    }
  });
}

export function showRootNetwork(rootKey) {
  currentRoot = rootKey;
  const rootData = ROOTS[rootKey];
  if (!rootData) return;

  const container = document.getElementById('network-container');
  if (!container) return;

  // Build graph data
  const nodes = [];
  const links = [];

  // Central root node
  nodes.push({
    id: rootKey,
    type: 'root',
    label: rootKey,
    meaning: rootData.meaning,
    meaningJa: rootData.meaningJa,
    origin: rootData.origin,
    size: 40
  });

  // Word nodes
  rootData.relatedWords.forEach(word => {
    const wordData = WORDS[word];
    const mastery = getWordMasteryLevel(word);

    nodes.push({
      id: word,
      type: 'word',
      label: word,
      mastery,
      hasData: !!wordData,
      difficulty: wordData?.difficulty || 0,
      size: wordData ? 18 + mastery * 10 : 14
    });

    links.push({
      source: rootKey,
      target: word,
      strength: mastery,
      hasData: !!wordData
    });

    // Check for prefix connections between words
    if (wordData?.decomposition?.prefix) {
      const prefixMorpheme = wordData.decomposition.prefix.morpheme;
      // Find other words with the same prefix
      rootData.relatedWords.forEach(otherWord => {
        if (otherWord !== word) {
          const otherData = WORDS[otherWord];
          if (otherData?.decomposition?.prefix?.morpheme === prefixMorpheme) {
            // We'll show this as a subtle connection
          }
        }
      });
    }
  });

  renderGraph(container, nodes, links, rootData);
  updateInfoPanel(rootKey, rootData);
}

function renderGraph(container, nodes, links, rootData) {
  // Clear previous
  container.innerHTML = '';

  const width = container.clientWidth;
  const height = container.clientHeight || 600;

  svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'network-svg');
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  container.appendChild(svg);

  // Defs for gradients and filters
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');

  // Glow filter
  defs.innerHTML = `
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <radialGradient id="root-gradient" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="hsl(45, 90%, 70%)"/>
      <stop offset="100%" stop-color="hsl(45, 90%, 45%)"/>
    </radialGradient>
    <radialGradient id="word-gradient" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="hsl(210, 70%, 65%)"/>
      <stop offset="100%" stop-color="hsl(210, 70%, 45%)"/>
    </radialGradient>
    <radialGradient id="word-mastered-gradient" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="hsl(150, 70%, 60%)"/>
      <stop offset="100%" stop-color="hsl(150, 70%, 40%)"/>
    </radialGradient>
  `;
  svg.appendChild(defs);

  // Background
  const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  bgRect.setAttribute('width', width);
  bgRect.setAttribute('height', height);
  bgRect.setAttribute('fill', 'transparent');
  svg.appendChild(bgRect);

  // Links group
  const linksGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  linksGroup.setAttribute('class', 'links');
  svg.appendChild(linksGroup);

  // Nodes group
  const nodesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  nodesGroup.setAttribute('class', 'nodes');
  svg.appendChild(nodesGroup);

  // Create link elements
  const linkElements = links.map(link => {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    const strokeWidth = 1.5 + link.strength * 4;
    const opacity = link.hasData ? 0.4 + link.strength * 0.4 : 0.15;
    line.setAttribute('stroke', link.hasData ? 'hsl(45, 60%, 55%)' : 'hsl(230, 15%, 30%)');
    line.setAttribute('stroke-width', strokeWidth);
    line.setAttribute('stroke-opacity', opacity);
    line.setAttribute('stroke-linecap', 'round');
    line._data = link;
    linksGroup.appendChild(line);
    return line;
  });

  // Create node elements
  const nodeElements = nodes.map(node => {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', `node node-${node.type}`);
    g.style.cursor = 'pointer';

    if (node.type === 'root') {
      // Root node — larger with glow
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('r', node.size);
      circle.setAttribute('fill', 'url(#root-gradient)');
      circle.setAttribute('filter', 'url(#glow)');
      g.appendChild(circle);

      // Pulsing ring
      const ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      ring.setAttribute('r', node.size + 6);
      ring.setAttribute('fill', 'none');
      ring.setAttribute('stroke', 'hsl(45, 90%, 60%)');
      ring.setAttribute('stroke-width', '1.5');
      ring.setAttribute('opacity', '0.4');
      ring.style.cssText = `--base-r: ${node.size + 6}`;
      g.appendChild(ring);

      // Root text
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dy', '-4');
      text.setAttribute('fill', 'hsl(230, 25%, 8%)');
      text.setAttribute('font-family', "'JetBrains Mono', monospace");
      text.setAttribute('font-size', '16');
      text.setAttribute('font-weight', '700');
      text.textContent = node.label;
      g.appendChild(text);

      // Meaning text
      const meaningText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      meaningText.setAttribute('text-anchor', 'middle');
      meaningText.setAttribute('dy', '12');
      meaningText.setAttribute('fill', 'hsl(230, 25%, 15%)');
      meaningText.setAttribute('font-family', "'Noto Sans JP', sans-serif");
      meaningText.setAttribute('font-size', '10');
      meaningText.textContent = node.meaningJa;
      g.appendChild(meaningText);
    } else {
      // Word node
      const fillGradient = node.mastery > 0.7 ? 'url(#word-mastered-gradient)' : 'url(#word-gradient)';
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('r', node.size);
      circle.setAttribute('fill', node.hasData ? fillGradient : 'hsl(230, 15%, 25%)');
      circle.setAttribute('stroke', node.hasData ? 'none' : 'hsl(230, 15%, 35%)');
      circle.setAttribute('stroke-width', '1');
      if (node.mastery > 0.7) {
        circle.setAttribute('filter', 'url(#glow)');
      }
      g.appendChild(circle);

      // Word text
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dy', '4');
      text.setAttribute('fill', node.hasData ? 'white' : 'hsl(230, 15%, 50%)');
      text.setAttribute('font-family', "'Inter', sans-serif");
      text.setAttribute('font-size', Math.max(9, Math.min(12, 14 - node.label.length * 0.4)));
      text.setAttribute('font-weight', '600');
      text.textContent = node.label;
      g.appendChild(text);
    }

    // Click handler
    g.addEventListener('click', () => {
      if (node.type === 'word' && node.hasData) {
        // Navigate to decompose tab with this word
        const evt = new CustomEvent('navigate-decompose', { detail: { word: node.label } });
        document.dispatchEvent(evt);
      }
    });

    // Hover effects
    g.addEventListener('mouseenter', () => {
      g.style.transform = 'scale(1.15)';
      g.style.transformOrigin = 'center';
      g.style.transition = 'transform 0.2s ease';
    });
    g.addEventListener('mouseleave', () => {
      g.style.transform = 'scale(1)';
    });

    g._data = node;
    nodesGroup.appendChild(g);
    return g;
  });

  // Force simulation using manual physics (no D3 dependency for simulation)
  runForceSimulation(nodes, links, nodeElements, linkElements, width, height);

  // Add controls
  addNetworkControls(container);
}

function runForceSimulation(nodes, links, nodeEls, linkEls, width, height) {
  // Initialize positions
  const centerX = width / 2;
  const centerY = height / 2;

  nodes.forEach((node, i) => {
    if (node.type === 'root') {
      node.x = centerX;
      node.y = centerY;
      node.fx = centerX; // Fixed position for root
      node.fy = centerY;
    } else {
      const angle = (i / (nodes.length - 1)) * Math.PI * 2;
      const radius = 150 + Math.random() * 80;
      node.x = centerX + Math.cos(angle) * radius;
      node.y = centerY + Math.sin(angle) * radius;
    }
    node.vx = 0;
    node.vy = 0;
  });

  // Build quick-lookup
  const nodeMap = {};
  nodes.forEach(n => nodeMap[n.id] = n);

  let alpha = 1;
  const alphaDecay = 0.02;
  const friction = 0.85;

  function tick() {
    if (alpha < 0.001) return;

    // Centering force
    nodes.forEach(node => {
      if (node.fx != null) return;
      node.vx += (centerX - node.x) * 0.002;
      node.vy += (centerY - node.y) * 0.002;
    });

    // Repulsion between nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        let dx = b.x - a.x;
        let dy = b.y - a.y;
        let dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const minDist = (a.size + b.size) * 2.5;

        if (dist < minDist) {
          const force = (minDist - dist) / dist * alpha * 0.8;
          const fx = dx * force;
          const fy = dy * force;
          if (a.fx == null) { a.vx -= fx; a.vy -= fy; }
          if (b.fx == null) { b.vx += fx; b.vy += fy; }
        } else {
          // Gentle repulsion
          const repulsion = -200 * alpha / (dist * dist);
          const fx = dx / dist * repulsion;
          const fy = dy / dist * repulsion;
          if (a.fx == null) { a.vx += fx; a.vy += fy; }
          if (b.fx == null) { b.vx -= fx; b.vy -= fy; }
        }
      }
    }

    // Link spring force
    links.forEach(link => {
      const source = nodeMap[typeof link.source === 'object' ? link.source.id : link.source];
      const target = nodeMap[typeof link.target === 'object' ? link.target.id : link.target];
      if (!source || !target) return;

      let dx = target.x - source.x;
      let dy = target.y - source.y;
      let dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const idealDist = 160 + (1 - link.strength) * 60;

      const force = (dist - idealDist) / dist * alpha * 0.05;
      const fx = dx * force;
      const fy = dy * force;

      if (source.fx == null) { source.vx += fx; source.vy += fy; }
      if (target.fx == null) { target.vx -= fx; target.vy -= fy; }
    });

    // Apply velocities
    nodes.forEach(node => {
      if (node.fx != null) {
        node.x = node.fx;
        node.y = node.fy;
        return;
      }
      node.vx *= friction;
      node.vy *= friction;
      node.x += node.vx;
      node.y += node.vy;

      // Boundary
      const margin = 50;
      node.x = Math.max(margin, Math.min(width - margin, node.x));
      node.y = Math.max(margin, Math.min(height - margin, node.y));
    });

    // Update SVG elements
    linkEls.forEach((el, i) => {
      const link = links[i];
      const source = nodeMap[typeof link.source === 'object' ? link.source.id : link.source];
      const target = nodeMap[typeof link.target === 'object' ? link.target.id : link.target];
      if (source && target) {
        el.setAttribute('x1', source.x);
        el.setAttribute('y1', source.y);
        el.setAttribute('x2', target.x);
        el.setAttribute('y2', target.y);
      }
    });

    nodeEls.forEach((el, i) => {
      const node = nodes[i];
      el.setAttribute('transform', `translate(${node.x}, ${node.y})`);
    });

    alpha -= alphaDecay;
    if (alpha > 0.001) {
      requestAnimationFrame(tick);
    }
  }

  // Enable dragging
  let dragNode = null;
  const svgEl = nodeEls[0]?.closest('svg');
  if (svgEl) {
    svgEl.addEventListener('mousedown', (e) => {
      const g = e.target.closest('.node');
      if (g && g._data) {
        dragNode = g._data;
        dragNode.fx = dragNode.x;
        dragNode.fy = dragNode.y;
        alpha = 0.3;
        requestAnimationFrame(tick);
      }
    });

    svgEl.addEventListener('mousemove', (e) => {
      if (dragNode && dragNode.type !== 'root') {
        const rect = svgEl.getBoundingClientRect();
        const scaleX = parseInt(svgEl.getAttribute('viewBox').split(' ')[2]) / rect.width;
        const scaleY = parseInt(svgEl.getAttribute('viewBox').split(' ')[3]) / rect.height;
        dragNode.fx = (e.clientX - rect.left) * scaleX;
        dragNode.fy = (e.clientY - rect.top) * scaleY;
      }
    });

    svgEl.addEventListener('mouseup', () => {
      if (dragNode && dragNode.type !== 'root') {
        dragNode.fx = null;
        dragNode.fy = null;
      }
      dragNode = null;
    });

    svgEl.addEventListener('mouseleave', () => {
      if (dragNode && dragNode.type !== 'root') {
        dragNode.fx = null;
        dragNode.fy = null;
      }
      dragNode = null;
    });
  }

  // Start simulation
  requestAnimationFrame(tick);
}

function updateInfoPanel(rootKey, rootData) {
  const panel = document.getElementById('network-info');
  if (!panel) return;

  const totalWords = rootData.relatedWords.length;
  const knownWords = rootData.relatedWords.filter(w => WORDS[w]).length;
  const mastery = getRootMasteryLevel(rootKey);
  const masteryPercent = Math.round(mastery * 100);

  panel.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; gap: var(--sp-4);">
      <div>
        <div style="font-family: var(--font-mono); font-size: var(--text-xl); font-weight: 700; color: var(--color-root);">${rootKey}</div>
        <div style="font-size: var(--text-sm); color: var(--text-secondary);">${rootData.meaning} — ${rootData.meaningJa}</div>
        <div style="font-size: var(--text-xs); color: var(--text-muted);">起源: ${rootData.origin}</div>
      </div>
      <div style="text-align: right;">
        <div style="font-size: var(--text-xs); color: var(--text-muted);">登録語数</div>
        <div style="font-family: var(--font-mono); font-size: var(--text-lg); font-weight: 600;">${knownWords} / ${totalWords}</div>
      </div>
      <div style="text-align: right;">
        <div style="font-size: var(--text-xs); color: var(--text-muted);">習得度</div>
        <div style="font-family: var(--font-mono); font-size: var(--text-lg); font-weight: 600; color: ${mastery > 0.7 ? 'var(--color-correct)' : mastery > 0.3 ? 'var(--color-root)' : 'var(--text-secondary)'};">${masteryPercent}%</div>
      </div>
    </div>
    <div class="network-legend">
      <div class="legend-item"><div class="legend-circle" style="background: hsl(45, 90%, 60%);"></div>語根</div>
      <div class="legend-item"><div class="legend-circle" style="background: hsl(210, 70%, 55%);"></div>未学習</div>
      <div class="legend-item"><div class="legend-circle" style="background: hsl(150, 70%, 50%);"></div>習得済み</div>
      <div class="legend-item"><div class="legend-circle" style="background: hsl(230, 15%, 30%);"></div>未登録</div>
    </div>
  `;
}

function addNetworkControls(container) {
  // Controls are defined in HTML, just ensure they exist
  const controls = container.querySelector('.network-controls');
  if (controls) return;

  const controlsDiv = document.createElement('div');
  controlsDiv.className = 'network-controls';
  controlsDiv.innerHTML = `
    <button class="network-control-btn" id="network-reset" title="リセット">↺</button>
  `;
  container.appendChild(controlsDiv);

  document.getElementById('network-reset')?.addEventListener('click', () => {
    if (currentRoot) showRootNetwork(currentRoot);
  });
}

export function navigateToRoot(rootKey) {
  showRootNetwork(rootKey);
  // Update active chip
  document.querySelectorAll('#root-selector .root-chip').forEach(c => {
    c.classList.toggle('active', c.dataset.root === rootKey);
  });
}
