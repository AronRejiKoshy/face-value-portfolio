// 1. Setup all Document Sliders independently (Main Page)
const carousels = document.querySelectorAll('.carousel');

carousels.forEach(carousel => {
  const track = carousel.querySelector('.carousel-track');
  const images = track.querySelectorAll('img');
  const leftBtn = carousel.querySelector('.arrow.left');
  const rightBtn = carousel.querySelector('.arrow.right');
  
  // Hide arrows if only one image
  if (images.length <= 1) {
    if (leftBtn) leftBtn.style.display = 'none';
    if (rightBtn) rightBtn.style.display = 'none';
    return; 
  }

  let currentIndex = 0;

  function updateGallery(newIndex) {
    images[currentIndex].classList.remove('active');
    currentIndex = (newIndex + images.length) % images.length;
    images[currentIndex].classList.add('active');
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

let activeModalImages = []; // Stores the images of the currently viewed document
let currentModalIndex = 0;

document.querySelectorAll(".zoomable").forEach(img => {
  img.addEventListener("click", () => {
    // Find all the images in the same specific carousel track
    const track = img.closest('.carousel-track');
    activeModalImages = Array.from(track.querySelectorAll('img'));
    
    // Find what page number we just clicked
    currentModalIndex = activeModalImages.indexOf(img);
    
    // Hide modal arrows if it's a 1-page document (like Risk Assessment)
    if (activeModalImages.length <= 1) {
      modalLeftBtn.style.display = 'none';
      modalRightBtn.style.display = 'none';
    } else {
      modalLeftBtn.style.display = 'block';
      modalRightBtn.style.display = 'block';
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