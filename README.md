# Createathon Studio - Professional 3D Website

A premium, creator-focused website featuring professional 3D models and cinematic animations, built with Three.js and GSAP ScrollTrigger.

![Hero Section](https://img.shields.io/badge/Three.js-r128-black?style=for-the-badge&logo=three.js)
![GSAP](https://img.shields.io/badge/GSAP-3.12.5-88CE02?style=for-the-badge&logo=greensock)
![WebGL](https://img.shields.io/badge/WebGL-Enabled-990000?style=for-the-badge&logo=webgl)

## 🎨 Overview

This website showcases a createathon studio platform with sophisticated 3D models, scroll-based animations, and professional visual effects - inspired by award-winning websites like Jesko Jets.

## ✨ Features

### 3D Models & Rendering
- **Professional 3D Assets** - Custom-built creator platform and competition stage
- **Three.js WebGL** - Hardware-accelerated 3D rendering
- **Advanced Materials** - MeshStandardMaterial, MeshPhysicalMaterial with transmission
- **Dynamic Lighting** - Directional lights, spotlights, rim lights, and accent lighting
- **Realistic Shadows** - PCF soft shadow mapping (2048x2048)
- **Tone Mapping** - ACES Filmic for cinematic look
- **Fog Effects** - Atmospheric depth

### Animations
- **GSAP ScrollTrigger** - Scroll-based 3D transformations
- **Smooth Scrubbing** - Animations tied to scroll position
- **Particle Systems** - 950+ particles with physics simulation
- **Cinematic Camera** - Dynamic camera movements
- **Stagger Effects** - Sequential card reveals
- **3D Rotations** - Smooth perspective transforms

### Visual Effects
- **Holographic Displays** - Transparent materials with clearcoat
- **Glowing Elements** - Emissive materials and additive blending
- **Floating Icons** - Animated creator symbols (camera, brush, code, music)
- **Confetti Particles** - Falling celebration effects
- **Light Beams** - Vertical spotlight columns
- **Metallic Surfaces** - Realistic metalness/roughness workflow

## 🚀 Technology Stack

- **HTML5** - Semantic structure
- **CSS3** - Custom properties, animations, responsive design
- **JavaScript (ES6+)** - Modern syntax and features
- **Three.js r128** - 3D graphics library
- **GSAP 3.12.5** - Animation library
- **ScrollTrigger** - Scroll-based animation plugin
- **WebGL** - GPU-accelerated rendering

## 📁 Project Structure

```
createathon-studio/
├── index.html          # Main HTML with canvas elements
├── style.css           # Premium CSS styling
├── 3d-scene.js         # Three.js 3D models & GSAP animations
├── script.js           # Additional interactive features
└── README.md           # Documentation
```

## 🎯 Key Sections

### Hero Section
- **3D Creator Platform** with metallic base and glowing ring
- **Holographic Display** with transmission effects
- **Floating Creator Icons** (camera, brush, code brackets, music note)
- **650 Particles** across 3 layers with physics
- **Professional Lighting** setup with key, fill, and rim lights

### Showcase Section
- **Competition Stage** with sophisticated podiums
- **1st/2nd/3rd Place** podiums with glowing tops
- **500 Confetti Particles** with realistic falling physics
- **Spotlights** targeting each podium
- **Light Beams** extending upward

### About Section
- **4 Feature Cards** with 3D tilt effects
- **Scroll-triggered Animations** with stagger
- **Gradient Icons** and premium styling

### Benefits Section
- **4 Benefit Cards** with image sweep effects
- **3D Rotation** on scroll reveal
- **Hover Interactions** with smooth transitions

## 🎬 Animation Highlights

### Scroll-Based 3D Transforms
```javascript
// Hero platform transforms as you scroll
- Moves down 3 units
- Rotates 1080° (3 full rotations)
- Scales from 1.0 to 0.4
- Camera zooms out
```

### Particle Physics
```javascript
// 950+ particles with velocity-based movement
- Wrapping boundaries
- Multi-layer rotation
- Additive blending for glow
- Color-coded by type
```

### GSAP ScrollTrigger
```javascript
// Smooth scrubbing tied to scroll
- scrub: 1.5-2 for cinematic feel
- power4.out easing
- Stagger delays: 0.12-0.2s
```

## 🌟 Professional Features

- ✓ **Cinematic Tone Mapping** - ACES Filmic
- ✓ **Soft Shadows** - PCF shadow mapping
- ✓ **Metallic Materials** - PBR workflow
- ✓ **Transmission Effects** - Glass-like surfaces
- ✓ **Emissive Glow** - Self-illuminating materials
- ✓ **Fog Atmosphere** - Exponential fog
- ✓ **Responsive Design** - Mobile-friendly
- ✓ **60fps Rendering** - Smooth performance

## 💻 Installation & Usage

### Option 1: Direct File Opening
Simply open `index.html` in a modern web browser.

### Option 2: Local Server (Recommended)
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## 🎨 Customization

### Change Colors
Edit CSS custom properties in `style.css`:
```css
:root {
    --color-primary: #8b5cf6;      /* Purple */
    --color-secondary: #06b6d4;    /* Cyan */
    --color-accent: #ec4899;       /* Pink */
}
```

### Modify 3D Models
Edit materials in `3d-scene.js`:
```javascript
const material = new THREE.MeshStandardMaterial({
    color: 0x8b5cf6,
    metalness: 0.9,
    roughness: 0.2
});
```

### Adjust Animation Speed
Edit GSAP duration:
```javascript
gsap.to(element, {
    duration: 1.2,  // Change speed
    ease: 'power4.out'
});
```

## 📊 Browser Compatibility

- ✓ Chrome/Edge (Recommended)
- ✓ Firefox
- ✓ Safari
- ✓ Mobile browsers with WebGL support

**Requirements:**
- WebGL-enabled browser
- JavaScript enabled
- Hardware acceleration recommended

## 🎓 Performance

- **Pixel Ratio Capping**: `Math.min(devicePixelRatio, 2)`
- **Shadow Map Size**: 2048x2048 for quality/performance balance
- **Particle Count**: 950 total (optimized for 60fps)
- **RequestAnimationFrame**: Smooth rendering loop
- **GSAP Scrubbing**: Efficient scroll-based animations

## 📝 License

This project is open source and available for educational and commercial use.

## 🙏 Credits

- **Inspiration**: Jesko Jets website
- **3D Library**: Three.js
- **Animation**: GSAP & ScrollTrigger
- **Fonts**: Google Fonts (Inter, Outfit)

## 🚀 Live Demo

Open `index.html` to experience:
- Scroll through the hero section to see the platform transform
- Watch the competition podiums slide into view
- Hover over cards for 3D tilt effects
- Observe 950+ particles floating and falling

---

**Built with Three.js, GSAP, and passion for creators worldwide** 💜

For questions or contributions, please open an issue or submit a pull request.
