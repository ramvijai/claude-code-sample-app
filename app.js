/* ═══════════════════════════════════════════════════════════════════════════
   GenAI Hub — App Logic v2
   Renders tools, handles search/filter/modal/spotlight/theme/scroll-reveal
   ═══════════════════════════════════════════════════════════════════════════ */

// ── Category color map ─────────────────────────────────────────────────────
const CAT_COLORS = {
  llm:             '#8b5cf6',
  'code-ide':      '#3b82f6',
  'code-assistant':'#10b981',
  image:           '#f59e0b',
  video:           '#ef4444',
  audio:           '#ec4899',
  agents:          '#6366f1',
  productivity:    '#06b6d4',
};

// ── State ──────────────────────────────────────────────────────────────────
let activeCategory = 'all';
let searchQuery    = '';
let isListView     = false;

// ── DOM refs ───────────────────────────────────────────────────────────────
const toolGrid     = document.getElementById('toolGrid');
const filterTabs   = document.getElementById('filterTabs');
const resultsCount = document.getElementById('resultsCount');
const emptyState   = document.getElementById('emptyState');
const searchInput  = document.getElementById('searchInput');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose   = document.getElementById('modalClose');
const gridViewBtn  = document.getElementById('gridViewBtn');
const listViewBtn  = document.getElementById('listViewBtn');
const themeToggle  = document.getElementById('themeToggle');
const spotlightTrack = document.getElementById('spotlightTrack');

// ── Theme ──────────────────────────────────────────────────────────────────
function initTheme() {
  const saved = localStorage.getItem('gaihub-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('gaihub-theme', next);
}

// ── Helpers ────────────────────────────────────────────────────────────────
function getCategoryMeta(id) {
  return CATEGORIES.find(c => c.id === id) || CATEGORIES[0];
}

function getFilteredTools() {
  let tools = TOOLS;
  if (activeCategory !== 'all') {
    tools = tools.filter(t => t.category === activeCategory);
  }
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    tools = tools.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.company.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tags.some(tag => tag.toLowerCase().includes(q)) ||
      (getCategoryMeta(t.category).label || '').toLowerCase().includes(q)
    );
  }
  return tools;
}

function getCategoryCountMap() {
  const map = { all: TOOLS.length };
  CATEGORIES.slice(1).forEach(cat => {
    map[cat.id] = TOOLS.filter(t => t.category === cat.id).length;
  });
  return map;
}

// ── Count-up animation ─────────────────────────────────────────────────────
function animateCountUp(el, target, suffix = '') {
  const duration = 1200;
  const start    = performance.now();
  const ease     = t => t < .5 ? 2*t*t : -1+(4-2*t)*t; // ease-in-out quad

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const current  = Math.round(ease(progress) * target);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target + suffix;
  }
  requestAnimationFrame(tick);
}

function runCountUps() {
  document.querySelectorAll('.stat-number[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    animateCountUp(el, target, suffix);
  });
}

// Run count-ups when hero enters view
function initCountUps() {
  const hero = document.querySelector('.hero-stats');
  if (!hero) return;
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      runCountUps();
      obs.disconnect();
    }
  }, { threshold: 0.5 });
  obs.observe(hero);
}

// ── Scroll-reveal for tool cards ───────────────────────────────────────────
let revealObserver = null;

function initScrollReveal() {
  if (revealObserver) revealObserver.disconnect();
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

  document.querySelectorAll('.tool-card').forEach(card => {
    revealObserver.observe(card);
  });
}

// ── Featured Spotlight ─────────────────────────────────────────────────────
function renderSpotlight() {
  const featured = TOOLS.filter(t => t.featured);
  spotlightTrack.innerHTML = featured.map(tool => {
    const color = tool.iconBg;
    return `
      <div
        class="spotlight-card"
        style="--s-color: ${color}"
        onclick="openModal('${tool.id}')"
        role="button" tabindex="0"
        aria-label="View ${tool.name}"
        onkeydown="if(event.key==='Enter')openModal('${tool.id}')"
      >
        <div class="sc-header">
          <div class="sc-icon" style="background:${color}">${tool.icon}</div>
          <div>
            <div class="sc-name">${tool.name}</div>
            <div class="sc-company">${tool.company}</div>
          </div>
        </div>
        <p class="sc-desc">${tool.description}</p>
      </div>
    `;
  }).join('');

  // Drag-scroll spotlight
  initDragScroll(document.querySelector('.spotlight-scroll'));
}

function initDragScroll(el) {
  if (!el) return;
  let isDown = false, startX, scrollLeft;
  el.addEventListener('mousedown',  e => { isDown = true; el.classList.add('dragging'); startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft; });
  el.addEventListener('mouseleave', () => { isDown = false; el.classList.remove('dragging'); });
  el.addEventListener('mouseup',    () => { isDown = false; el.classList.remove('dragging'); });
  el.addEventListener('mousemove',  e => { if (!isDown) return; e.preventDefault(); const x = e.pageX - el.offsetLeft; el.scrollLeft = scrollLeft - (x - startX) * 1.2; });
}

// ── Filter Tabs ────────────────────────────────────────────────────────────
function renderFilterTabs() {
  const counts = getCategoryCountMap();
  filterTabs.innerHTML = CATEGORIES.map(cat => {
    const color = CAT_COLORS[cat.id] || '#8b5cf6';
    const isActive = activeCategory === cat.id;
    return `
      <button
        class="filter-tab ${isActive ? 'active' : ''}"
        style="${isActive ? `--tab-color:${color}` : ''}"
        onclick="setCategory('${cat.id}')"
        aria-pressed="${isActive}"
      >
        <span>${cat.icon}</span>
        <span>${cat.label}</span>
        <span class="tab-count">${counts[cat.id]}</span>
      </button>
    `;
  }).join('');
}

// ── Tool Cards ─────────────────────────────────────────────────────────────
function renderTools() {
  const tools = getFilteredTools();

  if (tools.length === 0) {
    toolGrid.style.display = 'none';
    emptyState.style.display = 'block';
    resultsCount.textContent = 'No tools found';
    return;
  }

  toolGrid.style.display = 'grid';
  emptyState.style.display = 'none';

  const catLabel = getCategoryMeta(activeCategory).label;
  resultsCount.textContent = searchQuery
    ? `${tools.length} result${tools.length !== 1 ? 's' : ''} for "${searchQuery}"`
    : `Showing ${tools.length} tool${tools.length !== 1 ? 's' : ''}${activeCategory !== 'all' ? ` in ${catLabel}` : ''}`;

  toolGrid.innerHTML = tools.map(tool => renderToolCard(tool)).join('');
  initScrollReveal();
}

function renderToolCard(tool) {
  const cat    = getCategoryMeta(tool.category);
  const color  = tool.iconBg;
  const tagsHtml = tool.tags.slice(0, 4).map(t => `<span class="tag">${t}</span>`).join('');

  return `
    <article
      class="tool-card ${tool.featured ? 'featured' : ''}"
      style="--card-color: ${color}"
      onclick="openModal('${tool.id}')"
      role="button" tabindex="0"
      aria-label="Learn more about ${tool.name}"
      onkeydown="if(event.key==='Enter'||event.key===' ')openModal('${tool.id}')"
    >
      ${tool.featured ? '<span class="featured-badge">★ Featured</span>' : ''}

      <div class="card-header">
        <div class="card-icon" style="background:${color}">${tool.icon}</div>
        <div class="card-meta">
          <div class="card-name">${tool.name}</div>
          <div class="card-company">${tool.company}</div>
        </div>
      </div>

      <div class="card-body">
        <p class="card-description">${tool.description}</p>
      </div>

      <div class="card-tags">${tagsHtml}</div>

      <div class="card-footer">
        <span class="category-pill cat-${tool.category}">${cat.icon} ${cat.label}</span>
        <button class="learn-btn" onclick="event.stopPropagation(); openModal('${tool.id}')">
          Learn More
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </article>
  `;
}

// ── Modal ──────────────────────────────────────────────────────────────────
function openModal(toolId) {
  const tool = TOOLS.find(t => t.id === toolId);
  if (!tool) return;

  const cat   = getCategoryMeta(tool.category);
  const color = tool.iconBg;

  // Banner
  const banner    = document.getElementById('modalBanner');
  const bannerGlow = document.getElementById('modalBannerGlow');
  banner.style.background     = `linear-gradient(160deg, ${color}28, ${color}12, var(--surface-2))`;
  bannerGlow.style.background = color;

  // Icon
  const iconEl = document.getElementById('modalIcon');
  iconEl.style.background = color;
  iconEl.textContent       = tool.icon;

  // Info
  document.getElementById('modalTitle').textContent       = tool.name;
  document.getElementById('modalCompany').textContent     = `by ${tool.company}`;
  document.getElementById('modalDescription').textContent = tool.description;

  const catBadge = document.getElementById('modalCategoryBadge');
  catBadge.textContent = `${cat.icon} ${cat.label}`;
  catBadge.className   = `modal-category-badge cat-${tool.category}`;

  // Tags
  document.getElementById('modalTags').innerHTML =
    tool.tags.map(t => `<span class="tag">${t}</span>`).join('');

  // Links
  const linksHtml = [
    tool.url && `<a class="modal-link modal-link-primary" href="${tool.url}" target="_blank" rel="noopener">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      Open ${tool.name}
    </a>`,
    tool.docsUrl && `<a class="modal-link modal-link-secondary" href="${tool.docsUrl}" target="_blank" rel="noopener">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
      Docs
    </a>`,
    tool.quickstartUrl && `<a class="modal-link modal-link-secondary" href="${tool.quickstartUrl}" target="_blank" rel="noopener">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
      Official Quickstart
    </a>`,
  ].filter(Boolean).join('');
  document.getElementById('modalLinks').innerHTML = linksHtml;

  // Quickstart
  document.getElementById('quickstartContent').innerHTML =
    tool.quickstart || '<p style="color:var(--text-muted);font-size:14px;">No quickstart guide available yet.</p>';

  // How-tos
  if (tool.howtos && tool.howtos.length > 0) {
    document.getElementById('howtosContent').innerHTML = tool.howtos.map((ht, i) => `
      <div class="howto-item" id="howto-${toolId}-${i}">
        <div class="howto-header" onclick="toggleHowto('${toolId}-${i}')">
          <span class="howto-title">${ht.title}</span>
          <svg class="howto-chevron" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </div>
        <div class="howto-body">${renderHowtoContent(ht.content)}</div>
      </div>
    `).join('');
  } else {
    document.getElementById('howtosContent').innerHTML =
      '<p style="color:var(--text-muted);font-size:14px;">No how-to guides available yet.</p>';
  }

  setModalTab('quickstart');

  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  history.pushState({ toolId }, '', `#tool-${toolId}`);
}

function renderHowtoContent(content) {
  return content.replace(/`([^`]+)`/g, '<code>$1</code>');
}

function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
  if (history.state && history.state.toolId) {
    history.pushState({}, '', window.location.pathname);
  }
}

function toggleHowto(id) {
  const item = document.getElementById(`howto-${id}`);
  if (item) item.classList.toggle('open');
}

function setModalTab(tabId) {
  document.querySelectorAll('.modal-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });
  document.querySelectorAll('.tab-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === `tab-${tabId}`);
  });
}

// ── Category & Search ──────────────────────────────────────────────────────
function setCategory(catId) {
  activeCategory = catId;
  renderFilterTabs();
  renderTools();
  document.getElementById('tools').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function resetFilters() {
  activeCategory = 'all';
  searchQuery    = '';
  searchInput.value = '';
  renderFilterTabs();
  renderTools();
}

// ── View Toggle ────────────────────────────────────────────────────────────
function setView(mode) {
  isListView = mode === 'list';
  toolGrid.classList.toggle('list-view', isListView);
  gridViewBtn.classList.toggle('active', !isListView);
  listViewBtn.classList.toggle('active', isListView);
}

// ── Events ─────────────────────────────────────────────────────────────────
searchInput.addEventListener('input', e => {
  searchQuery = e.target.value.trim();
  renderTools();
});

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });

document.querySelectorAll('.modal-tab').forEach(btn => {
  btn.addEventListener('click', () => setModalTab(btn.dataset.tab));
});

gridViewBtn.addEventListener('click', () => setView('grid'));
listViewBtn.addEventListener('click', () => setView('list'));
themeToggle.addEventListener('click', toggleTheme);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('open')) closeModal();
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    searchInput.focus();
    searchInput.select();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

window.addEventListener('popstate', () => {
  if (modalOverlay.classList.contains('open')) {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ── URL hash deep-link ─────────────────────────────────────────────────────
function checkUrlHash() {
  const hash = window.location.hash;
  if (hash.startsWith('#tool-')) {
    const toolId = hash.replace('#tool-', '');
    if (TOOLS.find(t => t.id === toolId)) {
      setTimeout(() => openModal(toolId), 120);
    }
  }
}

// ── Init ───────────────────────────────────────────────────────────────────
function init() {
  initTheme();
  renderSpotlight();
  renderFilterTabs();
  renderTools();
  initCountUps();
  checkUrlHash();
}

init();
