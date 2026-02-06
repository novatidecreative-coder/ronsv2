# Rifenburgh Landscaping Website

A modern, responsive, single-page marketing website for a local landscaping company.

## 📁 Project Structure

```
rifenburgh-landscaping/
├── index.html       # Main HTML file with all sections
├── styles.css       # Complete stylesheet with responsive design
├── script.js        # JavaScript for interactivity and form handling
└── README.md        # This file
```

## 🚀 Quick Start

1. **Upload Files**: Upload all files to your web hosting service or platform.
2. **Update Business Info**: Edit the sections marked with `<!-- EDIT: ... -->` comments in `index.html`.
3. **Test**: Open `index.html` in a browser to preview the site.
4. **Deploy**: Point your domain to the hosting location.

## ✏️ How to Update Contact Information

All business details are marked with HTML comments starting with `<!-- EDIT: ... -->`. Search for "EDIT" in `index.html` to find all customizable sections:

### Phone Number
Replace `(555) 123-4567` and `tel:5551234567` in:
- Header CTA button
- Hero section secondary button
- Contact section
- Schema markup (`<script type="application/ld+json">`)

### Email Address
Replace `info@rifenburghlandscaping.com` in:
- Contact section
- Schema markup

### Business Address
Replace `123 Greenway Lane, Localtown, NY 00000` in:
- Contact section
- Footer
- Schema markup

### Service Areas
Update the town/city names in:
- Service Area section (`<ul class="towns-list">`)
- Schema markup (`"areaServed"` array)

### Business Story
Update the "About Rifenburgh Landscaping" section with:
- Years in business
- Owner/founder information
- Company history
- Unique selling points

## 🔗 Form Integration Options

The quote request form currently simulates submission. To connect it to a real backend:

### Option 1: GoHighLevel Integration
1. Create a form or workflow in GoHighLevel
2. Get the webhook URL
3. In `script.js`, find the `INTEGRATION POINT` comment (around line 180)
4. Replace the simulation code with:

```javascript
fetch('YOUR_GOHIGHLEVEL_WEBHOOK_URL', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
})
.then(response => response.json())
.then(data => {
    // Clear form
    quoteForm.reset();
    
    // Show success message
    successMessage.classList.add('show');
})
.catch(error => {
    console.error('Error:', error);
    alert('There was an error submitting your request. Please try again or call us directly.');
});
```

### Option 2: Formspree (Easy, No Backend Required)
1. Sign up at [formspree.io](https://formspree.io)
2. Get your form endpoint
3. Add `action="https://formspree.io/f/YOUR_FORM_ID"` to the `<form>` tag
4. Remove or comment out the JavaScript form handler

### Option 3: EmailJS (Email-Based)
1. Sign up at [emailjs.com](https://www.emailjs.com)
2. Set up email service and template
3. Include EmailJS library in `index.html`:
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
```
4. Update form handler in `script.js` to use EmailJS

### Option 4: Custom Backend API
Create your own API endpoint and update the fetch URL in `script.js`.

## 🎨 Customization Guide

### Colors
Main colors are defined in `styles.css`. To change the color scheme:

```css
/* Primary colors - search and replace in styles.css */
#2d5016  /* Primary green - main brand color */
#4a7c2c  /* Accent green - hover states, accents */
#e8dcc4  /* Earth tan - backgrounds */
#6b4423  /* Earth brown - accents */
```

### Fonts
The site uses system fonts for performance. To use custom fonts:

1. Add Google Fonts or font files to `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet">
```

2. Update `styles.css`:
```css
body {
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

### Images
Replace placeholder images with actual photos:
1. Upload your images to your hosting
2. Replace Unsplash URLs in `index.html` with your image paths
3. Recommended sizes:
   - Hero background: 1920x1080px or larger
   - Gallery images: 600x400px minimum
   - About section: 600x700px

## 📱 Responsive Design

The site is fully responsive with breakpoints at:
- **Desktop**: 1200px and up
- **Tablet**: 769px - 1199px
- **Mobile**: 480px - 768px
- **Small Mobile**: 479px and below

All sections automatically adapt to different screen sizes.

## ⚡ Performance Features

- Lazy loading images (`loading="lazy"` attribute)
- Optimized CSS with minimal unused styles
- Vanilla JavaScript (no heavy frameworks)
- Smooth scroll animations using Intersection Observer
- System font stack for faster loading

## 🔍 SEO Features Included

✅ Semantic HTML5 structure  
✅ LocalBusiness schema markup  
✅ Open Graph tags for social sharing  
✅ Optimized meta descriptions  
✅ Keyword-rich headings  
✅ Alt text for images (add descriptions)  
✅ Mobile-friendly design  
✅ Fast loading times  

### Additional SEO Recommendations

1. **Google My Business**: Claim and optimize your GMB listing
2. **Local Citations**: List business on Yelp, Angie's List, HomeAdvisor
3. **Content**: Add a blog section with landscaping tips
4. **Reviews**: Encourage customers to leave reviews on Google
5. **Analytics**: Install Google Analytics and Search Console

## 🌐 Deployment Options

### Option 1: Traditional Web Hosting
- Upload via FTP/SFTP to any web host (Bluehost, SiteGround, etc.)
- Point domain to hosting server
- Enable HTTPS (most hosts offer free SSL)

### Option 2: GoHighLevel
- Use the "Custom Code" feature or "Website Builder"
- Copy/paste the HTML, CSS, and JS
- Connect form to GoHighLevel workflows

### Option 3: Netlify (Free, Modern)
1. Sign up at [netlify.com](https://www.netlify.com)
2. Drag and drop your folder
3. Get instant HTTPS and global CDN
4. Connect custom domain

### Option 4: GitHub Pages (Free)
1. Create GitHub repository
2. Upload files
3. Enable GitHub Pages in settings
4. Optional: Use custom domain

## 📊 Analytics Integration

To track visitor behavior, add analytics in `index.html` before `</head>`:

### Google Analytics 4
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Facebook Pixel
```html
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

## 🛠️ Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- iOS Safari 12+
- Android Chrome 80+

Graceful degradation for older browsers (features like smooth scroll will fallback to instant scroll).

## 📝 Maintenance Checklist

### Monthly
- [ ] Update testimonials with new reviews
- [ ] Add new photos to gallery
- [ ] Check all links and forms
- [ ] Review analytics data

### Quarterly
- [ ] Refresh seasonal services (add/remove based on season)
- [ ] Update pricing if needed
- [ ] Check mobile display on various devices
- [ ] Test form submissions

### Annually
- [ ] Refresh hero image
- [ ] Update company description
- [ ] Review and update service offerings
- [ ] Check competitor websites for ideas

## 💡 Enhancement Ideas

### Easy Additions
- Add a blog section for SEO
- Include before/after photo sliders
- Add a FAQ accordion section
- Embed Google Maps for location
- Add live chat widget (Tidio, Tawk.to)

### Advanced Additions
- Photo gallery lightbox/modal
- Service area map integration
- Online booking/scheduling system
- Customer portal for invoice viewing
- Integration with CRM system

## 📞 Support

For questions about customization or deployment, refer to:
- [MDN Web Docs](https://developer.mozilla.org/) for HTML/CSS/JS reference
- [W3Schools](https://www.w3schools.com/) for tutorials
- Your hosting provider's documentation

## 📄 License

This is a custom website template. Feel free to modify and use for your business.

---

**Built with care for Rifenburgh Landscaping** 🌿
