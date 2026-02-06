/**
 * ================================================
 * RIFENBURGH LANDSCAPING - JAVASCRIPT
 * ================================================
 * 
 * Features:
 * 1. Mobile navigation toggle
 * 2. Smooth scrolling for navigation links
 * 3. Form validation and submission handling
 * 4. Scroll-based fade-in animations
 * 5. Sticky header behavior
 */

// ================================================
// MOBILE NAVIGATION TOGGLE
// ================================================

const mobileToggle = document.getElementById('mobile-toggle');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu when clicking hamburger
if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });
}

// Close mobile menu when clicking a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (nav.classList.contains('active')) {
            mobileToggle.classList.remove('active');
            nav.classList.remove('active');
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !mobileToggle.contains(e.target)) {
        if (nav.classList.contains('active')) {
            mobileToggle.classList.remove('active');
            nav.classList.remove('active');
        }
    }
});

// ================================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ================================================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerOffset = 80; // Account for sticky header height
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Also handle smooth scrolling for CTA buttons
const ctaButtons = document.querySelectorAll('a[href^="#"]');
ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const href = button.getAttribute('href');
        
        // Only handle internal links (starting with #)
        if (href.startsWith('#') && href.length > 1) {
            const targetSection = document.querySelector(href);
            
            if (targetSection) {
                e.preventDefault();
                
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ================================================
// FORM VALIDATION AND SUBMISSION
// ================================================

const quoteForm = document.getElementById('quoteForm');
const successMessage = document.getElementById('successMessage');

// Helper function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to validate phone format (basic check)
function isValidPhone(phone) {
    // Remove all non-numeric characters
    const cleaned = phone.replace(/\D/g, '');
    // Check if it has at least 10 digits
    return cleaned.length >= 10;
}

// Helper function to show error message
function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorSpan = document.getElementById(`${inputId}Error`);
    
    if (input && errorSpan) {
        input.classList.add('error');
        errorSpan.textContent = message;
    }
}

// Helper function to clear error message
function clearError(inputId) {
    const input = document.getElementById(inputId);
    const errorSpan = document.getElementById(`${inputId}Error`);
    
    if (input && errorSpan) {
        input.classList.remove('error');
        errorSpan.textContent = '';
    }
}

// Clear errors when user starts typing
const formInputs = quoteForm.querySelectorAll('input, select, textarea');
formInputs.forEach(input => {
    input.addEventListener('input', () => {
        clearError(input.id);
    });
});

// Form submission handler with Formspree integration
if (quoteForm) {
    const formInputs = quoteForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            clearError(input.id);
        });
    });

    quoteForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formInputs = quoteForm.querySelectorAll('input, select, textarea');
        
        // Clear all previous errors
        formInputs.forEach(input => {
            clearError(input.id);
        });
        
        // Hide success message if showing
        successMessage.classList.remove('show');
        
        let isValid = true;
        
        // Validate Full Name
        const fullName = document.getElementById('fullName').value.trim();
        if (fullName === '') {
            showError('fullName', 'Please enter your full name.');
            isValid = false;
        } else if (fullName.length < 2) {
            showError('fullName', 'Name must be at least 2 characters.');
            isValid = false;
        }
        
        // Validate Phone Number
        const phone = document.getElementById('phone').value.trim();
        if (phone === '') {
            showError('phone', 'Please enter your phone number.');
            isValid = false;
        } else if (!isValidPhone(phone)) {
            showError('phone', 'Please enter a valid phone number (at least 10 digits).');
            isValid = false;
        }
        
        // Validate Email (optional, but check format if provided)
        const email = document.getElementById('email').value.trim();
        if (email !== '' && !isValidEmail(email)) {
            showError('email', 'Please enter a valid email address.');
            isValid = false;
        }
        
        // Validate Service Type
        const serviceType = document.getElementById('serviceType').value;
        if (serviceType === '') {
            showError('serviceType', 'Please select a service type.');
            isValid = false;
        }
        
        // If form is valid, submit to Formspree
        if (isValid) {
            // Disable submit button to prevent duplicate submissions
            const submitBtn = quoteForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Gather form data
            const formData = new FormData(quoteForm);
            
            try {
                // Submit to Formspree
                const response = await fetch('https://formspree.io/f/xdalnyeg', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Success!
                    console.log('✅ Form submitted successfully to Formspree');
                    
                    // Clear form
                    quoteForm.reset();
                    
                    // Show success message
                    successMessage.classList.add('show');
                    
                    // Scroll to success message
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    
                    // Hide success message after 10 seconds
                    setTimeout(() => {
                        successMessage.classList.remove('show');
                    }, 10000);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('❌ Form submission error:', error);
                alert('There was an error submitting your form. Please try again or call us at (518) 751-8232.');
            } finally {
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        } else {
            // Scroll to first error
            const firstError = quoteForm.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        }
    });
}

// ================================================
// SCROLL-BASED FADE-IN ANIMATIONS
// ================================================

// Select all elements with fade-in class
const fadeElements = document.querySelectorAll('.fade-in');

// Intersection Observer options
const observerOptions = {
    threshold: 0.15, // Trigger when 15% of element is visible
    rootMargin: '0px 0px -50px 0px' // Start animation slightly before element enters viewport
};

// Intersection Observer callback
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: Stop observing after animation triggers (better performance)
            observer.unobserve(entry.target);
        }
    });
};

// Create observer
const fadeObserver = new IntersectionObserver(observerCallback, observerOptions);

// Observe all fade-in elements
fadeElements.forEach(element => {
    fadeObserver.observe(element);
});

// ================================================
// STICKY HEADER ENHANCEMENT (Optional)
// ================================================

const header = document.getElementById('header');
let lastScrollTop = 0;
let scrollThreshold = 100;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add shadow to header when scrolled
    if (scrollTop > 10) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop;
});

// ================================================
// PERFORMANCE OPTIMIZATION
// ================================================

// Lazy load images (if not already using loading="lazy")
if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src;
                img.removeAttribute('loading');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        lazyImageObserver.observe(img);
    });
}

// ================================================
// UTILITY: SMOOTH SCROLL TO TOP (Optional)
// ================================================

// Create "Back to Top" button (optional - uncomment to use)
/*
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '↑';
backToTopButton.className = 'back-to-top';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background-color: #2d5016;
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

document.body.appendChild(backToTopButton);

// Show/hide button based on scroll position
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
    }
});

// Scroll to top when clicked
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hover effect
backToTopButton.addEventListener('mouseenter', () => {
    backToTopButton.style.backgroundColor = '#4a7c2c';
    backToTopButton.style.transform = 'translateY(-3px)';
});

backToTopButton.addEventListener('mouseleave', () => {
    backToTopButton.style.backgroundColor = '#2d5016';
    backToTopButton.style.transform = 'translateY(0)';
});
*/

// ================================================
// CUSTOM CHAT WIDGET FUNCTIONALITY
// ================================================

const chatButton = document.getElementById('chat-button');
const chatWindow = document.getElementById('chat-window');
const chatClose = document.getElementById('chat-close');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatMessages = document.getElementById('chat-messages');

// Open chat window
if (chatButton) {
    chatButton.addEventListener('click', () => {
        chatButton.style.display = 'none';
        chatWindow.classList.add('active');
        chatInput.focus();
    });
}

// Close chat window
if (chatClose) {
    chatClose.addEventListener('click', () => {
        chatWindow.classList.remove('active');
        chatButton.style.display = 'flex';
    });
}

// Send message function
function sendMessage() {
    const message = chatInput.value.trim();
    
    if (message === '') return;
    
    // Add user message to chat
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'chat-message chat-message-user';
    userMessageDiv.innerHTML = `
        <div class="message-bubble">
            <p>${message}</p>
            <p class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
        </div>
    `;
    chatMessages.appendChild(userMessageDiv);
    
    // Clear input
    chatInput.value = '';
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Simulate bot response after a delay
    setTimeout(() => {
        const botMessageDiv = document.createElement('div');
        botMessageDiv.className = 'chat-message chat-message-bot';
        
        // Smart responses based on keywords
        let botResponse = getBotResponse(message.toLowerCase());
        
        botMessageDiv.innerHTML = `
            <div class="message-bubble">
                <p>${botResponse}</p>
                <p class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
            </div>
        `;
        chatMessages.appendChild(botMessageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
}

// Smart bot responses
function getBotResponse(message) {
    // Check for keywords and provide relevant responses
    if (message.includes('price') || message.includes('cost') || message.includes('quote')) {
        return "We'd be happy to provide a free quote! Every property is unique, so we prefer to give accurate estimates after seeing your space. You can call us at (518) 751-8232 or fill out our quote form above.";
    }
    else if (message.includes('hour') || message.includes('open') || message.includes('time')) {
        return "We're open Monday-Friday 9am-5pm, and Saturday 10am-2pm. You can call us at (518) 751-8232 during business hours, or leave a message anytime!";
    }
    else if (message.includes('service') || message.includes('do you')) {
        return "We offer lawn mowing & maintenance, professional striping, land clearing, tree trimming, seasonal cleanups, and more! Check out our services section above, or call (518) 751-8232 to discuss your specific needs.";
    }
    else if (message.includes('area') || message.includes('location') || message.includes('where')) {
        return "We proudly serve Germantown, Hudson, Red Hook, Rhinebeck, Tivoli, Clermont, and surrounding Hudson Valley areas. Call us at (518) 751-8232 to confirm we serve your location!";
    }
    else if (message.includes('emergency') || message.includes('urgent') || message.includes('asap')) {
        return "For urgent matters, please call us directly at (518) 751-8232. We'll do our best to accommodate rush requests!";
    }
    else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        return "Hello! Thanks for reaching out. How can we help with your landscaping needs today?";
    }
    else if (message.includes('thank')) {
        return "You're very welcome! Feel free to call us at (518) 751-8232 if you have any other questions. We're here to help! 🌿";
    }
    else {
        return "Thanks for your message! For the quickest response, please call us at (518) 751-8232 during business hours (Mon-Fri 9am-5pm, Sat 10am-2pm), or fill out our quote form and we'll get back to you within 24 hours.";
    }
}

// Send on button click
if (chatSend) {
    chatSend.addEventListener('click', sendMessage);
}

// Send on Enter key
if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// ================================================
// GALLERY & CAROUSEL MANAGEMENT
// ================================================

class GalleryManager {
    constructor(galleryId, storageKey) {
        this.galleryId = galleryId;
        this.storageKey = storageKey;
        this.currentIndex = 0;
        this.images = [];
        this.autoRotateInterval = null;
        this.autoRotateDelay = 5000; // 5 seconds
        
        this.track = document.getElementById(`${galleryId}-track`);
        this.dotsContainer = document.getElementById(`${galleryId}-dots`);
        this.counter = document.getElementById(`${galleryId}-counter`);
        
        this.loadImages();
        this.startAutoRotate();
    }
    
    loadImages() {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
            this.images = JSON.parse(stored);
        }
        
        // If no images in localStorage, use default images from HTML
        if (this.images.length === 0) {
            const existingSlides = this.track.querySelectorAll('.carousel-slide img');
            existingSlides.forEach(img => {
                if (img.src && !img.src.includes('placeholder')) {
                    this.images.push(img.src);
                }
            });
        }
        
        this.renderCarousel();
    }
    
    saveImages() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.images));
    }
    
    renderCarousel() {
        if (this.images.length === 0) {
            this.track.innerHTML = `
                <div class="carousel-slide">
                    <div class="placeholder-slide">
                        <p>Upload images to showcase your work</p>
                    </div>
                </div>
            `;
            this.updateCounter();
            this.renderDots();
            return;
        }
        
        this.track.innerHTML = '';
        this.images.forEach(imageSrc => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            slide.innerHTML = `<img src="${imageSrc}" alt="Gallery image" loading="lazy">`;
            this.track.appendChild(slide);
        });
        
        this.updateCarousel();
        this.renderDots();
        this.updateCounter();
    }
    
    renderDots() {
        if (!this.dotsContainer) return;
        
        this.dotsContainer.innerHTML = '';
        this.images.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `carousel-dot ${index === this.currentIndex ? 'active' : ''}`;
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });
    }
    
    updateCarousel() {
        if (this.images.length === 0) return;
        
        const offset = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${offset}%)`;
        
        // Update dots
        const dots = this.dotsContainer?.querySelectorAll('.carousel-dot');
        dots?.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
        
        this.updateCounter();
    }
    
    updateCounter() {
        if (!this.counter) return;
        
        const current = this.counter.querySelector('.current');
        const total = this.counter.querySelector('.total');
        
        if (current && total) {
            current.textContent = this.currentIndex + 1;
            total.textContent = Math.max(this.images.length, 1);
        }
    }
    
    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
        this.resetAutoRotate();
    }
    
    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % Math.max(this.images.length, 1);
        this.updateCarousel();
    }
    
    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % Math.max(this.images.length, 1);
        this.updateCarousel();
    }
    
    startAutoRotate() {
        if (this.images.length <= 1) return;
        
        this.autoRotateInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoRotateDelay);
    }
    
    stopAutoRotate() {
        if (this.autoRotateInterval) {
            clearInterval(this.autoRotateInterval);
        }
    }
    
    resetAutoRotate() {
        this.stopAutoRotate();
        this.startAutoRotate();
    }
    
    addImage(imageSrc) {
        // Check limit (5 images max per gallery to save storage)
        if (this.images.length >= 5) {
            alert('⚠️ Maximum 5 images per gallery reached.\n\nPlease delete some images before adding more to avoid storage issues.');
            return false;
        }
        
        this.images.push(imageSrc);
        this.saveImages();
        this.renderCarousel();
        this.resetAutoRotate();
        return true;
    }
    
    deleteImage(index) {
        this.images.splice(index, 1);
        
        // Adjust current index if needed
        if (this.currentIndex >= this.images.length) {
            this.currentIndex = Math.max(0, this.images.length - 1);
        }
        
        this.saveImages();
        this.renderCarousel();
        this.resetAutoRotate();
    }
    
    pauseOnHover() {
        const carousel = document.getElementById(`${this.galleryId}-carousel`);
        if (carousel) {
            carousel.addEventListener('mouseenter', () => this.stopAutoRotate());
            carousel.addEventListener('mouseleave', () => this.startAutoRotate());
        }
    }
}

// Initialize galleries
const landClearingGallery = new GalleryManager('land-clearing', 'landClearingImages');
const landStripingGallery = new GalleryManager('land-striping', 'landStripingImages');
const backyardGallery = new GalleryManager('backyard', 'backyardImages');

// Enable pause on hover for all galleries
landClearingGallery.pauseOnHover();
landStripingGallery.pauseOnHover();
backyardGallery.pauseOnHover();

// ================================================
// CAROUSEL NAVIGATION BUTTONS
// ================================================

document.querySelectorAll('.carousel-btn-prev').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const carouselType = e.target.getAttribute('data-carousel');
        
        if (carouselType === 'land-clearing') {
            landClearingGallery.prevSlide();
        } else if (carouselType === 'land-striping') {
            landStripingGallery.prevSlide();
        } else if (carouselType === 'backyard') {
            backyardGallery.prevSlide();
        }
    });
});

document.querySelectorAll('.carousel-btn-next').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const carouselType = e.target.getAttribute('data-carousel');
        
        if (carouselType === 'land-clearing') {
            landClearingGallery.nextSlide();
        } else if (carouselType === 'land-striping') {
            landStripingGallery.nextSlide();
        } else if (carouselType === 'backyard') {
            backyardGallery.nextSlide();
        }
    });
});

// ================================================
// IMAGE UPLOAD & COMPRESSION
// ================================================

function compressImage(file, maxWidth = 900, maxHeight = 700, quality = 0.65) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const img = new Image();
            
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                
                // Calculate new dimensions while maintaining aspect ratio
                if (width > maxWidth || height > maxHeight) {
                    const ratio = Math.min(maxWidth / width, maxHeight / height);
                    width *= ratio;
                    height *= ratio;
                }
                
                canvas.width = width;
                canvas.height = height;
                
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                
                // Convert to base64 with highly optimized quality
                const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
                
                // Check file size
                const sizeInBytes = (compressedDataUrl.length * 3) / 4;
                const sizeInKB = sizeInBytes / 1024;
                console.log(`📦 Compressed image: ${sizeInKB.toFixed(0)}KB`);
                
                resolve(compressedDataUrl);
            };
            
            img.onerror = reject;
            img.src = e.target.result;
        };
        
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function validateImageFile(file) {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    
    if (!validTypes.includes(file.type)) {
        alert('Please upload a valid image file (JPG, PNG, WebP, or GIF).');
        return false;
    }
    
    if (file.size > maxSize) {
        alert('Image file is too large. Maximum size is 5MB.');
        return false;
    }
    
    return true;
}

// ================================================
// ADMIN PANEL FUNCTIONALITY
// ================================================

const adminPanel = document.getElementById('admin-panel');
const adminAccessBtn = document.getElementById('admin-access-btn');
const adminCloseBtn = document.getElementById('admin-close-btn');
const adminOverlay = document.getElementById('admin-overlay');

// Debug logging
console.log('Admin Panel Elements:', {
    panel: adminPanel,
    accessBtn: adminAccessBtn,
    closeBtn: adminCloseBtn,
    overlay: adminOverlay
});

// Admin panel access DISABLED for production
// Content is now locked and cannot be modified by visitors
// To re-enable admin panel, uncomment the code below and the button in index.html

/*
// Open admin panel
if (adminAccessBtn) {
    console.log('✅ Admin access button found! Attaching click listener...');
    adminAccessBtn.addEventListener('click', (e) => {
        console.log('🔧 Admin button clicked!');
        e.preventDefault();
        e.stopPropagation();
        
        if (adminPanel) {
            adminPanel.classList.add('active');
            console.log('✅ Admin panel opened');
            renderAdminGalleries();
            
            // Check storage usage
            warnIfStorageFull();
        } else {
            console.error('❌ Admin panel element not found!');
            alert('Error: Admin panel not found. Please refresh the page.');
        }
    });
} else {
    console.error('❌ Admin access button not found in DOM');
}
*/

console.log('🔒 Admin panel disabled - Content locked for production');

// Close admin panel
if (adminCloseBtn) {
    console.log('✅ Admin close button found');
    adminCloseBtn.addEventListener('click', (e) => {
        console.log('🔧 Admin close button clicked');
        e.preventDefault();
        e.stopPropagation();
        adminPanel.classList.remove('active');
    });
} else {
    console.error('❌ Admin close button not found');
}

if (adminOverlay) {
    console.log('✅ Admin overlay found');
    adminOverlay.addEventListener('click', (e) => {
        console.log('🔧 Admin overlay clicked');
        adminPanel.classList.remove('active');
    });
} else {
    console.error('❌ Admin overlay not found');
}

// ================================================
// ADMIN IMAGE UPLOAD HANDLERS
// ================================================

// Land Clearing Upload
const landClearingUpload = document.getElementById('land-clearing-upload');
if (landClearingUpload) {
    landClearingUpload.addEventListener('change', async (e) => {
        const files = Array.from(e.target.files);
        let addedCount = 0;
        let skippedCount = 0;
        
        for (const file of files) {
            if (validateImageFile(file)) {
                try {
                    const compressedImage = await compressImage(file);
                    const added = landClearingGallery.addImage(compressedImage);
                    if (added) {
                        addedCount++;
                    } else {
                        skippedCount++;
                    }
                } catch (error) {
                    console.error('Error compressing image:', error);
                    alert('Failed to process image. Please try again.');
                }
            }
        }
        
        if (addedCount > 0) {
            alert(`✅ Added ${addedCount} image(s) to Land Clearing gallery.\n\nCurrent: ${landClearingGallery.images.length}/5 images`);
        }
        
        e.target.value = ''; // Reset input
        renderAdminGalleries();
    });
}

// Land Striping Upload
const landStripingUpload = document.getElementById('land-striping-upload');
if (landStripingUpload) {
    landStripingUpload.addEventListener('change', async (e) => {
        const files = Array.from(e.target.files);
        let addedCount = 0;
        
        for (const file of files) {
            if (validateImageFile(file)) {
                try {
                    const compressedImage = await compressImage(file);
                    const added = landStripingGallery.addImage(compressedImage);
                    if (added) {
                        addedCount++;
                    }
                } catch (error) {
                    console.error('Error compressing image:', error);
                    alert('Failed to process image. Please try again.');
                }
            }
        }
        
        if (addedCount > 0) {
            alert(`✅ Added ${addedCount} image(s) to Land Striping gallery.\n\nCurrent: ${landStripingGallery.images.length}/5 images`);
        }
        
        e.target.value = '';
        renderAdminGalleries();
    });
}

// Backyard Restoration Upload
const backyardUpload = document.getElementById('backyard-upload');
if (backyardUpload) {
    backyardUpload.addEventListener('change', async (e) => {
        const files = Array.from(e.target.files);
        let addedCount = 0;
        
        for (const file of files) {
            if (validateImageFile(file)) {
                try {
                    const compressedImage = await compressImage(file);
                    const added = backyardGallery.addImage(compressedImage);
                    if (added) {
                        addedCount++;
                    }
                } catch (error) {
                    console.error('Error compressing image:', error);
                    alert('Failed to process image. Please try again.');
                }
            }
        }
        
        if (addedCount > 0) {
            alert(`✅ Added ${addedCount} image(s) to Backyard gallery.\n\nCurrent: ${backyardGallery.images.length}/5 images`);
        }
        
        e.target.value = '';
        renderAdminGalleries();
    });
}

// ================================================
// RENDER ADMIN GALLERIES
// ================================================

function renderAdminGalleries() {
    renderAdminGallery('land-clearing-admin-grid', landClearingGallery);
    renderAdminGallery('land-striping-admin-grid', landStripingGallery);
    renderAdminGallery('backyard-admin-grid', backyardGallery);
    renderAboutPhotoAdmin();
    renderLogoAdmin();
    renderHeroImageAdmin();
    loadHeroTextIntoInputs();
    renderBeforeAfterAdmin();
}

function renderAdminGallery(gridId, gallery) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    
    if (gallery.images.length === 0) {
        grid.innerHTML = '<div class="admin-empty-state">No images uploaded yet</div>';
        return;
    }
    
    grid.innerHTML = '';
    gallery.images.forEach((imageSrc, index) => {
        const item = document.createElement('div');
        item.className = 'admin-image-item';
        item.innerHTML = `
            <img src="${imageSrc}" alt="Gallery image ${index + 1}">
            <button class="admin-image-delete" data-index="${index}">✕</button>
        `;
        
        const deleteBtn = item.querySelector('.admin-image-delete');
        deleteBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this image?')) {
                gallery.deleteImage(index);
                renderAdminGalleries();
            }
        });
        
        grid.appendChild(item);
    });
}

// ================================================
// ABOUT SECTION - PHOTO & TEXT EDITING
// ================================================

// About Photo Upload
const aboutPhotoUpload = document.getElementById('about-photo-upload');
if (aboutPhotoUpload) {
    aboutPhotoUpload.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        
        if (file && validateImageFile(file)) {
            try {
                const compressedImage = await compressImage(file, 500, 700, 0.65);
                localStorage.setItem('aboutPhoto', compressedImage);
                
                const aboutPhoto = document.getElementById('about-photo');
                if (aboutPhoto) {
                    aboutPhoto.src = compressedImage;
                }
                
                renderAboutPhotoAdmin();
                alert('✅ About photo uploaded successfully!');
            } catch (error) {
                console.error('Error processing photo:', error);
                alert('Failed to process photo. Please try again.');
            }
        }
        
        e.target.value = '';
    });
}

function renderAboutPhotoAdmin() {
    const preview = document.getElementById('about-photo-preview');
    if (!preview) return;
    
    const storedPhoto = localStorage.getItem('aboutPhoto');
    
    if (storedPhoto) {
        preview.innerHTML = `
            <div class="admin-image-item">
                <img src="${storedPhoto}" alt="Owner photo">
                <button class="admin-image-delete" id="delete-about-photo">✕</button>
            </div>
        `;
        
        const deleteBtn = document.getElementById('delete-about-photo');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to delete the about photo?')) {
                    localStorage.removeItem('aboutPhoto');
                    const aboutPhoto = document.getElementById('about-photo');
                    if (aboutPhoto) {
                        aboutPhoto.src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=500&fit=crop';
                    }
                    renderAboutPhotoAdmin();
                }
            });
        }
    } else {
        preview.innerHTML = '<div class="admin-empty-state">No photo uploaded yet</div>';
    }
}

// Set minimum date for appointment form (today)
const apptDateInput = document.getElementById('appt-date');
if (apptDateInput) {
    const today = new Date().toISOString().split('T')[0];
    apptDateInput.min = today;
}

// Load all saved customizations on page load
window.addEventListener('DOMContentLoaded', () => {
    // About photo
    const storedPhoto = localStorage.getItem('aboutPhoto');
    const aboutPhoto = document.getElementById('about-photo');
    
    if (storedPhoto && aboutPhoto) {
        aboutPhoto.src = storedPhoto;
    }
    
    // About text
    const storedText = localStorage.getItem('aboutText');
    const aboutText = document.getElementById('about-text');
    
    if (storedText && aboutText) {
        aboutText.innerHTML = storedText;
    }
    
    // Custom logo
    updateLogo();
    
    // Hero background
    updateHeroBackground();
    
    // Hero text
    updateHeroText();
    
    console.log('✅ All customizations loaded from localStorage');
});

// About Text Editing
const editAboutBtn = document.getElementById('edit-about-btn');
const aboutText = document.getElementById('about-text');

if (editAboutBtn && aboutText) {
    editAboutBtn.addEventListener('click', () => {
        const isEditing = aboutText.getAttribute('contenteditable') === 'true';
        
        if (isEditing) {
            // Save mode
            aboutText.setAttribute('contenteditable', 'false');
            editAboutBtn.textContent = 'Edit Description';
            editAboutBtn.classList.remove('btn-primary');
            editAboutBtn.classList.add('btn-secondary');
            
            // Save to localStorage
            localStorage.setItem('aboutText', aboutText.innerHTML);
            
            alert('About section saved successfully!');
        } else {
            // Edit mode
            aboutText.setAttribute('contenteditable', 'true');
            aboutText.focus();
            editAboutBtn.textContent = 'Save Changes';
            editAboutBtn.classList.remove('btn-secondary');
            editAboutBtn.classList.add('btn-primary');
        }
    });
}

// ================================================
// KEYBOARD NAVIGATION FOR CAROUSELS
// ================================================

document.addEventListener('keydown', (e) => {
    // Only if admin panel is not open
    if (adminPanel.classList.contains('active')) return;
    
    if (e.key === 'ArrowLeft') {
        // Navigate all carousels backward
        landClearingGallery.prevSlide();
        landStripingGallery.prevSlide();
        backyardGallery.prevSlide();
    } else if (e.key === 'ArrowRight') {
        // Navigate all carousels forward
        landClearingGallery.nextSlide();
        landStripingGallery.nextSlide();
        backyardGallery.nextSlide();
    }
});

// ================================================
// BEFORE & AFTER SLIDER
// ================================================

class BeforeAfterSlider {
    constructor() {
        this.beforeAfterSets = [];
        this.currentIndex = 0;
        this.loadSets();
        this.initializeSliders();
        this.renderNavigation();
    }
    
    loadSets() {
        const stored = localStorage.getItem('beforeAfterSets');
        if (stored) {
            this.beforeAfterSets = JSON.parse(stored);
        }
        
        // Start with empty sets - no default images
        console.log('📊 Loaded', this.beforeAfterSets.length, 'before/after sets from storage');
    }
    
    saveSets() {
        try {
            localStorage.setItem('beforeAfterSets', JSON.stringify(this.beforeAfterSets));
            console.log('💾 Before/after sets saved successfully');
        } catch (error) {
            if (error.name === 'QuotaExceededException') {
                console.error('❌ Storage quota exceeded!', error);
                alert('⚠️ Storage Full!\n\nYour browser storage is full. Please:\n\n1. Delete some other before/after sets\n2. Delete unused gallery images\n3. Or use smaller image files\n\nCurrent sets were NOT saved.');
                throw error;
            } else {
                console.error('❌ Error saving sets:', error);
                throw error;
            }
        }
    }
    
    initializeSliders() {
        this.renderCurrentSet();
        this.attachSliderEvents();
    }
    
    renderCurrentSet() {
        const container = document.getElementById('before-after-container');
        if (!container) {
            console.log('❌ before-after-container not found');
            return;
        }
        
        // If no sets, show empty state
        if (this.beforeAfterSets.length === 0) {
            container.innerHTML = `
                <div class="before-after-empty-state">
                    <div class="empty-state-icon">📸</div>
                    <h3>No Before & After Photos Yet</h3>
                    <p>Upload your first transformation using the admin panel.</p>
                    <p class="empty-state-hint">Click the gear icon in the bottom right to get started!</p>
                </div>
            `;
            console.log('ℹ️ No before/after sets - showing empty state');
            return;
        }
        
        const set = this.beforeAfterSets[this.currentIndex];
        if (!set) {
            console.log('❌ No set at index', this.currentIndex);
            return;
        }
        
        console.log('🔄 Rendering before/after set', this.currentIndex + 1, 'of', this.beforeAfterSets.length);
        
        container.innerHTML = `
            <div class="before-after-comparison">
                <div class="comparison-image before">
                    <img src="${set.before}" alt="Before">
                    <span class="image-label">BEFORE</span>
                </div>
                <div class="comparison-image after">
                    <img src="${set.after}" alt="After">
                    <span class="image-label">AFTER</span>
                </div>
            </div>
            ${set.description ? `<div class="before-after-description">${set.description}</div>` : ''}
        `;
        
        console.log('✅ Before/After set rendered (side-by-side)');
    }
    
    attachSliderEvents() {
        // No longer needed - using simple side-by-side layout
        // Keeping method for compatibility
    }
    
    renderNavigation() {
        const prevBtn = document.getElementById('ba-prev');
        const nextBtn = document.getElementById('ba-next');
        const dotsContainer = document.getElementById('ba-dots');
        
        if (!prevBtn || !nextBtn || !dotsContainer) return;
        
        // Hide navigation if no sets
        if (this.beforeAfterSets.length === 0) {
            dotsContainer.innerHTML = '';
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            return;
        }
        
        // Show navigation
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
        
        // Render dots
        dotsContainer.innerHTML = '';
        this.beforeAfterSets.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `ba-dot ${index === this.currentIndex ? 'active' : ''}`;
            dot.addEventListener('click', () => this.goToSet(index));
            dotsContainer.appendChild(dot);
        });
        
        // Navigation buttons
        prevBtn.onclick = () => this.previousSet();
        nextBtn.onclick = () => this.nextSet();
        
        // Update button states
        prevBtn.disabled = this.currentIndex === 0;
        nextBtn.disabled = this.currentIndex === this.beforeAfterSets.length - 1;
    }
    
    goToSet(index) {
        this.currentIndex = index;
        this.renderCurrentSet();
        this.renderNavigation();
    }
    
    previousSet() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.renderCurrentSet();
            this.renderNavigation();
        }
    }
    
    nextSet() {
        if (this.currentIndex < this.beforeAfterSets.length - 1) {
            this.currentIndex++;
            this.renderCurrentSet();
            this.renderNavigation();
        }
    }
    
    addSet(beforeImg, afterImg, description) {
        console.log('➕ Adding new before/after set');
        
        // Check limit (3 sets max to save storage)
        if (this.beforeAfterSets.length >= 3) {
            alert('⚠️ Maximum 3 before/after sets reached.\n\nPlease delete some sets before adding more to avoid storage issues.');
            return false;
        }
        
        // Add the set temporarily
        const newSet = {
            before: beforeImg,
            after: afterImg,
            description: description || ''
        };
        
        this.beforeAfterSets.push(newSet);
        
        // Try to save - if it fails due to quota, remove the set
        try {
            this.saveSets();
            this.currentIndex = this.beforeAfterSets.length - 1;
            
            console.log('📊 Total sets now:', this.beforeAfterSets.length);
            console.log('📍 Current index:', this.currentIndex);
            
            this.renderCurrentSet();
            this.renderNavigation();
            
            console.log('✅ Before/After set added successfully');
            return true;
        } catch (error) {
            // Remove the set if save failed
            this.beforeAfterSets.pop();
            console.error('❌ Failed to add set, rolled back');
            return false;
        }
    }
    
    deleteSet(index) {
        console.log('🗑️ Deleting before/after set at index', index);
        console.log('📊 Sets before delete:', this.beforeAfterSets.length);
        
        this.beforeAfterSets.splice(index, 1);
        
        if (this.currentIndex >= this.beforeAfterSets.length) {
            this.currentIndex = Math.max(0, this.beforeAfterSets.length - 1);
        }
        
        console.log('📊 Sets after delete:', this.beforeAfterSets.length);
        console.log('📍 New current index:', this.currentIndex);
        
        this.saveSets();
        console.log('💾 Sets saved to localStorage');
        
        if (this.beforeAfterSets.length === 0) {
            console.log('⚠️ No sets left - section will be hidden');
        }
        
        console.log('🔄 Rendering updated slider...');
        this.renderCurrentSet();
        this.renderNavigation();
        
        console.log('✅ Before/After set deleted and slider updated');
    }
}

// Initialize before/after slider and make it globally accessible
const beforeAfterSlider = new BeforeAfterSlider();
window.beforeAfterSlider = beforeAfterSlider;
console.log('✅ BeforeAfterSlider initialized with', beforeAfterSlider.beforeAfterSets.length, 'sets');

// ================================================
// LOGO CUSTOMIZATION
// ================================================

// Logo Upload
const logoUpload = document.getElementById('logo-upload');
const showLogoTextCheckbox = document.getElementById('show-logo-text');

if (logoUpload) {
    logoUpload.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        
        if (file && validateImageFile(file)) {
            try {
                // Higher quality for logo clarity
                const compressedImage = await compressImage(file, 350, 180, 0.85);
                localStorage.setItem('customLogo', compressedImage);
                
                // Update logo immediately
                updateLogo();
                renderLogoAdmin();
                
                alert('✅ Logo uploaded successfully!');
            } catch (error) {
                console.error('Error processing logo:', error);
                alert('Failed to process logo. Please try again.');
            }
        }
        
        e.target.value = '';
    });
}

if (showLogoTextCheckbox) {
    showLogoTextCheckbox.addEventListener('change', (e) => {
        localStorage.setItem('showLogoText', e.target.checked);
        updateLogo();
    });
}

function updateLogo() {
    const customLogo = localStorage.getItem('customLogo');
    const showText = localStorage.getItem('showLogoText') !== 'false'; // Default true
    
    const customLogoImg = document.getElementById('custom-logo');
    const defaultLogo = document.getElementById('default-logo');
    const logoText = document.getElementById('logo-text');
    
    if (customLogo && customLogoImg && defaultLogo) {
        // Show custom logo, hide default
        customLogoImg.src = customLogo;
        customLogoImg.style.display = 'block';
        defaultLogo.style.display = 'none';
    } else if (customLogoImg && defaultLogo) {
        // Show default logo
        customLogoImg.style.display = 'none';
        defaultLogo.style.display = 'block';
    }
    
    // Toggle company name text
    if (logoText) {
        logoText.style.display = showText ? 'inline' : 'none';
    }
}

function renderLogoAdmin() {
    const preview = document.getElementById('logo-preview');
    if (!preview) return;
    
    const customLogo = localStorage.getItem('customLogo');
    
    if (customLogo) {
        preview.innerHTML = `
            <div class="admin-image-item">
                <img src="${customLogo}" alt="Company logo" style="background: #f0f0f0; padding: 20px;">
                <button class="admin-image-delete" id="delete-logo">✕</button>
            </div>
        `;
        
        const deleteBtn = document.getElementById('delete-logo');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to remove the custom logo?')) {
                    localStorage.removeItem('customLogo');
                    updateLogo();
                    renderLogoAdmin();
                }
            });
        }
    } else {
        preview.innerHTML = '<div class="admin-empty-state">No custom logo uploaded yet</div>';
    }
    
    // Update checkbox state
    const checkbox = document.getElementById('show-logo-text');
    if (checkbox) {
        checkbox.checked = localStorage.getItem('showLogoText') !== 'false';
    }
}

// ================================================
// HERO SECTION CUSTOMIZATION
// ================================================

// Hero Image Upload
const heroImageUpload = document.getElementById('hero-image-upload');

if (heroImageUpload) {
    heroImageUpload.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        
        if (file && validateImageFile(file)) {
            try {
                const compressedImage = await compressImage(file, 1400, 800, 0.65);
                localStorage.setItem('heroBackground', compressedImage);
                
                // Update hero immediately
                updateHeroBackground();
                renderHeroImageAdmin();
                
                alert('✅ Hero background uploaded successfully!');
            } catch (error) {
                console.error('Error processing hero image:', error);
                alert('Failed to process hero image. Please try again.');
            }
        }
        
        e.target.value = '';
    });
}

function updateHeroBackground() {
    const heroBackground = localStorage.getItem('heroBackground');
    const heroBackgroundEl = document.getElementById('hero-background');
    
    if (heroBackground && heroBackgroundEl) {
        heroBackgroundEl.style.backgroundImage = `url('${heroBackground}')`;
        heroBackgroundEl.classList.add('custom-background');
    }
}

function renderHeroImageAdmin() {
    const preview = document.getElementById('hero-image-preview');
    if (!preview) return;
    
    const heroBackground = localStorage.getItem('heroBackground');
    
    if (heroBackground) {
        preview.innerHTML = `
            <div class="admin-image-item">
                <img src="${heroBackground}" alt="Hero background">
                <button class="admin-image-delete" id="delete-hero-bg">✕</button>
            </div>
        `;
        
        const deleteBtn = document.getElementById('delete-hero-bg');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to remove the custom hero background?')) {
                    localStorage.removeItem('heroBackground');
                    const heroBackgroundEl = document.getElementById('hero-background');
                    if (heroBackgroundEl) {
                        heroBackgroundEl.style.backgroundImage = '';
                        heroBackgroundEl.classList.remove('custom-background');
                    }
                    renderHeroImageAdmin();
                }
            });
        }
    } else {
        preview.innerHTML = '<div class="admin-empty-state">No custom hero background uploaded yet</div>';
    }
}

// Hero Text Editing
const heroTitleInput = document.getElementById('hero-title-input');
const heroSubtitleInput = document.getElementById('hero-subtitle-input');
const saveHeroTextBtn = document.getElementById('save-hero-text-btn');
const resetHeroTextBtn = document.getElementById('reset-hero-text-btn');

// Default hero text
const defaultHeroTitle = "Professional Landscaping Services in Germantown, NY";
const defaultHeroSubtitle = "Expert lawn care, mowing, striping, and land clearing services. Serving Germantown, Hudson, Red Hook & surrounding areas. Family-owned, reliable, and trusted by local homeowners.";

if (saveHeroTextBtn) {
    saveHeroTextBtn.addEventListener('click', () => {
        const title = heroTitleInput.value.trim();
        const subtitle = heroSubtitleInput.value.trim();
        
        if (title && subtitle) {
            localStorage.setItem('heroTitle', title);
            localStorage.setItem('heroSubtitle', subtitle);
            
            updateHeroText();
            alert('✅ Hero text saved successfully!');
        } else {
            alert('Please fill in both title and subtitle fields.');
        }
    });
}

if (resetHeroTextBtn) {
    resetHeroTextBtn.addEventListener('click', () => {
        if (confirm('Reset hero text to default?')) {
            localStorage.removeItem('heroTitle');
            localStorage.removeItem('heroSubtitle');
            
            updateHeroText();
            loadHeroTextIntoInputs();
            alert('✅ Hero text reset to default!');
        }
    });
}

function updateHeroText() {
    const savedTitle = localStorage.getItem('heroTitle');
    const savedSubtitle = localStorage.getItem('heroSubtitle');
    
    const heroTitleEl = document.getElementById('hero-title');
    const heroSubtitleEl = document.getElementById('hero-subtitle');
    
    if (heroTitleEl) {
        heroTitleEl.textContent = savedTitle || defaultHeroTitle;
    }
    
    if (heroSubtitleEl) {
        heroSubtitleEl.textContent = savedSubtitle || defaultHeroSubtitle;
    }
}

function loadHeroTextIntoInputs() {
    const savedTitle = localStorage.getItem('heroTitle') || defaultHeroTitle;
    const savedSubtitle = localStorage.getItem('heroSubtitle') || defaultHeroSubtitle;
    
    if (heroTitleInput) {
        heroTitleInput.value = savedTitle;
    }
    
    if (heroSubtitleInput) {
        heroSubtitleInput.value = savedSubtitle;
    }
}

// ================================================
// APPOINTMENT FORM HANDLING & EMAIL INTEGRATION
// ================================================

const appointmentForm = document.getElementById('appointmentForm');

if (appointmentForm) {
    appointmentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = appointmentForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        
        // Show loading state
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        if (btnText && btnLoader) {
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline';
        }
        
        try {
            const formData = new FormData(appointmentForm);
            
            // Submit to Formspree
            const response = await fetch('https://formspree.io/f/xdalnyeg', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                console.log('✅ Appointment form submitted to Formspree');
                
                // Clear form
                appointmentForm.reset();
                
                // Show success message
                const successMsg = document.getElementById('apptSuccessMessage');
                if (successMsg) {
                    successMsg.classList.add('show');
                    successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    
                    // Hide after 8 seconds
                    setTimeout(() => {
                        successMsg.classList.remove('show');
                    }, 8000);
                }
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            console.error('❌ Error:', error);
            const errorMsg = document.getElementById('apptErrorMessage');
            if (errorMsg) {
                errorMsg.style.display = 'block';
                errorMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        } finally {
            submitBtn.disabled = false;
            if (btnText && btnLoader) {
                btnText.style.display = 'inline';
                btnLoader.style.display = 'none';
            }
        }
    });
}

// ================================================
// BEFORE/AFTER ADMIN MANAGEMENT
// ================================================

let tempBeforeImage = null;
let tempAfterImage = null;

// Before image upload
const baBeforeUpload = document.getElementById('ba-before-upload');
if (baBeforeUpload) {
    baBeforeUpload.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (file && validateImageFile(file)) {
            try {
                // Use smaller dimensions and lower quality for before/after to save storage
                const compressed = await compressImage(file, 800, 600, 0.6);
                tempBeforeImage = compressed;
                
                const preview = document.getElementById('ba-before-preview');
                preview.innerHTML = `<img src="${compressed}" alt="Before preview">`;
                preview.classList.remove('empty');
                
                console.log('✅ Before image compressed and ready');
            } catch (error) {
                console.error('Error processing before image:', error);
                alert('❌ Failed to process image.\n\nTry using a smaller file or a different image.');
            }
        }
        e.target.value = '';
    });
}

// After image upload
const baAfterUpload = document.getElementById('ba-after-upload');
if (baAfterUpload) {
    baAfterUpload.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (file && validateImageFile(file)) {
            try {
                // Optimize before/after with balanced quality
                const compressed = await compressImage(file, 700, 550, 0.60);
                tempAfterImage = compressed;
                
                const preview = document.getElementById('ba-after-preview');
                preview.innerHTML = `<img src="${compressed}" alt="After preview">`;
                preview.classList.remove('empty');
            } catch (error) {
                console.error('Error processing after image:', error);
                alert('Failed to process image. Please try again.');
            }
        }
        e.target.value = '';
    });
}

// Add before/after set
const addBeforeAfterBtn = document.getElementById('add-before-after-btn');
if (addBeforeAfterBtn) {
    addBeforeAfterBtn.addEventListener('click', () => {
        console.log('🔘 Add Before/After button clicked');
        console.log('📸 tempBeforeImage:', tempBeforeImage ? 'exists' : 'null');
        console.log('📸 tempAfterImage:', tempAfterImage ? 'exists' : 'null');
        
        if (!tempBeforeImage || !tempAfterImage) {
            alert('⚠️ Please upload both before and after images');
            console.log('❌ Missing images');
            return;
        }
        
        const description = document.getElementById('ba-description-input').value.trim();
        console.log('📝 Description:', description || '(none)');
        
        // Add the set (returns false if limit reached)
        const added = beforeAfterSlider.addSet(tempBeforeImage, tempAfterImage, description);
        
        if (!added) {
            console.log('❌ Failed to add set (limit reached)');
            return;
        }
        
        // Clear temp images and inputs
        tempBeforeImage = null;
        tempAfterImage = null;
        
        const beforePreview = document.getElementById('ba-before-preview');
        const afterPreview = document.getElementById('ba-after-preview');
        const descInput = document.getElementById('ba-description-input');
        
        if (beforePreview) {
            beforePreview.innerHTML = '';
            beforePreview.classList.add('empty');
        }
        
        if (afterPreview) {
            afterPreview.innerHTML = '';
            afterPreview.classList.add('empty');
        }
        
        if (descInput) {
            descInput.value = '';
        }
        
        // Render admin grid to show the new set
        console.log('🔄 Rendering admin grid...');
        renderBeforeAfterAdmin();
        
        // Force update the main slider immediately
        console.log('🔄 Updating main slider...');
        beforeAfterSlider.renderCurrentSet();
        beforeAfterSlider.renderNavigation();
        
        alert(`✅ Before/After set added successfully!\n\nTotal sets: ${beforeAfterSlider.beforeAfterSets.length}/5\n\nYou can now scroll to "Before & After Transformations" to view it immediately!`);
        
        console.log('✅ Before/After add complete and visible on page');
    });
} else {
    console.log('❌ add-before-after-btn not found');
}

function renderBeforeAfterAdmin() {
    const grid = document.getElementById('ba-admin-grid');
    if (!grid) {
        console.log('❌ ba-admin-grid not found');
        return;
    }
    
    console.log('🔄 Rendering before/after admin, sets:', beforeAfterSlider.beforeAfterSets.length);
    
    if (beforeAfterSlider.beforeAfterSets.length === 0) {
        grid.innerHTML = '<div class="admin-empty-state">No before/after sets uploaded yet</div>';
        return;
    }
    
    grid.innerHTML = '';
    beforeAfterSlider.beforeAfterSets.forEach((set, index) => {
        const item = document.createElement('div');
        item.className = 'ba-admin-item';
        item.setAttribute('data-index', index);
        item.innerHTML = `
            <div>
                <strong>Before:</strong>
                <img src="${set.before}" alt="Before">
            </div>
            <div>
                <strong>After:</strong>
                <img src="${set.after}" alt="After">
            </div>
            <div class="ba-admin-item-actions">
                <button class="btn btn-secondary btn-sm ba-view-btn" data-index="${index}">View</button>
                <button class="admin-image-delete ba-delete-btn" data-index="${index}">Delete</button>
            </div>
            ${set.description ? `<div class="ba-admin-item-desc">${set.description}</div>` : ''}
        `;
        
        // Attach event listeners directly (not using onclick)
        const viewBtn = item.querySelector('.ba-view-btn');
        const deleteBtn = item.querySelector('.ba-delete-btn');
        
        if (viewBtn) {
            viewBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('👁️ View button clicked for set', index);
                beforeAfterSlider.goToSet(index);
                adminPanel.classList.remove('active');
                setTimeout(() => {
                    const section = document.getElementById('before-after');
                    if (section) {
                        section.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 100);
            });
        }
        
        if (deleteBtn) {
            deleteBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('🗑️ Delete button clicked for set', index);
                if (confirm('Are you sure you want to delete this before/after set?')) {
                    // Delete the set
                    beforeAfterSlider.deleteSet(index);
                    
                    // Update admin panel
                    renderBeforeAfterAdmin();
                    
                    // Force update the main slider on the page
                    beforeAfterSlider.renderCurrentSet();
                    beforeAfterSlider.renderNavigation();
                    
                    console.log('✅ Before/After set deleted and page updated');
                    
                    // Show success message
                    alert(`✅ Set deleted successfully!\n\nRemaining sets: ${beforeAfterSlider.beforeAfterSets.length}/5`);
                }
            });
        }
        
        grid.appendChild(item);
    });
    
    console.log('✅ Rendered', beforeAfterSlider.beforeAfterSets.length, 'before/after sets in admin');
}

// ================================================
// LOCALSTORAGE USAGE MONITOR
// ================================================

function checkStorageUsage() {
    let totalSize = 0;
    const breakdown = {};
    
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            const size = (localStorage[key].length * 2); // Approximate bytes
            totalSize += size;
            breakdown[key] = {
                sizeKB: (size / 1024).toFixed(1),
                sizeMB: (size / 1024 / 1024).toFixed(2)
            };
        }
    }
    
    const totalMB = (totalSize / 1024 / 1024).toFixed(2);
    const estimatedLimit = 5; // MB (conservative estimate)
    const percentUsed = ((totalMB / estimatedLimit) * 100).toFixed(1);
    
    console.log('💾 localStorage Usage Report:');
    console.log('├─ Total Used:', totalMB, 'MB');
    console.log('├─ Estimated Limit:', estimatedLimit, 'MB');
    console.log('├─ Percent Used:', percentUsed + '%');
    console.log('└─ Breakdown:', breakdown);
    
    return {
        totalMB: parseFloat(totalMB),
        percentUsed: parseFloat(percentUsed),
        breakdown: breakdown
    };
}

// Global function to check storage
window.checkStorageUsage = checkStorageUsage;

// Warn if storage is getting full
function warnIfStorageFull() {
    const usage = checkStorageUsage();
    if (usage.percentUsed > 70) {
        console.warn('⚠️ localStorage is', usage.percentUsed + '% full!');
        console.warn('Consider deleting some images to free up space.');
        
        if (usage.percentUsed > 80) {
            alert('⚠️ Storage Warning\n\nYour browser storage is ' + usage.percentUsed + '% full!\n\n🚨 DELETE IMAGES NOW to avoid errors!\n\nNew limits:\n• 5 images per gallery (max)\n• 3 before/after sets (max)\n\nClick OK, then delete some images.');
        }
    }
}

// ================================================
// MANUAL ADMIN PANEL OPENER (BACKUP METHOD)
// ================================================

// ================================================
// ADMIN PANEL ACCESS DISABLED FOR PRODUCTION
// ================================================
// All admin functionality is now disabled to prevent visitors
// from accessing or modifying your uploaded content.
// Your images, text, and customizations are now locked in.
//
// TO RE-ENABLE ADMIN PANEL FOR UPDATES:
// 1. Uncomment the admin button in index.html (line ~1142)
// 2. Uncomment the code below
// 3. Make your changes
// 4. Re-comment everything before pushing to live site
// ================================================

/*
// Global function to open admin panel manually (for debugging)
window.openAdminPanel = function() {
    console.log('📂 Manual admin panel opener called');
    const panel = document.getElementById('admin-panel');
    if (panel) {
        panel.classList.add('active');
        renderAdminGalleries();
        warnIfStorageFull();
        console.log('✅ Admin panel opened manually');
        return true;
    } else {
        console.error('❌ Admin panel not found');
        alert('Error: Admin panel element not found in HTML');
        return false;
    }
};

// Global function to close admin panel manually
window.closeAdminPanel = function() {
    const panel = document.getElementById('admin-panel');
    if (panel) {
        panel.classList.remove('active');
        console.log('✅ Admin panel closed manually');
        return true;
    }
    return false;
};

// Add keyboard shortcut: Ctrl+Shift+A to open admin
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        console.log('⌨️ Keyboard shortcut detected: Ctrl+Shift+A');
        window.openAdminPanel();
    }
});
*/

console.log('🔒 Admin panel locked - Visitors cannot modify content');

// ================================================
// INITIALIZATION
// ================================================

// Log to console when script loads successfully
console.log('🌿 Rifenburgh Landscaping website loaded successfully!');
console.log('📸 Gallery system initialized');
console.log('📧 Formspree integration active');
console.log('🔒 Admin panel disabled - Content locked for production');

// Optional: Add analytics tracking here
// Example: Google Analytics, Facebook Pixel, etc.
/*
// Google Analytics example
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'GA_MEASUREMENT_ID');

// Track form submissions
quoteForm.addEventListener('submit', () => {
    gtag('event', 'form_submission', {
        'event_category': 'engagement',
        'event_label': 'quote_request'
    });
});
*/
