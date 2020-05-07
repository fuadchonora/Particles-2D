//canvas
let canvas = document.getElementById('particlesCanvas');
const c = canvas.getContext('2d');

//variables
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

let mouse = {
    x:0,
    y:0,
}

let colors = [
    "#FF1744",
    "#F50057",
    "##D500F9",
    "#651FFF",
    "#1DE9B6",
    "#FFC400",
    "#6D4C41",
]

let time_stamp = 0;

let obstacles = [];

//event Listeners
/**
 * A tap that occurs less than 300 ms from the last tap will trigger a double tap. This delay may be different between browsers.
 */
addEventListener("touchstart", function(event_) {
    if (event_.timeStamp - time_stamp < 300) {
        event_.preventDefault();
        return false;
    }
    time_stamp = event_.timeStamp;
});

addEventListener('mousemove', function(event){
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

//utiliy functions
function distance(x1, y1, x2, y2) {
    xDistance = x2 - x1;
    yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function randonIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Rotates coordinate system for velocities
 *
 * Takes velocities and alters them as if the coordinate system they're on was rotated
 *
 * @param  Object | velocity | The velocity of an individual particle
 * @param  Float  | angle    | The angle of collision between two objects in radians
 * @return Object | The altered x and y velocities after the coordinate system has been rotated
 */

function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}

/**
 * Swaps out two colliding particles' x and y velocities after running through
 * an elastic collision reaction equation
 *
 * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
 * @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
 * @return Null | Does not return a value
 */

function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}

//Objects
function Circle(x, y, radious, color){
    this.x = x;
    this.y = y;
    this.velocity = {
        x: (Math.random() - 0.5) * 3,
        y: (Math.random() - 0.5) * 3,
        opacity: 0.02,
    };
    this.mass = 1;
    this.radious = radious;
    this.color = color;
    this.opacity = 0;

    this.update = obstacles => {
        this.draw();

        for(let i = 0; i < obstacles.length; i++){

            if(this === obstacles[i]) continue;

            if(distance(this.x, this.y, obstacles[i].x, obstacles[i].y) - this.radious * 2 < 0){
                resolveCollision(this, obstacles[i])
            }
        }

        if(this.x - this.radious <= 0 || this.x + this.radious >= canvas.width){
            this.velocity.x = -this.velocity.x;
        }
        if(this.y - this.radious <= 0 || this.y + this.radious >= canvas.height){
            this.velocity.y = -this.velocity.y;
        }

        //mouse collision detection
        if(distance(mouse.x, mouse.y, this.x, this.y) < 100){
            this.opacity += this.velocity.opacity;
        }else {
            if(this.opacity >= this.velocity.opacity) this.opacity -= this.velocity.opacity;
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radious, 0, Math.PI * 2, false);
        c.save();
        c.globalAlpha = this.opacity;
        c.fillStyle = this.color;
        c.fill();
        c.restore();
        c.strokeStyle = this.color;
        c.stroke();
        c.closePath();
    }
}

//Implimentation
function init(){
    canvas.width = windowWidth;
    canvas.height = windowHeight;
    for(let i = 0; i < 100; i++){
        const radious = 30;
        let x = randonIntFromRange(radious, canvas.width - radious);
        let y = randonIntFromRange(radious, canvas.height - radious);
        const color = randomColor(colors);

        if(i !== 0){
            for(let j = 0; j < obstacles.length; j++){
                if(distance(x, y, obstacles[j].x, obstacles[j].y) - radious * 2 < 0){
                    x = randonIntFromRange(radious, canvas.width - radious);
                    y = randonIntFromRange(radious, canvas.height - radious);

                    j = -1;
                }
            }
        }

        obstacles.push(new Circle(x, y, radious, color));
    }
}

//Animation Loop
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    
    obstacles.forEach(function(obstacle){
        obstacle.update(obstacles);
    })
}

//start
function start(){
    init();
    animate();
}

document.onload = start();