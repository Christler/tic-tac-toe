const Gameboard = () => {
    let squares = ["", "", "",
                   "", "", "",
                   "", "", ""]
    const addToBoard = (index, mark) => {
      squares[index] = mark
    }
    return {squares, addToBoard}  
  }
  
  const player = () => {
    //player obj
  }
  
  function game(){
    //initialize board
    let xTurn = true
    const board = Gameboard()
    const domSquares = Array.from(document.querySelectorAll(".square"))
    domSquares.forEach(square => addEventListener("click", addMark))
    
    function renderBoard(){
      board.squares.forEach((mark, index) => domSquares[index].innerHTML = mark)
    }
    
    function checkForGameOver(){
      //check top row
      if(board.squares[0] === "X" && board.squares[1] === "X" && board.squares[2] === "X"){
        console.log("Game Over!")
      }
      //check middle row
      if(board.squares[3] === "X" && board.squares[4] === "X" && board.squares[5] === "X"){
        console.log("Game Over!")
      }
      //check bottom row
      if(board.squares[0] === "X" && board.squares[1] === "X" && board.squares[2] === "X"){
        console.log("Game Over!")
      }

      //check left column
      if(board.squares[0] === "X" && board.squares[3] === "X" && board.squares[6] === "X"){
        console.log("Game Over!")
      }
      //check middle column
      if(board.squares[1] === "X" && board.squares[4] === "X" && board.squares[7] === "X"){
        console.log("Game Over!")
      }
      //check right column
      if(board.squares[2] === "X" && board.squares[5] === "X" && board.squares[8] === "X"){
        console.log("Game Over!")
      }

      //check diagonals
      if(board.squares[0] === "X" && board.squares[4] === "X" && board.squares[8] === "X"){
        console.log("Game Over!")
      }
      
      if(board.squares[2] === "X" && board.squares[4] === "X" && board.squares[6] === "X"){
        console.log("Game Over!")
      }
      
    }
    
    function addMark(e){
      let mark
      if(e.srcElement.innerHTML === ""){
        let index = e.srcElement.dataset.indexNumber
        if(xTurn){
          mark = "X"
          xTurn = false
        }else{
          mark = "O"
          xTurn = true
        }
        board.addToBoard(index, mark)
        renderBoard()
        checkForGameOver()
      }
    }
    
    renderBoard()
  }
  
  game()
  