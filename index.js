const damping = 1;

let particles = [];
let constraints = [];
let colors;

function setup(){
    createCanvas(windowWidth-15, windowHeight-20);
    background(220);
    colors = [
        createVector(255, 0, 0),      // Red
        createVector(0, 255, 0),      // Green
        createVector(0, 0, 255),      // Blue
        createVector(255, 255, 0),    // Yellow
        createVector(0, 255, 255),    // Cyan
        createVector(255, 0, 255),    // Magenta
        createVector(255, 165, 0),    // Orange
        createVector(255, 255, 255),  // White
        createVector(128, 0, 128),    // Purple
        createVector(0, 255, 128),     // Aqua Green
    ];
    const numParticles = 300;
    // Create particles at random positions with random velocities, no acceleration
    for (let i = 0; i < numParticles; i++) {
        let x = random(width);
        let y = random(height);
        let vx = random(-5, 5);
        let vy = random(-5, 5);
        particles.push(new Particle(createVector(x, y), createVector(vx, vy), createVector(0, 0), 90, createVector(141, 63, 95)));
    }

}
function draw(){
    background(71, 0, 4, 10);
    noStroke();
    for(particle of particles){
        particle.update();
        particle.bound();
        particle.draw();
    }
    for(constraint of constraints){
        constraint.apply();
    }
}

class Particle {
    constructor(pos, vel, acc, size, color){
        this.pos = pos ?? createVector(0, 0);
        this.vel = vel ?? createVector(0, 0);
        this.acc = acc ?? createVector(0, 0);
        this.size = size ?? 10;
        this.color = color ?? createVector(random(255), random(255), random(255));
    }
    applyForce(totalForce){
        this.acc= totalForce.copy();
    }

    update(){
        this.vel.add(this.acc);
        this.pos.add(this.vel);
    }
    bound() {
        if (this.pos.x < 0) {
            this.pos.x = 0;
            this.vel.x *= -1 * damping;
        } else if (this.pos.x > width) {
            this.pos.x = width;
            this.vel.x *= -1 * damping;
        }

        if (this.pos.y < 0) {
            this.pos.y = 0;
            this.vel.y *= -1 * damping;
        } else if (this.pos.y > height) {
            this.pos.y = height;
            this.vel.y *= -1 * damping;
        }
    }
    draw(){
        fill(this.color.x, this.color.y, this.color.z);
        circle(this.pos.x, this.pos.y, this.size);
    }
}

class Contraint {
    constructor(particleA, particleB, length){
        this.particleA = particleA;
        this.particleB = particleB;
        this.length = length ?? 100;
    }
    apply(){
        let delta = p5.Vector.sub(this.particleB.pos, this.particleA.pos);
        let dist = delta.mag();
        let diff = (dist - this.length)/dist;

        let correction = delta.copy().mult(diff * 0.5);
        this.particleA.pos.add(correction);
        this.particleB.pos.sub(correction);
    }
}