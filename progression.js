document.addEventListener('DOMContentLoaded', () => {
  const decryptBtns = document.querySelectorAll('.decrypt-btn');

  decryptBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const targetLog = document.getElementById(targetId);

      if (targetLog) {
        if (!targetLog.classList.contains('unsealed')) {
          
          btn.innerHTML = 'DECRYPTING SYSTEM DATA...';
          btn.style.color = '#d8c28a';
          btn.style.borderColor = '#d8c28a';

          setTimeout(() => {
            targetLog.classList.add('unsealed');
            btn.classList.add('granted');
            btn.innerHTML = '[ OPEN ] REDACT & CLOSE FILE';
          }, 500); 
          
        } else {
          btn.innerHTML = 'SECURING RECORD...';
          
          setTimeout(() => {
            targetLog.classList.remove('unsealed');
            btn.classList.remove('granted');
            btn.innerHTML = '[ SYSTEM LOCKED ] DECLASSIFY FULL REPORT';
            
            btn.style.color = '';
            btn.style.borderColor = '';
          }, 400);
        }
      }
    });
  });
});