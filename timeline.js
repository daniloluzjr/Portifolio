/**
 * Advanced Interactive Career Timeline Engine
 * Danilo Luz Jr. — Multi-disciplinary Experience Matrix
 */

(function () {
  'use strict';

  // Ensure data exists
  if (typeof TIMELINE_DATA === 'undefined') {
    console.error('TIMELINE_DATA not loaded!');
    return;
  }

  const { config, categories, bars, milestones } = TIMELINE_DATA;

  // DOM Elements cache
  let svgEl = null;
  let tooltipEl = null;
  let modalEl = null;
  let activeFilter = 'all';
  let activeMilestoneIndex = -1;

  // Year to X coordinate scale
  function getX(year) {
    const { minYear, maxYear, viewBoxWidth, marginLeft, marginRight } = config;
    const usableWidth = viewBoxWidth - marginLeft - marginRight;
    return marginLeft + ((year - minYear) / (maxYear - minYear)) * usableWidth;
  }

  // X coordinate to Year inverse scale
  function getYear(x) {
    const { minYear, maxYear, viewBoxWidth, marginLeft, marginRight } = config;
    const usableWidth = viewBoxWidth - marginLeft - marginRight;
    const clampedX = Math.max(marginLeft, Math.min(x, viewBoxWidth - marginRight));
    return minYear + ((clampedX - marginLeft) / usableWidth) * (maxYear - minYear);
  }

  // Initialize Timeline
  function initTimeline() {
    const container = document.getElementById('timelineGraphContainer');
    if (!container) return;

    // Render interactive SVG
    renderSVG(container);

    // Create Tooltip DOM if not already present
    createTooltip();

    // Create Modal DOM
    createModal();

    // Bind Filter Buttons
    setupFilters();

    // Setup View Toggle (Graph vs Cards)
    setupViewToggle();

    // Setup Keyboard Accessibility
    setupKeyboardNav();
  }

  // Render SVG structure
  function renderSVG(container) {
    const { viewBoxWidth, viewBoxHeight, minYear, maxYear, marginLeft, marginRight, trackY } = config;

    let svg = `
      <svg class="timeline-matrix-svg" viewBox="0 0 ${viewBoxWidth} ${viewBoxHeight}" 
           preserveAspectRatio="xMidYMid meet" role="img" aria-label="Interactive Career Trajectory Matrix">
        <defs>
          <!-- Neon linear gradients for each category -->
          <linearGradient id="grad-health" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#059669" stop-opacity="0.9" />
            <stop offset="50%" stop-color="#10b981" stop-opacity="1" />
            <stop offset="100%" stop-color="#34d399" stop-opacity="0.95" />
          </linearGradient>

          <linearGradient id="grad-edu" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#0284c7" stop-opacity="0.9" />
            <stop offset="50%" stop-color="#06b6d4" stop-opacity="1" />
            <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.95" />
          </linearGradient>

          <linearGradient id="grad-it" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#ea580c" stop-opacity="0.9" />
            <stop offset="50%" stop-color="#f97316" stop-opacity="1" />
            <stop offset="100%" stop-color="#fb923c" stop-opacity="0.95" />
          </linearGradient>

          <!-- Track background glow -->
          <linearGradient id="track-bg-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="rgba(255,255,255,0.02)" />
            <stop offset="100%" stop-color="rgba(255,255,255,0.06)" />
          </linearGradient>

          <!-- Shimmer Filter -->
          <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="node-intense-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <!-- Background Ambient Grid -->
        <g class="svg-grid-layer">
    `;

    // Draw vertical year grid lines
    const startYear = Math.ceil(minYear);
    const endYear = Math.floor(maxYear);

    for (let yr = startYear; yr <= endYear; yr++) {
      const x = getX(yr);
      const isMajor = yr % 5 === 0;
      const isCurrent = yr === 2026;

      svg += `
        <line x1="${x}" y1="30" x2="${x}" y2="355" 
              class="grid-line ${isMajor ? 'grid-major' : 'grid-minor'} ${isCurrent ? 'grid-current' : ''}" />
      `;

      if (isMajor || yr === 2026) {
        svg += `
          <text x="${x}" y="380" class="year-label ${isCurrent ? 'year-current-label' : ''}" text-anchor="middle">
            ${yr}
          </text>
        `;
      }
    }

    // Current Year Indicator line and badge
    const currentX = getX(config.currentYear);
    svg += `
      <g class="current-year-marker" transform="translate(${currentX}, 0)">
        <line x1="0" y1="25" x2="0" y2="360" class="current-year-line" />
        <rect x="-38" y="10" width="76" height="20" rx="10" class="current-year-badge-bg" />
        <text x="0" y="24" class="current-year-text" text-anchor="middle">2026 NOW</text>
      </g>
    `;

    svg += `</g>`; // End grid layer

    // Interactive Scanline (laser crosshair that follows cursor)
    svg += `
      <g id="laserCursorGuide" class="laser-guide-group" style="opacity: 0; pointer-events: none;">
        <line id="laserLine" x1="0" y1="25" x2="0" y2="365" class="laser-vertical-line" />
        <circle id="laserTargetPoint" cx="0" cy="0" r="5" class="laser-target-dot" />
        <rect id="laserYearBadgeBg" x="0" y="348" width="56" height="22" rx="4" class="laser-year-bg" />
        <text id="laserYearText" x="0" y="363" class="laser-year-text" text-anchor="middle">2020</text>
      </g>
    `;

    // Draw Track Lanes (Healthcare, Education, IT)
    svg += `<g class="svg-tracks-layer">`;

    Object.values(categories).forEach(cat => {
      const y = cat.trackY;
      const trackWidth = viewBoxWidth - marginLeft - marginRight;

      svg += `
        <g class="track-group track-${cat.id}" data-category="${cat.id}">
          <!-- Track Rail Background -->
          <rect x="${marginLeft}" y="${y - 14}" width="${trackWidth}" height="28" rx="14" class="track-rail-bg" />
          
          <!-- Category Label on Left -->
          <g class="track-header" transform="translate(18, ${y + 5})">
            <rect x="0" y="-18" width="${marginLeft - 28}" height="34" rx="8" class="cat-pill-bg" />
            <text x="12" y="4" class="cat-icon">${cat.icon}</text>
            <text x="36" y="4" class="cat-title">${cat.shortName}</text>
          </g>
        </g>
      `;
    });

    svg += `</g>`; // End tracks layer

    // Draw Continuous Bars
    svg += `<g class="svg-bars-layer">`;

    bars.forEach(bar => {
      const cat = categories[bar.category];
      const startX = getX(bar.start);
      const endX = getX(bar.end);
      const width = Math.max(endX - startX, 20);
      const y = cat.trackY;

      svg += `
        <g class="bar-group cat-${bar.category}" data-category="${bar.category}">
          <!-- Bar Outer Glow -->
          <rect x="${startX}" y="${y - 10}" width="${width}" height="20" rx="10" 
                class="timeline-bar-glow bar-glow-${bar.category}" />

          <!-- Main Bar -->
          <rect x="${startX}" y="${y - 8}" width="${width}" height="16" rx="8" 
                class="timeline-bar bar-${bar.category}" fill="url(#grad-${bar.category})" />

          <!-- Shimmer Sweep Line -->
          <rect x="${startX + 2}" y="${y - 6}" width="${Math.max(width - 4, 4)}" height="4" rx="2" 
                class="bar-light-accent" />

          <!-- Bar Label Text (clipped or placed intelligently) -->
          <text x="${startX + 12}" y="${y + 4}" class="bar-inline-text">
            ${bar.label}
          </text>
        </g>
      `;
    });

    svg += `</g>`; // End bars layer

    // Draw Milestones (Nodes / Bolinhas)
    svg += `<g class="svg-nodes-layer">`;

    milestones.forEach((m, index) => {
      const cat = categories[m.category];
      const cx = getX(m.year);
      const cy = cat.trackY;

      svg += `
        <g class="node-group cat-${m.category}" 
           data-id="${m.id}" 
           data-index="${index}" 
           data-category="${m.category}"
           transform="translate(${cx}, ${cy})"
           tabindex="0"
           role="button"
           aria-label="${m.title} (${m.year}) - ${cat.name}">

          <!-- Pulsing Radar Ring -->
          <circle cx="0" cy="0" r="14" class="node-halo halo-${m.category}" />

          <!-- Outer Node Rim with Glow -->
          <circle cx="0" cy="0" r="9" class="node-rim rim-${m.category}" />

          <!-- Core Node Fill -->
          <circle cx="0" cy="0" r="6" class="node-core core-${m.category}" />

          <!-- Bright Center Point -->
          <circle cx="0" cy="0" r="2.5" class="node-sparkle" />

          <!-- Floating mini tag on top of node -->
          <g class="node-mini-tag" transform="translate(0, -18)">
            <rect x="-24" y="-12" width="48" height="15" rx="7.5" class="mini-tag-bg" />
            <text x="0" y="-2" class="mini-tag-text" text-anchor="middle">${Math.floor(m.year)}</text>
          </g>
        </g>
      `;
    });

    svg += `</g>`; // End nodes layer

    svg += `</svg>`;

    container.innerHTML = svg;
    svgEl = container.querySelector('.timeline-matrix-svg');

    // Attach Interactive Event Handlers to Nodes
    attachNodeEvents();

    // Attach Mouse tracking for laser guide
    attachLaserGuideEvents();
  }

  // Create Holographic Tooltip DOM
  function createTooltip() {
    let el = document.getElementById('timelineHoloTooltip');
    if (!el) {
      el = document.createElement('div');
      el.id = 'timelineHoloTooltip';
      el.className = 'timeline-holo-tooltip';
      el.setAttribute('aria-hidden', 'true');
      document.body.appendChild(el);
    }
    tooltipEl = el;
  }

  // Create Detailed Modal DOM
  function createModal() {
    let el = document.getElementById('timelineDetailModal');
    if (!el) {
      el = document.createElement('div');
      el.id = 'timelineDetailModal';
      el.className = 'timeline-deep-modal';
      el.setAttribute('aria-hidden', 'true');
      el.setAttribute('role', 'dialog');

      el.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-wrapper" role="document">
          <button class="modal-close-btn" id="modalCloseBtn" aria-label="Close dialog">✕</button>
          
          <div class="modal-inner">
            <div class="modal-header">
              <div class="modal-cat-badge" id="modalCatBadge">
                <span id="modalCatIcon">🩺</span>
                <span id="modalCatName">Healthcare</span>
              </div>
              <div class="modal-period" id="modalPeriod">2018 – 2020</div>
            </div>

            <h2 class="modal-title" id="modalTitle">Milestone Title</h2>
            <div class="modal-subtitle" id="modalSubtitle">Institution / Organization</div>

            <div class="modal-body-content">
              <div class="modal-photo-col" id="modalPhotoCol">
                <div class="modal-img-container">
                  <img id="modalImg" src="" alt="Milestone Photo" />
                  <div class="modal-img-overlay"></div>
                </div>
              </div>

              <div class="modal-desc-col">
                <div class="modal-highlight-box" id="modalHighlight">
                  Highlight summary text
                </div>
                <p class="modal-long-desc" id="modalLongDesc">
                  Detailed narrative about this stage of Danilo's multi-disciplinary journey.
                </p>

                <div class="modal-skills-section">
                  <span class="skills-heading">Applied Competencies & Skills:</span>
                  <div class="modal-skills-tags" id="modalSkillsTags"></div>
                </div>

                <div class="modal-actions" id="modalActions">
                  <a href="#" target="_blank" rel="noopener" class="modal-link-btn" id="modalLinkBtn">
                    <span>Visit Project &rarr;</span>
                  </a>
                </div>
              </div>
            </div>

            <div class="modal-footer-nav">
              <button class="modal-nav-btn prev" id="modalPrevBtn">
                &larr; Previous Milestone
              </button>
              <div class="modal-counter" id="modalCounter">1 / 15</div>
              <button class="modal-nav-btn next" id="modalNextBtn">
                Next Milestone &rarr;
              </button>
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(el);

      // Bind modal close events
      const closeBtn = el.querySelector('#modalCloseBtn');
      const backdrop = el.querySelector('.modal-backdrop');
      const prevBtn = el.querySelector('#modalPrevBtn');
      const nextBtn = el.querySelector('#modalNextBtn');

      closeBtn.addEventListener('click', closeModal);
      backdrop.addEventListener('click', closeModal);

      prevBtn.addEventListener('click', () => {
        if (activeMilestoneIndex > 0) {
          openModalByIndex(activeMilestoneIndex - 1);
        } else {
          openModalByIndex(milestones.length - 1);
        }
      });

      nextBtn.addEventListener('click', () => {
        if (activeMilestoneIndex < milestones.length - 1) {
          openModalByIndex(activeMilestoneIndex + 1);
        } else {
          openModalByIndex(0);
        }
      });
    }
    modalEl = el;
  }

  // Attach Node Events (Hover & Click)
  function attachNodeEvents() {
    if (!svgEl) return;
    const nodes = svgEl.querySelectorAll('.node-group');

    nodes.forEach(node => {
      const index = parseInt(node.getAttribute('data-index'), 10);
      const milestone = milestones[index];
      const cat = categories[milestone.category];

      // Mouse enter / Focus
      const onEnter = (e) => {
        node.classList.add('node-active');
        showTooltip(milestone, cat, node);
      };

      // Mouse leave / Blur
      const onLeave = () => {
        node.classList.remove('node-active');
        hideTooltip();
      };

      // Click / Keydown Enter
      const onSelect = (e) => {
        e.preventDefault();
        openModalByIndex(index);
      };

      node.addEventListener('mouseenter', onEnter);
      node.addEventListener('mouseleave', onLeave);
      node.addEventListener('focus', onEnter);
      node.addEventListener('blur', onLeave);
      node.addEventListener('click', onSelect);
      node.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect(e);
        }
      });
    });
  }

  // Laser Guide Events
  function attachLaserGuideEvents() {
    if (!svgEl) return;
    const guide = svgEl.querySelector('#laserCursorGuide');
    const laserLine = svgEl.querySelector('#laserLine');
    const laserYearText = svgEl.querySelector('#laserYearText');
    const laserYearBadgeBg = svgEl.querySelector('#laserYearBadgeBg');

    if (!guide || !laserLine) return;

    svgEl.addEventListener('mousemove', (e) => {
      const rect = svgEl.getBoundingClientRect();
      const svgX = ((e.clientX - rect.left) / rect.width) * config.viewBoxWidth;

      if (svgX >= config.marginLeft && svgX <= (config.viewBoxWidth - config.marginRight)) {
        guide.style.opacity = '1';
        laserLine.setAttribute('x1', svgX);
        laserLine.setAttribute('x2', svgX);

        const currentYear = getYear(svgX);
        laserYearText.textContent = Math.floor(currentYear);
        laserYearText.setAttribute('x', svgX);
        laserYearBadgeBg.setAttribute('x', svgX - 28);
      } else {
        guide.style.opacity = '0';
      }
    });

    svgEl.addEventListener('mouseleave', () => {
      guide.style.opacity = '0';
    });
  }

  // Show Holographic Tooltip
  function showTooltip(m, cat, node) {
    if (!tooltipEl) return;

    const skillsHtml = m.skills
      ? m.skills.map(s => `<span class="tip-skill-tag">${s}</span>`).join('')
      : '';

    tooltipEl.innerHTML = `
      <div class="tip-header ${cat.badgeClass}">
        <span class="tip-icon">${cat.icon}</span>
        <span class="tip-cat-name">${cat.shortName}</span>
        <span class="tip-year">${m.period || Math.floor(m.year)}</span>
      </div>
      <div class="tip-title">${m.title}</div>
      <div class="tip-institution">🏢 ${m.institution}</div>
      <div class="tip-desc">${m.highlight || m.description.substring(0, 100) + '...'}</div>
      <div class="tip-skills-row">${skillsHtml}</div>
      <div class="tip-footer-hint">✨ Click node for photos & full details</div>
    `;

    tooltipEl.style.borderColor = cat.color;
    tooltipEl.style.boxShadow = `0 12px 36px rgba(0,0,0,0.6), 0 0 20px ${cat.colorGlow}`;

    // Calculate position
    const nodeRect = node.getBoundingClientRect();
    const tooltipWidth = 320;
    const tooltipHeight = 180;

    let posX = nodeRect.left + nodeRect.width / 2 - tooltipWidth / 2;
    let posY = nodeRect.top - tooltipHeight - 16;

    // Edge collision detection
    if (posX < 12) posX = 12;
    if (posX + tooltipWidth > window.innerWidth - 12) {
      posX = window.innerWidth - tooltipWidth - 12;
    }
    if (posY < 12) {
      // Show below if no room above
      posY = nodeRect.bottom + 16;
    }

    tooltipEl.style.left = `${posX}px`;
    tooltipEl.style.top = `${posY}px`;
    tooltipEl.classList.add('visible');
    tooltipEl.setAttribute('aria-hidden', 'false');
  }

  // Hide Tooltip
  function hideTooltip() {
    if (!tooltipEl) return;
    tooltipEl.classList.remove('visible');
    tooltipEl.setAttribute('aria-hidden', 'true');
  }

  // Open Modal by Index
  function openModalByIndex(index) {
    if (!modalEl || index < 0 || index >= milestones.length) return;
    activeMilestoneIndex = index;
    const m = milestones[index];
    const cat = categories[m.category];

    // Populate Modal Fields
    modalEl.querySelector('#modalCatIcon').textContent = cat.icon;
    modalEl.querySelector('#modalCatName').textContent = cat.name;
    modalEl.querySelector('#modalCatBadge').className = `modal-cat-badge ${cat.badgeClass}`;
    modalEl.querySelector('#modalPeriod').textContent = m.period;
    modalEl.querySelector('#modalTitle').textContent = m.title;
    modalEl.querySelector('#modalSubtitle').textContent = `${m.institution} • ${m.location}`;
    modalEl.querySelector('#modalHighlight').textContent = m.highlight;
    modalEl.querySelector('#modalLongDesc').textContent = m.description;

    // Photo
    const photoCol = modalEl.querySelector('#modalPhotoCol');
    const imgEl = modalEl.querySelector('#modalImg');
    if (m.image) {
      imgEl.src = m.image;
      imgEl.alt = m.title;
      photoCol.style.display = 'block';
    } else {
      photoCol.style.display = 'none';
    }

    // Skills
    const skillsContainer = modalEl.querySelector('#modalSkillsTags');
    skillsContainer.innerHTML = m.skills
      ? m.skills.map(s => `<span class="modal-tag">${s}</span>`).join('')
      : '';

    // Action Link
    const actionCol = modalEl.querySelector('#modalActions');
    const linkBtn = modalEl.querySelector('#modalLinkBtn');
    if (m.link) {
      linkBtn.href = m.link;
      actionCol.style.display = 'block';
    } else {
      actionCol.style.display = 'none';
    }

    // Counter
    modalEl.querySelector('#modalCounter').textContent = `${index + 1} / ${milestones.length}`;

    // Open Modal
    modalEl.classList.add('active');
    modalEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    const closeBtn = modalEl.querySelector('#modalCloseBtn');
    if (closeBtn) closeBtn.focus();
  }

  // Close Modal
  function closeModal() {
    if (!modalEl) return;
    modalEl.classList.remove('active');
    modalEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Category Filtering Setup
  function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-pill-btn');
    const countBadge = document.getElementById('activeMilestoneCount');

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-filter');
        activeFilter = cat;

        // Toggle active button style
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Apply filter to SVG elements
        applyFilterToGraph(cat);

        // Apply filter to Cards Grid if present
        applyFilterToCards(cat);

        // Update count badge
        if (countBadge) {
          const count = cat === 'all'
            ? milestones.length
            : milestones.filter(m => m.category === cat).length;
          countBadge.textContent = `${count} Milestones`;
        }
      });
    });
  }

  // Apply Filter to SVG
  function applyFilterToGraph(filterCat) {
    if (!svgEl) return;

    const allNodes = svgEl.querySelectorAll('.node-group');
    const allBars = svgEl.querySelectorAll('.bar-group');
    const allTracks = svgEl.querySelectorAll('.track-group');

    if (filterCat === 'all') {
      allNodes.forEach(n => n.classList.remove('dimmed', 'highlighted'));
      allBars.forEach(b => b.classList.remove('dimmed', 'highlighted'));
      allTracks.forEach(t => t.classList.remove('dimmed', 'highlighted'));
      return;
    }

    allNodes.forEach(n => {
      const c = n.getAttribute('data-category');
      if (c === filterCat) {
        n.classList.remove('dimmed');
        n.classList.add('highlighted');
      } else {
        n.classList.remove('highlighted');
        n.classList.add('dimmed');
      }
    });

    allBars.forEach(b => {
      const c = b.getAttribute('data-category');
      if (c === filterCat) {
        b.classList.remove('dimmed');
        b.classList.add('highlighted');
      } else {
        b.classList.remove('highlighted');
        b.classList.add('dimmed');
      }
    });

    allTracks.forEach(t => {
      const c = t.getAttribute('data-category');
      if (c === filterCat) {
        t.classList.remove('dimmed');
        t.classList.add('highlighted');
      } else {
        t.classList.remove('highlighted');
        t.classList.add('dimmed');
      }
    });
  }

  // Apply Filter to Journey Cards
  function applyFilterToCards(filterCat) {
    const cardItems = document.querySelectorAll('.journey-card-item');
    cardItems.forEach(card => {
      const c = card.getAttribute('data-category');
      if (filterCat === 'all' || c === filterCat) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Setup View Toggle (Graph vs Cards)
  function setupViewToggle() {
    const btnGraph = document.getElementById('viewModeGraph');
    const btnCards = document.getElementById('viewModeCards');
    const viewGraph = document.getElementById('timelineGraphView');
    const viewCards = document.getElementById('timelineCardsView');

    if (!btnGraph || !btnCards || !viewGraph || !viewCards) return;

    btnGraph.addEventListener('click', () => {
      btnGraph.classList.add('active');
      btnCards.classList.remove('active');
      viewGraph.style.display = 'block';
      viewCards.style.display = 'none';
    });

    btnCards.addEventListener('click', () => {
      btnCards.classList.add('active');
      btnGraph.classList.remove('active');
      viewGraph.style.display = 'none';
      viewCards.style.display = 'grid';
      renderCardsView(viewCards);
    });
  }

  // Render Cards View for responsive/deep dive
  function renderCardsView(container) {
    if (container.dataset.rendered === 'true') return;

    let html = '';
    milestones.forEach((m, idx) => {
      const cat = categories[m.category];
      html += `
        <article class="journey-card-item card-${m.category}" data-category="${m.category}" data-index="${idx}">
          <div class="j-card-badge ${cat.badgeClass}">
            <span>${cat.icon}</span>
            <span>${cat.shortName}</span>
            <span class="j-card-year">${m.period}</span>
          </div>

          <h3 class="j-card-title">${m.title}</h3>
          <div class="j-card-inst">${m.institution}</div>
          <p class="j-card-desc">${m.highlight}</p>

          <div class="j-card-tags">
            ${m.skills ? m.skills.map(s => `<span class="j-tag">${s}</span>`).join('') : ''}
          </div>

          <button class="j-card-btn" onclick="window.TimelineEngine.openMilestone(${idx})">
            View Details &rarr;
          </button>
        </article>
      `;
    });

    container.innerHTML = html;
    container.dataset.rendered = 'true';
  }

  // Keyboard Navigation (Escape closes modal)
  function setupKeyboardNav() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalEl && modalEl.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // Expose global controller
  window.TimelineEngine = {
    init: initTimeline,
    openMilestone: openModalByIndex,
    closeMilestone: closeModal,
    setFilter: (cat) => {
      const btn = document.querySelector(`.filter-pill-btn[data-filter="${cat}"]`);
      if (btn) btn.click();
    }
  };

  // Auto-init on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTimeline);
  } else {
    initTimeline();
  }
})();
