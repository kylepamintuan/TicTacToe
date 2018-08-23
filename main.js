$(document).ready(initializeApp);

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
var gameBoardSize = 3;
var playerTurn_counter = 0;

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

function squareClickEventHandler(){
    var current_square = $(event.currentTarget);

    //console.log('square clicked: [' + current_square.attr('row') + '][' + current_square.attr('col') + ']');

    current_square.toggleClass('clicked');
    current_square.text(currentPlayer.symbol);
    current_square.off('click');
    changeCurrentPlayer();
    
    playerTurn_counter++;
    if(playerTurn_counter >= 5)
        checkGameWin(current_square);
}

function changeCurrentPlayer(){
    if(currentPlayer === playerOne){
        currentPlayer = playerTwo;
    }else{
        currentPlayer = playerOne;   
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

function checkGameWin( square ){
    var row = square.attr('row');
    var col = square.attr('col');
    var symbol = square.text();

    var winning_matches = gameBoardSize-1;

    var row_matches = checkRow(row,col,symbol);
    var col_matches = checkCol(row,col,symbol);
    var diag1_matches = checkDiag1(row,col,symbol);
    var diag2_matches = checkDiag2(row,col,symbol);

    if(row_matches === winning_matches)
        console.log("row match - game over");
    else if(col_matches === winning_matches)
        console.log("col match - game over");
    else if(diag1_matches === winning_matches)
        console.log("diag1 match - game over");
    else if(diag2_matches === winning_matches)
        console.log("diag2 match - game over");
}

function checkRow( i, j, symbol ){
    var matches = checkRight(i, j, symbol) + checkLeft(i, j, symbol);

    return matches;
}

function checkRight( i, j, symbol ){
    var count = 0;
    var temp = $('[row='+ i + '][col=' + j + ']').text();

    while(temp){
        j++;
        temp = $('[row='+ i + '][col=' + j + ']').text();

        if(temp === symbol)
            count++;
    }

    return count;
}

function checkLeft( i, j, symbol ){
    var count = 0;
    var temp = $('[row='+ i + '][col=' + j + ']').text();

    while(temp){
        j--;
        temp = $('[row='+ i + '][col=' + j + ']').text();

        if(temp === symbol)
            count++;
    }
    return count;
}

function checkCol( i, j, symbol ){
    var matches = checkUp(i, j, symbol) + checkDown(i, j, symbol);
    return matches;
}

function checkUp( i, j, symbol ){
    var count = 0;
    var temp = $('[row='+ i + '][col=' + j + ']').text();

    while(temp){
        i--;
        temp = $('[row='+ i + '][col=' + j + ']').text();

        if(temp === symbol)
            count++;
    }
    return count;
}

function checkDown( i, j, symbol ){
    var count = 0;
    var temp = $('[row='+ i + '][col=' + j + ']').text();

    while(temp){
        i++;
        temp = $('[row='+ i + '][col=' + j + ']').text();

        if(temp === symbol)
            count++;
    }
    return count;
}

function checkDiag1( i, j, symbol ){
    var matches = checkDiag_NW(i, j, symbol) + checkDiag_SE(i, j, symbol);
    return matches;
}

function checkDiag_NW( i, j, symbol ){
    var count = 0;
    var temp = $('[row='+ i + '][col=' + j + ']').text();

    while(temp){
        i--;
        j--;
        temp = $('[row='+ i + '][col=' + j + ']').text();

        if(temp === symbol)
            count++;
    }
    return count;
}

function checkDiag_SE( i, j, symbol ){
    var count = 0;
    var temp = $('[row='+ i + '][col=' + j + ']').text();

    while(temp){
        i++;
        j++;
        temp = $('[row='+ i + '][col=' + j + ']').text();

        if(temp === symbol)
            count++;
    }
    return count;
}

function checkDiag2( i, j, symbol ){
    var matches = checkDiag_NE(i, j, symbol) + checkDiag_SW(i, j, symbol);
    return matches;
}

function checkDiag_NE( i, j, symbol ){
    var count = 0;
    var temp = $('[row='+ i + '][col=' + j + ']').text();

    while(temp){
        i--;
        j++;
        temp = $('[row='+ i + '][col=' + j + ']').text();

        if(temp === symbol)
            count++;
    }
    return count;
}

function checkDiag_SW( i, j, symbol ){
    var count = 0;
    var temp = $('[row='+ i + '][col=' + j + ']').text();

    while(temp){
        i++;
        j--;
        temp = $('[row='+ i + '][col=' + j + ']').text();

        if(temp === symbol)
            count++;
    }
    return count;
}