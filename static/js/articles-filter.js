// Articles Filter System
(function() {
  'use strict';

  // State management
  const state = {
    activeTags: new Set(),
    allTags: new Map(), // tag -> count
    articles: [],
    viewMode: 'grid'
  };

  // DOM Elements
  const elements = {
    filterPanel: document.getElementById('filterPanel'),
    sidebarToggleBtn: document.getElementById('sidebarToggleBtn'),
    filterClose: document.getElementById('filterClose'),
    filterContent: document.getElementById('filterContent'),
    tagFilters: document.getElementById('tagFilters'),
    articlesGrid: document.getElementById('articlesGrid'),
    articlesContainer: document.querySelector('.articles-container'),
    clearFilters: document.getElementById('clearFilters'),
    clearFromEmpty: document.getElementById('clearFromEmpty'),
    noResults: document.getElementById('noResults'),
    totalCount: document.getElementById('totalCount'),
    filteredCount: document.getElementById('filteredCount'),
    mobileFilterBtn: document.getElementById('mobileFilterBtn'),
    filterBadge: document.getElementById('filterBadge')
  };

  // Initialize
  function init() {
    collectArticles();
    extractTags();
    renderTagFilters();
    attachEventListeners();
    updateCounts();
  }

  // Collect all articles from DOM
  function collectArticles() {
    const articleCards = document.querySelectorAll('.article-card');
    state.articles = Array.from(articleCards).map(card => {
      const tagsData = card.dataset.tags;
      let tags = [];
      try {
        tags = tagsData ? JSON.parse(tagsData) : [];
      } catch (e) {
        console.error('Error parsing tags:', e);
      }
      
      return {
        element: card,
        tags: tags,
        date: card.dataset.date
      };
    });
  }

  // Extract unique tags and count
  function extractTags() {
    state.allTags.clear();
    
    state.articles.forEach(article => {
      if (article.tags && Array.isArray(article.tags)) {
        article.tags.forEach(tag => {
          if (tag) {
            state.allTags.set(tag, (state.allTags.get(tag) || 0) + 1);
          }
        });
      }
    });

    // Sort tags by count (most popular first)
    state.allTags = new Map(
      [...state.allTags.entries()].sort((a, b) => b[1] - a[1])
    );
  }

  // Render tag filters in panel
  function renderTagFilters() {
    const container = elements.tagFilters;
    container.innerHTML = '';

    state.allTags.forEach((count, tag) => {
      const tagElement = createTagFilter(tag, count);
      container.appendChild(tagElement);
    });
  }

  // Create individual tag filter element
  function createTagFilter(tag, count) {
    const div = document.createElement('div');
    div.className = 'tag-filter';
    div.dataset.tag = tag;
    
    div.innerHTML = `
      <span class="tag-name">${tag}</span>
      <span class="tag-count">${count}</span>
    `;

    div.addEventListener('click', () => toggleTag(tag, div));
    
    return div;
  }

  // Toggle tag selection
  function toggleTag(tag, element) {
    if (state.activeTags.has(tag)) {
      state.activeTags.delete(tag);
      element.classList.remove('active');
    } else {
      state.activeTags.add(tag);
      element.classList.add('active');
    }
    
    filterArticles();
    updateBadge();
  }

  // Filter articles based on selected tags
  function filterArticles() {
    let visibleCount = 0;

    state.articles.forEach(article => {
      const shouldShow = state.activeTags.size === 0 || 
        (article.tags && article.tags.some(tag => state.activeTags.has(tag)));

      if (shouldShow) {
        article.element.classList.remove('hidden');
        article.element.style.display = '';
        visibleCount++;
      } else {
        // Add animation before hiding
        article.element.classList.add('filtering');
        setTimeout(() => {
          article.element.classList.add('hidden');
          article.element.style.display = 'none';
          article.element.classList.remove('filtering');
        }, 300);
      }
    });

    // Show/hide no results message
    elements.noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    
    // Update counts
    elements.filteredCount.textContent = visibleCount;
    
    // Highlight matching tags in articles
    highlightActiveTags();
  }

  // Highlight active tags in article cards
  function highlightActiveTags() {
    document.querySelectorAll('.article-tag').forEach(tag => {
      const tagName = tag.dataset.tag;
      if (state.activeTags.has(tagName)) {
        tag.style.background = 'rgba(80, 250, 123, 0.2)';
        tag.style.borderColor = '#50fa7b';
        tag.style.color = '#50fa7b';
      } else {
        tag.style.background = '';
        tag.style.borderColor = '';
        tag.style.color = '';
      }
    });
  }

  // Clear all filters
  function clearAllFilters() {
    state.activeTags.clear();
    document.querySelectorAll('.tag-filter').forEach(filter => {
      filter.classList.remove('active');
    });
    filterArticles();
    updateBadge();
  }

  // Update article counts
  function updateCounts() {
    elements.totalCount.textContent = state.articles.length;
    elements.filteredCount.textContent = state.articles.length;
  }

  // Update mobile filter badge
  function updateBadge() {
    const count = state.activeTags.size;
    if (elements.filterBadge) {
      elements.filterBadge.textContent = count || '';
      elements.filterBadge.style.display = count > 0 ? 'block' : 'none';
    }
  }

  // Toggle view mode (grid/list)
  function toggleViewMode(mode) {
    console.log('Toggling view mode to:', mode);
    state.viewMode = mode;
    const grid = elements.articlesGrid;
    
    if (!grid) {
      console.error('Articles grid element not found');
      return;
    }
    
    if (mode === 'list') {
      grid.classList.add('list-view');
      console.log('Added list-view class');
    } else {
      grid.classList.remove('list-view');
      console.log('Removed list-view class');
    }

    // Update toggle buttons
    document.querySelectorAll('.view-toggle').forEach(btn => {
      if (btn.dataset.view === mode) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Toggle sidebar (desktop)
  function toggleSidebar() {
    const isCollapsed = elements.filterPanel.classList.contains('collapsed');
    
    if (isCollapsed) {
      elements.filterPanel.classList.remove('collapsed');
      elements.sidebarToggleBtn.classList.add('active');
      if (window.innerWidth > 768) {
        elements.articlesContainer.classList.add('sidebar-open');
      }
    } else {
      elements.filterPanel.classList.add('collapsed');
      elements.sidebarToggleBtn.classList.remove('active');
      elements.articlesContainer.classList.remove('sidebar-open');
    }
  }

  // Mobile filter panel toggle
  function toggleMobileFilter() {
    elements.filterPanel.classList.toggle('active');
    elements.filterPanel.classList.remove('collapsed');
    document.body.style.overflow = 
      elements.filterPanel.classList.contains('active') ? 'hidden' : '';
  }

  // Attach all event listeners
  function attachEventListeners() {
    // Clear filters buttons
    elements.clearFilters.addEventListener('click', clearAllFilters);
    elements.clearFromEmpty.addEventListener('click', clearAllFilters);

    // View mode toggles
    document.querySelectorAll('.view-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('View toggle clicked:', btn.dataset.view);
        toggleViewMode(btn.dataset.view);
      });
    });

    // Sidebar toggle button (desktop)
    if (elements.sidebarToggleBtn) {
      elements.sidebarToggleBtn.addEventListener('click', toggleSidebar);
    }

    // Close button in filter panel
    if (elements.filterClose) {
      elements.filterClose.addEventListener('click', () => {
        if (window.innerWidth > 768) {
          toggleSidebar();
        } else {
          toggleMobileFilter();
        }
      });
    }

    // Mobile filter button
    if (elements.mobileFilterBtn) {
      elements.mobileFilterBtn.addEventListener('click', toggleMobileFilter);
    }

    // Close mobile filter on outside click
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768 && 
          elements.filterPanel.classList.contains('active') &&
          !elements.filterPanel.contains(e.target) &&
          !elements.mobileFilterBtn.contains(e.target)) {
        toggleMobileFilter();
      }
    });

    // Article tag click to filter
    document.querySelectorAll('.article-tag').forEach(tag => {
      tag.addEventListener('click', (e) => {
        e.preventDefault();
        const tagName = tag.dataset.tag;
        
        // Find and click the corresponding filter
        const filterElement = document.querySelector(`.tag-filter[data-tag="${tagName}"]`);
        if (filterElement) {
          filterElement.click();
          
          // Open sidebar if closed and scroll to filter panel on desktop
          if (window.innerWidth > 768) {
            if (elements.filterPanel.classList.contains('collapsed')) {
              toggleSidebar();
            }
            setTimeout(() => {
              elements.filterPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
          } else {
            // Open mobile filter panel
            if (!elements.filterPanel.classList.contains('active')) {
              toggleMobileFilter();
            }
          }
        }
      });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Cmd/Ctrl + K to clear filters
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        clearAllFilters();
      }
      
      // Escape to close mobile filter
      if (e.key === 'Escape' && window.innerWidth <= 768 && 
          elements.filterPanel.classList.contains('active')) {
        toggleMobileFilter();
      }
    });
  }

  // Start the application
  document.addEventListener('DOMContentLoaded', init);
})();