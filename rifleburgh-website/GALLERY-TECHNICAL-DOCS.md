# Gallery Management System - Technical Documentation

## Architecture Overview

The gallery system is built using vanilla JavaScript with a class-based architecture for managing carousel functionality, image uploads, localStorage persistence, and admin controls.

---

## Core Components

### 1. GalleryManager Class (`script.js`)

The main class that handles all gallery operations.

**Constructor Parameters:**
- `galleryId` (string): Unique identifier for the gallery
- `storageKey` (string): localStorage key for persisting images

**Key Properties:**
```javascript
{
    galleryId: string,
    storageKey: string,
    currentIndex: number,
    images: array,
    autoRotateInterval: interval,
    autoRotateDelay: 5000, // milliseconds
    track: HTMLElement,
    dotsContainer: HTMLElement,
    counter: HTMLElement
}
```

**Public Methods:**
- `loadImages()` - Loads images from localStorage
- `saveImages()` - Persists images to localStorage
- `renderCarousel()` - Renders carousel HTML
- `renderDots()` - Creates dot navigation indicators
- `updateCarousel()` - Updates carousel position
- `updateCounter()` - Updates image counter display
- `goToSlide(index)` - Navigate to specific slide
- `nextSlide()` - Advance to next slide
- `prevSlide()` - Go to previous slide
- `startAutoRotate()` - Begin automatic rotation
- `stopAutoRotate()` - Pause automatic rotation
- `resetAutoRotate()` - Restart rotation timer
- `addImage(imageSrc)` - Add new image to gallery
- `deleteImage(index)` - Remove image from gallery
- `pauseOnHover()` - Enable hover pause functionality

---

## Gallery Instances

Three gallery instances are created on page load:

```javascript
const landClearingGallery = new GalleryManager('land-clearing', 'landClearingImages');
const landStripingGallery = new GalleryManager('land-striping', 'landStripingImages');
const backyardGallery = new GalleryManager('backyard', 'backyardImages');
```

---

## Image Upload & Compression

### compressImage() Function

Compresses images before storing to optimize performance and storage.

**Parameters:**
- `file` (File): Image file object
- `maxWidth` (number): Maximum width in pixels (default: 1920)
- `maxHeight` (number): Maximum height in pixels (default: 1080)
- `quality` (number): JPEG quality 0-1 (default: 0.85)

**Returns:** Promise resolving to base64-encoded image string

**Process:**
1. Read file as Data URL
2. Create Image object
3. Calculate new dimensions maintaining aspect ratio
4. Draw to canvas at new size
5. Convert to JPEG with specified quality
6. Return base64 string

### validateImageFile() Function

Validates file type and size before upload.

**Validation Rules:**
- **Allowed Types:** image/jpeg, image/jpg, image/png, image/webp, image/gif
- **Max Size:** 5MB (5,242,880 bytes)

---

## localStorage Schema

### Image Arrays
Stored as JSON-stringified arrays of base64 image strings:

```javascript
// Example structure
{
    "landClearingImages": [
        "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
        "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
        // ... more images
    ],
    "landStripingImages": [...],
    "backyardImages": [...]
}
```

### About Section
```javascript
{
    "aboutPhoto": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
    "aboutText": "<p>Welcome to Rifenburgh...</p><p>...</p>"
}
```

### Storage Limits
- **Browser Limit:** ~5-10MB depending on browser
- **Per Image:** ~200-500KB after compression
- **Recommended:** 15-20 images per gallery maximum

---

## HTML Structure

### Carousel Container
```html
<div class="carousel-container">
    <div class="carousel" id="{gallery-id}-carousel">
        <div class="carousel-track" id="{gallery-id}-track">
            <!-- Dynamic slides inserted here -->
        </div>
    </div>
    <button class="carousel-btn carousel-btn-prev" data-carousel="{gallery-id}">‹</button>
    <button class="carousel-btn carousel-btn-next" data-carousel="{gallery-id}">›</button>
    <div class="carousel-dots" id="{gallery-id}-dots"></div>
    <div class="carousel-counter" id="{gallery-id}-counter">
        <span class="current">1</span> / <span class="total">3</span>
    </div>
</div>
```

### Admin Panel Structure
```html
<div class="admin-panel" id="admin-panel">
    <div class="admin-overlay"></div>
    <div class="admin-container">
        <div class="admin-header">...</div>
        <div class="admin-content">
            <div class="admin-section">
                <!-- Upload area -->
                <div class="admin-upload-area">
                    <input type="file" id="{gallery}-upload" accept="image/*" multiple>
                    <label for="{gallery}-upload">...</label>
                </div>
                <!-- Image grid -->
                <div class="admin-image-grid" id="{gallery}-admin-grid"></div>
            </div>
        </div>
    </div>
</div>
```

---

## CSS Architecture

### Key Classes

**Carousel:**
- `.carousel-container` - Outer wrapper with overflow hidden
- `.carousel` - Main carousel container
- `.carousel-track` - Flex container for slides (transforms for navigation)
- `.carousel-slide` - Individual slide wrapper
- `.carousel-btn` - Navigation arrow buttons
- `.carousel-dots` - Dot indicator container
- `.carousel-dot` - Individual dot (`.active` for current)
- `.carousel-counter` - Image counter display

**About Section:**
- `.about-content-wrapper` - Grid layout for photo + text
- `.about-photo-container` - Photo wrapper with fixed dimensions
- `.about-text-content` - Editable text container
- `.about-text-content[contenteditable="true"]` - Edit mode styling

**Admin Panel:**
- `.admin-panel` - Fixed fullscreen overlay (`.active` to show)
- `.admin-overlay` - Semi-transparent backdrop
- `.admin-container` - Main panel container
- `.admin-section` - Individual gallery section
- `.admin-upload-area` - Upload zone
- `.upload-label` - Styled file input label
- `.admin-image-grid` - Grid layout for image thumbnails
- `.admin-image-item` - Individual image with delete button

### Responsive Breakpoints

**Tablet (768px and below):**
- Carousel height: 400px
- Single column About layout
- Adjusted admin grid columns

**Mobile (480px and below):**
- Carousel height: 300px
- Smaller navigation buttons
- Compact admin panel
- Touch-optimized spacing

---

## Event Handlers

### Carousel Navigation
```javascript
// Previous button
document.querySelectorAll('.carousel-btn-prev').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const carouselType = e.target.getAttribute('data-carousel');
        // Route to appropriate gallery instance
    });
});

// Dot navigation
dot.addEventListener('click', () => this.goToSlide(index));
```

### File Upload
```javascript
fileInput.addEventListener('change', async (e) => {
    const files = Array.from(e.target.files);
    for (const file of files) {
        if (validateImageFile(file)) {
            const compressed = await compressImage(file);
            gallery.addImage(compressed);
        }
    }
    e.target.value = ''; // Reset input
    renderAdminGalleries();
});
```

### About Text Editing
```javascript
editAboutBtn.addEventListener('click', () => {
    const isEditing = aboutText.getAttribute('contenteditable') === 'true';
    
    if (isEditing) {
        // Save mode
        aboutText.setAttribute('contenteditable', 'false');
        localStorage.setItem('aboutText', aboutText.innerHTML);
    } else {
        // Edit mode
        aboutText.setAttribute('contenteditable', 'true');
        aboutText.focus();
    }
});
```

### Keyboard Navigation
```javascript
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        // Navigate backward
    } else if (e.key === 'ArrowRight') {
        // Navigate forward
    }
});
```

---

## Animation & Transitions

### Carousel Slide Transition
```css
.carousel-track {
    display: flex;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Easing Function:** Custom cubic-bezier for smooth, natural motion

### Fade-In Animation
Used for scroll-triggered elements:
```css
.fade-in {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-in.visible {
    opacity: 1;
    transform: translateY(0);
}
```

### Hover Effects
```css
.carousel-btn:hover {
    transform: translateY(-50%) scale(1.1);
}

.admin-image-item:hover {
    transform: translateY(-4px);
}
```

---

## Performance Optimizations

### 1. Image Compression
- Automatic compression on upload
- JPEG format at 85% quality
- Max dimensions: 1920x1080px
- Reduces storage and loading time

### 2. Lazy Loading
All carousel images use `loading="lazy"` attribute:
```html
<img src="..." alt="..." loading="lazy">
```

### 3. Intersection Observer
Fade-in animations use Intersection Observer API for performance:
```javascript
const fadeObserver = new IntersectionObserver(observerCallback, observerOptions);
fadeElements.forEach(element => fadeObserver.observe(element));
```

### 4. Event Delegation
Efficient event handling for dynamic admin grid:
```javascript
// Attach to grid, not individual items
grid.addEventListener('click', (e) => {
    if (e.target.classList.contains('admin-image-delete')) {
        // Handle delete
    }
});
```

### 5. Debouncing Auto-Rotate
Auto-rotate resets on user interaction to prevent jarring transitions:
```javascript
resetAutoRotate() {
    this.stopAutoRotate();
    this.startAutoRotate();
}
```

---

## Browser Compatibility

### Supported Browsers:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Required APIs:
- localStorage
- FileReader API
- Canvas API
- Intersection Observer API
- ES6+ (Classes, Arrow Functions, Async/Await, Template Literals)

### Polyfills Needed:
None required for modern browsers (2020+)

---

## Security Considerations

### XSS Prevention
- User-uploaded images stored as base64 (no file path injection)
- About text uses `innerHTML` (vulnerable to XSS if user inputs HTML)

**Mitigation:** Add HTML sanitization for About text:
```javascript
function sanitizeHTML(html) {
    const temp = document.createElement('div');
    temp.textContent = html;
    return temp.innerHTML;
}
```

### Admin Access
Currently **no authentication** - consider adding:
1. Simple password prompt
2. Session-based authentication
3. Admin route protection

### localStorage Security
- Data stored in plaintext
- Accessible via DevTools
- Not encrypted
- Browser-specific (not shared across devices)

**Note:** Suitable for non-sensitive data only (images, text)

---

## Testing Checklist

### Functional Testing:
- [ ] Upload single image
- [ ] Upload multiple images
- [ ] Delete image with confirmation
- [ ] Navigate carousel with arrows
- [ ] Navigate with dot indicators
- [ ] Navigate with keyboard (← →)
- [ ] Auto-rotate starts automatically
- [ ] Auto-rotate pauses on hover
- [ ] Image counter updates correctly
- [ ] About photo upload/delete
- [ ] About text edit/save
- [ ] Admin panel open/close
- [ ] Data persists after page reload

### Cross-Browser Testing:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### Responsive Testing:
- [ ] Desktop (1920px)
- [ ] Laptop (1366px)
- [ ] Tablet (768px)
- [ ] Mobile (375px)

### Performance Testing:
- [ ] Upload 20+ images per gallery
- [ ] Check localStorage usage
- [ ] Test auto-rotate with 20+ slides
- [ ] Monitor console for errors
- [ ] Check page load time

---

## Future Enhancements

### Possible Additions:
1. **Password Protection** for admin panel
2. **Before/After Slider** for transformation photos
3. **Image Reordering** (drag & drop in admin)
4. **Thumbnail Generation** for faster loading
5. **Cloud Storage Integration** (Firebase, AWS S3)
6. **Image Metadata** (captions, dates, project names)
7. **Gallery Statistics** (view counts, popular images)
8. **Full-Screen Lightbox** viewer
9. **Touch Swipe Gestures** for mobile
10. **Undo/Redo** for image deletion
11. **Bulk Delete** option
12. **Export/Import** gallery data
13. **Image Cropping/Rotation** in admin
14. **Analytics Integration** (track gallery interactions)
15. **Progressive Web App** (PWA) support

---

## Troubleshooting

### Common Issues:

**Images disappear after browser restart:**
- Check if private/incognito mode is enabled
- Verify localStorage quota hasn't been exceeded
- Check browser settings for data persistence

**Carousel doesn't auto-rotate:**
- Ensure gallery has 2+ images
- Check console for JavaScript errors
- Verify `autoRotateInterval` is set

**Upload fails silently:**
- Check file size (<5MB)
- Verify file type (JPG, PNG, WebP, GIF)
- Check browser console for errors
- Test localStorage availability

**Performance issues:**
- Reduce number of images per gallery
- Clear old/unused images
- Check localStorage usage
- Compress images before upload

---

## API Reference

### GalleryManager Class

#### Constructor
```javascript
new GalleryManager(galleryId: string, storageKey: string)
```

#### Methods

**loadImages()**
```javascript
loadImages(): void
```
Loads images from localStorage and renders carousel.

**saveImages()**
```javascript
saveImages(): void
```
Persists current images array to localStorage.

**addImage(imageSrc: string)**
```javascript
addImage(imageSrc: string): void
```
Adds new image to gallery and saves.

**deleteImage(index: number)**
```javascript
deleteImage(index: number): void
```
Removes image at specified index and saves.

**goToSlide(index: number)**
```javascript
goToSlide(index: number): void
```
Navigate to specific slide by index.

**nextSlide()**
```javascript
nextSlide(): void
```
Advance to next slide (wraps to start).

**prevSlide()**
```javascript
prevSlide(): void
```
Go to previous slide (wraps to end).

**startAutoRotate()**
```javascript
startAutoRotate(): void
```
Begin automatic slide rotation.

**stopAutoRotate()**
```javascript
stopAutoRotate(): void
```
Pause automatic rotation.

### Utility Functions

**compressImage()**
```javascript
compressImage(
    file: File,
    maxWidth: number = 1920,
    maxHeight: number = 1080,
    quality: number = 0.85
): Promise<string>
```

**validateImageFile()**
```javascript
validateImageFile(file: File): boolean
```

**renderAdminGalleries()**
```javascript
renderAdminGalleries(): void
```

---

## Change Log

### Version 1.0.0 (2026-02-05)
- Initial implementation
- Three auto-rotating galleries
- About section with photo and editable text
- Admin panel with upload/delete functionality
- localStorage persistence
- Responsive design
- Keyboard navigation
- Image compression
- Auto-rotate with hover pause

---

## License & Credits

**Developed for:** Rifenburgh Landscaping  
**Website:** landscapinggermantown.com  
**Technology Stack:** HTML5, CSS3, Vanilla JavaScript  
**Dependencies:** None (pure vanilla JS)

---

## Support

For technical issues or questions, refer to:
1. This documentation
2. Browser console errors (F12)
3. `GALLERY-USER-GUIDE.md` for usage instructions
