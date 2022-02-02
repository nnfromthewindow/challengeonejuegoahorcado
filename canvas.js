var canvas = document.getElementById("ahorcado");
var pincel = canvas.getContext("2d");

function drawHang() {
  let ancholinea = 7;

  function drawBase() {
    pincel.beginPath();
    pincel.moveTo(50, 600);
    pincel.lineTo(350, 600);
    pincel.lineTo(200, 550);
    pincel.closePath();
    pincel.fillStyle = "black";
    pincel.fill();
  }
  drawBase();

  pincel.beginPath();
  pincel.strokeStyle = "black";
  pincel.moveTo(200, 560);
  pincel.lineTo(200, 100);
  pincel.lineTo(500, 100);
  pincel.lineTo(500, 150);
  pincel.lineWidth = ancholinea;
  pincel.stroke();
}

function head() {
  pincel.moveTo(500, 150);
  pincel.beginPath();
  pincel.arc(60, 60, 50, 0, 2 * Math.PI, false);
  pincel.fill();
}

function body() {}

function legLeft() {}

function legRight() {}

function armLeft() {}

function armRight() {}

drawHang();
head();
body();
legLeft();
legRight();
armLeft();
armRight();
