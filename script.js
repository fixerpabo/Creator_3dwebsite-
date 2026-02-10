// ===================================
// SMOOTH SCROLL NAVIGATION
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class when scrolling down
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===================================
// ADVANCED SCROLL ANIMATIONS
// ===================================
let scrollVelocity = 0;
let lastScrollY = 0;
let scrollDirection = 0;

function calculateScrollVelocity() {
    const currentScrollY = window.pageYOffset;
    scrollVelocity = Math.abs(currentScrollY - lastScrollY);
    scrollDirection = currentScrollY > lastScrollY ? 1 : -1;
    lastScrollY = currentScrollY;
}

window.addEventListener('scroll', calculateScrollVelocity);

// ===================================
// CINEMATIC INTERSECTION OBSERVER
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add delay based on scroll velocity for cinematic effect
            const delay = Math.min(scrollVelocity * 2, 200);
            setTimeout(() => {
                entry.target.classList.add('animate');
            }, delay);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with data-animate attribute
document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
});

// Special observer for showcase content
const showcaseObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

const showcaseContent = document.querySelector('.showcase-content');
if (showcaseContent) {
    showcaseObserver.observe(showcaseContent);
}

// ===================================
// ADVANCED PARALLAX WITH MULTIPLE LAYERS
// ===================================
let ticking = false;
let currentScrollY = 0;
let targetScrollY = 0;

function smoothParallax() {
    // Smooth interpolation for buttery smooth parallax
    currentScrollY += (targetScrollY - currentScrollY) * 0.1;

    const scrolled = currentScrollY;
    const windowHeight = window.innerHeight;

    // Hero parallax with scale and opacity
    const hero = document.querySelector('.hero-background');
    if (hero) {
        const heroProgress = Math.min(scrolled / windowHeight, 1);
        hero.style.transform = `translateY(${scrolled * 0.5}px) scale(${1 + heroProgress * 0.1})`;
        hero.style.opacity = 1 - heroProgress * 0.3;
    }

    // Showcase parallax with rotation
    const showcase = document.querySelector('.showcase-background');
    if (showcase) {
        const showcaseElement = document.querySelector('.showcase');
        if (showcaseElement) {
            const showcaseOffset = showcaseElement.offsetTop;
            const showcaseScroll = scrolled - showcaseOffset;
            const showcaseHeight = showcaseElement.offsetHeight;

            if (showcaseScroll > -windowHeight && showcaseScroll < showcaseHeight) {
                const progress = (showcaseScroll + windowHeight) / (showcaseHeight + windowHeight);
                showcase.style.transform = `translateY(${showcaseScroll * 0.3}px) scale(${1 + progress * 0.05})`;
            }
        }
    }

    // Global parallax with perspective
    const global = document.querySelector('.global-background');
    if (global) {
        const globalElement = document.querySelector('.global');
        if (globalElement) {
            const globalOffset = globalElement.offsetTop;
            const globalScroll = scrolled - globalOffset;
            const globalHeight = globalElement.offsetHeight;

            if (globalScroll > -windowHeight && globalScroll < globalHeight) {
                const progress = (globalScroll + windowHeight) / (globalHeight + windowHeight);
                global.style.transform = `translateY(${globalScroll * 0.2}px) rotateX(${progress * 2}deg)`;
            }
        }
    }

    requestAnimationFrame(smoothParallax);
}

function updateScrollTarget() {
    targetScrollY = window.pageYOffset;
    if (!ticking) {
        requestAnimationFrame(smoothParallax);
        ticking = true;
    }
}

window.addEventListener('scroll', updateScrollTarget);
smoothParallax();

// ===================================
// STATS COUNTER ANIMATION
// ===================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
}

// Observe stats for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const text = entry.target.textContent.trim();
            let value = 0;

            // Parse the value
            if (text.includes('K')) {
                value = parseFloat(text) * 1000;
            } else if (text.includes('M')) {
                value = parseFloat(text) * 1000000;
            } else if (text.includes('+')) {
                value = parseInt(text.replace('+', ''));
            } else {
                value = parseInt(text);
            }

            if (!isNaN(value)) {
                entry.target.textContent = '0';
                animateCounter(entry.target, value);
            }

            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe all stat numbers
document.querySelectorAll('.stat-number, .global-stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

// ===================================
// GRADIENT ANIMATION
// ===================================
function createGradientAnimation() {
    const backgrounds = document.querySelectorAll('.hero-background, .showcase-background, .global-background');

    backgrounds.forEach(bg => {
        let hue = 0;
        setInterval(() => {
            hue = (hue + 0.5) % 360;
            bg.style.filter = `hue-rotate(${hue}deg)`;
        }, 100);
    });
}

// Optional: Enable gradient animation (can be performance intensive)
// createGradientAnimation();

// ===================================
// ENHANCED CURSOR GLOW EFFECT
// ===================================
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
    position: fixed;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, rgba(6, 182, 212, 0.1) 40%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: opacity 0.5s ease;
    opacity: 0;
    mix-blend-mode: screen;
`;
document.body.appendChild(cursorGlow);

let mouseX = 0;
let mouseY = 0;
let glowX = 0;
let glowY = 0;
let glowScale = 1;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorGlow.style.opacity = '1';

    // Scale based on scroll velocity
    glowScale = 1 + Math.min(scrollVelocity / 100, 0.3);
});

document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
});

// Smooth glow movement with easing
function animateGlow() {
    glowX += (mouseX - glowX) * 0.15;
    glowY += (mouseY - glowY) * 0.15;

    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    cursorGlow.style.transform = `translate(-50%, -50%) scale(${glowScale})`;

    requestAnimationFrame(animateGlow);
}

animateGlow();

// ===================================
// ENHANCED 3D CARD TILT EFFECT
// ===================================
document.querySelectorAll('.feature-card, .benefit-card').forEach(card => {
    let cardX = 0;
    let cardY = 0;
    let targetX = 0;
    let targetY = 0;

    function animateCard() {
        cardX += (targetX - cardX) * 0.1;
        cardY += (targetY - cardY) * 0.1;

        if (card.matches(':hover')) {
            card.style.transform = `perspective(1200px) rotateX(${cardX}deg) rotateY(${cardY}deg) translateY(-12px) scale(1.02)`;
            requestAnimationFrame(animateCard);
        }
    }

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        targetX = (y - centerY) / 8;
        targetY = (centerX - x) / 8;

        requestAnimationFrame(animateCard);
    });

    card.addEventListener('mouseleave', () => {
    });
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
// Reduce animations on low-end devices
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('[data-animate]').forEach(el => {
        el.classList.add('animate');
    });
}

// ===================================
// PAGE LOAD ANIMATION
// ===================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

console.log('🎨 Createathon Studio - Where Creativity Meets Competition');
console.log('💜 Built with passion for creators worldwide');
