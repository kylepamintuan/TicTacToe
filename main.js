var playerOne = {
    name: 'thing 1',
    symbol: 'X',
    wins: 0,
    losses: 0,
    catsGames: 0,
    color: 'red'
}
var playerTwo = {
    name: 'thing 2',
    symbol: 'O',
    wins: 0,
    losses: 0,
    catsGames: 0,
    color: 'blue'
}
var currentPlayer = playerOne;

$(document).ready(initializeApp);

function initializeApp(){
    console.log('Initializing App...');

    makeGameBoard(3);
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

function squareClickEventHandler()
{
    var current_square = $(event.currentTarget);

    console.log('square clicked: [' + current_square.attr('row') + '][' + current_square.attr('col') + ']');

    current_square.toggleClass('clicked');
    current_square.text(currentPlayer.symbol);
    current_square.off('click');
}

function changeCurrentPlayer(){
    if(currentPlayer === playerOne){
        currentPlayer = playerTwo;
    }else{
        currentPlayer = playerOne;   
    }
}