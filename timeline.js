/**
 * Interactive Career Timeline Engine
 * Danilo Luz Jr. — No-overlap layout & instant hover response
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
    const { viewBoxWidth, viewBoxHeight, marginLeft, marginRight } = config;

    let svg = `
      <svg class="timeline-svg-clean" viewBox="0 0 ${viewBoxWidth} ${viewBoxHeight}" 
           preserveAspectRatio="xMidYMid meet" role="img" aria-label="Career Timeline (2005-2026)">
        
        <!-- Header inside SVG -->
        <g class="chart-header-group">
          <text x="${viewBoxWidth / 2}" y="38" class="chart-main-title" text-anchor="middle">
            Career Timeline (2005–2026)
          </text>
          <text x="${viewBoxWidth / 2}" y="60" class="chart-sub-title" text-anchor="middle">
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
        <line x1="${x}" y1="80" x2="${x}" y2="500" class="axis-guide-line" />
      `;
    });

    svg += `</g>`;

    // Render Continuous Bars
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

    // Render Category Labels on the Left - PERFECTLY LEFT-ALIGNED IN A SINGLE COLUMN
    svg += `<g class="chart-categories-labels">`;
    const labelColumnX = 40; // Posição X idêntica para Healthcare, Education e IT
    Object.values(categories).forEach(cat => {
      svg += `
        <text x="${labelColumnX}" y="${cat.y + 6}" class="cat-label label-${cat.id}" 
              data-category="${cat.id}" text-anchor="start" fill="${cat.color}">
          ${cat.label}
        </text>
      `;
    });
    svg += `</g>`;

    // Render Static Labels with clean multiline spacing
    svg += `<g class="chart-labels-group">`;
    labels.forEach(lbl => {
      const x = getX(lbl.year);
      const isJob = lbl.isJob;

      // Guide line from high label down to track
      if (lbl.hasGuideLine && lbl.guideY1 && lbl.guideY2) {
        svg += `
          <line x1="${x}" y1="${lbl.guideY1}" x2="${x}" y2="${lbl.guideY2}" 
                class="callout-guide-line guide-${lbl.category}" data-category="${lbl.category}" />
        `;
      }

      // Period underline
      if (lbl.hasPeriodLine && lbl.lineStart && lbl.lineEnd) {
        const lx1 = getX(lbl.lineStart);
        const lx2 = getX(lbl.lineEnd);
        const ly = lbl.y - 14;
        svg += `
          <line x1="${lx1}" y1="${ly}" x2="${lx2}" y2="${ly}" 
                class="job-interval-line line-${lbl.category}" data-category="${lbl.category}" />
        `;
      }

      svg += `
        <text x="${x}" y="${lbl.y}" class="chart-text ${isJob ? 'job-text' : 'academic-text'} text-${lbl.category}"
              data-category="${lbl.category}" data-milestone="${lbl.milestoneId || ''}" 
              text-anchor="${lbl.align || 'middle'}">
      `;

      lbl.lines.forEach((lineText, lIdx) => {
        const dy = lIdx === 0 ? '0' : '1.2em';
        svg += `<tspan x="${x}" dy="${dy}">${lineText}</tspan>`;
      });

      svg += `</text>`;
    });
    svg += `</g>`;

    // Render Milestones (Bolinhas)
    svg += `<g class="chart-nodes-group">`;
    milestones.forEach((m, idx) => {
      const cat = categories[m.category];
      const cx = getX(m.year);
      const cy = cat.y;

      svg += `
        <g class="interactive-node node-${m.category}" 
           data-index="${idx}" 
           data-id="${m.id}"
           data-category="${m.category}"
           tabindex="0"
           role="button"
           aria-label="${m.title} (${m.period})">
          
          <!-- Outer circle for hover effect (No transform, pure stroke & opacity) -->
          <circle cx="${cx}" cy="${cy}" r="14" class="node-aura aura-${m.category}" />

          <!-- Main circle perfectly anchored at cx, cy -->
          <circle cx="${cx}" cy="${cy}" r="7.5" class="node-circle circle-${m.category}" />

          <!-- Inner center dot -->
          <circle cx="${cx}" cy="${cy}" r="2.5" class="node-center-dot" />
        </g>
      `;
    });
    svg += `</g>`;

    // Time Axis at Bottom
    svg += `
      <g class="chart-axis-group">
        <line x1="${marginLeft - 20}" y1="500" x2="${viewBoxWidth - marginRight + 20}" y2="500" class="axis-line" />
    `;

    years.forEach(yr => {
      const x = getX(yr);
      svg += `
        <line x1="${x}" y1="500" x2="${x}" y2="510" class="axis-tick" />
        <text x="${x}" y="532" class="axis-year-label" text-anchor="middle">${yr}</text>
      `;
    });

    svg += `
        <text x="${(marginLeft + (viewBoxWidth - marginRight)) / 2}" y="555" class="axis-title" text-anchor="middle">
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
    const inspectorCard = document.getElementById('milestoneInspectorCard');

    nodes.forEach(node => {
      const idx = parseInt(node.getAttribute('data-index'), 10);
      const m = milestones[idx];
      const cat = categories[m.category];

      const activateMilestone = () => {
        node.classList.add('node-focused');

        const svg = container.querySelector('.timeline-svg-clean');
        if (svg) {
          const allTexts = svg.querySelectorAll('.chart-text');
          allTexts.forEach(t => {
            if (t.getAttribute('data-milestone') === m.id) {
              t.classList.add('label-highlighted');
              t.classList.remove('label-dimmed');
            } else {
              t.classList.add('label-dimmed');
              t.classList.remove('label-highlighted');
            }
          });
        }

        // Update Live Inspector Card below the chart
        if (inspectorCard) {
          inspectorCard.innerHTML = `
            <div class="insp-header">
              <span class="insp-badge" style="background-color: ${cat.color};">${cat.label}</span>
              <span class="insp-period">${m.period}</span>
            </div>
            <h3 class="insp-title">${m.title}</h3>
            <div class="insp-inst">${m.institution} • <em>${m.role}</em></div>
            <p class="insp-detail">${m.detail}</p>
            <div class="insp-skills"><strong>Competências aplicadas:</strong> ${m.skills}</div>
          `;
          inspectorCard.classList.add('active');
        }

        // Update Tooltip
        if (tooltip) {
          tooltip.innerHTML = `
            <div class="tip-badge" style="background-color: ${cat.color};">${cat.label} • ${m.period}</div>
            <div class="tip-title">${m.title}</div>
            <div class="tip-inst">${m.institution}</div>
            <div class="tip-desc">${m.detail}</div>
          `;

          const rect = node.getBoundingClientRect();
          const tipWidth = 320;
          let left = rect.left + (rect.width / 2) - (tipWidth / 2);
          let top = rect.top - 140;

          if (left < 15) left = 15;
          if (left + tipWidth > window.innerWidth - 15) {
            left = window.innerWidth - tipWidth - 15;
          }
          if (top < 15) top = rect.bottom + 15;

          tooltip.style.left = `${left}px`;
          tooltip.style.top = `${top}px`;
          tooltip.classList.add('visible');
        }
      };

      const deactivateMilestone = () => {
        node.classList.remove('node-focused');

        const svg = container.querySelector('.timeline-svg-clean');
        if (svg) {
          const allTexts = svg.querySelectorAll('.chart-text');
          allTexts.forEach(t => {
            t.classList.remove('label-highlighted', 'label-dimmed');
          });
        }

        if (tooltip) tooltip.classList.remove('visible');
      };

      node.addEventListener('mouseenter', activateMilestone);
      node.addEventListener('mouseleave', deactivateMilestone);
      node.addEventListener('focus', activateMilestone);
      node.addEventListener('blur', deactivateMilestone);
      node.addEventListener('click', activateMilestone);
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
    const allLabels = svg.querySelectorAll('.chart-text, .cat-label, .job-interval-line, .callout-guide-line');
    const allNodes = svg.querySelectorAll('.interactive-node');

    if (cat === 'all') {
      allBars.forEach(el => el.classList.remove('filter-dimmed'));
      allLabels.forEach(el => el.classList.remove('filter-dimmed'));
      allNodes.forEach(el => el.classList.remove('filter-dimmed'));
      return;
    }

    allBars.forEach(el => {
      if (el.getAttribute('data-category') === cat) {
        el.classList.remove('filter-dimmed');
      } else {
        el.classList.add('filter-dimmed');
      }
    });

    allLabels.forEach(el => {
      if (el.getAttribute('data-category') === cat) {
        el.classList.remove('filter-dimmed');
      } else {
        el.classList.add('filter-dimmed');
      }
    });

    allNodes.forEach(el => {
      if (el.getAttribute('data-category') === cat) {
        el.classList.remove('filter-dimmed');
      } else {
        el.classList.add('filter-dimmed');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTimeline);
  } else {
    initTimeline();
  }
})();
