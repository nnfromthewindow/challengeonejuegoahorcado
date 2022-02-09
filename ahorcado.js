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
let canva = document.getElementById("divword");
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
/*let permitidas = [
  65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83,
  84, 85, 86, 87, 88, 89, 90, 8, 13, 37, 39, 46, 192,
];
*/
//SETEAMOS A 0 LA OPACIDAD DE LAS LETRAS A ADIVINAR
fail.style.opacity = 0;

//VALIDACION QUE SI ESTOY ESCRIBIENDO EN EL INPUT
//NO AGREGUE PALABRAS A MI JUEGO ACTUAL

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
  //VALIDACIONES DE EVENTOS DE TECLA PARA QUE SOLO SEAN CARACTERES PERMITIDOS
  hidden.oninput = function () {
    //PRIMERO FILTRAMOS LAS CORRECTAS

    for (let i = 0; i < selectedWord.length; i++) {
      if (
        hidden.value.charAt(hidden.value.length - 1).toUpperCase() ==
          selectedWord.charCodeAt(i) &&
        failList.length < 6
      ) {
        let position = document.querySelectorAll("[position]");
        position.item(i).setAttribute("style", "color: black");
        position.item(i).innerText = hidden.value
          .charAt(hidden.value.length - 1)
          .toUpperCase();
        hashmap.set(
          i,
          hidden.value.charAt(hidden.value.length - 1).toUpperCase()
        );
      }
    }

    /*
    if (
      !permitidas.includes(
        hidden.value.charAt(hidden.value.length - 1).toUpperCase()
      ) &&
      textField == true
    ) {
      e.returnValue = false;
    }
    if (textField == true) {
      return (hidden.value.charAt(hidden.value.length - 1).toUpperCase() = "");
    }
    for (let i = 0; i < selectedWord.length; i++) {
      if (hidden.value.charAt(hidden.value.length - 1).toUpperCase() == selectedWord.charCodeAt(i) && failList.length < 6) {
        let position = document.querySelectorAll("[position]");
        position.item(i).setAttribute("style", "color: black");
        position.item(i).innerText = hidden.value.charAt(hidden.value.length - 1).toUpperCase();
        hashmap.set(i, hidden.value.charAt(hidden.value.length - 1).toUpperCase());
      }
    }*/
    //LUEGO FILTRAMOS LAS INCORRECTAS INGRESANDO LOS
    //CARACTERES INCORRECTOS A UN ARRAY
    if (
      !selectedWord.includes(
        hidden.value.charAt(hidden.value.length - 1).toUpperCase()
      ) &&
      !wordMin.includes(
        hidden.value.charAt(hidden.value.length - 1).toUpperCase()
      ) &&
      permitidas.includes(
        hidden.value.charAt(hidden.value.length - 1).toUpperCase()
      ) &&
      !failList.includes(
        hidden.value.charAt(hidden.value.length - 1).toUpperCase()
      ) &&
      failList.length < 6 &&
      hashmap.size < selectedWord.length &&
      hidden.value.charAt(hidden.value.length - 1).toUpperCase() != 8
    ) {
      let div = document.createElement("div");
      div.innerText = hidden.value
        .charAt(hidden.value.length - 1)
        .toUpperCase();
      fail.appendChild(div);
      fail.style.opacity = 100;
      if (
        failList.includes(
          hidden.value.charAt(hidden.value.length - 1).toUpperCase()
        )
      ) {
        return;
      }
      failList.push(hidden.value.charAt(hidden.value.length - 1).toUpperCase());
    }
    //DIBUJAMOS PARTES DEL MUÑECO CON UN
    //SWITCH EN BASE AL LENGTH DEL ARRAY DE FAILS

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
    //VALIDACION SI GANAS O PERDES ESCRIBE ETIQUETAS HTML
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
divword.addEventListener("click", function (e) {
  e.preventDefault();
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

hidden.oninput = () => {
  console.log(hidden.value.charAt(hidden.value.length - 1).toUpperCase());
};
