import { Score } from "./Score.mjs";
import { Timer } from "./Timer.mjs";
import Dificulty from "./Dificulty.mjs";

export const dificulty = new Dificulty();

class Game {
  #dificulty;
  #trashs;
  #objects;
  #points;
  #time;

  constructor() {
    this.#dificulty = dificulty;
    this.#trashs = document.querySelectorAll("img.lixo");
    this.#objects = document.querySelector(".objects");
    this.#points = new Score(this.#dificulty.getDificulty());
    this.#time = new Timer(this.#dificulty.getDificulty());

    this.start();
  }

  start() {
    this.#trashs.forEach((trash) => {
      let num = Math.floor(Math.random() * 5);
      switch (num) {
        case 0:
          trash.classList.add("objMetal");
          trash.src = this.chooseSVGTrash("objMetal");
          break;
        case 1:
          trash.classList.add("objPlastico");
          trash.src = this.chooseSVGTrash("objPlastico");
          break;
        case 2:
          trash.classList.add("objPapel");
          trash.src = this.chooseSVGTrash("objPapel");
          break;
        case 3:
          trash.classList.add("objOrganico");
          trash.src = this.chooseSVGTrash("objOrganico");
          break;
        case 4:
          trash.classList.add("objVidro");
          trash.src = this.chooseSVGTrash("objVidro");
          break;
      }
    });
    this.createTrash();
    this.#time.startTimer();
    this.checkTime();
  }

  checkTime() {
    var myInterval = setInterval(() => {
      if (this.#time.time == -1) {
        this.stop();
        clearInterval(myInterval);
      }
    }, 1000);
  }

  chooseTrash() {
    let num = Math.floor(Math.random() * 5);
    switch (num) {
      case 0:
        return "lixo objMetal";
      case 1:
        return "lixo objPlastico";
      case 2:
        return "lixo objPapel";
      case 3:
        return "lixo objOrganico";
      case 4:
        return "lixo objVidro";
    }
  }

  chooseSVGTrash(typeObj) {
    let num;
    switch (typeObj) {
      case "objMetal":
        num = Math.floor(Math.random() * 17);
        return "assets/svgs/metal/metal" + num + ".svg";
      case "objPlastico":
        num = Math.floor(Math.random() * 9);
        return "assets/svgs/plastic/plastic" + num + ".svg";
      case "objPapel":
        num = Math.floor(Math.random() * 16);
        return "assets/svgs/paper/paper" + num + ".svg";
      case "objOrganico":
        num = Math.floor(Math.random() * 15);
        return "assets/svgs/organic/organic" + num + ".svg";
      case "objVidro":
        num = Math.floor(Math.random() * 14);
        return "assets/svgs/glass/glass" + num + ".svg";
    }
  }

  createTrash() {
    setInterval(() => {
      if (document.querySelectorAll("img.lixo").length < 5) {
        let trash = document.createElement("img");
        trash.classList = this.chooseTrash();
        trash.src = this.chooseSVGTrash(trash.className.split(" ")[1]);
        this.#objects.appendChild(trash);
      }
    }, 3000);
  }

  earnPoints() {
    this.#points.earnScore(1000, 1);
    if (this.#points.checkWin()) {  
      this.stop(); 
    }
  }

  badChoice(typeObj) {
    if (this.#points.loseHeart() != null) {
    } else {
      this.stop();
    }

    switch (typeObj) {
      case "objMetal":
        this.showMsg("METAL", "AMARELO");
        break;
      case "objPlastico":
        this.showMsg("PLASTICO", "VERMELHO");
        break;
      case "objPapel":
        this.showMsg("PAPEL", "AZUL");
        break;
      case "objOrganico":
        this.showMsg("ORGANICO", "MARROM");
        break;
      case "objVidro":
        this.showMsg("VIDRO", "VERDE");
        break;
    }
  }

  showMsg(obj, colorObj) {
    let cabecalho = document.querySelector(".meio");
    let msg = document.createElement("div");
    let divButton = document.createElement("div");
    let inputBotao = document.createElement("input");
    divButton.classList.add("botaoContinuar");
    msg.classList = "msg";
    inputBotao.type = "button";
    inputBotao.value = "  CONTINUAR  ";
    divButton.appendChild(inputBotao);
    msg.innerHTML = obj + " é no " + colorObj;

    switch (
      colorObj
    ) {
      case "AMARELO":
        msg.style.backgroundColor = "#f0bb21";
        break;
      case "VERMELHO":
        msg.style.backgroundColor = "#df2913";
        break;
      case "AZUL":
        msg.style.backgroundColor = "#1165a5";
        break;
      case "MARROM":
        msg.style.backgroundColor = "#81591b";
        break;
      case "VERDE":
        msg.style.backgroundColor = "#21a552";
        break;
    }
    cabecalho.appendChild(msg);
    cabecalho.appendChild(divButton);
    divButton.addEventListener("click", () => {
      msg.remove();
      divButton.remove();
    });
    /*
    PODE SER VIA TIMEOUT TBM
    setTimeout(() => {
        msg.remove();
    }, 1000);*/
  }
  
  stop() {
    if (this.#points.checkWin()) {
      let bodyHtml = document.body;
      let divWin = document.createElement("div");
      let divButton = document.createElement("div");
      let inputLeaveButton = document.createElement("input");
      let inputNextButton = document.createElement("input");

      divWin.classList.add("win");
      divButton.classList.add("botaoStop");
      inputLeaveButton.type = "button";
      inputLeaveButton.value = "  SAIR  ";
      inputNextButton.type = "button";
      inputNextButton.value = "  PRÓXIMA FASE  ";
      divWin.innerHTML = `PARABÉNS! VOCÊ VENCEU </br>SCORE: ${
        this.#points.current
      }`;
      bodyHtml.appendChild(divWin);
      divWin.appendChild(divButton);
      divButton.appendChild(inputLeaveButton);
      divButton.appendChild(inputNextButton);
      inputLeaveButton.onclick = function () {
        window.location.href = "/menu";
      }
      inputNextButton.onclick = function () {
        window.location.href = "/gameplay";
      }
    } else {
      let bodyHtml = document.body;
      let divGameOver = document.createElement("div");
      let divButton = document.createElement("div");
      let inputLeaveButton = document.createElement("input");
      let inputTryAgainButton = document.createElement("input");

      divGameOver.classList.add("gameover");
      divButton.classList.add("botaoStop");
      inputLeaveButton.type = "button";
      inputLeaveButton.value = "  SAIR  ";
      inputTryAgainButton.type = "button";
      inputTryAgainButton.value = "  TENTE NOVAMENTE  ";
      divGameOver.innerHTML = `GAME OVER </br>SCORE: ${this.#points.current}`;
      bodyHtml.appendChild(divGameOver);
      divGameOver.appendChild(divButton);
      divButton.appendChild(inputLeaveButton);
      divButton.appendChild(inputTryAgainButton);
      inputLeaveButton.onclick = function () {
        window.location.href = "/menu";
      }
      inputTryAgainButton.onclick = function () {
        window.location.href = "/gameplay";
      }
    }
  }
}

export { Game };
