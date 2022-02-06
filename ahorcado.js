let wordList = ["JUAN", "PERRO", "CARTA", "CHINARDO", "PELIRROJO", "AMOR"];

let divLista = document.getElementById("lista");
let palabra = document.getElementById("ulist");
let fail = document.getElementById("fails");
let initBtn = document.getElementById("iniciar-juego");
let resLft = document.getElementById("finalResultLft");
let resRgt = document.getElementById("finalResultRgt");
let input = document.getElementById("input-nueva-palabra");
let addBtn = document.getElementById("agregarBtn");

let textField = false;
let failList = [];
let hashmap = new Map();

let permitidas = [
  65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83,
  84, 85, 86, 87, 88, 89, 90,
];

fail.style.opacity = 0;

function initGame() {
  resetGame();
  drawHang();
  loadWords();

  let selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
  let wordMin = selectedWord.toLowerCase();
  for (let i = 0; i < selectedWord.length; i++) {
    let li = document.createElement("li");
    li.setAttribute("position", i);
    li.setAttribute("class", "letter");
    li.setAttribute("style", "color: rgb(0,0,0,0)");
    li.innerText = "*";
    palabra.appendChild(li);
  }

  document.onkeydown = function (e) {
    if (textField == true) {
      return (e.key = "");
    }
    for (let i = 0; i < selectedWord.length; i++) {
      if (e.keyCode == selectedWord.charCodeAt(i) && failList.length < 6) {
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
      !failList.includes(e.key) &&
      failList.length < 6 &&
      hashmap.size < selectedWord.length
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
    switch (failList.length) {
      case 1:
        head();
        break;
      case 2:
        body();
        break;
      case 3:
        legLeft();
        break;
      case 4:
        legRight();
        break;
      case 5:
        armLeft();
        break;
      case 6:
        armRight();
        break;
    }
    if (hashmap.size == selectedWord.length) {
      resLft.innerText = "GANASTE";
      resRgt.innerText = "GANASTE";
    }
    if (failList.length == 6) {
      resLft.innerText = "PERDISTE";
      resRgt.innerText = "PERDISTE";
    }
  };
}

resetGame = () => {
  resLft.innerText = "";
  resRgt.innerText = "";
  palabra.innerHTML = "";
  fail.innerHTML = "";
  failList = [];
  hashmap.clear();
  fail.style.opacity = 0;
  input.value = "";
  removeHanged();
};

loadWords = () => {
  for (let i = 0; i < wordList.length; i++) {
    localStorage.setItem(i, wordList[i]);
  }
};

initBtn.addEventListener("click", initGame);

input.addEventListener("focus", function () {
  textField = true;
});

input.addEventListener("blur", function () {
  textField = false;
});

addBtn.addEventListener("click", function () {
  localStorage.setItem(localStorage.length + 1, input.value);
  input.value = "";
});
