# Gallery Management System - User Guide

## Overview
Your website now includes a powerful image management system with auto-rotating galleries and an easy-to-use admin interface.

## 🎨 Features Implemented

### 1. **Land Clearing Gallery** (Auto-Rotating)
- Displays professional land clearing photos
- Auto-rotates every 5 seconds
- Manual navigation with arrow buttons
- Dot indicators for position tracking
- Image counter (e.g., "1 / 12")
- Pauses rotation when hovering over images

### 2. **Land Striping Gallery** (Auto-Rotating)
- Showcases professional lawn striping work
- Same auto-rotation and navigation features
- Beautiful transition animations

### 3. **Backyard Restoration Gallery** (Auto-Rotating)
- Displays before/after backyard transformations
- Starts empty - ready for your photos
- Full carousel functionality

### 4. **About Me Section**
- Featured business owner photo
- Editable text description
- Professional layout matching your site theme

### 5. **Company Logo Customization**
- Upload your own logo to replace the default icon
- Option to show/hide company name next to logo
- Supports PNG (transparent), JPG, SVG formats

### 6. **Hero Section Customization**
- Upload custom hero background image
- Edit hero title and subtitle text
- Reset to default with one click

---

## 🔧 How to Use the Admin Panel

### Accessing the Admin Panel
1. Look for the **gear icon (⚙️)** in the bottom-right corner of your website
2. Click the gear icon to open the admin panel
3. The panel will appear as a full-screen overlay

### Uploading Images

#### For Galleries (Land Clearing, Striping, Backyard):
1. Open the admin panel
2. Find the section you want to update
3. Click the **"Upload Images"** button (or drag & drop)
4. Select one or multiple images from your computer
5. Images will automatically:
   - Compress for fast loading
   - Upload to the gallery
   - Save to your browser's storage
   - Appear on the live website immediately

**Accepted Formats:** JPG, PNG, WebP, GIF  
**Max File Size:** 5MB per image  
**Recommended:** Use high-quality photos (at least 1920x1080px)

#### For About Section Photo:
1. Open the admin panel
2. Scroll to "About Section - Owner Photo"
3. Click **"Upload Owner Photo"**
4. Select a professional photo (square or portrait works best)
5. The photo will appear immediately in the About section

#### For Company Logo:
1. Open the admin panel
2. Scroll to "Company Logo"
3. Click **"Upload Company Logo"**
4. Select your logo (PNG with transparent background recommended)
5. Choose whether to show company name next to logo
6. Logo appears immediately in the header

**Best Practices for Logo:**
- Use PNG format with transparent background
- Recommended size: 200x60 pixels
- Keep file size under 2MB
- Horizontal logos work best

#### For Hero Background Image:
1. Open the admin panel
2. Scroll to "Hero Section Customization"
3. Click **"Upload Hero Background"**
4. Select a high-quality landscape photo
5. Image appears immediately as your homepage background

**Best Practices for Hero Image:**
- Use high-resolution photos (1920x1080px or larger)
- Landscape orientation works best
- Make sure subject is visible under the green overlay
- Keep file size under 5MB

### Editing Hero Text
1. Open the admin panel
2. Scroll to "Hero Section Customization"
3. Edit the "Main Headline" field
4. Edit the "Subtitle/Description" field
5. Click **"Save Hero Text"**
6. Changes appear immediately on homepage
7. Click **"Reset to Default"** to restore original text

### Deleting Images
1. Open the admin panel
2. Hover over any image in the admin grid
3. Click the **red X button** that appears
4. Confirm the deletion
5. The image will be removed from both the gallery and storage

### Editing About Section Text
1. Scroll to the About section on your main page
2. Click the **"Edit Description"** button
3. The text becomes editable - type or paste your content
4. Click **"Save Changes"** when done
5. Your text is automatically saved and persists across page reloads

---

## 🎯 Gallery Features

### Auto-Rotation
- All galleries automatically advance every **5 seconds**
- Rotation **pauses** when you hover over the carousel
- Rotation **resumes** when you move your mouse away

### Manual Navigation
- **Arrow Buttons:** Click left/right arrows on each carousel
- **Dot Indicators:** Click any dot to jump to that image
- **Keyboard:** Press ← → arrow keys to navigate (when admin panel is closed)

### Image Counter
- Shows current position (e.g., "3 / 15")
- Updates in real-time as you navigate

---

## 💾 Data Storage

### Where Are Images Stored?
All images are stored in your **browser's localStorage**:
- **Pros:** Instant loading, no server needed, free hosting
- **Cons:** Limited to ~5-10MB total storage, browser-specific

### Important Notes:
1. **Browser-Specific:** Images uploaded in Chrome won't appear in Firefox
2. **Private Browsing:** Don't use private/incognito mode - data won't persist
3. **Clearing Data:** If you clear browser data, images will be deleted
4. **Backup:** Consider keeping original photos in a safe folder

### Storage Keys Used:
- `landClearingImages` - Land Clearing Gallery
- `landStripingImages` - Land Striping Gallery  
- `backyardImages` - Backyard Restoration Gallery
- `aboutPhoto` - About section owner photo
- `aboutText` - About section description text
- `customLogo` - Company logo
- `showLogoText` - Show/hide company name
- `heroBackground` - Hero section background image
- `heroTitle` - Hero section main headline
- `heroSubtitle` - Hero section subtitle

---

## 📱 Mobile Responsiveness

The gallery system is fully responsive:
- **Desktop:** Full-size carousels with all controls
- **Tablet:** Adapted layouts with touch support
- **Mobile:** Optimized sizes, swipe-friendly navigation

---

## 🎨 Customization Options

### Want to Change Auto-Rotate Speed?
Edit `script.js` and find this line:
```javascript
this.autoRotateDelay = 5000; // 5 seconds (5000 milliseconds)
```
Change `5000` to any number (in milliseconds):
- 3000 = 3 seconds (faster)
- 7000 = 7 seconds (slower)
- 10000 = 10 seconds (much slower)

### Want to Change Colors?
Edit `styles.css` and search for:
- `#2d5016` (primary green)
- `#4a7c2c` (accent green)

Replace with your preferred colors.

---

## 🐛 Troubleshooting

### Images Not Appearing After Upload?
1. Check browser console for errors (F12 key)
2. Ensure files are under 5MB
3. Try a different image format (JPG recommended)
4. Clear browser cache and refresh

### Gallery Not Auto-Rotating?
1. Check that you have more than 1 image uploaded
2. Ensure you're not hovering over the carousel
3. Refresh the page

### Admin Panel Won't Open?
1. Look for the gear icon in bottom-right corner
2. Make sure JavaScript is enabled in your browser
3. Try refreshing the page

### Lost All Images?
- This happens if browser data was cleared
- Always keep original photos backed up
- Re-upload images through admin panel

### About Text Won't Save?
1. Make sure you clicked "Save Changes" button
2. Check that you're not in private browsing mode
3. Try editing and saving again

### Logo Not Appearing?
1. Make sure you uploaded a logo (not just clicked the button)
2. Check file size is under 2MB
3. Try a different image format (PNG recommended)
4. Refresh the page (Ctrl+F5)

### Hero Image Not Showing?
1. Verify file size is under 5MB
2. Use JPG or PNG format
3. Clear browser cache and refresh
4. Try a different image

---

## 🚀 Best Practices

### For Best Results:
1. **Image Quality:**
   - Use high-resolution photos (1920x1080 or higher)
   - Ensure good lighting and clarity
   - Professional photos work best

2. **Image Quantity:**
   - Land Clearing: 6-12 images ideal
   - Land Striping: 6-10 images ideal  
   - Backyard Restoration: 8-15 images ideal

3. **Before/After Photos:**
   - Take photos from same angle
   - Same lighting conditions
   - Show dramatic transformations

4. **About Section:**
   - Use a professional headshot or action shot
   - Keep text concise (3-4 paragraphs)
   - Focus on experience and value proposition

5. **Company Logo:**
   - Use professional design (or hire a designer)
   - PNG with transparent background preferred
   - Horizontal orientation (wider than tall)
   - Keep it simple and recognizable

6. **Hero Section:**
   - Use high-quality, professional photos
   - Choose images that represent your best work
   - Make sure text is readable over the image
   - Update seasonally for freshness

---

## 📊 Performance Tips

### Keep Website Fast:
1. **Don't upload too many images** (15-20 per gallery max)
2. **Compress large files** before uploading (website does this automatically)
3. **Use JPG format** for photos (smaller file size than PNG)
4. **Delete old/unused images** regularly

---

## 🔐 Security Notes

### Admin Access:
The admin panel currently has **no password protection**. Anyone with access to your website can:
- Open the admin panel (gear icon)
- Upload/delete images
- Edit about text

**Recommendation:** Only access admin panel from:
- Your personal devices
- Trusted locations
- Not on public Wi-Fi

**Future Enhancement:** Consider adding password protection to the admin panel.

---

## 📞 Support & Questions

If you need help:
1. Check this guide first
2. Review browser console for errors (F12)
3. Test in a different browser
4. Keep original photos backed up

---

## ✅ Quick Reference

| Action | How To |
|--------|--------|
| Open Admin | Click gear icon (⚙️) bottom-right |
| Upload Images | Admin → Click "Upload Images" → Select files |
| Delete Images | Admin → Hover image → Click red X |
| Edit About Text | About section → "Edit Description" |
| Upload Logo | Admin → "Company Logo" → Upload |
| Upload Hero Image | Admin → "Hero Section" → Upload |
| Edit Hero Text | Admin → "Hero Section" → Edit fields → Save |
| Navigate Carousel | Click arrows, dots, or use ← → keys |
| Pause Rotation | Hover over carousel |

---

## 🎉 You're All Set!

Your website now has a professional, dynamic image management system. Start uploading your best landscaping photos and watch your galleries come to life!

**Pro Tip:** Update your galleries regularly with recent projects to keep content fresh and engaging for visitors.
