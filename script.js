/* ============================================
   AWARD-WINNING JAVASCRIPT
   GSAP, Swiper, AOS, Magnetic Buttons, Custom Cursor
   ============================================ */

// ============================================
// Initialize on DOM Load
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initAOS();
    initGSAP();
    initSwiper();
    // initMagneticButtons(); // DISABLED - User requested to remove button scaling effect
    initCustomCursor();
    initMobileMenu();
    initSmoothScroll();
    initHeaderScroll();
});

// ============================================
// AOS - Animate On Scroll
// ============================================

function initAOS() {
    AOS.init({
        duration: 1200,
        easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
        once: false, // Don't hide after animation - keep visible!
        offset: 50, // Lower offset so animations trigger sooner
        delay: 0,
        startEvent: 'load', // Start immediately on page load
        disable: false // Enable on all devices
    });

    // Force refresh after init to show all elements
    setTimeout(() => {
        AOS.refresh();
    }, 100);
}

// ============================================
// GSAP Animations
// ============================================

function initGSAP() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero title animation with stagger
    gsap.from('.text-reveal', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.2
    });

    // Parallax effect on hero background
    gsap.to('.hero-bg', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: 200,
        opacity: 0.5,
        ease: 'none'
    });

    // DISABLED - This was causing cards to be invisible (opacity: 0)
    // Section animations with ScrollTrigger
    /*
    gsap.utils.toArray('.section').forEach((section, index) => {
        const elements = section.querySelectorAll('.card, .service-card, .course-card, .contact-card');

        if (elements.length > 0) {
            gsap.from(elements, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                y: 60,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                stagger: 0.15
            });
        }
    });
    */

    // Floating badges animation
    gsap.to('.badge', {
        y: -10,
        duration: 2,
        ease: 'sine.inOut',
        stagger: {
            each: 0.2,
            repeat: -1,
            yoyo: true
        }
    });

    // FAB buttons entrance animation
    gsap.from('.fab', {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
        stagger: 0.1,
        delay: 1.5
    });

    // Service card icons animation
    gsap.utils.toArray('.service-icon').forEach(icon => {
        gsap.to(icon, {
            scrollTrigger: {
                trigger: icon,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            scale: 1.1,
            duration: 0.4,
            ease: 'back.out(1.7)',
            yoyo: true,
            repeat: 1
        });
    });

    // Scroll indicator animation
    gsap.to('.scroll-indicator', {
        y: 10,
        duration: 1.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
    });
}

// ============================================
// Swiper Carousel
// ============================================

function initSwiper() {
    const swiper = new Swiper('.designs-swiper', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        loop: true,
        speed: 800,
        coverflowEffect: {
            rotate: 20,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: true,
        },
        autoplay: {
            delay: 2000, // Faster - 2 seconds instead of 3
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 40
            }
        }
    });
}

// ============================================
// Magnetic Buttons Effect
// ============================================

function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('[data-magnetic]');

    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(element, {
                x: x * 0.3,
                y: y * 0.3,
                scale: 1, // Reset scale
                duration: 0.6,
                ease: 'power2.out'
            });
        });

        element.addEventListener('mouseleave', () => {
            gsap.to(element, {
                x: 0,
                y: 0,
                scale: 1, // Ensure scale is 1
                duration: 0.6,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });
}

// ============================================
// Custom Cursor
// ============================================

function initCustomCursor() {
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    if (!cursorDot || !cursorOutline) return;

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Immediate dot follow
        gsap.to(cursorDot, {
            x: mouseX,
            y: mouseY,
            duration: 0
        });
    });

    // Smooth outline follow
    gsap.ticker.add(() => {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;

        gsap.set(cursorOutline, {
            x: outlineX,
            y: outlineY
        });
    });

    // Expand cursor on hover
    const interactiveElements = document.querySelectorAll('a, button, [data-magnetic]');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursorOutline, {
                width: 60,
                height: 60,
                duration: 0.3,
                ease: 'back.out(1.7)'
            });

            gsap.to(cursorDot, {
                scale: 0,
                duration: 0.2
            });
        });

        el.addEventListener('mouseleave', () => {
            gsap.to(cursorOutline, {
                width: 40,
                height: 40,
                duration: 0.3,
                ease: 'power2.out'
            });

            gsap.to(cursorDot, {
                scale: 1,
                duration: 0.2
            });
        });
    });
}

// ============================================
// Vanilla Tilt 3D Effect
// ============================================

// DISABLED - VanillaTilt was causing buttons to enlarge on click
// Initialize after a short delay to ensure elements are loaded
/*
setTimeout(() => {
    const tiltElements = document.querySelectorAll('[data-tilt]');

    if (tiltElements.length > 0 && typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(tiltElements, {
            max: 15,
            speed: 400,
            glare: true,
            'max-glare': 0.3,
            gyroscope: true,
            perspective: 1000,
            scale: 1.05
        });
    }
}, 500);
*/

// ============================================
// Mobile Menu
// ============================================

function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');

        // Animate hamburger to X
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            gsap.to(spans[0], { rotation: 45, y: 9, duration: 0.3 });
            gsap.to(spans[1], { opacity: 0, duration: 0.3 });
            gsap.to(spans[2], { rotation: -45, y: -9, duration: 0.3 });
        } else {
            gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
            gsap.to(spans[1], { opacity: 1, duration: 0.3 });
            gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });
        }
    });

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');

            const spans = hamburger.querySelectorAll('span');
            gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
            gsap.to(spans[1], { opacity: 1, duration: 0.3 });
            gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });
        });
    });
}

// ============================================
// Smooth Scroll - Fixed native implementation
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Header Scroll Effect
// ============================================

function initHeaderScroll() {
    const header = document.querySelector('[data-header]');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add scrolled class for styling
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide header on scroll down, show on scroll up
        if (currentScroll > lastScroll && currentScroll > 500) {
            gsap.to(header, {
                y: -100,
                duration: 0.4,
                ease: 'power2.out'
            });
        } else {
            gsap.to(header, {
                y: 0,
                duration: 0.4,
                ease: 'power2.out'
            });
        }

        lastScroll = currentScroll;
    });
}

// ============================================
// Button Ripple Effect
// ============================================

document.addEventListener('click', (e) => {
    const button = e.target.closest('.btn');
    if (!button) return;

    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) ripple.remove();

    button.appendChild(circle);
});

// Add ripple CSS
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// Performance Optimizations
// ============================================

// Lazy load images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src || img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ============================================
// Easter Egg - Konami Code
// ============================================

let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiPattern.join(',')) {
        // Secret animation
        gsap.to('body', {
            rotation: 360,
            duration: 2,
            ease: 'elastic.out(1, 0.5)',
            onComplete: () => {
                gsap.set('body', { rotation: 0 });
                alert('🎉 நீங்கள் ரகசிய குறியீட்டைக் கண்டுபிடித்துவிட்டீர்கள்! 🎉');
            }
        });
        konamiCode = [];
    }
});

// ============================================
// Analytics & Performance Monitoring
// ============================================

// Log performance metrics
window.addEventListener('load', () => {
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page Load Time: ${pageLoadTime}ms`);
    }
});

// ============================================
// Export for testing
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initAOS,
        initGSAP,
        initSwiper,
        initMagneticButtons,
        initCustomCursor
    };
}
