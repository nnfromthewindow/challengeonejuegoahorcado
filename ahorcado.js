drawHang();
head();
body();
legLeft();
legRight();
armLeft();
armRight();

let wordList = ["JUAN", "PERRO", "CARTA", "CHINARDO", "PELIRROJO", "AMOR"];
let random = Math.floor(Math.random() * wordList.length);
let selectedWord = wordList[random];
let wordMin = selectedWord.toLowerCase();
let palabra = document.getElementById("ulist");
let fail = document.getElementById("fails");
let initBtn = document.getElementById("iniciar-juego");
let resLft = document.getElementById("finalResultLft");
let resRgt = document.getElementById("finalResultRgt");
let failList = [];

let permitidas = [
  65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83,
  84, 85, 86, 87, 88, 89, 90,
];
let especiales = [8, 13, 16, 37, 32, 39, 46];

fail.style.opacity = 0;

function initGame() {
  for (let i = 0; i < selectedWord.length; i++) {
    let li = document.createElement("li");
    li.setAttribute("position", i);
    li.setAttribute("class", "letter");
    li.setAttribute("style", "color: rgb(0,0,0,0)");
    li.innerText = "*";
    palabra.appendChild(li);
  }
}
var hashmap = new Map();
document.onkeydown = function (e) {
  for (let i = 0; i < selectedWord.length; i++) {
    if (e.keyCode == selectedWord.charCodeAt(i)) {
      let position = document.querySelectorAll("[position]");
      position.item(i).setAttribute("style", "color: black");
      position.item(i).innerText = e.key;
      hashmap.set(i, e.key.toUpperCase());
    }
  }

  if (
    !selectedWord.includes(e.key) &&
    !wordMin.includes(e.key) &&
    permitidas.includes(e.keyCode) &&
    !failList.includes(e.key)
  ) {
    let div = document.createElement("div");
    div.innerText = e.key;
    fail.appendChild(div);
    fail.style.opacity = 100;
    if (failList.includes(e.key)) {
      return;
    }
    failList.push(e.key);
  }
  if (hashmap.size == selectedWord.length) {
    resLft.innerText = "GANASTE";
    resRgt.innerText = "GANASTE";
    console.log("GANASTEEEEEE WACHOOOOO");
  }
  if (failList.length == 6) {
    resLft.innerText = "PERDISTE";
    resRgt.innerText = "PERDISTE";
    console.log("PERDISTEEEE");
  }
};

initGame();
/*
let position = document.querySelector("[position = '0']");
let position = document.querySelector("[position], [i]")
console.log(position.innerText);
*/
