var canvas = document.getElementById("ahorcado");
var pincel = canvas.getContext("2d");
var word = document.getElementById("divword");

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
  pincel.setLineDash([]);
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
  pincel.beginPath();
  pincel.arc(500, 200, 50, 0, 2 * Math.PI, false);
  pincel.stroke();
}

function body() {
  pincel.beginPath();
  pincel.strokeStyle = "black";
  pincel.moveTo(500, 250);
  pincel.lineTo(500, 400);
  pincel.stroke();
}

function legLeft() {
  pincel.beginPath();
  pincel.strokeStyle = "black";
  pincel.moveTo(500, 397);
  pincel.lineTo(450, 550);
  pincel.stroke();
}

function legRight() {
  pincel.beginPath();
  pincel.strokeStyle = "black";
  pincel.moveTo(500, 397);
  pincel.lineTo(550, 550);
  pincel.stroke();
}

function armLeft() {
  pincel.beginPath();
  pincel.strokeStyle = "black";
  pincel.moveTo(500, 290);
  pincel.lineTo(420, 360);
  pincel.stroke();
}

function armRight() {
  pincel.beginPath();
  pincel.strokeStyle = "black";
  pincel.moveTo(500, 290);
  pincel.lineTo(580, 360);
  pincel.stroke();
}

function removeHanged() {
  pincel.clearRect(0, 0, canvas.width, canvas.height);
}
