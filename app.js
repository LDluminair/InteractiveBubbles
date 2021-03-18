const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

var mouse ={
  x: undefined,
  y: undefined
}

var maxRadius = 40;
var minRadius = Math.random() * 3 + 1;;

window.addEventListener("mousemove", function(event){
  mouse.x = event.x;
  mouse.y = event.y;

})

window.addEventListener('resize', function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
})

function Circle(cx, cy, dx, dy, radius, r, fr, g, fg, b, fb) {
  this.cx = cx;
  this.cy = cy;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = minRadius;
  this.maxRadius = maxRadius;
  this.r = r;
  this.g = g;
  this.b = b;
  this.fr = fr;
  this.fg = fg;
  this.fb = fb;

  this.draw = function() {
    c.beginPath();
    c.arc(this.cx, this.cy, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = "rgba(" + this.r + "," + this.g + "," + this.b + ", .8)"
    c.fillStyle = "rgba(" + this.fr + "," + this.fg + "," + this.fb + ", 1)"
    c.stroke();
    c.fill();
  }
  this.update = function() {
    if (this.cx - this.radius < 0 || this.cx + this.radius > innerWidth) {
      this.dx = -this.dx

    }
    if (this.cy - this.radius < 0 || this.cy + this.radius > innerHeight) {
      this.dy = -this.dy

    }
    this.cx += this.dx
    this.cy += this.dy

    //interactivity

    if (mouse.x - this.cx < 50 && mouse.x - this.cx > -50
        && mouse.y - this.cy < 50 && mouse.y - this.cy > -50){
          if(this.radius < this.maxRadius){
              this.radius += 1
          }

    }
    else if(this.radius > this.minRadius){
      this.radius -= 1
    }


    this.draw();
  }
}

var circleArray = [];


function init(){
  circleArray = [];

  for(var i = 0; i < 800; i++){
    var radius = Math.random() * 3 + 1;
    var dx = (Math.random() - .5) * 2;
    var dy = (Math.random() - .5) * 2;
    var cx = Math.random() * (window.innerWidth - radius * 2) + radius
    var cy = Math.random() * (window.innerHeight - radius * 2) + radius
    var r = Math.random() * 255
    var g = Math.random() * 255
    var b = Math.random() * 255
    var fr = Math.random() * 255
    var fg = Math.random() * 255
    var fb = Math.random() * 255

    circleArray.push(new Circle(cx, cy, dx, dy, radius, r, fr, g, fg, b, fb));

  }
}
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight)

for( i = 0; i < circleArray.length; i++){
  circleArray[i].update();
}}

animate()
init()
