
/*
    Stuff to handle ;-):
        1. Make the fields clickable (player0 uses "X", player1 "0")
        2. Keep track of all used fields (fieldsPlayed) and of the fields each player chose (fieldsPlayer0, fieldsPlayer1)
        3. Avoid that úsed fields can be played again and implement feedback like "Field already taken" (alert();)
        4. Check for winning combinations
        5. Implement feedback to the players (winning or game is a draw)
        6. End the game, avoid further playing
        7. Add a "Play again button"
        8. Implement "eternal" game statistics (using local storage!):

        Localstorage to save results (Scoreboard):
        - Player 1
        - Player 2
        - Draws

        9. Style the game as fancy and responsive as you can ;-)


*/

// Global game variables
var player, fields, fieldsPlayed, fieldsPlayer0, fieldsPlayer1, playButton, resetButton, gamesPlayed, player1Score, player2Score, drawScore, turn, errorMSG;

// Getting HTML elements
turn = document.getElementById("turn");
errorMSG = document.getElementById("errorMSG");
resetButton = document.getElementById("resetGame");

// Defining starting scores
gamesPlayed = 0;
player1Score = 0;
player2Score = 0;
drawScore = 0;

// Getting Local Storage (Data of scores)
localStorage.getItem("player1ScoreLS");
localStorage.getItem("player2ScoreLS");
localStorage.getItem("drawScoreLS");

// Checking Local Storage and displaying them if they exists
if(localStorage.getItem("player1ScoreLS") != 0) {

    player1Score = Number(localStorage.getItem("player1ScoreLS"));
    resetButton.style.display = "block !important";
}

if(localStorage.getItem("player2ScoreLS") != 0) {

    player2Score = Number(localStorage.getItem("player2ScoreLS"));
    resetButton.style.display = "block !important";
}

if(localStorage.getItem("drawScoreLS") != 0){

    drawScore = Number(localStorage.getItem("drawScoreLS"));
    resetButton.style.display = "block !important";
}

// Start data to display (Before game starts)
document.getElementById("gamesPlayed").innerHTML = Number(localStorage.getItem('player1ScoreLS')) + Number(localStorage.getItem('player2ScoreLS')) + Number(localStorage.getItem('drawScoreLS'));
document.getElementById("player1Score").innerHTML = Number(localStorage.getItem('player1ScoreLS'));
document.getElementById("player2Score").innerHTML = Number(localStorage.getItem('player2ScoreLS'));
document.getElementById("drawScore").innerHTML = Number(localStorage.getItem('drawScoreLS'));

// Play button (+ Hiding it because it should only display when the round is over)
playButton = document.getElementById("restart");
playButton.addEventListener('click', playAgain);
playButton.style.display = "none";

// Restart button: Resets game/all data
resetButton.addEventListener('click', resetGame);

// Restart button (Displaying if min 1 round has been played)
if(document.getElementById("gamesPlayed").innerHTML != 0) {
    resetButton.style.display = "block";
}

else {
    resetButton.style.display = "none";
}

// Setting start player and initialize it
player = 0;

// Initialize fields to start as an empty array
fields = [];

// Changing our fields from true to false if they are clicked
fieldsPlayed = [];
fieldsPlayer0 = [];
fieldsPlayer1 = [];

// Storing all fields into 1 variable
fields = document.getElementsByTagName('td');

// Setting our start value for input (Text & Styling)
turn.innerHTML = "Turn: X";
turn.style.backgroundColor = "teal";

// Adding a click-event for each element we have
for(let i = 0; i < fields.length; i++) {
    fields[i].addEventListener('click', play);
}

// Game core mechanics, marking the fields
function play() {

    // If the clicked field is already clicked (Display Error message)
    if(fieldsPlayed.includes(this.id)) {
        errorMSG.innerText = "Field already taken! Pick an empty field";
    }

    // Checking which player turn it is and if the field is clickable (Not clicked before)
    if (player === 0 && !fieldsPlayed.includes(this.id)) {

        // Empty our errors if there is no errors
        errorMSG.innerText = "";

        // Setting our text to display
        this.innerHTML = 'X';
        turn.innerHTML = "Turn: O";

        fieldsPlayer0.push(parseInt(this.id));

        // Styling X and Turn text
        turn.style.backgroundColor = "orange";
        this.style.color = "orange";

        // Change player to the player who've clicked
        player = 1;
    }

    // Checking which player turn it is and if the field is clickable (Not clicked before)
    else if (player === 1 && !fieldsPlayed.includes(this.id)) {

        // Empty our errors if there is no errors
        errorMSG.innerText = "";

        // Setting our text to display
        this.innerHTML = 'O';
        turn.innerHTML = "Turn: X";

        fieldsPlayer1.push(parseInt(this.id));

        // Styling O and Turn text
        turn.style.backgroundColor = "teal";
        this.style.color = "teal";

        // Change player to the player who've clicked
        player = 0;
    }

    // Saving the fields that are clicked
    fieldsPlayed.push(this.id);
    
    win();
}

// Analyzing field choices, winning conditions, feedback
function win() {

    // Checking win conditions and if it's true, the winner is found
    if(
        fieldsPlayer0.includes(1) && fieldsPlayer0.includes(2) && fieldsPlayer0.includes(3) || 
        fieldsPlayer0.includes(4) && fieldsPlayer0.includes(5) && fieldsPlayer0.includes(6) ||
        fieldsPlayer0.includes(7) && fieldsPlayer0.includes(8) && fieldsPlayer0.includes(9) || 
        fieldsPlayer0.includes(1) && fieldsPlayer0.includes(4) && fieldsPlayer0.includes(7) ||
        fieldsPlayer0.includes(2) && fieldsPlayer0.includes(5) && fieldsPlayer0.includes(8) ||
        fieldsPlayer0.includes(3) && fieldsPlayer0.includes(6) && fieldsPlayer0.includes(9) || 
        fieldsPlayer0.includes(1) && fieldsPlayer0.includes(5) && fieldsPlayer0.includes(9) ||
        fieldsPlayer0.includes(3) && fieldsPlayer0.includes(5) && fieldsPlayer0.includes(7)) {

        turn.style.backgroundColor = "#198754";
        turn.innerHTML = "Winner: X";

        // Add + 1 for each time the Player X wins, so we can store it in our local storage
        player1Score++;

        gameOver();
        gameStats();
    }

    // Checking win conditions and if it's true, the winner is found
    else if(    
        fieldsPlayer1.includes(1) && fieldsPlayer1.includes(2) && fieldsPlayer1.includes(3) || 
        fieldsPlayer1.includes(4) && fieldsPlayer1.includes(5) && fieldsPlayer1.includes(6) ||
        fieldsPlayer1.includes(7) && fieldsPlayer1.includes(8) && fieldsPlayer1.includes(9) || 
        fieldsPlayer1.includes(1) && fieldsPlayer1.includes(4) && fieldsPlayer1.includes(7) ||
        fieldsPlayer1.includes(2) && fieldsPlayer1.includes(5) && fieldsPlayer1.includes(8) ||
        fieldsPlayer1.includes(3) && fieldsPlayer1.includes(6) && fieldsPlayer1.includes(9) || 
        fieldsPlayer1.includes(1) && fieldsPlayer1.includes(5) && fieldsPlayer1.includes(9) ||
        fieldsPlayer1.includes(3) && fieldsPlayer1.includes(5) && fieldsPlayer1.includes(7) ) {

        turn.style.backgroundColor = "#198754";
        turn.innerHTML = "Winner: O";

        // Add + 1 for each time the Player O wins, so we can store it in our local storage
        player2Score++;

        gameOver();
        gameStats();
    }

    // Checking win conditions and if it's true, the winner is found
    else if(fieldsPlayed.length == 9) {
        turn.style.backgroundColor = "#404040";
        turn.innerHTML = "DRAW";

        // Add + 1 for each time the round is draw, so we can store it in our local storage
        drawScore++;

        gameOver();
        gameStats();
    }
}

// Ending the round (Start new round button will appear here) 
function gameOver() {

    // Display "New Round" button
    restart.style.display = "block";

    for(let i = 0; i < fields.length; i++) {
        fields[i].removeEventListener('click', play);
    }
}

// Next round button (And all data)
function playAgain() {

    // Display Next round button
    restart.style.display = "block";

    // Refreshing page so next round can begin (Deleting array data of clicked fields - Make all clickable again)
    location.reload();
}

function resetGame() {

    // Clear/Remove all our stored data
    localStorage.clear();

    // Refreshing page so the data is not displaying
    location.reload();
}

function gameStats() {

    // Storing data with local storage (setItem)
    localStorage.setItem("player1ScoreLS", player1Score);
    localStorage.setItem("player2ScoreLS", player2Score);
    localStorage.setItem("drawScoreLS", drawScore);

    // Setting our values (As numbers)
    localStorage.player1ScoreLS = Number(localStorage.player1ScoreLS);
    localStorage.player2ScoreLS = Number(localStorage.player2ScoreLS);
    localStorage.drawScoreLS = Number(localStorage.drawScoreLS);

    // Displaying our data in HTML with our localStorage data
    document.getElementById("gamesPlayed").innerHTML = Number(localStorage.getItem('player1ScoreLS')) + Number(localStorage.getItem('player2ScoreLS')) + Number(localStorage.getItem('drawScoreLS'));
    document.getElementById("player1Score").innerHTML = localStorage.player1ScoreLS;
    document.getElementById("player2Score").innerHTML = localStorage.player2ScoreLS;
    document.getElementById("drawScore").innerHTML = localStorage.drawScoreLS;
}