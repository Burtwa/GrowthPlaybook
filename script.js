// script.js

const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 100; // INCREASED: More particles
const particleColor = 'rgba(255, 255, 255, 0.5)'; 
const maxRadius = 2.5; // INCREASED: Larger max size

// Utility function for random number in range
function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

// Particle Class
class Particle {
    constructor() {
        this.x = randomRange(0, canvas.width);
        this.y = randomRange(0, canvas.height);
        this.radius = randomRange(0.75, maxRadius); // Adjusted min size to 0.75
        // Subtle, slow movement: extremely small velocity values
        this.vx = randomRange(-0.05, 0.05); 
        this.vy = randomRange(-0.05, 0.05); 
        this.opacity = randomRange(0.1, 0.5); // INCREASED: Higher max opacity
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // Set fill style using the particle's calculated opacity
        ctx.fillStyle = particleColor.replace('0.5', this.opacity); 
        ctx.fill();
    }

    update() {
        // Move particle by its velocity
        this.x += this.vx;
        this.y += this.vy;

        // Boundary checking: wrap particles around the screen
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        this.draw();
    }
}

// Initialization function
function init() {
    // Set canvas dimensions to match the window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    particles = [];
    // Populate the particles array
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    // Clear the canvas each frame
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    particles.forEach(p => {
        p.update();
    });
}

// Handle window resizing to keep the effect full-screen
window.addEventListener('resize', init);

// Start the effect
init();
animate();