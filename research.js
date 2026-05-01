document.addEventListener('DOMContentLoaded', () => {
  const evidenceCards = document.querySelectorAll('.evidence-card');
  const modals = document.querySelectorAll('.evidence-modal');
  const closeBtns = document.querySelectorAll('.modal-close-btn');

  // Open Dossier Modal
  evidenceCards.forEach(card => {
    card.addEventListener('click', () => {
      const targetModalId = card.getAttribute('data-modal');
      const targetModal = document.getElementById(targetModalId);
      
      if (targetModal) {
        targetModal.classList.add('active');
        document.body.style.overflow = 'hidden'; 
      }
    });
  });

  // Close Dossier Modal (X button)
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modals.forEach(modal => modal.classList.remove('active'));
      document.body.style.overflow = ''; 
    });
  });

  // Close Dossier Modal (Background Click)
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Close Dossier Modal (Escape Key)
  document.addEventListener('keydown', (e) => {
    const zoomOverlay = document.getElementById('researchZoomOverlay');
    if (e.key === 'Escape' && (!zoomOverlay || !zoomOverlay.classList.contains('active'))) {
      modals.forEach(modal => modal.classList.remove('active'));
      document.body.style.overflow = '';
    }
  });

  // ==========================================
  // IMAGE ZOOM OVERLAY LOGIC
  // ==========================================
  const zoomables = document.querySelectorAll('.research-zoomable');
  const zoomOverlay = document.getElementById('researchZoomOverlay');
  const zoomImage = document.getElementById('researchZoomImage');
  const zoomCaption = document.getElementById('researchZoomCaption');
  const zoomClose = document.querySelector('.research-zoom-close');

  if (zoomOverlay) {
    zoomables.forEach(img => {
      img.addEventListener('click', (e) => {
        e.stopPropagation(); // Stops the click from bubbling up and closing the dossier
        zoomOverlay.classList.add('active');
        zoomImage.src = img.src;
        // Grab the caption from the HTML data attribute
        zoomCaption.textContent = img.getAttribute('data-caption') || '';
      });
    });

    // Close Zoom (X button)
    if (zoomClose) {
      zoomClose.addEventListener('click', () => {
        zoomOverlay.classList.remove('active');
      });
    }

    // Close Zoom (Background click)
    zoomOverlay.addEventListener('click', (e) => {
      if (e.target === zoomOverlay) {
        zoomOverlay.classList.remove('active');
      }
    });

    // Close Zoom (Escape key)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && zoomOverlay.classList.contains('active')) {
        zoomOverlay.classList.remove('active');
        e.stopPropagation(); // Prevents the escape key from also closing the dossier behind it
      }
    });
  }
});