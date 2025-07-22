document.addEventListener('DOMContentLoaded', function() {
    // Image data with categories and captions
    const images = [
        { src: 'https://source.unsplash.com/random/600x400?nature', category: 'nature', caption: 'Beautiful nature landscape' },
        { src: 'https://source.unsplash.com/random/600x400?mountain', category: 'nature', caption: 'Majestic mountains' },
        { src: 'https://source.unsplash.com/random/600x400?forest', category: 'nature', caption: 'Dense green forest' },
        { src: 'https://source.unsplash.com/random/600x400?waterfall', category: 'nature', caption: 'Stunning waterfall' },
        { src: 'https://source.unsplash.com/random/600x400?city', category: 'city', caption: 'City skyline at night' },
        { src: 'https://source.unsplash.com/random/600x400?building', category: 'city', caption: 'Modern architecture' },
        { src: 'https://source.unsplash.com/random/600x400?street', category: 'city', caption: 'Busy city street' },
        { src: 'https://source.unsplash.com/random/600x400?bridge', category: 'city', caption: 'Iconic city bridge' },
        { src: 'https://source.unsplash.com/random/600x400?dog', category: 'animals', caption: 'Cute dog' },
        { src: 'https://source.unsplash.com/random/600x400?cat', category: 'animals', caption: 'Playful cat' },
        { src: 'https://source.unsplash.com/random/600x400?bird', category: 'animals', caption: 'Colorful bird' },
        { src: 'https://source.unsplash.com/random/600x400?elephant', category: 'animals', caption: 'Wild elephant' }
    ];

    const galleryGrid = document.querySelector('.gallery-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const imageCaption = document.getElementById('image-caption');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentImageIndex = 0;
    let filteredImages = [];

    // Initialize the gallery
    function initGallery() {
        displayImages(images);
        filteredImages = images;
    }

    // Display images in the gallery
    function displayImages(imagesToDisplay) {
        galleryGrid.innerHTML = '';
        
        imagesToDisplay.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = `gallery-item ${image.category}`;
            galleryItem.dataset.index = index;
            
            galleryItem.innerHTML = `
                <img src="${image.src}" alt="${image.caption}">
                <div class="image-caption">${image.caption}</div>
            `;
            
            galleryItem.addEventListener('click', () => openLightbox(index));
            galleryGrid.appendChild(galleryItem);
        });
    }

    // Filter images by category
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.dataset.filter;
            
            if (filter === 'all') {
                filteredImages = images;
            } else {
                filteredImages = images.filter(img => img.category === filter);
            }
            
            displayImages(filteredImages);
        });
    });

    // Open lightbox with selected image
    function openLightbox(index) {
        currentImageIndex = index;
        const image = filteredImages[currentImageIndex];
        
        lightboxImg.src = image.src;
        lightboxImg.alt = image.caption;
        imageCaption.textContent = image.caption;
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Navigate to previous image
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
        const image = filteredImages[currentImageIndex];
        
        lightboxImg.src = image.src;
        lightboxImg.alt = image.caption;
        imageCaption.textContent = image.caption;
    }

    // Navigate to next image
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
        const image = filteredImages[currentImageIndex];
        
        lightboxImg.src = image.src;
        lightboxImg.alt = image.caption;
        imageCaption.textContent = image.caption;
    }

    // Event listeners
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        }
    });

    // Initialize the gallery
    initGallery();
});
