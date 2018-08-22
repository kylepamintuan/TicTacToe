$(document).ready(initializeApp);

function initializeApp()
{
    console.log('Initializing App...');
}

function bindEventHandlers()
{

}

function fillGameBoard()
{
    var game_board = $('.game_board');
}

function makeGameBoard( size ){
    var squareSize = 100 / size;
    for (var rowIndex=0; rowIndex < size; rowIndex++){
        for (var colIndex=0; colIndex < size; colIndex++){
            var square = $('<div>', {
            'class': 'square',
            row: rowIndex,  // custom attribute for row number
            col: colIndex,  // custom attribute for col number
            width: squareSize + 'vmin',
            height: squareSize + 'vmin'
            });
            if (colIndex === 0){
                square.css('clear', 'left');
            }
            $('.gameBoard').append( square );
        }
    }
}