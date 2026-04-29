document.addEventListener('DOMContentLoaded', () => {
    const evidenceCards = document.querySelectorAll('.evidence-card');
    const modals = document.querySelectorAll('.evidence-modal');
    const closeBtns = document.querySelectorAll('.modal-close-btn');
  
    // Open Modal
    evidenceCards.forEach(card => {
      card.addEventListener('click', () => {
        const targetModalId = card.getAttribute('data-modal');
        const targetModal = document.getElementById(targetModalId);
        
        if (targetModal) {
          targetModal.classList.add('active');
          document.body.style.overflow = 'hidden'; // Stop background scrolling
        }
      });
    });
  
    // Close Modal (Clicking the X button)
    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modals.forEach(modal => modal.classList.remove('active'));
        document.body.style.overflow = ''; 
      });
    });
  
    // Close Modal (Clicking the dark background overlay)
    modals.forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    });
  
    // Close Modal (Pressing the Escape key)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        modals.forEach(modal => modal.classList.remove('active'));
        document.body.style.overflow = '';
      }
    });
  });