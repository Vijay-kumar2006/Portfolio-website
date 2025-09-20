// Portfolio Website JavaScript
// Handles navigation, form validation, animations, and user interactions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initSmoothScrolling();
    initNavbarScroll();
    initContactForm();
    initScrollAnimations();
    initTypingEffect();
    
    console.log('Portfolio website loaded successfully');
});

/**
 * Mobile Menu Toggle Functionality
 * Handles responsive navigation menu for mobile devices
 */
function initMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    if (!mobileMenu || !navMenu) return;
    
    // Toggle mobile menu
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Toggle aria-expanded for accessibility
        const isExpanded = navMenu.classList.contains('active');
        mobileMenu.setAttribute('aria-expanded', isExpanded);
    });
    
    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            mobileMenu.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !navMenu.contains(e.target)) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            mobileMenu.setAttribute('aria-expanded', 'false');
        }
    });
}

/**
 * Smooth Scrolling Navigation
 * Handles smooth scrolling to sections when clicking navigation links
 */
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link, .btn[href^="#"]');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    // Handle navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    updateActiveNavLink(href);
                }
            }
        });
    });
    
    // Handle scroll indicator
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

/**
 * Navbar Scroll Effect
 * Adds scrolled class to navbar when user scrolls down
 */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active navigation based on scroll position
        updateActiveNavOnScroll();
    });
}

/**
 * Update Active Navigation Link
 * Updates the active state of navigation links based on current section
 */
function updateActiveNavLink(activeHref) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === activeHref) {
            link.classList.add('active');
        }
    });
}

/**
 * Update Active Navigation on Scroll
 * Automatically updates active nav link based on scroll position
 */
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.offsetHeight;
        
        if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
            current = '#' + section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === current) {
            link.classList.add('active');
        }
    });
}

/**
 * Contact Form Handling
 * Handles form validation and submission
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearFormErrors();
        
        // Validate form
        const formData = new FormData(this);
        const errors = validateContactForm(formData);
        
        if (errors.length > 0) {
            displayFormErrors(errors);
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('[data-testid="button-submit-contact"]');
        showButtonLoading(submitBtn, true);
        
        // Simulate form submission (replace with actual submission logic)
        setTimeout(() => {
            showButtonLoading(submitBtn, false);
            showSubmissionSuccess();
            contactForm.reset();
        }, 2000);
    });
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateSingleField(this);
        });
        
        input.addEventListener('input', function() {
            // Clear error when user starts typing
            const errorElement = document.getElementById(this.id + '-error');
            if (errorElement) {
                errorElement.textContent = '';
            }
        });
    });
}

/**
 * Validate Contact Form
 * Returns array of validation errors
 */
function validateContactForm(formData) {
    const errors = [];
    
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const subject = formData.get('subject').trim();
    const message = formData.get('message').trim();
    
    // Name validation
    if (!name) {
        errors.push({ field: 'name', message: 'Name is required' });
    } else if (name.length < 2) {
        errors.push({ field: 'name', message: 'Name must be at least 2 characters long' });
    }
    
    // Email validation
    if (!email) {
        errors.push({ field: 'email', message: 'Email is required' });
    } else if (!isValidEmail(email)) {
        errors.push({ field: 'email', message: 'Please enter a valid email address' });
    }
    
    // Subject validation
    if (!subject) {
        errors.push({ field: 'subject', message: 'Subject is required' });
    } else if (subject.length < 5) {
        errors.push({ field: 'subject', message: 'Subject must be at least 5 characters long' });
    }
    
    // Message validation
    if (!message) {
        errors.push({ field: 'message', message: 'Message is required' });
    } else if (message.length < 10) {
        errors.push({ field: 'message', message: 'Message must be at least 10 characters long' });
    } else if (message.length > 1000) {
        errors.push({ field: 'message', message: 'Message must be less than 1000 characters' });
    }
    
    return errors;
}

/**
 * Validate Single Field
 * Validates individual form field on blur
 */
function validateSingleField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let error = '';
    
    switch (fieldName) {
        case 'name':
            if (!value) {
                error = 'Name is required';
            } else if (value.length < 2) {
                error = 'Name must be at least 2 characters long';
            }
            break;
            
        case 'email':
            if (!value) {
                error = 'Email is required';
            } else if (!isValidEmail(value)) {
                error = 'Please enter a valid email address';
            }
            break;
            
        case 'subject':
            if (!value) {
                error = 'Subject is required';
            } else if (value.length < 5) {
                error = 'Subject must be at least 5 characters long';
            }
            break;
            
        case 'message':
            if (!value) {
                error = 'Message is required';
            } else if (value.length < 10) {
                error = 'Message must be at least 10 characters long';
            } else if (value.length > 1000) {
                error = 'Message must be less than 1000 characters';
            }
            break;
    }
    
    // Display error
    const errorElement = document.getElementById(fieldName + '-error');
    if (errorElement) {
        errorElement.textContent = error;
    }
}

/**
 * Email Validation Helper
 * Checks if email format is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Clear Form Errors
 * Removes all error messages from the form
 */
function clearFormErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
    });
}

/**
 * Display Form Errors
 * Shows validation errors on the form
 */
function displayFormErrors(errors) {
    errors.forEach(error => {
        const errorElement = document.getElementById(error.field + '-error');
        if (errorElement) {
            errorElement.textContent = error.message;
        }
    });
    
    // Focus on first error field
    if (errors.length > 0) {
        const firstErrorField = document.getElementById(errors[0].field);
        if (firstErrorField) {
            firstErrorField.focus();
        }
    }
}

/**
 * Show Button Loading State
 * Toggles button loading animation
 */
function showButtonLoading(button, isLoading) {
    if (!button) return;
    
    const btnText = button.querySelector('.btn-text');
    const btnLoading = button.querySelector('.btn-loading');
    
    if (btnText && btnLoading) {
        if (isLoading) {
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-flex';
            button.disabled = true;
        } else {
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            button.disabled = false;
        }
    }
}

/**
 * Show Submission Success
 * Displays success message after form submission
 */
function showSubmissionSuccess() {
    // Create and show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #00ff88, #00d4ff);
        color: #0a0a0a;
        padding: 1rem 2rem;
        border-radius: 12px;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 255, 136, 0.3);
    `;
    
    successMessage.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <i class="fas fa-check-circle"></i>
            <span>Message sent successfully! I'll get back to you soon.</span>
        </div>
    `;
    
    document.body.appendChild(successMessage);
    
    // Animate in
    setTimeout(() => {
        successMessage.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        successMessage.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(successMessage);
        }, 300);
    }, 3000);
}

/**
 * Scroll Animations
 * Adds fade-in animations to elements as they scroll into view
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .achievement-card, .interest-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Typing Effect for Hero Section
 * Creates a typewriter effect for the hero subtitle
 */
function initTypingEffect() {
    const heroSubtitle = document.querySelector('[data-testid="text-hero-subtitle"]');
    
    if (!heroSubtitle) return;
    
    const texts = [
        'Building Scalable Solutions with Creativity & Code',
        'C++ & Python Specialist | MERN Stack Developer',
        'Problem Solver & Innovation Enthusiast'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            heroSubtitle.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            heroSubtitle.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            // Start deleting after a pause
            setTimeout(() => {
                isDeleting = true;
            }, 2000);
        } else if (isDeleting && charIndex === 0) {
            // Move to next text
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
        
        setTimeout(typeText, typingSpeed);
    }
    
    // Start typing effect after page load
    setTimeout(typeText, 1000);
}

/**
 * Keyboard Navigation Support
 * Adds keyboard support for better accessibility
 */
document.addEventListener('keydown', function(e) {
    // Handle escape key to close mobile menu
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobile-menu');
        const navMenu = document.getElementById('nav-menu');
        
        if (mobileMenu && navMenu && navMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            mobileMenu.setAttribute('aria-expanded', 'false');
        }
    }
});

/**
 * Performance Optimization
 * Throttle scroll events for better performance
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(function() {
    updateActiveNavOnScroll();
}, 100);

window.addEventListener('scroll', throttledScrollHandler);

/**
 * Error Handling
 * Global error handler for better user experience
 */
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // You could show a user-friendly error message here
});

/**
 * Analytics and Tracking (Optional)
 * Add your analytics tracking code here
 */
function trackEvent(category, action, label) {
    // Example: Google Analytics event tracking
    // gtag('event', action, {
    //     event_category: category,
    //     event_label: label
    // });
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
}

// Track important user interactions
document.addEventListener('click', function(e) {
    const target = e.target.closest('[data-testid]');
    if (target) {
        const testId = target.getAttribute('data-testid');
        if (testId.startsWith('button-') || testId.startsWith('link-')) {
            trackEvent('User Interaction', 'Click', testId);
        }
    }
});
