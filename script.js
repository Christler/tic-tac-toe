const Gameboard = () => {
  let squares = ["", "", "", "", "", "", "", "", ""]
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  const addToBoard = (index, mark) => {
    squares[index] = mark
  }
  const clearBoard = () => {
    squares.forEach((s, index) => {
      squares[index] = ""
    })
  }
  return { squares, winConditions, addToBoard, clearBoard }
}

const Player = (name, mark) => {
  const getName = () => name
  const getMark = () => mark
  let score = 0
  const addToScore = () => {
    score++
  }
  const getScore = () => score
  return { getName, getMark, addToScore, getScore }
}

const displayController = () => {
  const player1Name = document.querySelector(".player1Name")
  const player2Name = document.querySelector(".player2Name")
  const player1Score = document.querySelector(".player1Score")
  const player2Score = document.querySelector(".player2Score")
  const gameStatus = document.querySelector(".gameStatus")
  const startBtn = document.querySelector(".startBtn")
  const squares = Array.from(document.querySelectorAll(".square"))
  return { player1Name, player2Name, player1Score, player2Score, gameStatus, startBtn, squares }
}

function game(player1Input, player2Input) {
  //initialize game
  const board = Gameboard()
  const display = displayController()
  let player1 = Player(player1Input, "X")
  let player2 = Player(player2Input, "O")
  let activePlayer = player1

  //add event listerners
  display.startBtn.addEventListener("click", newGame)
  display.squares.forEach(square => addEventListener("click", addMark))

  //display names
  display.player1Name.innerHTML = player1.getName()
  display.player2Name.innerHTML = player2.getName()

  function updateBoard() {
    board.squares.forEach((mark, index) => display.squares[index].innerHTML = mark)
  }

  function updateScores() {
    activePlayer.addToScore()
    display.player1Score.innerHTML = `Score: ${player1.getScore()}`
    display.player2Score.innerHTML = `Score: ${player2.getScore()}`
  }

  function checkForGameOver() {
    let isGameOver = false
    let mark = activePlayer.getMark()

    //if player wins update score and call game over.
    board.winConditions.forEach(condition => {
      if (board.squares[condition[0]] === mark &&
          board.squares[condition[1]] === mark &&
          board.squares[condition[2]] === mark) {
        isGameOver = true
        updateScores()
        gameOver()
      }
    })

    //if game not over change active player and display who's turn
    if(!isGameOver){
      activePlayer = (activePlayer === player1) ? player2 : player1
      display.gameStatus.innerHTML = `${activePlayer.getName()}'s turn`
    }
  }

  function isBoardFull() {
    if(board.squares.every(i => i !== "")){
      display.gameStatus.innerHTML = "It's a Tie"
      display.startBtn.style.visibility = "visible"
      display.squares.forEach(square => square.classList.toggle("unclickable"))
    }
  }

  function addMark(e) {
    //if clicked square is empty add mark to board
    if (e.srcElement.innerHTML === "") {
      let index = e.srcElement.dataset.indexNumber
      board.addToBoard(index, activePlayer.getMark())
      updateBoard()
      checkForGameOver()
      isBoardFull()
    }
  }

  function gameOver() {
    display.gameStatus.innerHTML = `${activePlayer.getName()} wins!!`
    display.squares.forEach(square => square.classList.toggle("unclickable"))
    display.startBtn.style.visibility = "visible"
  }

  function newGame() {
    board.clearBoard()
    display.squares.forEach(square => square.classList.toggle("unclickable"))
    display.gameStatus.innerHTML = ""
    display.startBtn.style.visibility = "hidden"
    activePlayer = player1
    updateBoard()
  }

}

function modalController(){
  //show modal on load
  $('.modal').modal("show")
  const player1Input = document.querySelector(".player1Input")
  const player2Input = document.querySelector(".player2Input")
  const startGame = document.querySelector(".startGame")

  startGame.addEventListener("click", () => {
    game(player1Input.value, player2Input.value)
    $('.modal').modal("hide")
  })
}
