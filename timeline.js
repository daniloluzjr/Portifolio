/**
 * Interactive Career Timeline Engine
 * Danilo Luz Jr.
 */
(function () {
  'use strict';

  if (typeof TIMELINE_DATA === 'undefined') {
    console.error('TIMELINE_DATA not found');
    return;
  }

  const { config, categories, bars, labels, milestones } = TIMELINE_DATA;
  let activeFilter = 'all';

  function getX(year) {
    const { minYear, maxYear, viewBoxWidth, marginLeft, marginRight } = config;
    const usable = viewBoxWidth - marginLeft - marginRight;
    return marginLeft + ((year - minYear) / (maxYear - minYear)) * usable;
  }

  function initTimeline() {
    const container = document.getElementById('timelineContainer');
    if (!container) return;

    renderChart(container);
    setupTooltip();
    setupFilters();
  }

  function renderChart(container) {
    const { viewBoxWidth, viewBoxHeight, minYear, maxYear, marginLeft, marginRight } = config;

    let svg = `
      <svg class="timeline-svg-clean" viewBox="0 0 ${viewBoxWidth} ${viewBoxHeight}" 
           preserveAspectRatio="xMidYMid meet" role="img" aria-label="Career Timeline (2005-2026)">
        
        <!-- Header Text inside SVG -->
        <g class="chart-header-group">
          <text x="${viewBoxWidth / 2}" y="42" class="chart-main-title" text-anchor="middle">
            Career Timeline (2005–2026)
          </text>
          <text x="${viewBoxWidth / 2}" y="68" class="chart-sub-title" text-anchor="middle">
            Professional Experience and Academic Path
          </text>
        </g>

        <!-- Vertical grid lines for key 5-year intervals -->
        <g class="chart-grid">
    `;

    const years = [2005, 2010, 2015, 2020, 2025];
    years.forEach(yr => {
      const x = getX(yr);
      svg += `
        <line x1="${x}" y1="100" x2="${x}" y2="490" class="axis-guide-line" />
      `;
    });

    svg += `</g>`;

    // Render Bars
    svg += `<g class="chart-bars-group">`;
    bars.forEach(bar => {
      const cat = categories[bar.category];
      const startX = getX(bar.start);
      const endX = getX(bar.end);
      const width = Math.max(endX - startX, 10);
      const y = cat.y - (bar.height / 2);

      svg += `
        <rect x="${startX}" y="${y}" width="${width}" height="${bar.height}" rx="${bar.height / 2}"
              class="timeline-track-bar bar-${bar.category}" data-category="${bar.category}"
              fill="${cat.color}" />
      `;
    });
    svg += `</g>`;

    // Render Category Titles on the Left
    svg += `<g class="chart-categories-labels">`;
    Object.values(categories).forEach(cat => {
      svg += `
        <text x="${marginLeft - 24}" y="${cat.y + 6}" class="cat-label label-${cat.id}" 
              data-category="${cat.id}" text-anchor="end" fill="${cat.color}">
          ${cat.label}
        </text>
      `;
    });
    svg += `</g>`;

    // Render Static Labels (academic and jobs) with spacing
    svg += `<g class="chart-labels-group">`;
    labels.forEach((lbl, idx) => {
      const cat = categories[lbl.category];
      const x = getX(lbl.year);
      const y = cat.y + lbl.yOffset;
      const isJob = lbl.type === 'job';

      // Optional underline for job intervals (like P.Ed. Teacher or Healthcare Assistant)
      if (lbl.hasLine && lbl.lineStart && lbl.lineEnd) {
        const lx1 = getX(lbl.lineStart);
        const lx2 = getX(lbl.lineEnd);
        const ly = y - 12;
        svg += `
          <line x1="${lx1}" y1="${ly}" x2="${lx2}" y2="${ly}" 
                class="job-interval-line line-${lbl.category}" data-category="${lbl.category}" />
        `;
      }

      svg += `
        <text x="${x}" y="${y}" class="chart-text ${isJob ? 'job-text' : 'academic-text'} text-${lbl.category}"
              data-category="${lbl.category}" id="label-${idx}" text-anchor="${lbl.align || 'middle'}">
          ${lbl.text}
        </text>
      `;
    });
    svg += `</g>`;

    // Render Interactive Milestones (Bolinhas)
    svg += `<g class="chart-nodes-group">`;
    milestones.forEach((m, idx) => {
      const cat = categories[m.category];
      const cx = getX(m.year);
      const cy = cat.y;

      svg += `
        <g class="interactive-node node-${m.category}" 
           data-index="${idx}" 
           data-category="${m.category}"
           tabindex="0"
           role="button"
           aria-label="${m.title} (${m.period})">
          
          <!-- Outer hover aura -->
          <circle cx="${cx}" cy="${cy}" r="16" class="node-aura aura-${m.category}" />

          <!-- Main Circle -->
          <circle cx="${cx}" cy="${cy}" r="7.5" class="node-circle circle-${m.category}" />

          <!-- Inner dot -->
          <circle cx="${cx}" cy="${cy}" r="3" class="node-inner-dot" />
        </g>
      `;
    });
    svg += `</g>`;

    // Render Time Axis at Bottom
    svg += `
      <g class="chart-axis-group">
        <!-- Main Axis Line -->
        <line x1="${marginLeft - 20}" y1="490" x2="${viewBoxWidth - marginRight + 20}" y2="490" class="axis-line" />
    `;

    // Year Tick Marks
    years.forEach(yr => {
      const x = getX(yr);
      svg += `
        <line x1="${x}" y1="490" x2="${x}" y2="499" class="axis-tick" />
        <text x="${x}" y="520" class="axis-year-label" text-anchor="middle">${yr}</text>
      `;
    });

    // Axis Title
    svg += `
        <text x="${(marginLeft + (viewBoxWidth - marginRight)) / 2}" y="550" class="axis-title" text-anchor="middle">
          Year
        </text>
      </g>
    `;

    svg += `</svg>`;
    container.innerHTML = svg;

    bindNodeEvents(container);
  }

  function setupTooltip() {
    let tooltip = document.getElementById('timelineTooltip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.id = 'timelineTooltip';
      tooltip.className = 'clean-timeline-tooltip';
      tooltip.setAttribute('aria-hidden', 'true');
      document.body.appendChild(tooltip);
    }
  }

  function bindNodeEvents(container) {
    const nodes = container.querySelectorAll('.interactive-node');
    const tooltip = document.getElementById('timelineTooltip');

    nodes.forEach(node => {
      const idx = parseInt(node.getAttribute('data-index'), 10);
      const m = milestones[idx];
      const cat = categories[m.category];

      const showTip = () => {
        node.classList.add('active');
        if (!tooltip) return;

        tooltip.innerHTML = `
          <div class="tooltip-badge" style="background-color: ${cat.color};">
            ${cat.label} • ${m.period}
          </div>
          <div class="tooltip-title">${m.title}</div>
          <div class="tooltip-inst">${m.institution}</div>
          <div class="tooltip-detail">${m.detail}</div>
          <div class="tooltip-skills">${m.skills}</div>
        `;

        const rect = node.getBoundingClientRect();
        const tipWidth = 320;
        let left = rect.left + (rect.width / 2) - (tipWidth / 2);
        let top = rect.top - 150;

        if (left < 15) left = 15;
        if (left + tipWidth > window.innerWidth - 15) {
          left = window.innerWidth - tipWidth - 15;
        }
        if (top < 15) {
          top = rect.bottom + 15;
        }

        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
        tooltip.classList.add('visible');
      };

      const hideTip = () => {
        node.classList.remove('active');
        if (tooltip) tooltip.classList.remove('visible');
      };

      node.addEventListener('mouseenter', showTip);
      node.addEventListener('mouseleave', hideTip);
      node.addEventListener('focus', showTip);
      node.addEventListener('blur', hideTip);
    });
  }

  function setupFilters() {
    const buttons = document.querySelectorAll('.timeline-filter-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-filter');
        activeFilter = cat;

        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        applyFilter(cat);
      });
    });
  }

  function applyFilter(cat) {
    const svg = document.querySelector('.timeline-svg-clean');
    if (!svg) return;

    const allBars = svg.querySelectorAll('.timeline-track-bar');
    const allLabels = svg.querySelectorAll('.chart-text, .cat-label, .job-interval-line');
    const allNodes = svg.querySelectorAll('.interactive-node');

    if (cat === 'all') {
      allBars.forEach(el => el.classList.remove('dimmed'));
      allLabels.forEach(el => el.classList.remove('dimmed'));
      allNodes.forEach(el => el.classList.remove('dimmed'));
      return;
    }

    allBars.forEach(el => {
      if (el.getAttribute('data-category') === cat) {
        el.classList.remove('dimmed');
      } else {
        el.classList.add('dimmed');
      }
    });

    allLabels.forEach(el => {
      if (el.getAttribute('data-category') === cat) {
        el.classList.remove('dimmed');
      } else {
        el.classList.add('dimmed');
      }
    });

    allNodes.forEach(el => {
      if (el.getAttribute('data-category') === cat) {
        el.classList.remove('dimmed');
      } else {
        el.classList.add('dimmed');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTimeline);
  } else {
    initTimeline();
  }
})();
