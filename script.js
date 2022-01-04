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
  return {squares, winConditions, addToBoard, clearBoard}  
}

const Player = (name, mark) => {
  const getName  = () => name
  const getMark = () => mark
  let score = 0
  const addToScore = () => {
    score++
  }
  const getScore = () => score
  return {getName, getMark, addToScore, getScore}
}

function game(){
  //initialize game
  const board = Gameboard()
  let player1 = Player("Player1", "X")
  let player2 = Player("Player2", "O")
  let player1Turn = true
  
  //dom elements
  const gameStatus = document.querySelector(".gameStatus")
  const startBtn = document.querySelector(".startBtn")
  const domSquares = Array.from(document.querySelectorAll(".square"))
  
  startBtn.addEventListener("click", newGame)
  domSquares.forEach(square => addEventListener("click", addMark))
  
  function renderBoard(){
    board.squares.forEach((mark, index) => domSquares[index].innerHTML = mark)
  }
  
  function checkForGameOver(player){
    let mark = player.getMark()
    board.winConditions.forEach(condition => {
    if(board.squares[condition[0]] === mark && board.squares[condition[1]] === mark && board.squares[condition[2]] === mark){
        gameOver(player)
      }
    })
  }
  
  function addMark(e){
    let player = player1Turn ? player1: player2
    if(e.srcElement.innerHTML === ""){
      let index = e.srcElement.dataset.indexNumber
      board.addToBoard(index, player.getMark())
      renderBoard()
      
      if(player1Turn){
        player1Turn = false
      }else{
        player1Turn = true
      }
      
      gameStatus.innerHTML = `${player1Turn ? player1.getName() : player2.getName()}'s turn`
      checkForGameOver(player)
    }
  }
  
  function gameOver(player){
    gameStatus.innerHTML = `${player.getName()} wins!!`
    domSquares.forEach(square => square.classList.toggle("unclickable"))
    startBtn.style.visibility = "visible"
  }
  
  function newGame(){
    board.clearBoard()
    player1Turn = true
    domSquares.forEach(square => square.classList.toggle("unclickable"))
    gameStatus.innerHTML = ""
    startBtn.style.visibility = "hidden"
    renderBoard()
  }
  
  renderBoard()
}

game()
  