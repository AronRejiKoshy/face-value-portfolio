document.addEventListener('DOMContentLoaded', () => {
    const tabBtns = document.querySelectorAll('.dashboard-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Find target pane and add active class
            const targetId = btn.getAttribute('data-tab');
            const targetPane = document.getElementById(targetId);
            
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
});
/* ========================================= */
/* IMAGE ZOOM FUNCTIONALITY                  */
/* ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    const zoomableImages = document.querySelectorAll('.research-zoomable');
    const zoomOverlay = document.getElementById('researchZoomOverlay');
    const zoomImage = document.getElementById('researchZoomImage');
    const zoomCaption = document.getElementById('researchZoomCaption');
    const closeZoomBtn = document.querySelector('.research-zoom-close');
  
    if (!zoomOverlay) return; // Exit if overlay doesn't exist on this page
  
    // Open zoom overlay
    zoomableImages.forEach(img => {
      img.addEventListener('click', (e) => {
        // Don't trigger if it's part of a locked expandable log (optional safeguard)
        if (img.closest('.expandable-log') && !img.closest('.expandable-log').classList.contains('unsealed')) {
          return; 
        }
        
        e.stopPropagation(); // Prevent modal closure
        const src = img.getAttribute('src');
        const captionText = img.getAttribute('data-caption') || '';
        
        zoomImage.setAttribute('src', src);
        zoomCaption.textContent = captionText;
        
        zoomOverlay.classList.add('active');
        zoomOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Lock background scrolling
      });
    });
  
    // Close zoom overlay
    const closeZoom = () => {
      zoomOverlay.classList.remove('active');
      zoomOverlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      
      // Clear after animation
      setTimeout(() => {
        zoomImage.setAttribute('src', '');
        zoomCaption.textContent = '';
      }, 200);
    };
  
    if (closeZoomBtn) closeZoomBtn.addEventListener('click', closeZoom);
    
    zoomOverlay.addEventListener('click', (e) => {
      if (e.target === zoomOverlay || e.target === zoomImage) {
        closeZoom();
      }
    });
  
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && zoomOverlay.classList.contains('active')) {
        closeZoom();
      }
    });
  });