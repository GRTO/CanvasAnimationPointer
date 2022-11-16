import "./style.css";

const canvas = document.getElementById("animationCanvas");
const ctx = canvas.getContext("2d");
const particlesArray = [];
let hue = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.fillStyle = "white";
  ctx.fillRect(10, 10, 150, 50);
});

ctx.fillStyle = "white";
ctx.fillRect(10, 10, 150, 50);
 */

// Circle
const mouse = {
  x: undefined,
  y: undefined,
};

function createParticles() {
  for (let i = 0; i < 5; i++) {
    particlesArray.push(new Particle());
  }
}

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

window.addEventListener("click", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;

  createParticles();
});

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;

  createParticles();
});

/* function drawCircle() {
  ctx.fillStyle = "red";
  ctx.strokeStyle = "red";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
  ctx.stroke();
} */

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    /* this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height; */
    this.size = Math.random() * 15 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = `hsl(${hue}, 100%, 50%)`;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) {
      this.size -= 0.1;
    }
  }

  draw() {
    ctx.fillStyle = this.color;
    /* ctx.strokeStyle = "red";
    ctx.lineWidth = 5; */
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    /* ctx.stroke(); */
  }
}

/* function init() {
  for (let i = 0; i < 100; i++) {
    particlesArray.push(new Particle());
  }
}
init(); */

function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();

    if (particlesArray[i].size <= 0.3) {
      particlesArray.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  /* ctx.clearRect(0, 0, canvas.width, canvas.height); */
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  /* drawCircle(); */
  handleParticles();
  hue++;
  requestAnimationFrame(animate);
}

animate();
