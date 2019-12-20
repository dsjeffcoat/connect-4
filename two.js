
let game_active = false; 
let active_player = 0;

let gameboard = [];
let player_color = []; 
player_color[1] = "red";
player_color[2] = "blue";

for (let row = 0; row <= 5; row++) {

    document.writeln("<tr>");
    for (let col = 0; col <= 6; col++) {
        document.writeln("<td id='square_" + row + "_" + col + "' class='board_square'></td>");
    }
    document.writeln("</tr>");
}


function beginGame() {
    if (game_active == true) return false;  
    game_active = true;  
}
/* 
| 0,0 | 0,1 | 0,2 | 0,3 | 0,4 | 0,5 | 0,6 |
| 1,0 | 1,1 | 1,2 | 1,3 | 1,4 | 1,5 | 1,6 |
| 2,0 | 2,1 | 2,2 | 2,3 | 2,4 | 2,5 | 2,6 |
| 3,0 | 3,1 | 3,2 | 3,3 | 3,4 | 3,5 | 3,6 |
| 4,0 | 4,1 | 4,2 | 4,3 | 4,4 | 4,5 | 4,6 |
| 5,0 | 5,1 | 5,2 | 5,3 | 5,4 | 5,5 | 5,6 |
*/

for (row = 0; row <= 5; row++) { //starting at top left //the ultimate value is 0
    gameboard[row] = [];
    for (col = 0; col <= 6; col++) {
        gameboard[row][col] = 0;
    }
}

drawBoard();
active_player = 1;
setUpTurn();


function drawBoard() {
    checkForWin();
    for (col = 0; col <= 6; col++) {
        for (row = 0; row <= 5; row++) {
            document.getElementById('square_' + row + '_' + col).innerHTML = "<span class='piece player'" + gameboard[row][col] + "'> </span>";
        } 
    }
}

function checkForWin() {


    for (i = 1; i <= 2; i++) {
        for (col = 0; col <= 3; col++) {
            for (row = 0; row <= 5; row++) {
                if (gameboard[row][col] == i) {
                    if ((gameboard[row][col + 1] == i) && (gameboard[row][col + 2] == i) && (gameboard[row][col + 3] == i)) {
                        endGame(i);
                        return true; //stop checking for a win - the game is over.
                    }
                }
            }
        }
    }

    //check top-to-bottom
    for (i = 1; i <= 2; i++) {

        for (col = 0; col <= 6; col++) {
            for (row = 0; row <= 2; row++) {
                
                if (gameboard[row][col] == i) {
                    if ((gameboard[row + 1][col] == i) && (gameboard[row + 2][col] == i) && (gameboard[row + 3][col] == i)) {
                        endGame(i); 
                        return true; 
                    }
                }
            }
        }
    }

    //check diagnol down
    for (i = 1; i <= 2; i++) {
        
        for (col = 0; col <= 3; col++) {

            for (row = 0; row <= 2; row++) {
               
                if (gameboard[row][col] == i) {
                    if ((gameboard[row + 1][col + 1] == i) && (gameboard[row + 2][col + 2] == i) && (gameboard[row + 3][col + 3] == i)) {
                        endGame(i);
                        return true;
                    }
                }
            }
        }
    }

    //check diagnol up
    for (i = 1; i <= 2; i++) {
        
        for (col = 0; col <= 3; col++) {
           
            for (row = 3; row <= 5; row++) {
                
                if (gameboard[row][col] == i) {
                    if ((gameboard[row - 1][col + 1] == i) && (gameboard[row - 2][col + 2] == i) && (gameboard[row - 3][col + 3] == i)) {
                        endGame(i);
                        return true;
                    }
                }
            }
        }
    }
}

function endGame(winningPlayer) {
    game_active = false; 
    document.getElementById('game_info').innerHTML = "Winner: " + winningPlayer;
}

function setUpTurn() {
    if (game_active) { /
       
        document.getElementById('game_info').innerHTML = "Current Player: Player " + active_player + " <span class='player"
            + active_player + "'>(" + player_color[active_player] + ")</span>";
    }
}

function drop(col) {

    for (row = 5; row >= 0; row--) { //note: we are using row--, which will reduce the value of row by 1, the opposted of ++
        if (gameboard[row][col] == 0) {
            gameboard[row][col] = active_player;

            drawBoard(); //switch player

            if (active_player == 1) {
                active_player = 2;
            } else if (active_player === 2) {
                active_player = 1;
            }

            setUpTurn();
            return true;
        }
    }
}

function createMap() {
    for (let row = 0; row <= 5; row++) {

        document.writeln("<tr>");
        for (let col = 0; col <= 6; col++) {
            document.writeln("<td id='square_" + row + "_" + col + "' class='board_square'></td>");
        }
        document.writeln("</tr>");
    }
}
createMap()