// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = mobileToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add scroll effect to header
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    } else {
        header.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Fade in animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements with fade-in effect
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.feature-card, .comparison-card, .integration-item, .stat-card, .value-card, .reason-card, .method-card, .step-card');
    
    fadeElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
});

// Copy code to clipboard functionality
document.querySelectorAll('.code-block').forEach(block => {
    block.style.position = 'relative';
    block.style.cursor = 'pointer';
    
    block.addEventListener('click', function() {
        const code = this.textContent;
        navigator.clipboard.writeText(code).then(() => {
            // Show tooltip
            const tooltip = document.createElement('div');
            tooltip.textContent = 'Copied!';
            tooltip.style.position = 'absolute';
            tooltip.style.top = '10px';
            tooltip.style.right = '10px';
            tooltip.style.background = '#10B981';
            tooltip.style.color = 'white';
            tooltip.style.padding = '0.5rem 1rem';
            tooltip.style.borderRadius = '0.25rem';
            tooltip.style.fontSize = '0.875rem';
            tooltip.style.zIndex = '10';
            this.appendChild(tooltip);
            
            setTimeout(() => {
                tooltip.remove();
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    });
    
    // Add hover effect
    block.addEventListener('mouseenter', function() {
        this.style.opacity = '0.9';
    });
    
    block.addEventListener('mouseleave', function() {
        this.style.opacity = '1';
    });
});

// Form validation (if you add forms later)
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#C5001A';
        } else {
            input.style.borderColor = '#E5E7EB';
        }
    });
    
    return isValid;
}

// Button ripple effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Lazy loading for images (if you add images later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// Update copyright year automatically
document.addEventListener('DOMContentLoaded', function() {
    const currentYear = new Date().getFullYear();
    const copyrightElements = document.querySelectorAll('.footer-bottom p');
    copyrightElements.forEach(el => {
        if (el.textContent.includes('2024')) {
            el.textContent = el.textContent.replace('2024', currentYear);
        }
    });
});

// Performance: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScroll = debounce(function() {
    // Any scroll-based functionality here
}, 100);

window.addEventListener('scroll', debouncedScroll);

// Console message for developers
console.log('%c🚀 FlareSolverr Website', 'color: #C5001A; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with ❤️ using HTML, CSS, and JavaScript', 'color: #002C54; font-size: 14px;');
console.log('%cVisit: https://flaresolverr.com/', 'color: #002C54; font-size: 14px;');
