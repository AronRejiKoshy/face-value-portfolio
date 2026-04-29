// 0. Accordion Toggle Logic
const accordions = document.querySelectorAll('.accordion-toggle');

accordions.forEach(acc => {
  acc.addEventListener('click', () => {
    // Toggle active state for icon rotation
    acc.classList.toggle('active');
    
    // Target the content wrapper
    const content = acc.nextElementSibling;
    
    // Toggle open state for height animation
    content.classList.toggle('open');
  });
});

// Helper function to pad numbers with a leading zero
const pad = (num) => num < 10 ? '0' + num : num;

// 1. Setup all Document Sliders independently (Main Page)
const carousels = document.querySelectorAll('.carousel');

carousels.forEach(carousel => {
 const track = carousel.querySelector('.carousel-track');
 const images = track.querySelectorAll('img');
 const leftBtn = carousel.querySelector('.arrow.left');
 const rightBtn = carousel.querySelector('.arrow.right');
 const counter = carousel.querySelector('.page-counter');
  
 // Hide arrows and counter if only one image
 if (images.length <= 1) {
   if (leftBtn) leftBtn.style.display = 'none';
   if (rightBtn) rightBtn.style.display = 'none';
   if (counter) counter.style.display = 'none';
   return;
 }

 let currentIndex = 0;
 
 // Initialize counter text
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
   e.stopPropagation(); // Stop click from bubbling to the zoom
   updateGallery(currentIndex - 1);
 });

 rightBtn.addEventListener('click', (e) => {
   e.stopPropagation();
   updateGallery(currentIndex + 1);
 });
});


// 2. Enhanced Zoom Functionality with Modal Carousel
const zoomOverlay = document.getElementById("zoomOverlay");
const zoomedImage = document.getElementById("zoomedImage");
const modalLeftBtn = document.getElementById("modalLeft");
const modalRightBtn = document.getElementById("modalRight");
const modalCounter = document.getElementById("modalCounter");

let activeModalImages = []; // Stores the images of the currently viewed document
let currentModalIndex = 0;

document.querySelectorAll(".zoomable").forEach(img => {
 img.addEventListener("click", () => {
   // Find all the images in the same specific carousel track
   const track = img.closest('.carousel-track');
   activeModalImages = Array.from(track.querySelectorAll('img'));
  
   // Find what page number we just clicked
   currentModalIndex = activeModalImages.indexOf(img);
  
   // Hide modal arrows and counter if it's a 1-page document
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

   // Open the overlay
   zoomOverlay.classList.add("active");
   zoomedImage.src = img.src;
  
   // Stop the background page from scrolling while zoomed in
   document.body.style.overflow = 'hidden';
 });
});

// Function to handle modal arrow clicks
function changeModalImage(newIndex) {
 currentModalIndex = (newIndex + activeModalImages.length) % activeModalImages.length;
 zoomedImage.src = activeModalImages[currentModalIndex].src;
 
 if(modalCounter) {
   modalCounter.textContent = `PAGE ${pad(currentModalIndex + 1)} / ${pad(activeModalImages.length)}`;
 }
}

modalLeftBtn.addEventListener('click', (e) => {
 e.stopPropagation(); // Prevents the click from closing the overlay
 changeModalImage(currentModalIndex - 1);
});

modalRightBtn.addEventListener('click', (e) => {
 e.stopPropagation(); // Prevents the click from closing the overlay
 changeModalImage(currentModalIndex + 1);
});

// Close logic: Click anywhere on the dark background
zoomOverlay.addEventListener("click", () => {
 zoomOverlay.classList.remove("active");
 document.body.style.overflow = ''; // Allow background scrolling again
});

// Optional: Close overlay if they press the Esc key
document.addEventListener('keydown', (e) => {
 if (e.key === 'Escape' && zoomOverlay.classList.contains('active')) {
   zoomOverlay.classList.remove("active");
   document.body.style.overflow = '';
 }
});