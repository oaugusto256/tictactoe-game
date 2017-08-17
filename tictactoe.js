var turnX = Math.round(Math.random());
var turn = 1;
var gameOption;
var gameOver = false;
var draw = false;

var grid = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
];

$(document).ready(function(){
    newGame();
});

function showPlayerTurn() {
  $("#panel-turn").fadeIn( "slow" );
  $("#panel-turn-message").empty();

  if(turnX) {
    $("#panel-turn-message").append('Player X turn!');
  } else {
    $("#panel-turn-message").append('Player O turn!');

  }
}

function makeMove(row, column, event) {
  var space = event;

  if(gameOver == false) {
    if ($(space).find('#x').length == 0 && $(space).find('#o').length == 0 ) {
      if(turnX){
        $(space).append('<p id="x" class="value">X</p>');
        turnX = false;
      } else {
        $(space).append('<p id="o" class="value">O</p>');
        turnX = true;
      }
    } else {
      console.log("Occupied space!");
    }
  } else {
    console.log("The game is over!");
  }

  if (grid[row][column] == 0) {
    grid[row][column] = turn;

    if (turn == 1) {
      turn = -1;
    } else {
      turn = 1;
    }
    if(isDraw()){
      showDraw();
    }
    showPlayerTurn();
    isGameOver();
  }
}

function chooseGameOption() {
  // <button class="panel-button" type="button" name="button" disabled>One Player</button>
  $("#panel-message").append("How do you want to play?").hide().fadeIn(500);
  $("#panel-buttons").append('<button class="panel-button" type="button" name="button" onclick="twoPlayers()">Two Players</button>').hide().fadeIn(1500);
}

function twoPlayers() {
  showPlayerTurn();

  if($("#board").css('display') == 'none')
    $("#board").fadeIn( "slow" );
  if($("#panel").css('display') == 'block')
    $("#panel").fadeOut( "slow" );
}

function newGame() {
  turnX = Math.round(Math.random());
  gameOver = false;

  clearPanel();
  clearBoard();

  chooseGameOption();
}

function resetGame() {
  turnX = Math.round(Math.random());
  gameOver = false;

  clearPanel();
  clearBoard();

  showPlayerTurn();

  $("#board").fadeIn("slow");
  $("#panel").fadeOut("slow");
}

function clearPanel() {
  $("#panel-message").empty();
  $("#panel-buttons").empty();
  $("#panel-turn").hide();
}

function clearBoard() {
  for(i = 0; i <= 9; i++){
    $('#box'+i).empty();
  }

  grid = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  $("#board").hide().fadeOut(1500);
}

function showWinner(winner) {
  clearPanel();
  $("#panel").fadeIn("slow");

  if(winner == 1) {
    $("#panel-message").append("Player X Won!").hide().fadeIn(500);
    endGameOptions();
  } else {
    $("#panel-message").append("Player O Won!").hide().fadeIn(500);
    endGameOptions();
  }
}

function showDraw(){
  clearPanel();
  $("#panel").fadeIn("slow");

  $("#panel-message").append("It's a draw!").hide().fadeIn(500);
  endGameOptions();
}

function endGameOptions(){
  $("#panel-buttons").append('<button onClick="newGame();" class="panel-button" type="button" name="button">New Game</button>').hide().fadeIn(500);
  $("#panel-buttons").append('<button onClick="resetGame();" class="panel-button" type="button" name="button">Reset Game</button>').hide().fadeIn(500);
}

function isGameOver() {
  for (var i = 0; i < grid.length; i++) {
      if(grid[i][0] == grid[i][1] && grid[i][0]==grid[i][2] && grid[i][0]!=0){
        showWinner(grid[i][0]);
        gameOver = true;
        return;
      }
  }
  for (var i = 0; i < grid.length; i++) {
      if(grid[0][i] == grid[1][i] && grid[0][i]==grid[2][i]  && grid[0][i]!=0){
        showWinner(grid[0][i]);
        gameOver = true;
        return;
      }
  }
  if(grid[0][0]==grid[1][1] && grid[0][0] == grid[2][2]  && grid[0][0]!=0){
    showWinner(grid[0][0]);
    gameOver = true;
    return;
  }

  if(grid[0][2]==grid[1][1] && grid[0][2] == grid[2][0]  && grid[2][0]!=0){
    showWinner(grid[1][1]);
    gameOver = true;
    return;
  }
}

function isDraw() {
  draw = true;
  for (var i = 0; i < grid.length; i++) {
    for (var j= 0; j < grid[i].length;j++) {
      if(grid[i][j] == 0)
        draw = false;
    }
  }
  return draw;
}
