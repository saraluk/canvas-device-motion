var canvas = document.getElementById("circle");
var ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
var COLOR_ONE = "white";
var COLOR_TWO = "black";
var ax = 0;
var ay = 0;

window.addEventListener("load", function() {
  let loadEnd = new Date().getMilliseconds();
  console.log("loadEnd @", loadEnd);
  update();
  let renderEnd = new Date().getMilliseconds();
  console.log("renderEnd @", renderEnd);
  let renderTime = renderEnd - loadEnd;
  console.log("Render time is ", renderTime, "milliseconds");
});

//for safari, devicemotion is allowed after permission is granted
function requestT() {
  if (
    typeof DeviceMotionEvent !== "undefined" &&
    typeof DeviceMotionEvent.requestPermission === "function"
  ) {
    alert("enter");
    DeviceMotionEvent.requestPermission()
      .then(response => {
        alert("respone: " + response);
        if (response == "granted") {
          if (window.DeviceMotionEvent) {
            console.log("DeviceMotionEvent supported");
            window.addEventListener("devicemotion", deviceMotionHandler);
          }
        }
      })
      .catch(console.error);
  } else {
    alert("DeviceMotionEvent is not defined");
  }
}
document.getElementById("request").onclick = requestT;

function update() {
  var dx = ax;
  function draw(x, y, radius, numCircle, innerRadius, innerX, innerY) {
    this.x = x;
    this.y = y;
    this.numCircle = numCircle;
    this.innerRadius = innerRadius;
    this.innerX = innerX;
    this.innerY = innerY;
    this.radius = radius;
    let isWhite = true;
    for (var i = 0; i < this.numCircle; i++) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      if (isWhite) {
        ctx.fillStyle = COLOR_ONE;
        isWhite = false;
      } else {
        ctx.fillStyle = COLOR_TWO;
        isWhite = true;
      }
      ctx.fill();
      this.radius = this.radius - this.innerRadius;
      if (Math.abs(this.innerX)) {
        this.x = this.x + this.innerX;
      }
      if (Math.abs(this.innerY)) {
        this.y = this.y + this.innerY;
      }
      // if (dx !== 0.0 || dy !== 0.0) {
      //   this.x += dx;
      //   this.y += dy;
      // }
      ctx.translate(600, 520);
      ctx.rotate(Math.PI / 180 / (40 / dx));
      ctx.translate(-600, -520);
    }
  }
  draw(1270, 730, 2120, 30, 32, -25, dx);
  draw(520, 730, 1160, 10, 28, 14, -18, dx);
  draw(633, 555, 875, 8, 25, -16, 10, dx);
  draw(500, 628, 675, 8, 26, 0, -24, dx);
  draw(500, 440, 470, 8, 20, 2, 15, dx);
  draw(515, 560, 310, 8, 20, 14, -5, dx);
  draw(600, 520, 150, 8, 15, -10, 0, dx);
}

window.addEventListener("devicemotion", deviceMotionHandler);

function deviceMotionHandler(event) {
  ax = event.accelerationIncludingGravity.x;
  window.requestAnimationFrame(update);
}
