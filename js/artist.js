document.addEventListener('DOMContentLoaded', function () {
  // Photo Gallery Functionality
  const gallery = document.querySelector('.gallery');
  const prevArrow = document.querySelector('.gallery-container .prev-arrow');
  const nextArrow = document.querySelector('.gallery-container .next-arrow');

  if (gallery && prevArrow && nextArrow) {
    let galleryIndex = 0;
    let itemsPerView = getItemsPerView();
    const galleryItems = document.querySelectorAll('.gallery-item');
    const totalItems = galleryItems.length;

    function getItemsPerView() {
      if (window.innerWidth > 1200) return 3;
      if (window.innerWidth > 768) return 2;
      return 1;
    }

    function updateGallery() {
      itemsPerView = getItemsPerView(); // обновляем при каждом вызове
      const itemWidth = 100 / itemsPerView;
      gallery.style.transform = `translateX(-${galleryIndex * itemWidth}%)`;
    }

    prevArrow.addEventListener('click', function () {
      if (galleryIndex > 0) {
        galleryIndex--;
        updateGallery();
      }
    });

    nextArrow.addEventListener('click', function () {
      if (galleryIndex < totalItems - itemsPerView) {
        galleryIndex++;
        updateGallery();
      }
    });

    window.addEventListener('resize', function () {
      itemsPerView = getItemsPerView();
      if (galleryIndex > totalItems - itemsPerView) {
        galleryIndex = Math.max(totalItems - itemsPerView, 0);
      }
      updateGallery();
    });

    updateGallery(); // инициализировать при загрузке
  }

  // Discography Filters
  const filterButtons = document.querySelectorAll('.filter-btn');

  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      const filterType = this.textContent.trim();
      console.log(`Filtering by: ${filterType}`);
    });
  });

  // Play button hover effect for tracks
  const trackItems = document.querySelectorAll('.track-item');

  trackItems.forEach(item => {
    const trackNumber = item.querySelector('.track-number');

    item.addEventListener('mouseenter', function () {
      if (trackNumber) {
        trackNumber.innerHTML = '<i class="fas fa-play"></i>';
      }
    });

    item.addEventListener('mouseleave', function () {
      if (trackNumber) {
        const index = Array.from(trackItems).indexOf(item) + 1;
        trackNumber.textContent = index;
      }
    });
  });
});
