const cards = document.querySelectorAll(".card");
const canUseCustomCursor = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let isNavigating = false;

cards.forEach(card => {
 card.addEventListener("click", event => {
   event.preventDefault();

   if (isNavigating || !card.dataset.link) {
     return;
   }

   isNavigating = true;
   card.classList.add("is-transitioning");
   document.body.classList.add("page-leaving");

   window.setTimeout(() => {
     window.location.href = card.dataset.link;
   }, prefersReducedMotion ? 90 : 280);
 });
});

window.addEventListener("pageshow", () => {
 isNavigating = false;
 document.body.classList.remove("page-leaving");
 cards.forEach(card => card.classList.remove("is-transitioning"));
});

if (canUseCustomCursor) {
 const cursor = document.createElement("div");
 const trail = document.createElement("div");

 cursor.className = "custom-cursor";
 trail.className = "cursor-trail";
 document.body.append(trail, cursor);

 let mouseX = window.innerWidth / 2;
 let mouseY = window.innerHeight / 2;
 let cursorX = mouseX;
 let cursorY = mouseY;
 let trailX = mouseX;
 let trailY = mouseY;
 let hoveredCard = null;

 const setPosition = (element, x, y) => {
   element.style.transform = `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0)`;
 };

 const resetCardPull = card => {
   card.style.setProperty("--magnet-x", "0px");
   card.style.setProperty("--magnet-y", "0px");
 };

 document.addEventListener("mousemove", event => {
   mouseX = event.clientX;
   mouseY = event.clientY;
   document.body.classList.add("cursor-ready");
 });

 document.addEventListener("mouseleave", () => {
   document.body.classList.remove("cursor-ready", "cursor-card-hover");
   hoveredCard = null;
 });

 cards.forEach(card => {
   card.addEventListener("mouseenter", () => {
     hoveredCard = card;
     document.body.classList.add("cursor-card-hover");
   });

   card.addEventListener("mousemove", event => {
     if (prefersReducedMotion) {
       return;
     }

     const rect = card.getBoundingClientRect();
     const pullX = (event.clientX - (rect.left + rect.width / 2)) * 0.035;
     const pullY = (event.clientY - (rect.top + rect.height / 2)) * 0.035;

     card.style.setProperty("--magnet-x", `${Math.max(-5, Math.min(5, pullX))}px`);
     card.style.setProperty("--magnet-y", `${Math.max(-5, Math.min(5, pullY))}px`);
   });

   card.addEventListener("mouseleave", () => {
     hoveredCard = null;
     document.body.classList.remove("cursor-card-hover");
     resetCardPull(card);
   });
 });

 const animateCursor = () => {
   let targetX = mouseX;
   let targetY = mouseY;

   if (hoveredCard && !prefersReducedMotion) {
     const rect = hoveredCard.getBoundingClientRect();
     targetX += (rect.left + rect.width / 2 - mouseX) * 0.14;
     targetY += (rect.top + rect.height / 2 - mouseY) * 0.14;
   }

   cursorX += (targetX - cursorX) * (prefersReducedMotion ? 1 : 0.32);
   cursorY += (targetY - cursorY) * (prefersReducedMotion ? 1 : 0.32);
   trailX += (cursorX - trailX) * (prefersReducedMotion ? 1 : 0.14);
   trailY += (cursorY - trailY) * (prefersReducedMotion ? 1 : 0.14);

   setPosition(cursor, cursorX, cursorY);
   setPosition(trail, trailX, trailY);

   requestAnimationFrame(animateCursor);
 };

 animateCursor();
}

// =========================
// CLIPBOARD COPY LOGIC
// =========================
const copyEmailBtn = document.getElementById('copyEmailBtn');
const clipboardToast = document.getElementById('clipboardToast');

if (copyEmailBtn) {
 copyEmailBtn.addEventListener('click', (e) => {
   e.preventDefault(); 
   e.stopPropagation(); 
   
   const email = 'aronreji05@gmail.com';
   
   navigator.clipboard.writeText(email).then(() => {
     clipboardToast.classList.add('show');
     setTimeout(() => {
       clipboardToast.classList.remove('show');
     }, 3000);
   }).catch(err => {
     console.error('Failed to copy email: ', err);
   });
 });
}

// =========================
// INTRO BOOT SEQUENCE LOGIC
// =========================
const intro = document.getElementById('intro-sequence');
const authBtn = document.querySelector('.authorise-btn');

if (intro && authBtn) {
  // If the intro wasn't hidden by our inline script, set it up
  if (intro.style.display !== 'none') {
    document.body.style.overflow = 'hidden';

    authBtn.addEventListener('click', () => {
      // Mark that the user has seen the intro this session
      sessionStorage.setItem('faceValueIntroSeen', 'true');
      
      intro.classList.add('fade-out-intro');
      document.body.style.overflow = '';
      
      // Remove the class that hides the custom cursor
      document.body.classList.remove('intro-active');
      
      setTimeout(() => {
        intro.remove();
      }, 1000); 
    });
  }
}