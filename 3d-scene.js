// ===================================
// PROFESSIONAL THREE.JS 3D SETUP
// ===================================

// Hero 3D Scene
let heroScene, heroCamera, heroRenderer, heroMesh, heroComposer;
let showcaseScene, showcaseCamera, showcaseRenderer, showcaseMesh;
let clock = new THREE.Clock();

function initHero3D() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    // Scene setup
    heroScene = new THREE.Scene();
    heroScene.fog = new THREE.FogExp2(0x0a0a0f, 0.05);

    // Camera with cinematic settings
    heroCamera = new THREE.PerspectiveCamera(
        45,  // Narrower FOV for more cinematic feel
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    heroCamera.position.set(0, 2, 10);
    heroCamera.lookAt(0, 0, 0);

    // Renderer with advanced settings
    heroRenderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
    });
    heroRenderer.setSize(window.innerWidth, window.innerHeight);
    heroRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    heroRenderer.shadowMap.enabled = true;
    heroRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
    heroRenderer.toneMapping = THREE.ACESFilmicToneMapping;
    heroRenderer.toneMappingExposure = 1.2;

    // Create sophisticated 3D Creator Platform
    const platformGroup = new THREE.Group();

    // Main platform base with metallic material
    const platformGeometry = new THREE.CylinderGeometry(3, 3.5, 0.5, 64);
    const platformMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1a24,
        metalness: 0.9,
        roughness: 0.2,
        envMapIntensity: 1.5
    });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.position.y = -2;
    platform.castShadow = true;
    platform.receiveShadow = true;
    platformGroup.add(platform);

    // Add glowing ring around platform
    const ringGeometry = new THREE.TorusGeometry(3.2, 0.08, 16, 100);
    const ringMaterial = new THREE.MeshStandardMaterial({
        color: 0x8b5cf6,
        emissive: 0x8b5cf6,
        emissiveIntensity: 2,
        metalness: 1,
        roughness: 0.1
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.position.y = -1.75;
    ring.rotation.x = Math.PI / 2;
    platformGroup.add(ring);

    // Central holographic display
    const displayGeometry = new THREE.CylinderGeometry(1.5, 1.5, 3, 32, 1, true);
    const displayMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x06b6d4,
        emissive: 0x06b6d4,
        emissiveIntensity: 1.5,
        transparent: true,
        opacity: 0.3,
        metalness: 0.1,
        roughness: 0.1,
        transmission: 0.9,
        thickness: 0.5,
        clearcoat: 1,
        clearcoatRoughness: 0.1
    });
    const display = new THREE.Mesh(displayGeometry, displayMaterial);
    display.position.y = -0.5;
    platformGroup.add(display);

    // Floating creator icons (geometric shapes)
    const iconGroup = new THREE.Group();

    // Camera icon (for video creators)
    const cameraBody = new THREE.BoxGeometry(0.6, 0.4, 0.3);
    const cameraMaterial = new THREE.MeshStandardMaterial({
        color: 0xec4899,
        emissive: 0xec4899,
        emissiveIntensity: 0.5,
        metalness: 0.8,
        roughness: 0.2
    });
    const camera = new THREE.Mesh(cameraBody, cameraMaterial);
    camera.position.set(2, 1, 0);
    iconGroup.add(camera);

    // Brush icon (for artists)
    const brushHandle = new THREE.CylinderGeometry(0.05, 0.05, 1, 16);
    const brushMaterial = new THREE.MeshStandardMaterial({
        color: 0x8b5cf6,
        emissive: 0x8b5cf6,
        emissiveIntensity: 0.5,
        metalness: 0.7,
        roughness: 0.3
    });
    const brush = new THREE.Mesh(brushHandle, brushMaterial);
    brush.position.set(-2, 1, 0);
    brush.rotation.z = Math.PI / 4;
    iconGroup.add(brush);

    // Code brackets (for developers)
    const bracketShape = new THREE.Shape();
    bracketShape.moveTo(0, 0.5);
    bracketShape.lineTo(0.2, 0.5);
    bracketShape.lineTo(0.2, 0.4);
    bracketShape.lineTo(0.1, 0.4);
    bracketShape.lineTo(0.1, -0.4);
    bracketShape.lineTo(0.2, -0.4);
    bracketShape.lineTo(0.2, -0.5);
    bracketShape.lineTo(0, -0.5);

    const bracketGeometry = new THREE.ExtrudeGeometry(bracketShape, {
        depth: 0.1,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.02
    });
    const bracketMaterial = new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        emissive: 0x06b6d4,
        emissiveIntensity: 0.5,
        metalness: 0.8,
        roughness: 0.2
    });
    const bracket = new THREE.Mesh(bracketGeometry, bracketMaterial);
    bracket.position.set(0, 1.5, 2);
    iconGroup.add(bracket);

    // Music note (for musicians)
    const noteGeometry = new THREE.SphereGeometry(0.15, 32, 32);
    const noteMaterial = new THREE.MeshStandardMaterial({
        color: 0xec4899,
        emissive: 0xec4899,
        emissiveIntensity: 0.5,
        metalness: 0.9,
        roughness: 0.1
    });
    const note = new THREE.Mesh(noteGeometry, noteMaterial);
    note.position.set(0, 1.5, -2);
    iconGroup.add(note);

    platformGroup.add(iconGroup);

    // Advanced particle system with multiple types
    const createParticleSystem = (count, size, color, speed) => {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const velocities = new Float32Array(count * 3);

        for (let i = 0; i < count * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 15;
            positions[i + 1] = (Math.random() - 0.5) * 15;
            positions[i + 2] = (Math.random() - 0.5) * 15;

            velocities[i] = (Math.random() - 0.5) * speed;
            velocities[i + 1] = (Math.random() - 0.5) * speed;
            velocities[i + 2] = (Math.random() - 0.5) * speed;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

        const material = new THREE.PointsMaterial({
            size: size,
            color: color,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            sizeAttenuation: true
        });

        return new THREE.Points(geometry, material);
    };

    // Multiple particle layers
    const particles1 = createParticleSystem(300, 0.03, 0x8b5cf6, 0.02);
    const particles2 = createParticleSystem(200, 0.05, 0x06b6d4, 0.015);
    const particles3 = createParticleSystem(150, 0.02, 0xec4899, 0.025);

    heroScene.add(particles1);
    heroScene.add(particles2);
    heroScene.add(particles3);

    heroMesh = platformGroup;
    heroScene.add(heroMesh);

    // Professional lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    heroScene.add(ambientLight);

    // Key light
    const keyLight = new THREE.DirectionalLight(0x8b5cf6, 2);
    keyLight.position.set(5, 10, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 50;
    heroScene.add(keyLight);

    // Fill light
    const fillLight = new THREE.DirectionalLight(0x06b6d4, 1);
    fillLight.position.set(-5, 5, -5);
    heroScene.add(fillLight);

    // Rim light
    const rimLight = new THREE.PointLight(0xec4899, 3, 20);
    rimLight.position.set(0, 5, -8);
    heroScene.add(rimLight);

    // Accent lights
    const accentLight1 = new THREE.PointLight(0x8b5cf6, 2, 15);
    accentLight1.position.set(5, 2, 5);
    heroScene.add(accentLight1);

    const accentLight2 = new THREE.PointLight(0x06b6d4, 2, 15);
    accentLight2.position.set(-5, 2, -5);
    heroScene.add(accentLight2);

    // Store particle systems for animation
    heroMesh.userData.particles = [particles1, particles2, particles3];
    heroMesh.userData.icons = iconGroup;
}

function initShowcase3D() {
    const canvas = document.getElementById('showcase-canvas');
    if (!canvas) return;

    const showcaseSection = document.querySelector('.showcase');
    const rect = showcaseSection.getBoundingClientRect();

    // Scene setup
    showcaseScene = new THREE.Scene();
    showcaseScene.fog = new THREE.FogExp2(0x0a0a0f, 0.03);

    // Camera
    showcaseCamera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / rect.height,
        0.1,
        1000
    );
    showcaseCamera.position.set(0, 5, 12);
    showcaseCamera.lookAt(0, 0, 0);

    // Renderer
    showcaseRenderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
    });
    showcaseRenderer.setSize(window.innerWidth, rect.height);
    showcaseRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    showcaseRenderer.shadowMap.enabled = true;
    showcaseRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
    showcaseRenderer.toneMapping = THREE.ACESFilmicToneMapping;
    showcaseRenderer.toneMappingExposure = 1.2;

    // Create professional competition stage
    const stageGroup = new THREE.Group();

    // Main stage platform
    const stageGeometry = new THREE.BoxGeometry(12, 0.3, 8);
    const stageMaterial = new THREE.MeshStandardMaterial({
        color: 0x13131a,
        metalness: 0.8,
        roughness: 0.3
    });
    const stage = new THREE.Mesh(stageGeometry, stageMaterial);
    stage.position.y = -2;
    stage.receiveShadow = true;
    stageGroup.add(stage);

    // Create sophisticated podiums
    const createPodium = (height, color, xPos, place) => {
        const group = new THREE.Group();

        // Podium base
        const baseGeometry = new THREE.BoxGeometry(2, height, 2);
        const baseMaterial = new THREE.MeshStandardMaterial({
            color: color,
            emissive: color,
            emissiveIntensity: 0.3,
            metalness: 0.9,
            roughness: 0.1
        });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.castShadow = true;
        base.receiveShadow = true;
        group.add(base);

        // Glowing top
        const topGeometry = new THREE.BoxGeometry(2.1, 0.1, 2.1);
        const topMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            emissive: color,
            emissiveIntensity: 1.5,
            metalness: 1,
            roughness: 0
        });
        const top = new THREE.Mesh(topGeometry, topMaterial);
        top.position.y = height / 2 + 0.05;
        group.add(top);

        // Place number
        const numberGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 32);
        const numberMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            emissive: 0xffffff,
            emissiveIntensity: 2,
            metalness: 0.5,
            roughness: 0.2
        });
        const number = new THREE.Mesh(numberGeometry, numberMaterial);
        number.position.y = height / 2 + 0.5;
        group.add(number);

        // Vertical light beam
        const beamGeometry = new THREE.CylinderGeometry(0.05, 0.05, 5, 16);
        const beamMaterial = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.6
        });
        const beam = new THREE.Mesh(beamGeometry, beamMaterial);
        beam.position.y = height / 2 + 2.5;
        group.add(beam);

        group.position.set(xPos, height / 2 - 2, 0);
        return group;
    };

    // 1st place (center, tallest, pink)
    const firstPlace = createPodium(4, 0xec4899, 0, 1);
    stageGroup.add(firstPlace);

    // 2nd place (left, medium, purple)
    const secondPlace = createPodium(3, 0x8b5cf6, -3.5, 2);
    stageGroup.add(secondPlace);

    // 3rd place (right, shortest, cyan)
    const thirdPlace = createPodium(2.2, 0x06b6d4, 3.5, 3);
    stageGroup.add(thirdPlace);

    // Add confetti particles
    const confettiGeometry = new THREE.BufferGeometry();
    const confettiCount = 500;
    const confettiPositions = new Float32Array(confettiCount * 3);
    const confettiColors = new Float32Array(confettiCount * 3);

    const colors = [
        new THREE.Color(0xec4899),
        new THREE.Color(0x8b5cf6),
        new THREE.Color(0x06b6d4)
    ];

    for (let i = 0; i < confettiCount * 3; i += 3) {
        confettiPositions[i] = (Math.random() - 0.5) * 20;
        confettiPositions[i + 1] = Math.random() * 10 + 5;
        confettiPositions[i + 2] = (Math.random() - 0.5) * 20;

        const color = colors[Math.floor(Math.random() * colors.length)];
        confettiColors[i] = color.r;
        confettiColors[i + 1] = color.g;
        confettiColors[i + 2] = color.b;
    }

    confettiGeometry.setAttribute('position', new THREE.BufferAttribute(confettiPositions, 3));
    confettiGeometry.setAttribute('color', new THREE.BufferAttribute(confettiColors, 3));

    const confettiMaterial = new THREE.PointsMaterial({
        size: 0.08,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending
    });

    const confetti = new THREE.Points(confettiGeometry, confettiMaterial);
    showcaseScene.add(confetti);

    showcaseMesh = stageGroup;
    showcaseMesh.userData.confetti = confetti;
    showcaseScene.add(showcaseMesh);

    // Professional lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    showcaseScene.add(ambientLight);

    // Spotlights for each podium
    const createSpotlight = (color, target) => {
        const spotlight = new THREE.SpotLight(color, 3, 30, Math.PI / 6, 0.5, 2);
        spotlight.position.set(target.x, 10, target.z + 5);
        spotlight.target.position.copy(target);
        spotlight.castShadow = true;
        spotlight.shadow.mapSize.width = 1024;
        spotlight.shadow.mapSize.height = 1024;
        showcaseScene.add(spotlight);
        showcaseScene.add(spotlight.target);
        return spotlight;
    };

    createSpotlight(0xec4899, new THREE.Vector3(0, 0, 0));
    createSpotlight(0x8b5cf6, new THREE.Vector3(-3.5, 0, 0));
    createSpotlight(0x06b6d4, new THREE.Vector3(3.5, 0, 0));

    // Rim lights
    const rimLight1 = new THREE.PointLight(0x8b5cf6, 2, 20);
    rimLight1.position.set(-8, 3, -5);
    showcaseScene.add(rimLight1);

    const rimLight2 = new THREE.PointLight(0x06b6d4, 2, 20);
    rimLight2.position.set(8, 3, -5);
    showcaseScene.add(rimLight2);
}

// Advanced animation loop
function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const elapsed = clock.getElapsedTime();

    if (heroMesh && heroRenderer && heroScene && heroCamera) {
        // Smooth platform rotation
        heroMesh.rotation.y += 0.002;

        // Animate floating icons
        if (heroMesh.userData.icons) {
            const icons = heroMesh.userData.icons.children;
            icons.forEach((icon, index) => {
                icon.position.y += Math.sin(elapsed * 2 + index) * 0.01;
                icon.rotation.y += 0.01;
            });
        }

        // Animate particles
        if (heroMesh.userData.particles) {
            heroMesh.userData.particles.forEach((particles, index) => {
                particles.rotation.y += 0.001 * (index + 1);
                particles.rotation.x += 0.0005 * (index + 1);

                // Update particle positions
                const positions = particles.geometry.attributes.position.array;
                const velocities = particles.geometry.attributes.velocity.array;

                for (let i = 0; i < positions.length; i += 3) {
                    positions[i] += velocities[i] * delta;
                    positions[i + 1] += velocities[i + 1] * delta;
                    positions[i + 2] += velocities[i + 2] * delta;

                    // Wrap around
                    if (Math.abs(positions[i]) > 7.5) velocities[i] *= -1;
                    if (Math.abs(positions[i + 1]) > 7.5) velocities[i + 1] *= -1;
                    if (Math.abs(positions[i + 2]) > 7.5) velocities[i + 2] *= -1;
                }

                particles.geometry.attributes.position.needsUpdate = true;
            });
        }

        heroRenderer.render(heroScene, heroCamera);
    }

    if (showcaseMesh && showcaseRenderer && showcaseScene && showcaseCamera) {
        // Gentle stage rotation
        showcaseMesh.rotation.y += 0.001;

        // Animate confetti falling
        if (showcaseMesh.userData.confetti) {
            const confetti = showcaseMesh.userData.confetti;
            const positions = confetti.geometry.attributes.position.array;

            for (let i = 0; i < positions.length; i += 3) {
                positions[i + 1] -= delta * 2; // Fall down
                positions[i] += Math.sin(elapsed + i) * delta * 0.5; // Drift

                // Reset if too low
                if (positions[i + 1] < -5) {
                    positions[i + 1] = 15;
                }
            }

            confetti.geometry.attributes.position.needsUpdate = true;
            confetti.rotation.y += 0.002;
        }

        showcaseRenderer.render(showcaseScene, showcaseCamera);
    }
}

// Handle window resize
window.addEventListener('resize', () => {
    if (heroCamera && heroRenderer) {
        heroCamera.aspect = window.innerWidth / window.innerHeight;
        heroCamera.updateProjectionMatrix();
        heroRenderer.setSize(window.innerWidth, window.innerHeight);
    }

    if (showcaseCamera && showcaseRenderer) {
        const showcaseSection = document.querySelector('.showcase');
        if (showcaseSection) {
            const rect = showcaseSection.getBoundingClientRect();
            showcaseCamera.aspect = window.innerWidth / rect.height;
            showcaseCamera.updateProjectionMatrix();
            showcaseRenderer.setSize(window.innerWidth, rect.height);
        }
    }
});

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initHero3D();
        initShowcase3D();
        animate();
        initGSAPAnimations();
    }, 100);
});

// ===================================
// GSAP SCROLL-TRIGGERED ANIMATIONS
// ===================================
function initGSAPAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger not loaded');
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Hero 3D model scroll animation
    if (heroMesh) {
        gsap.to(heroMesh.position, {
            y: -3,
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1.5
            }
        });

        gsap.to(heroMesh.rotation, {
            y: Math.PI * 3,
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1.5
            }
        });

        gsap.to(heroMesh.scale, {
            x: 0.4,
            y: 0.4,
            z: 0.4,
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1.5
            }
        });

        gsap.to(heroCamera.position, {
            z: 15,
            y: 5,
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 2
            }
        });
    }

    // Showcase 3D model scroll animation
    if (showcaseMesh) {
        gsap.fromTo(showcaseMesh.position,
            { y: 3, x: -8, z: -5 },
            {
                y: 0,
                x: 0,
                z: 0,
                scrollTrigger: {
                    trigger: '.showcase',
                    start: 'top bottom',
                    end: 'center center',
                    scrub: 2
                }
            }
        );

        gsap.fromTo(showcaseMesh.rotation,
            { y: -Math.PI * 1.5, x: Math.PI / 4 },
            {
                y: 0,
                x: 0,
                scrollTrigger: {
                    trigger: '.showcase',
                    start: 'top bottom',
                    end: 'center center',
                    scrub: 2
                }
            }
        );

        gsap.fromTo(showcaseMesh.scale,
            { x: 0.5, y: 0.5, z: 0.5 },
            {
                x: 1,
                y: 1,
                z: 1,
                scrollTrigger: {
                    trigger: '.showcase',
                    start: 'top bottom',
                    end: 'center center',
                    scrub: 2
                }
            }
        );
    }

    // Feature cards with 3D transforms
    gsap.from('.feature-card', {
        y: 120,
        opacity: 0,
        rotationY: -45,
        scale: 0.7,
        duration: 1.2,
        stagger: {
            each: 0.15,
            from: 'start'
        },
        ease: 'power4.out',
        scrollTrigger: {
            trigger: '.features-grid',
            start: 'top 75%',
            toggleActions: 'play none none none'
        }
    });

    // Benefit cards with rotation
    gsap.from('.benefit-card', {
        y: 100,
        opacity: 0,
        rotationX: -60,
        scale: 0.8,
        duration: 1.3,
        stagger: 0.12,
        ease: 'power4.out',
        scrollTrigger: {
            trigger: '.benefits-grid',
            start: 'top 75%',
            toggleActions: 'play none none none'
        }
    });

    // Section titles with sophisticated entrance
    const sectionTitles = document.querySelectorAll('.section-title, .showcase-title, .global-title');
    sectionTitles.forEach(title => {
        gsap.from(title, {
            y: 80,
            opacity: 0,
            scale: 0.85,
            rotationX: -20,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });

    console.log('🎬 Professional GSAP animations initialized');
}

console.log('🎨 Professional Three.js 3D scenes initialized');
console.log('💜 Createathon Studio - Premium 3D Experience');
