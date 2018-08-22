$(document).ready(initializeApp);

function initializeApp(){
    console.log('Initializing App...');
    makeGameBoard(boardSize);
    if (moves === boardSize * 2 - 1)
        checkPlayerWin();
}
var boardSize = 3;
var moves = 0;

function bindEventHandlers(){

}

function fillGameBoard(){
    var game_board = $('.game_board');
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
            $('.gameBoard').append( square );
        }
    }
}

function checkPlayerWin () {
    console.log('inside checkPlayerWin function');
    var rowStr, colStr;
    var rowArray = [], allRowsArray = [], colArray = [], allColumnsArray = [];

    $(‘.square.clicked’).each(function( index ){
        ary[index] = [$(this).attr(‘row’), $(this).attr(‘col’), $(this).text()];
    })

    for (var rowIndex=0; rowIndex<3; rowIndex++) { //checking rows for matching symbols
        rowStr = rowIndex.toString();
        for ( var colIndex = 0; colIndex < 3; colIndex++ ) {
            colStr = colIndex.toString();
            rowArray.push($('[row=rowStr] [col=colStr]').text()); //contents of one row is in one array
        }
        allRowsArray.push(rowArray);
    }
    for (var colIndex=0; colIndex<3; colIndex++) { //checking columns for matching symbols
        colStr = colIndex.toString();
        for ( var rowIndex = 0; rowIndex < 3; rowIndex++ ) {
            rwoStr = rowIndex.toString();
            colArray.push($('[col=colStr] [row=rowStr]').text()); //contents of one column is in one array
        }
        allColumnsArray.push(colArray);
    }
    $('.square.clicked')

    var i=0;
    var rowMatch = false, twoSquaresMatching;
    while ( twoMatching && i < boardSize-1 ) {
        if (allRowsArray.rowArray[i] === rowArray[i+1]) {
            twoSquaresMatching = true;
        } else {
            twoSquaresMatching = false;
        }
        i++;
    }
    if (twoSquaresMatching) {
        rowMatching = true;
    }




}

return winner;
}