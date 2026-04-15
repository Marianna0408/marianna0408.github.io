document.addEventListener('DOMContentLoaded', () => {
    // 1. FŐOLDALI KÉPVÁLTÓ (SLIDER)
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slides img');
    if (slides.length > 0) {
        setInterval(() => {
            slides[slideIndex].classList.remove('active');
            slideIndex = (slideIndex + 1) % slides.length;
            slides[slideIndex].classList.add('active');
        }, 5000);
    }

    // 2. GALÉRIA NAGYÍTÁS ÉS LAPOZÁS (LIGHTBOX)
    const galleryImgs = document.querySelectorAll('.gallery img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    let currentImgIdx = 0;

    if (galleryImgs.length > 0) {
        galleryImgs.forEach((img, index) => {
            img.addEventListener('click', () => {
                currentImgIdx = index;
                showLightbox(img.src);
            });
        });
    }

    function showLightbox(src) {
        if (lightbox && lightboxImg) {
            lightboxImg.src = src;
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Ne görögjön a háttér
        }
    }

    // Globálissá tesszük a gombokhoz a HTML-ben
    window.closeLightbox = () => {
        if (lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    window.changeImg = (step) => {
        if (galleryImgs.length > 0 && lightboxImg) {
            currentImgIdx = (currentImgIdx + step + galleryImgs.length) % galleryImgs.length;
            lightboxImg.src = galleryImgs[currentImgIdx].src;
        }
    };

    // Kilépés az X-en kívülre kattintva is
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    // 3. ELŐTTE-UTÁNA CSÚSZKÁK KEZELÉSE (MIND az 5 darabhoz)
    const baContainers = document.querySelectorAll('.ba-container');

    baContainers.forEach(container => {
        const afterImg = container.querySelector('.ba-after');
        const handle = container.querySelector('.ba-handle');

        const moveSlider = (e) => {
            let x;
            if (e.type.includes('touch')) {
                x = e.touches[0].clientX;
            } else {
                x = e.clientX;
            }
            
            let rect = container.getBoundingClientRect();
            let position = ((x - rect.left) / rect.width) * 100;
            
            // Határok között tartás (0-100%)
            if (position < 0) position = 0;
            if (position > 100) position = 100;
            
            if (afterImg) afterImg.style.width = `${position}%`;
            if (handle) handle.style.left = `${position}%`;
        };

        container.addEventListener('mousemove', moveSlider);
        container.addEventListener('touchmove', moveSlider);
    });
});