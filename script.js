const gameBoard = document.querySelector("#gameboard");  
const infoDisplay = document.querySelector("#info");    // to add information when the user is gaming under the game board.
var score1 = 0;                                      // to add information when player1 wins a game.
var score2 = 0;                                     // to add information when player2 wins a game.
var scorenul = 0;                                   // to add information when have tie in two players.
var count= 0;                                       // to check if our gamebourd is full.
const p1 = document.getElementById("player1");            // to add name of the player1.
const p2 = document.getElementById("player2");           // to add name of the player2.
let begincontent = "X";                                      // when all boxes are empty and you click on one the content will be cross.
var n = Number(prompt("enter order of our gameboard"));     // to get order of our gameboard.
var player1 = String(prompt("enter a name of player 1"));  // to get name of the player1.
p1.textContent = player1;                                 // to get name of the player1 in our display.                                    // to initialize the score of the player1.
var player2 = String(prompt("enter a name of player 2")); // to get name of the player2.
p2.textContent = player2;                               // to get name of the player2 in our display.
infoDisplay.textContent = player1 + " go first";       // to get name of the current player.
var currentPlayer = player1;                          // Player1 will be the current player by default.
const sc1 = document.getElementById("score1");             // To get score player1.
const sc2 = document.getElementById("score2");            // To get score player2.
const scn = document.getElementById("Null");            // To get score of match Tie.
document.documentElement.style.setProperty('--boxsize',n); // set box size dynamically with css variable.

var Matrixvalues = new Array(n);
for ( let j = 0; j < n ; j++){ //Create a new matrix who will be used to store all the contents of the gameboard.
     Matrixvalues[j] = new Array(n);
}


function createGameBoard(){
    for(let i = 0 ; i < n*n ; i++) {
        var boxelement = document.createElement('div');   // create a div element as save as const 
        boxelement.classList.add('square');           // a div element who will created is like a squares
        boxelement.id = i;                          // to get index of my boxes
        boxelement.addEventListener("click",addcontent);    // when I make a click it will add content in our boxes(square)
        gameBoard.append(boxelement);   // append to our gameBoard  
    }  
}
createGameBoard();


function addcontent(e){       // function to add a content when one player click in one of boxes.
    e.target.textContent = begincontent;
    count++
    let k = e.target.id;
    if (k < n ){
        Matrixvalues[0][k] = begincontent; // element of first lign of the game board.
    }
    if (k%n==0){
        let count = 0;
        while(k!=0 && k%n==0){
            k = k - n;
            count++;
        }
        Matrixvalues[count][0] = begincontent; // element of second lign of the game board.
    }
    if(k%n!=0 && k > n){
        let count = 0;
        while(k > n && k!=n){
            k = k - n;
            count++;
        }
        Matrixvalues[count][k] = begincontent; // element of next lign of the game board.
    }
    console.log(Matrixvalues);
    begincontent = begincontent === "X" ?  "O" : "X"  ; // to alternate with cross and circle
    currentPlayer = currentPlayer === player1?  player2 : player1 ; // to alternate with player1(cross) and player2(circle)
    infoDisplay.textContent = "it is now  " + currentPlayer + " go." ;// cross will be go first
    e.target.removeEventListener("click",addcontent); // to stop the event in our box 
    HorizontalWinner();         // when the current player click on the board all verifications of victory are shown.
    VerticalWinner();
    FirstDiagonalWinner();
    SecondDiagonalWinner();
    MatchTie();
}


function HorizontalWinner(){ // we check values of all lines for our matrixvalues .
    let i =0 , j = 0 , count1 = 1 , count2 = 1;
    for( i = 0 ; i < n ; i++){
        for(j = 0 ; j < n ; j++){
            if (Matrixvalues[i][j] == "X" && Matrixvalues[i][j+1] == "X"){      // Player1 X ,wins on the horizontal line
                count1++;
                if(count1 == n){
                    Player1Wins();
                }
            }
            else if(Matrixvalues[i][j] == "O" && Matrixvalues[i][j+1] == "O" ){  // Player2 O ,wins on the horizontal line
                count2++;
                if(count2 == n){
                    Player2Wins();
                }
            }
            else{         // whe don't have a horizontal winner so we initialize our two counters.
                count1=1;
                count2=1;
            }
        }

    }
}


function VerticalWinner(){ // We know that transpose of our matrix is Matrixvalues=Matrixvalues[j][i].
    let i =0  , j = 0 , count1 = 1 , count2 = 1;    // Two counter are two initialized to one because we count directly on the firdt matrix value.
    for( i = 0 ; i < n ; i++){   
        for(j = 0 ; j < n - 1 ; j++){
            if (Matrixvalues[j][i] == "X"  && Matrixvalues[j+1][i] == "X" ){      // Player1 X wins on the vertical line
                count1++;
                if(count1 == n){
                    Player1Wins();
                }
            }
            else if(Matrixvalues[j][i] == "O" && Matrixvalues[j+1][i] == "O"){  // Player2 O, wins on the vertical line
                count2++;
                if(count2 == n){
                    Player2Wins();
                }
            }
            else{// whe don't have a vertical winner so we initialize our two counters.
                count1=1;
                count2=1;
            }
        }
    }
}


function FirstDiagonalWinner(){ // whe check if values of our matrix where i equal to j .
    let i =0  , count1 = 0 , count2 = 0;
    for( i = 0 ; i < n ; i++){   
        if (Matrixvalues[i][i] == "X"){      // Player1 X, wins on the Diagonal line.
            count2=0;
            count1++;
            if(count1 == n){
                Player1Wins();  // when player1 wins.
            }
        }
        else if(Matrixvalues[i][i] == "O"){  // Player2 O, wins on the Diagonal line.
            count1=0;
            count2++;
            if(count2 == n){
                Player2Wins();  //  when player2 wins.
            }
        }
        else{      // whe don't have a Diagonal winner so we initialize our two counters.
            count1=0;
            count2=0;
        }
    } 
}


function SecondDiagonalWinner(){ // whe check if values of our matrix where i equal to j 
    let i =0  ,j = 0 , count1 = 0 , count2 = 0;

    for( i = 0 ; i < n ; i++){ // In our matrixvalues whe know that i+j == n-1 is expression pf second diagonal.
        for(j=0 ; j < n ; j++){  
            if (i+j == n-1  ){
                if (Matrixvalues[i][j]== "X" && Matrixvalues[i][j]!== undefined){      // Player1 X ,wins on the Diagonal line
                    count1++;
                    count2=0
                    if(count1 == n){
                        Player1Wins();
                    }
                }
                else if(Matrixvalues[i][j] == "O" && Matrixvalues[i][j]!== undefined ){  // Player2 O ,wins on the Diagonal line
                    count1=0;
                    count2++;
                    if(count2 == n){
                        Player2Wins();
                    }
                }
                else{      // whe don't have a Diagonal winner so we initialize our two counters.
                    count1=0;
                    count2=0;
                }
            }
        } 
    }
}


function MatchTie(){ // all the contents of our gameboard are not empty whe have match tie between two palyers 
    if( count == n*n){  // this count when we add a content to a gameboard.
        infoDisplay.textContent = "Match Tie";
        scorenul++;
        scn.textContent = scorenul
        setTimeout(() => {alert("Match Tie"); replay();}, 500);
        
        return null;
    }
}   


function replay(){  // When all condition winnin are false we have match null.
    let allboxes = document.querySelectorAll(".square");
    allboxes.forEach(el => 
    {   
        el.addEventListener("click",addcontent);
        el.textContent="";
    });
    begincontent = "X";
    currentPlayer = player1;
    infoDisplay.textContent = "it is now  " + player1 + " go." ; // cross will be go first.
    for ( let j = 0; j < n ; j++){ //to set all values at undefined in my matrix who will be used to store all the contents of the gameboard.
        Matrixvalues[j] = new Array(n);
    }
    count = 0; // initialize again counter .
}


function Player1Wins(){
    infoDisplay.textContent = player1 + " wins" ;
    setTimeout(() => {alert(player1 + " wins"); replay();}, 500);
    score1++;
    sc1.textContent = score1;
    return true;
}


function Player2Wins(){
    infoDisplay.textContent = player2 + " wins" ;
    setTimeout(() => {alert(player2 + " wins"); replay();}, 500);
    score2++;
    sc2.textContent = score2;

    return true;
}

