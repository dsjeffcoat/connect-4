
let game_active = false; // this is a boolean (true/false values only).  This will be used to prevent being able to drop pieces once the game is over
let active_player = 0;

let gameboard = []; // define the gameboard as an array.  We will later set it up as a multi-dimensional array, to represent the col/row value for the game board
let player_color = []; //define player_color as an array
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
    if (game_active == true) return false; //when you return the function, it's done. 
    game_active = true; //that way the game has started and prevents user from clicking button a ton. 
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
            //gameboard piece.  Using CSS, you can style player0, player1 and player2 so that the square will appear correctly.
            document.getElementById('square_' + row + '_' + col).innerHTML = "<span class='piece player'" + gameboard[row][col] + "'> </span>";
        } //every turn it goes through the (draw) board to determin what each piece should be- give this the class of player 1 or 2
    }
}

function checkForWin() {

    //check left-to-right
    //check for player 1 and 2
    for (i = 1; i <= 2; i++) {
        //since a winning row must be 4 long, we only need to check the first 3 rows, 0,1,and 2
        for (col = 0; col <= 3; col++) {
            for (row = 0; row <= 5; row++) {
                //check to see if the gameboard item is set to the player we are checking, if so, lets check the next 3 for a match
                if (gameboard[row][col] == i) {
                    if ((gameboard[row][col + 1] == i) && (gameboard[row][col + 2] == i) && (gameboard[row][col + 3] == i)) {
                        endGame(i);//a match has been made, so run EndGame with the player that had the win
                        return true; //stop checking for a win - the game is over.
                    }
                }
            }
        }
    }

    //check top-to-bottom
    for (i = 1; i <= 2; i++) {
        //since a winning row must be 4 long, we only need to check the first 3 rows, 0,1,and 2
        for (col = 0; col <= 6; col++) {
            for (row = 0; row <= 2; row++) {
                //check to see if the gameboard item is set to the player we are checking, if so, lets check the next 3 for a match
                if (gameboard[row][col] == i) {
                    if ((gameboard[row + 1][col] == i) && (gameboard[row + 2][col] == i) && (gameboard[row + 3][col] == i)) {
                        endGame(i); //a match has been made - run endGame for the player who had the match.
                        return true; //stop checking for a win - the game is over.
                    }
                }
            }
        }
    }

    //check diagnol down
    for (i = 1; i <= 2; i++) {
        //since a winning row must be 4 long, we only need to check the first 3 rows, 0,1,and 2
        for (col = 0; col <= 3; col++) {
            //we also only need to check the bottom most columns - as the win must be upwards
            for (row = 0; row <= 2; row++) {
                //check to see if the gameboard item is set to the player we are checking, if so, lets check the next 3 for a match
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
        //since a winning row must be 4 long, we only need to check the first 3 rows, 0,1,and 2
        for (col = 0; col <= 3; col++) {
            //we also only need to check the bottom most columns - as the win must be upwards
            for (row = 3; row <= 5; row++) {
                //check to see if the gameboard item is set to the player we are checking, if so, lets check the next 3 for a match
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
    game_active = false; //set the "game_active" to false, so that it can be started again.
    document.getElementById('game_info').innerHTML = "Winner: " + winningPlayer;
}

function setUpTurn() {
    if (game_active) { //boolean-it's either true or false (we set it to true)
        //display the current player, and create a <span> with the class of the player# so that it will show the color.
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