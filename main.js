$(document).ready(initializeApp);

var playerOne = {
    name: 'thing 1',
    symbol: 'X',
    wins: 0,
    losses: 0,
    catsGames: 0,
    color: 'red'
};
var playerTwo = {
    name: 'thing 2',
    symbol: 'O',
    wins: 0,
    losses: 0,
    catsGames: 0,
    color: 'blue'
};
var currentPlayer = playerOne;
var moves = 0;
var gameSize = 3;

function initializeApp(){
    console.log('Initializing App...');
    makeGameBoard(gameSize);
}

function bindEventHandlers(){

}

function makeGameBoard( size ){
    var squareSize = Math.floor(100 / size);
    for (var rowIndex=0; rowIndex < size; rowIndex++){
        for (var colIndex=0; colIndex < size; colIndex++){
            var square = $('<div>', {
                'class': 'square',
                row: rowIndex,  // custom attribute for row number
                col: colIndex,  // custom attribute for col number
                width: squareSize + '%',
                height: squareSize + '%'
            });
            if (colIndex === 0){
                square.css('clear', 'left');
            }
            square.click(squareClickEventHandler);
            $('.gameBoard').append( square );
        }
    }
}

function checkSquareForMove( square ){
    if (square.text() !== ''){
        return true;
    }
    return false;
}

function squareClickEventHandler(){
    var current_square = $(event.currentTarget);

    console.log('square clicked: [' + current_square.attr('row') + '][' + current_square.attr('col') + ']');

    current_square.toggleClass('clicked');
    current_square.text(currentPlayer.symbol);
    moves++;
    if(moves >= gameSize*2-1)
        checkPlayerWin();
    current_square.off('click');
    changeCurrentPlayer();
}

function changeCurrentPlayer(){
    if(currentPlayer === playerOne){
        currentPlayer = playerTwo;
        $('player1_container').toggleClass('nextPlayer');
        $('player2_container').toggleClass('currentPlayer');

    }else{
        currentPlayer = playerOne;
        $('player2_container').toggleClass('nextPlayer');
        $('player1_container').toggleClass('currentPlayer');
    }
}

function gameOver( str ){
    if( str === playerOne.name || str === playerTwo.name)
    {
        currentPlayer.wins++;
        changeCurrentPlayer();
        currentPlayer.losses++;
    }
    else if( str === 'cats' )
    {
        playerOne.catsGames++;
        playerTwo.catsGames++;
    }

    //$('#gameOverModal').modal('show');
}

function showModal(){
    $("#tttModal").modal('show');
}

function hideModal(){
    $("#tttModal").modal('hide');
}

function checkPlayerWin () {

}
