document.addEventListener("DOMContentLoaded", () => {
  //carregamento dos cards
  const cardArray = [
    {
      name: "ganhou",
      img: "images/ganhou.png",
    },
    {
      name: "ganhou",
      img: "images/ganhou.png",
    },
    {
      name: "direita",
      img: "images/direita.png",
    },
    {
      name: "direita",
      img: "images/direita.png",
    },
    {
      name: "tras",
      img: "images/tras.png",
    },
    {
      name: "tras",
      img: "images/tras.png",
    },
    {
      name: "correndo",
      img: "images/correndo.png",
    },
    {
      name: "correndo",
      img: "images/correndo.png",
    },
    {
      name: "pulo",
      img: "images/pulo.png",
    },
    {
      name: "pulo",
      img: "images/pulo.png",
    },
    {
      name: "esquerda",
      img: "images/esquerda.png",
    },
    {
      name: "esquerda",
      img: "images/esquerda.png",
    },
  ];
  cardArray.sort(() => 0.5 - Math.random());
  const grid = document.querySelector(".grid");
  
  const resultDisplay = document.querySelector("#result");
  var cardsChosen = [];
  var cardschosenId = [];
  var pares = [];
  
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      var card = document.createElement("img");
      card.setAttribute("src", "images/card.png");
      card.setAttribute("data-id", i);
      card.addEventListener("click", flipCard);
      grid.appendChild(card);
    }
  }
  
  function checkforMatch() {
    var cards = document.querySelectorAll("img");
    const optionOneId = cardschosenId[0];
    const optionTwoId = cardschosenId[1];

    
    if (optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute("src", "images/card.png");
      cards[optionTwoId].setAttribute("src", "images/card.png");
      alert("você clikou na mesma imagem.");
    }
    else if (cardsChosen[0] == cardsChosen[1]) {
      alert("Você conseguiu um par.");
      cards[optionOneId].setAttribute("src", "images/white.png");
      cards[optionTwoId].setAttribute("src", "images/white.png");
      cards[optionOneId].removeEventListener("click", flipCard);
      cards[optionTwoId].removeEventListener("click", flipCard);
      pares.push(cardsChosen);
    } 
    else {
      cards[optionOneId].setAttribute("src", "images/card.png");
      cards[optionTwoId].setAttribute("src", "images/card.png");
      alert("Ops!Jogue novamente");
    }
    cardsChosen = [];
    cardschosenId = [];
    resultDisplay.textContent = pares.length;
    
    if (pares.length == cardArray.length / 2) {
      alert("Parabéns! Você encontrou todos os pares!");
      location.reload()
      
    }
  }
  function flipCard() {
    var cardId = this.getAttribute("data-id");
    cardsChosen.push(cardArray[cardId].name);
    cardschosenId.push(cardId);
    this.setAttribute("src", cardArray[cardId].img);
    if (cardsChosen.length == 2) {
      setTimeout(checkforMatch, 500);
    }
  }
 
  
  createBoard();
});