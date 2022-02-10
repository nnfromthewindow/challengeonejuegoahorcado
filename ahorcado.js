//DECLARAMOS LISTA INCORPORADA CON EL PROGRAMA
let wordList = [
  "AMOR",
  "CELULAR",
  "AUTOMATICO",
  "VELOZ",
  "CAMPERA",
  "ALURA",
  "ORACLE",
  "BICICLETA",
  "ABERTURA",
  "TECLADO",
  "GATO",
  "MURCIELAGO",
  "SALAME",
  "CERVEZA",
  "FUTBOL",
  "CAMPEON",
];
//DECLARAMOS VARIABLES
let divLista = document.getElementById("lista");
let palabra = document.getElementById("ulist");
let fail = document.getElementById("fails");
let initBtn = document.getElementById("iniciar-juego");
let resLft = document.getElementById("finalResultLft");
let resRgt = document.getElementById("finalResultRgt");
let input = document.getElementById("input-nueva-palabra");
let addBtn = document.getElementById("agregarBtn");
let hidden = document.getElementById("hidden");
let textField = false;
let failList = [];
let hashmap = new Map();
let permitidas = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "Ñ",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

//SETEAMOS A 0 LA OPACIDAD DE LAS LETRAS A ADIVINAR
fail.style.opacity = 0;

//INICIAMOS FUNCION DEL JUEGO
function initGame() {
  resetGame();
  drawHang();
  loadWords();
  downloadWords();

  //CREAMOS UNA LISTA CON EL LARGO DE LA PABRA SELECCIONADA CON EL CARACTER * Y OPACIDAD 0
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
  console.log(selectedWord);
  hidden.oninput = () => {
    if (failList.length < 6 || hashmap.size < selectedWord.length) {
      let letter = hidden.value.charAt(hidden.value.length - 1).toUpperCase();
      if (permitidas.includes(letter) && failList.length < 6) {
        for (let i = 0; i < selectedWord.length; i++) {
          if (letter == selectedWord.charAt(i)) {
            let position = document.querySelectorAll("[position]");
            position.item(i).setAttribute("style", "color: black");
            position.item(i).innerText = letter;
            hashmap.set(i, letter);
          }
        }
      }
      console.log(failList.length);
      //SI PERDES
      if (
        permitidas.includes(letter) &&
        !selectedWord.includes(letter) &&
        !failList.includes(letter) &&
        failList.length < 6 &&
        hashmap.size != selectedWord.length
      ) {
        let div = document.createElement("div");
        div.innerText = letter;
        fail.appendChild(div);
        fail.style.opacity = 100;
        failList.push(letter);
      }
      //VALIDACION SI GANAS O PERDES ESCRIBE ETIQUETAS HTML
      if (hashmap.size == selectedWord.length) {
        resLft.innerText = "GANASTE";
        resRgt.innerText = "GANASTE";
        return;
      }
      if (failList.length == 6) {
        resLft.innerText = "PERDISTE";
        resRgt.innerText = "PERDISTE";
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
    }
  };
}
//FUNCION PARA RESETEAR EL JUEGO
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
//FUNCION PARA AGREGAR PALABRAS A MI LISTA DESDE
//EL LOCAL STORAGE DEL NAVEGADOR, NO DEBEN SER REPETIDAS
loadWords = () => {
  for (let i = 0; i < localStorage.length; i++) {
    if (
      localStorage.getItem(i) != null &&
      !wordList.includes(localStorage.getItem(i)) &&
      !input.value != localStorage.getItem(i)
    ) {
      wordList.push(localStorage.getItem(i));
    }
  }
};
downloadWords = () => {
  for (let i = 0; i <= localStorage.length; i++) {
    if (
      !wordList.includes(localStorage.getItem(i)) &&
      localStorage.getItem(i) != null
    ) {
      wordList.push(localStorage.getItem(i));
    }
  }
};
//FUNCION DE CLICK PARA ABRIR TECLADO EN CELULARES
divword.addEventListener("click", function () {
  hidden.focus();
});
//EVENT LISTENERS DE BOTONES Y TECLA PARA AGREGAR CON ENTER

initBtn.addEventListener("click", initGame);

input.addEventListener("focus", function () {
  textField = true;
});

input.addEventListener("blur", function () {
  textField = false;
});

input.addEventListener("keypress", function (e) {
  if (e.keyCode == 13 && input.value.length > 0) {
    localStorage.setItem(localStorage.length + 1, input.value.toUpperCase());
    input.value = "";
  }
});

addBtn.addEventListener("click", function () {
  if (input.value.length > 0) {
    localStorage.setItem(localStorage.length + 1, input.value.toUpperCase());
    input.value = "";
  }
});
