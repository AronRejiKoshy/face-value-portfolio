const accordions = document.querySelectorAll('.accordion-toggle');

accordions.forEach(acc => {
  acc.addEventListener('click', () => {
    acc.classList.toggle('active');
    acc.nextElementSibling.classList.toggle('open');
  });
});

const pad = (num) => num < 10 ? '0' + num : num;

const carousels = document.querySelectorAll('.carousel');

carousels.forEach(carousel => {
 const track = carousel.querySelector('.carousel-track');
 const images = track.querySelectorAll('img');
 const leftBtn = carousel.querySelector('.arrow.left');
 const rightBtn = carousel.querySelector('.arrow.right');
 const counter = carousel.querySelector('.page-counter');
  
 if (images.length <= 1) {
   if (leftBtn) leftBtn.style.display = 'none';
   if (rightBtn) rightBtn.style.display = 'none';
   if (counter) counter.style.display = 'none';
   return;
 }

 let currentIndex = 0;
 
 if (counter) {
   counter.textContent = `PAGE ${pad(1)} / ${pad(images.length)}`;
 }

 function updateGallery(newIndex) {
   images[currentIndex].classList.remove('active');
   currentIndex = (newIndex + images.length) % images.length;
   images[currentIndex].classList.add('active');
   
   if (counter) {
     counter.textContent = `PAGE ${pad(currentIndex + 1)} / ${pad(images.length)}`;
   }
 }

 leftBtn.addEventListener('click', (e) => {
   e.stopPropagation();
   updateGallery(currentIndex - 1);
 });

 rightBtn.addEventListener('click', (e) => {
   e.stopPropagation();
   updateGallery(currentIndex + 1);
 });
});

const zoomOverlay = document.getElementById("zoomOverlay");
const zoomedImage = document.getElementById("zoomedImage");
const modalLeftBtn = document.getElementById("modalLeft");
const modalRightBtn = document.getElementById("modalRight");
const modalCounter = document.getElementById("modalCounter");

let activeModalImages = [];
let currentModalIndex = 0;

document.querySelectorAll(".zoomable").forEach(img => {
 img.addEventListener("click", () => {
   const track = img.closest('.carousel-track');
   activeModalImages = Array.from(track.querySelectorAll('img'));
   currentModalIndex = activeModalImages.indexOf(img);

   if (activeModalImages.length <= 1) {
     modalLeftBtn.style.display = 'none';
     modalRightBtn.style.display = 'none';
     if(modalCounter) modalCounter.style.display = 'none';
   } else {
     modalLeftBtn.style.display = 'block';
     modalRightBtn.style.display = 'block';
     if(modalCounter) {
        modalCounter.style.display = 'block';
        modalCounter.textContent = `PAGE ${pad(currentModalIndex + 1)} / ${pad(activeModalImages.length)}`;
     }
   }

   zoomOverlay.classList.add("active");
   zoomedImage.src = img.src;
   document.body.style.overflow = 'hidden';
 });
});

function changeModalImage(newIndex) {
 currentModalIndex = (newIndex + activeModalImages.length) % activeModalImages.length;
 zoomedImage.src = activeModalImages[currentModalIndex].src;
 
 if(modalCounter) {
   modalCounter.textContent = `PAGE ${pad(currentModalIndex + 1)} / ${pad(activeModalImages.length)}`;
 }
}

modalLeftBtn.addEventListener('click', (e) => {
 e.stopPropagation();
 changeModalImage(currentModalIndex - 1);
});

modalRightBtn.addEventListener('click', (e) => {
 e.stopPropagation();
 changeModalImage(currentModalIndex + 1);
});

zoomOverlay.addEventListener("click", () => {
 zoomOverlay.classList.remove("active");
 document.body.style.overflow = '';
});

document.addEventListener('keydown', (e) => {
 if (e.key === 'Escape' && zoomOverlay.classList.contains('active')) {
   zoomOverlay.classList.remove("active");
   document.body.style.overflow = '';
 }
});
