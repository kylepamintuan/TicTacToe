$(document).ready(initializeApp);

var playerOne = {
    name: 'Player 1',
    symbol: 'X',
    wins: 0,
    losses: 0,
    catsGames: 0,
    color: 'red'
};

var playerTwo = {
    name: 'Player 2',
    symbol: 'O',
    wins: 0,
    losses: 0,
    catsGames: 0,
    color: 'blue'
};

var currentPlayer = playerOne;
var gameSize = 3;
var moves = 0;
var resetButton = $('<button>').text('RESET');
var winner;

function initializeApp(){
    console.log('Initializing App...');
    makeGameBoard(gameSize);
    $('#reset').append(resetButton);
    $('#reset').click(resetGame);
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

function squareClickEventHandler(){
    var current_square = $(event.currentTarget);

    //console.log('square clicked: [' + current_square.attr('row') + '][' + current_square.attr('col') + ']');

    current_square.toggleClass('clicked');
    current_square.text(currentPlayer.symbol);
    moves++;
    if(moves >= gameSize*2-1){
        checkGameWin(current_square);
    }
    current_square.off('click');
    changeCurrentPlayer();
}

function changeCurrentPlayer(){
    if(currentPlayer === playerOne){
        currentPlayer = playerTwo;
        $('.player2_container').removeClass('otherPlayer');
        $('.player1_container').addClass('otherPlayer');

    }else{
        currentPlayer = playerOne;
        $('.player1_container').removeClass('otherPlayer');
        $('.player2_container').addClass('otherPlayer');
    }
}

function gameOver( str ){
    if( str === playerOne.name){
        $('.player1_container .wins').text(++playerOne.wins);
        $('.player2_container .losses').text(++playerTwo.losses);
    }else if (str === playerTwo.name){
        $('.player2_container .wins').text(++playerTwo.wins);
        $('.player1_container .losses').text(++playerOne.losses);
    }else{
        $('.player1_container .catsGames').text(++playerOne.catsGames);
        $('.player2_container .catsGames').text(++playerTwo.catsGames);
    }
}

function checkGameWin( lastSquareClicked ){
    var row = lastSquareClicked.attr('row');
    var col = lastSquareClicked.attr('col');
    var symbol = lastSquareClicked.text();
    var winning_matches = gameSize-1;
    var rowNum = null;
    var colNum = null;
    var row_matches = checkRow(row,col,symbol);
    var col_matches = checkCol(row,col,symbol);
    var diag1_matches = checkDiag1(row,col,symbol);
    var diag2_matches = checkDiag2(row,col,symbol);

    if(row_matches === winning_matches){
        rowNum = parseInt(row);
        $('[row='+ rowNum + ']').addClass('winner');
        winner = currentPlayer.name;
        $('.square').off('click');
    } else if(col_matches === winning_matches){
        colNum = parseInt(col);
        $('[col='+ colNum + ']').addClass('winner');
        winner = currentPlayer.name;
        $('.square').off('click');
    } else if(diag1_matches === winning_matches){
        for (var rowColIndex=0; rowColIndex<gameSize; rowColIndex++){
            $('[row='+ rowColIndex + '][col=' + rowColIndex + ']').addClass('winner');
        }
        winner = currentPlayer.name;
        $('.square').off('click');
    } else if(diag2_matches === winning_matches){
        for (var colIndex=0, rowIndex = gameSize - 1; colIndex<gameSize, rowIndex >= 0; colIndex++, rowIndex--){
            $('[row=' + rowIndex + '][col=' + colIndex + ']').addClass('winner');
        }
        winner = currentPlayer.name;
        $('.square').off('click');
    }
}

function checkRow( x, y, symbol ){
    var rowCountSum = checkRight(x, y, symbol) + checkLeft(x, y, symbol);
    return rowCountSum;
}

function checkRight( x, y, symbol ){
    var count = 0;
    var squareContent = $('[row='+ x + '][col=' + y + ']').text();

    while(squareContent){ //while not empty, keep checking the one on the right if they match
        y++;
        squareContent = $('[row='+ x + '][col=' + y + ']').text();
        if(squareContent === symbol)
            count++;
        else
            break;
    }
    return count;
}

function checkLeft( x, y, symbol ){
    var count = 0;
    var squareContent = $('[row='+ x + '][col=' + y + ']').text();

    while(squareContent){ //while not empty, keep checking the one on the left if they match
        y--;
        squareContent = $('[row='+ x + '][col=' + y + ']').text();
        if(squareContent === symbol)
            count++;
        else
            break;
    }
    return count;
}

function checkCol( x, y, symbol ){
    var colCountSum = checkUp(x, y, symbol) + checkDown(x, y, symbol);
    return colCountSum;
}

function checkUp( x, y, symbol ){
    var count = 0;
    var squareContent = $('[row='+ x + '][col=' + y + ']').text();

    while(squareContent){
        x--;
        squareContent = $('[row='+ x + '][col=' + y + ']').text();
        if(squareContent === symbol)
            count++;
        else
            break;
    }
    return count;
}

function checkDown( x, y, symbol ){
    var count = 0;
    var squareContent = $('[row='+ x + '][col=' + y + ']').text();

    while(squareContent){
        x++;
        squareContent = $('[row='+ x + '][col=' + y + ']').text();
        if(squareContent === symbol)
            count++;
        else
            break;
    }
    return count;
}

function checkDiag1( x, y, symbol ){
    var diaCountSum = checkDiag_NW(x, y, symbol) + checkDiag_SE(x, y, symbol);
    return diaCountSum;
}

function checkDiag_NW( x, y, symbol ){
    var count = 0;
    var squareContent = $('[row='+ x + '][col=' + y + ']').text();

    while(squareContent){
        x--;
        y--;
        squareContent = $('[row='+ x + '][col=' + y + ']').text();
        if(squareContent === symbol)
            count++;
        else
            break;
    }
    return count;
}

function checkDiag_SE( x, y, symbol ){
    var count = 0;
    var squareContent = $('[row='+ x + '][col=' + y + ']').text();

    while(squareContent){
        x++;
        y++;
        squareContent = $('[row='+ x + '][col=' + y + ']').text();
        if(squareContent === symbol)
            count++;
        else
            break;
    }
    return count;
}

function checkDiag2( x, y, symbol ){
    var diaCountSum = checkDiag_NE(x, y, symbol) + checkDiag_SW(x, y, symbol);
    return diaCountSum;
}

function checkDiag_NE( x, y, symbol ){
    var count = 0;
    var squareContent = $('[row='+ x + '][col=' + y + ']').text();

    while(squareContent){
        x--;
        y++;
        squareContent = $('[row='+ x + '][col=' + y + ']').text();
        if(squareContent === symbol)
            count++;
        else
            break;
    }
    return count;
}

function checkDiag_SW( x, y, symbol ){
    var count = 0;
    var squareContent = $('[row='+ x + '][col=' + y + ']').text();

    while(squareContent){
        x++;
        y--;
        squareContent = $('[row='+ x + '][col=' + y + ']').text();
        if(squareContent === symbol)
            count++;
        else
            break;
    }
    return count;
}

function resetGame (){
    $('.gameBoard').empty();
    initializeApp();
    moves = 0;
    $('square').on('click', squareClickEventHandler);
    $('.player1_container').removeClass('otherPlayer');
    $('.player2_container').removeClass('otherPlayer');
}
