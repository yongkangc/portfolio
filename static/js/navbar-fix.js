// Navbar Toggle Fix
(function() {
  'use strict';

  // Wait for DOM to be ready, then wait for jQuery
  function initNavbar() {
    // Check if jQuery and Bootstrap are loaded
    if (typeof jQuery === 'undefined') {
      console.log('Waiting for jQuery...');
      setTimeout(initNavbar, 100);
      return;
    }
    
    if (typeof jQuery.fn.collapse === 'undefined') {
      console.log('Waiting for Bootstrap...');
      setTimeout(initNavbar, 100);
      return;
    }

    console.log('Initializing navbar toggle fix...');

    // Get elements
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('#navbarNav');

    if (!navbarToggler || !navbarCollapse) {
      console.error('Navbar elements not found');
      return;
    }

    // Manual toggle implementation as fallback
    function toggleNavbar() {
      const isExpanded = navbarCollapse.classList.contains('show');
      
      if (isExpanded) {
        // Collapse
        navbarCollapse.classList.remove('show');
        navbarCollapse.style.display = 'none';
        navbarToggler.setAttribute('aria-expanded', 'false');
      } else {
        // Expand
        navbarCollapse.classList.add('show');
        navbarCollapse.style.display = 'block';
        navbarToggler.setAttribute('aria-expanded', 'true');
      }
    }

    // Remove any existing click handlers
    const newToggler = navbarToggler.cloneNode(true);
    navbarToggler.parentNode.replaceChild(newToggler, navbarToggler);

    // Add our click handler
    newToggler.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Try Bootstrap collapse first
      try {
        $(navbarCollapse).collapse('toggle');
      } catch (err) {
        console.log('Bootstrap collapse failed, using fallback');
        toggleNavbar();
      }
    });

    // Initialize Bootstrap collapse if available
    try {
      $(navbarCollapse).collapse({
        toggle: false
      });
      
      // Ensure proper state
      $(navbarCollapse).on('show.bs.collapse', function() {
        newToggler.setAttribute('aria-expanded', 'true');
      });

      $(navbarCollapse).on('hide.bs.collapse', function() {
        newToggler.setAttribute('aria-expanded', 'false');
      });
      
      console.log('Bootstrap collapse initialized successfully');
    } catch (err) {
      console.log('Using manual toggle implementation');
      // Make sure navbar is initially hidden on mobile
      if (window.innerWidth < 992) {
        navbarCollapse.classList.remove('show');
        navbarCollapse.style.display = 'none';
      }
    }

    // Handle responsive behavior
    function handleResize() {
      if (window.innerWidth >= 992) {
        // Desktop: show navbar, hide toggler
        navbarCollapse.style.display = '';
        navbarCollapse.classList.remove('show');
      } else {
        // Mobile: hide navbar initially
        if (!navbarCollapse.classList.contains('show')) {
          navbarCollapse.style.display = 'none';
        }
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
  }

  // Start initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavbar);
  } else {
    initNavbar();
  }
})();