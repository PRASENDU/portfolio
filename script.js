// Mobile Navigation Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        // Basic mobile style injection (better handled in CSS, but functional here)
        if (navLinks.style.display === 'flex') {
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = '#0d1117';
            navLinks.style.padding = '1rem';
            navLinks.style.borderBottom = '1px solid #30363d';
        }
    });
}

// Typing Effect for Hero Badge
const typingTextElement = document.querySelector('.typing-text');

if (typingTextElement) {
    const roles = JSON.parse(typingTextElement.getAttribute('data-roles') || '[]');
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingTextElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // Faster deletion
        } else {
            typingTextElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100; // Normal typing
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(type, typeSpeed);
    }

    if (roles.length > 0) {
        type();
    }
}

// Carousel Navigation
const carousel = document.getElementById('archCarousel');
const prevBtn = document.getElementById('arch-prev');
const nextBtn = document.getElementById('arch-next');

if (carousel && prevBtn && nextBtn) {
    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: carousel.clientWidth, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -carousel.clientWidth, behavior: 'smooth' });
    });
}

// Hero Image Slider
const heroSlides = document.querySelectorAll('.hero-slide');
let currentHeroSlide = 0;

if (heroSlides.length > 1) {
    setInterval(() => {
        heroSlides[currentHeroSlide].classList.remove('active');
        currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
        heroSlides[currentHeroSlide].classList.add('active');
    }, 4000); // Change every 4 seconds
}


// Network Architecture Carousel Auto-Scroll
if (carousel) {
    let autoScrollInterval;

    const startAutoScroll = () => {
        autoScrollInterval = setInterval(() => {
            // Check if we reached the end
            if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10) {
                // Scroll back to start
                carousel.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                // Scroll to next slide
                carousel.scrollBy({ left: carousel.clientWidth, behavior: 'smooth' });
            }
        }, 4000);
    };

    startAutoScroll();

    // Pause on hover (optional, good UX)
    carousel.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
    carousel.addEventListener('mouseleave', startAutoScroll);
}

