document.addEventListener('DOMContentLoaded', () => {
  const evidenceCards = document.querySelectorAll('.evidence-card');
  const modals = document.querySelectorAll('.evidence-modal');
  const closeBtns = document.querySelectorAll('.modal-close-btn');

  const bibBtn = document.getElementById('openBibModal');
  const bibModal = document.getElementById('bib-modal');

  if (bibBtn && bibModal) {
    bibBtn.addEventListener('click', () => {
      bibModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  evidenceCards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.add('clicked');

      setTimeout(() => {
        const targetModalId = card.getAttribute('data-modal');
        const targetModal = document.getElementById(targetModalId);

        if (targetModal) {
          targetModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }

        setTimeout(() => {
          card.classList.remove('clicked');
        }, 300);
      }, 150);
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modals.forEach(modal => modal.classList.remove('active'));
      document.body.style.overflow = '';
    });
  });

  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Close Any Modal (Escape Key)
  document.addEventListener('keydown', (e) => {
    const zoomOverlay = document.getElementById('researchZoomOverlay');
    if (e.key === 'Escape' && (!zoomOverlay || !zoomOverlay.classList.contains('active'))) {
      modals.forEach(modal => modal.classList.remove('active'));
      document.body.style.overflow = '';
    }
  });

  const zoomables = document.querySelectorAll('.research-zoomable');
  const zoomOverlay = document.getElementById('researchZoomOverlay');
  const zoomImage = document.getElementById('researchZoomImage');
  const zoomCaption = document.getElementById('researchZoomCaption');
  const zoomClose = document.querySelector('.research-zoom-close');

  if (zoomOverlay) {
    zoomables.forEach(img => {
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        zoomOverlay.classList.add('active');
        zoomImage.src = img.src;
        zoomCaption.textContent = img.getAttribute('data-caption') || '';
      });
    });

    if (zoomClose) {
      zoomClose.addEventListener('click', () => {
        zoomOverlay.classList.remove('active');
      });
    }

    zoomOverlay.addEventListener('click', (e) => {
      if (e.target === zoomOverlay) {
        zoomOverlay.classList.remove('active');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && zoomOverlay.classList.contains('active')) {
        zoomOverlay.classList.remove('active');
        e.stopPropagation();
      }
    });
  }

  // Deep link support for modals (Auto-opens modal if linked from another page)
  if (window.location.hash) {
    const hashModal = document.querySelector(window.location.hash);
    if (hashModal && hashModal.classList.contains('evidence-modal')) {
      setTimeout(() => {
        hashModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }, 150);
    }
  }
});