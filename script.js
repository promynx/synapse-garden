const canvas = document.getElementById('garden');
const ctx = canvas.getContext('2d');
function resize(){ canvas.width = innerWidth; canvas.height = innerHeight; }
window.addEventListener('resize', resize); resize();

let organisms = [];
function random(min,max){ return Math.random()*(max-min)+min; }

class Organism {
  constructor(x, y, color, type){
    this.x = x; this.y = y; this.color = color; this.type = type;
    this.size = random(5, 15);
    this.life = 1;
    this.dx = random(-0.5, 0.5);
    this.dy = random(-0.5, 0.5);
  }
  draw(){
    ctx.globalAlpha = this.life;
    ctx.fillStyle = this.color;
    if (this.type === 'circle'){
      ctx.beginPath();
      ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
      ctx.fill();
    } else if (this.type === 'square'){
      ctx.fillRect(this.x-this.size/2,this.y-this.size/2,this.size,this.size);
    }
    ctx.globalAlpha = 1;
  }
  update(){
    this.x += this.dx; this.y += this.dy;
    this.life -= 0.002;
    this.size += 0.02;
  }
}

function loop(){
  ctx.fillStyle = 'rgba(0,0,0,0.1)';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  organisms.forEach(o => { o.update(); o.draw(); });
  organisms = organisms.filter(o => o.life > 0);
  requestAnimationFrame(loop);
}
loop();

function plant(x,y,type){
  const hue = (Date.now()/10) % 360;
  const color = `hsl(${hue},80%,60%)`;
  organisms.push(new Organism(x,y,color,type));
}

canvas.addEventListener('click', e => plant(e.clientX, e.clientY, 'circle'));
canvas.addEventListener('mousemove', e => {
  if (Math.random() < 0.05) plant(e.clientX, e.clientY, 'square');
});
document.addEventListener('keydown', e => {
  if (Math.random() < 0.3) plant(random(0,canvas.width), random(0,canvas.height), 'circle');
});
setInterval(() => plant(random(0,canvas.width), random(0,canvas.height), 'square'), 5000);
