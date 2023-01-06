//Factory to assing values for players
const playerFactory = (name, playerMark) => {
    return { name, playerMark}
}

let player1 = playerFactory("Bob", "X");
let player2 = playerFactory("Dylan", "O");

let currenPlayer = player1;
let win = false
let winner = ""
let gameOn = false
let startButton = document.getElementById("start-game")


//Gameboard
const gameBoard = {

    //Function to change values in boardSquares object array
     markChanger1: function(index, playerMark) {
        gameBoard['boardSquares'][index].mark = playerMark;
        let latestChanged = gameBoard['boardSquares'][index].ID
        let latestIndex = index;
        return latestIndex, latestChanged;
    },


    //Array for gameboard squares
    boardSquares: [
        {
            "ID": "A1",
            "mark": "",
        },
        {
            "ID": "B1",
            "mark": "",  
        },
        {
            "ID": "C1",
            "mark": "",  
        },
        {
            "ID": "A2",
            "mark": "",  
        },
        {
            "ID": "B2",
            "mark": "",  
        },
        {
            "ID": "C2",
            "mark": "",  
        },
        {
            "ID": "A3",
            "mark": "",  
        },
        {
            "ID": "B3",
            "mark": "",  
        },
        {
            "ID": "C3",
            "mark": "",  
        },
        
    ],
    //Dynamic board rendering with ID's corresponding to boardSquares
    boardRenderer: function() {
        let gameBoardDiv = document.querySelector(".game-board")
        for (const property in gameBoard['boardSquares']) {
            let square = document.createElement("div")
            square.className = "gameGrid"
            square.setAttribute('id',`${property}`)
            gameBoardDiv.appendChild(square)
        }
    },

    //Cleans the array of marks
    dataCleaner: function () {
        gameBoard.boardSquares.forEach((squareObject) => {
           squareObject.mark = ""
        })
        winner = ""
        win = false
        gameOn = false
        currenPlayer = player1
    },

    //Cleans the gameboard
    screenCleaner: function () {
        let allSquares = document.querySelectorAll(".gameGrid")
        allSquares.forEach((square) => {
            square.innerHTML = ""
            
        } )
        let endOverlay = document.querySelector(".endgame")
        endOverlay.remove()
        let currentPlayerDisplayer = document.querySelector(".current-player")
        currentPlayerDisplayer.innerHTML = ""
    },

    //Shows who's turn it is at the bottom
    currentPlayerRender: function() {
        let mainDIv = document.querySelector(".main")
        let currentPlayerDisplayer = document.createElement("div")
        let oldChild = document.querySelector(".current-player")
        currentPlayerDisplayer.className = "current-player"
        currentPlayerDisplayer.innerHTML = `It's ${currenPlayer.name}'s turn`
        mainDIv.replaceChild(currentPlayerDisplayer, oldChild)
    },

    //Renders an overlay with a message for winner + reset button
    victoryOverlayRenderer: function(winner) {
        let mainDIv = document.querySelector(".main")
        let endGameDisplayer = document.createElement("div")
        endGameDisplayer.className = "endgame"
        mainDIv.appendChild(endGameDisplayer)
        endGameDisplayer.innerHTML = `The winner is ${winner.name}`
        
        let resetButton = document.createElement("button")
        resetButton.className = "resetButton"
        resetButton.innerHTML = "Reset game"
        endGameDisplayer.appendChild(resetButton)
        resetButton.addEventListener('click', () => {
            gameBoard.dataCleaner()
            gameBoard.screenCleaner()
        })
    },

}

gameBoard.boardRenderer();

const gameController = {


    //Function to for player to take their turn
    playTurn: function() {

        let selectedCell = document.querySelectorAll(".gameGrid")

        selectedCell.forEach((item) => {
            item.addEventListener('click', function cellManipulator(e) {
                if (win === true || gameOn === false || win === "TIE") {return}
                /* if (win === "TIE") {return} */
                if (item.innerHTML == "X" || item.innerHTML == "O" ) {return}
                let chosenIndex = e.srcElement.id
                gameBoard.markChanger1(chosenIndex, currenPlayer.playerMark) //Update object arrau
                gameController.domSquareUpdater(chosenIndex, currenPlayer.playerMark) //Update DOM
                gameController.victoryChecker(currenPlayer.playerMark, chosenIndex, currenPlayer)
                gameController.switchCurrentPlayer(currenPlayer) //Switch to other player
                gameBoard.currentPlayerRender(currenPlayer)
            })
        })
        
        
    },
    //Function to place players mark to the DOM element
    domSquareUpdater: function(index, playerMark){
        document.getElementById(index).innerHTML = playerMark
    },

    switchCurrentPlayer: function() {
        if (currenPlayer.playerMark === "X") {currenPlayer = player2}
        else if (currenPlayer.playerMark === "O") {currenPlayer = player1}
        return currenPlayer
    },

    //Changes the names of the players to ones in input boxes & resets
    nameUpdater: function() {
        let player1Name = document.getElementById("player1_name").value
        let player2Name = document.getElementById("player2_name").value
        player1.name = player1Name
        player2.name = player2Name

        document.getElementById("player1_name").value = ""
        document.getElementById("player2_name").value = ""
    },

    // Looper function to check for a tie condition (placed inside victoryChecker)
    tieChecker: function() {
        let z = 0
        for (const element of gameBoard['boardSquares']) {
            
            if (element.mark === "X" || element.mark === "O"){
                z++
            }
            if (z === 9 && winner === "") {
                winner = "TIE"
                gameController.endGame(winner)
            }
        }
    },


    endGame: function (winner) {
        gameBoard.victoryOverlayRenderer(winner)
    },

    winningCombinations: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],

    //Function to check victory conditions
    victoryChecker: function(currentPlayerMark, markedSquare, currenPlayer) {
        
        let x = currentPlayerMark;
        let y = Number(markedSquare)
        console.log(`Mark is ${x} and square is ${markedSquare}`)
        let u = currenPlayer

        gameController.winningCombinations.some(combination => {
            combination.every(index => {
                console.log(index)
                if (gameBoard['boardSquares'][index].mark === x) {
                    console.log(gameBoard['boardSquares'].mark)
                }
            })
        })

        switch(y){
            
            case 0:
                if(gameBoard['boardSquares'][1].mark === x && gameBoard['boardSquares'][2].mark === x){
                    win = true
                    winner = u
                    gameController.endGame(winner)
                    return
                } else if (gameBoard['boardSquares'][4].mark === x && gameBoard['boardSquares'][8].mark === x){
                    win = true
                    winner = u
                    gameController.endGame(winner)
                    return
                } else if (gameBoard['boardSquares'][3].mark === x && gameBoard['boardSquares'][6].mark === x) {
                    win = true
                    winner = u
                    gameController.endGame(winner)
                    return
                }
                break;
            case 1:
                if(gameBoard['boardSquares'][0].mark === x && gameBoard['boardSquares'][2].mark === x){
                    win = true
                    winner = u
                    gameController.endGame(winner)
                    return
                } else if (gameBoard['boardSquares'][4].mark === x && gameBoard['boardSquares'][7].mark === x){
                    win = true
                    winner = u
                    gameController.endGame(winner)
                    return
                }
                break;
            case 2:
                if(gameBoard['boardSquares'][0].mark === x && gameBoard['boardSquares'][1].mark === x){
                    win = true
                    winner = u
                    gameController.endGame(winner)
                    return
                } else if (gameBoard['boardSquares'][5].mark === x && gameBoard['boardSquares'][8].mark === x){
                    win = true
                    winner = u
                    gameController.endGame(winner)
                    return
                }
                break;
            case 3:
                if(gameBoard['boardSquares'][0].mark === x && gameBoard['boardSquares'][6].mark === x){
                    win = true
                    winner = u
                    gameController.endGame(winner)
                    return
                } else if (gameBoard['boardSquares'][4].mark === x && gameBoard['boardSquares'][5].mark === x){
                    win = true
                    winner = u
                    gameController.endGame(winner)
                    return
                }
                break;
            case 4:
                if(gameBoard['boardSquares'][3].mark === x && gameBoard['boardSquares'][5].mark === x){
                    win = true
                    winner = u
                    gameController.endGame(winner)
                    return
                } else if (gameBoard['boardSquares'][1].mark === x && gameBoard['boardSquares'][7].mark === x){
                    win = true
                    winner = u
                    gameController.endGame(winner)
                    return
                } else if (gameBoard['boardSquares'][0].mark === x && gameBoard['boardSquares'][8].mark === x) {
                    win = true
                    winner = u
                    gameController.endGame(winner)
                    return
                }
                break;
            case 5:
                if(gameBoard['boardSquares'][2].mark === x && gameBoard['boardSquares'][8].mark === x){
                    win = true
                    winner = u
                    gameController.endGame(winner)
                    return
                } else if (gameBoard['boardSquares'][3].mark === x && gameBoard['boardSquares'][4].mark === x){
                    win = true
                    winner = u
                    gameController.endGame(winner)
                    return
                }
                break;
            case 6:
                if(gameBoard['boardSquares'][0].mark === x && gameBoard['boardSquares'][3].mark === x){
                    win = true
                    console.log("WIN 6")
                    winner = u
                    gameController.endGame(winner)
                    return
                } else if (gameBoard['boardSquares'][7].mark === x && gameBoard['boardSquares'][8].mark === x){
                    win = true
                    winner = u
                    gameController.endGame(winner)
                    return
                } else if (gameBoard['boardSquares'][4].mark === x && gameBoard['boardSquares'][2].mark === x){
                    win = true
                    console.log(win)
                    winner = u
                    gameController.endGame(winner)
                    return
                }
                break;
            case 7:
                if(gameBoard['boardSquares'][1].mark === x && gameBoard['boardSquares'][4].mark === x){
                    win = true
                    winner = u
                    gameController.endGame(winner)
                    return
                } else if (gameBoard['boardSquares'][6].mark === x && gameBoard['boardSquares'][8].mark === x){
                    win = true
                    winner = u
                    gameController.endGame(winner)
                    return
                }
                break;
            case 8:
                if(gameBoard['boardSquares'][6].mark === x && gameBoard['boardSquares'][7].mark === x){
                    win = true
                    winner = u
                    gameController.endGame(winner)
                    return
                } else if (gameBoard['boardSquares'][0].mark === x && gameBoard['boardSquares'][4].mark === x){
                    win = true
                    winner = u
                    gameController.endGame(winner)
                    return
                }
                break;
            }
            gameController.tieChecker()
        }, //victoryChecker ends here
}


startButton.addEventListener('click', () => {
    gameOn = true
gameController.playTurn()
gameController.nameUpdater()
gameBoard.currentPlayerRender(currenPlayer)
});

/* console.log(gameBoard['boardSquares'][1]); -- to access gameboard squares */



/* 

Hi all.

I already completed my TTT but wasn’t satisfied with my messy victory checker, built with switch statements. So I stumbled upon a TTT tutorial, which uses methods .some and .every to iterate through possible combinations. You can find it here: https://www.codebrainer.com/blog/tic-tac-toe-javascript-game. This solution takes a pretty different approach, using classes but the principle should be applicable when using arrays of objects.

function checkWin(currentClass) {
	return WINNING_COMBINATIONS.some(combination => {
		return combination.every(index => {
			return cellElements[index].classList.contains(currentClass)
		})
	})
}

I have looked at the MDN articles on both methods but am having trouble in targeting the combinations with my gameboard objects. Here is my codepen: https://codepen.io/impronen/pen/eYjJpzd

What I have now is starting from row 220. A function that first finds all the combinations with .every. In the tutorial, the row return cellElements[index].classList.contains(currentClass)  iterates over an array of DOM elements in an array cellElements. The .contains method is apparently a collect.js addition
*/