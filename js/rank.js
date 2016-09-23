/**
 * Created by a1 on 16/9/22.
 */
var board = new Array();
var hasConflicted = new Array();
var score;
var hasSpace

$(document).ready(function(){
    gameForMobile();
   newGame();
});

function newGame(){
    //初始化棋盘格
    init();
    //随机生成一个数字
    randomlyOneNumber();
    randomlyOneNumber();
    judgeRank();
}
function gameForMobile(){

    if(documentWidth > 500){
        gridContainerWidth = 500;
        cellSpace = 20;
        cellSidelength = 100;
    }
    $('#grid-container').css('width',gridContainerWidth - 2 * cellSpace);
    $('#grid-container').css('height',gridContainerWidth - 2 * cellSpace);
    $('#grid-container').css('padding',cellSpace);
    $('#grid-container').css('border-radius',0.02 * gridContainerWidth);


    $('#gameOver-overly').css('margin-top',-gridContainerWidth*1.05);


    $('.grid-cell').css('width',cellSidelength);
    $('.grid-cell').css('height',cellSidelength);
    $('.grid-cell').css('border-radius',0.02 * cellSidelength);
}
function init(){
    for(var i = 0; i < 4; i++){
        for(var j = 0 ; j < 4; j++){
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css('top',getTopDistance(i, j));
            gridCell.css('left',getLeftDistance(i, j));
        }
    }

    //    二维数组
    for(var i = 0; i < 4; i++){
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for( var j = 0; j < 4; j++){
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }
    updateBoardView();
    score = 0;
    updateScore(score);
    $('#gameOver-overly').css('display','none');

}
function updateBoardView(){
    $(".number-cell").remove();
    for(var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++){
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+ i + '-' + j +'"></div>');
            var theNumberCell = $('#number-cell-' + i + '-' + j);
                theNumberCell.css('z-index','3');
            if(board[i][j] == 0){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getTopDistance(i,j) + 0.5 * cellSidelength);
                theNumberCell.css('left',getLeftDistance(i,j) + 0.5 * cellSidelength);

            }else{
                theNumberCell.css('width',cellSidelength);
                theNumberCell.css('height',cellSidelength);
                theNumberCell.css('top',getTopDistance(i,j));
                theNumberCell.css('left',getLeftDistance(i,j));
                theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j],theNumberCell));
                theNumberCell.css('color',getNumberColor(board[i][j]));
//                theNumberCell.text(board[i][j]);
            }
            hasConflicted[i][j] = false;
        }
    }
    $('.number-cell').css('line-height',cellSidelength + 'px');
    $('.number-cell').css('font-size',0.3 * cellSidelength + 'px');
}
function randomlyOneNumber(){
    if(hasSpace === undefined){
        hasSpace = new  Array();
    }else{
        hasSpace.splice(0,hasSpace.length);
    }
    if(noSpace(board)){
        return false;
    }
    //随机一个位置
    var randIndex = parseInt(Math.floor(Math.random() * hasSpace.length));
    var randi = hasSpace[randIndex][0];
    var randj = hasSpace[randIndex][1];
    //随机一个数字
    var randNumber = Math.random() < 0.5 ? 2 : 4;
    board[randi][randj] = randNumber;
    showNumberWithAnimation(randi, randj,randNumber);

    return true;
}

$(document).keydown(function (event){
    switch (event.keyCode){

        case 37://left
            event.preventDefault();

            if(moveLeft()){

                randomlyOneNumber();
                isgameover();
            }
            break;
        case 38://up
            event.preventDefault();

            if(moveUp()){
                randomlyOneNumber();
                isgameover();
            }
            break;
        case 39://right
            event.preventDefault();

            if(moveRight()){
                randomlyOneNumber();
                isgameover();
            }
            break;
        case 40://down
            event.preventDefault();

            if(moveDown()){
                randomlyOneNumber();
                isgameover();
            }
            break;
        default :
            break;
    }
});

document.addEventListener('touchstart',function(event){
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;

});
document.addEventListener('touchmove',function(event){
    event.preventDefault();
});
document.addEventListener('touchend',function(event){
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;

    var deltax = endx - startx;
    var deltay = endy - starty;

    if(Math.abs(deltax) < 0.1 *documentWidth && Math.abs(deltay)< 0.3 * documentWidth){
        return;
    }

    //x
    if(Math.abs(deltax) > Math.abs(deltay)){
        //right
        if(deltax > 0){
            if(moveRight()){
                randomlyOneNumber();
                isgameover();
            }
        }else{
            if(moveLeft()){

                randomlyOneNumber();
                isgameover();
            }
        }

    }else{
        if(deltay > 0){
            if(moveDown()){
                randomlyOneNumber();
                isgameover();
            }
        }else{
            if(moveUp()){
                randomlyOneNumber();
                isgameover();
            }
        }
    }

});
function isgameover(){

    if(nomove(board)){

        gameover();
    }
}
function gameover(){
//    $('#gameOver-overly').animate({
//       display:block
//    },200);
    $('#gameOver-overly').css('display','block');
}

function moveLeft(){
    if(!canMoveLeft(board)){
        return false;
    }
    //moveLeft
    for(var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if(board[i][j] != 0){
                for(var k = 0; k < j; k++){
                    if(board[i][k] == 0 && noBlockHorizontal(i, k ,j , board)){
                        //move
                        showMoveAnimation(i , j , i , k );
                        board[i][k] = board[i][j];
                        board[i][j] = 0;

                        continue;
                    }else if(board[i][j] == board[i][k] && noBlockHorizontal(i, k ,j , board) && !hasConflicted[i][k]){
                        showMoveAnimation(i , j , i , k );
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        score += 1;
                        judgeRank();
                        updateScore(score);
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()",200)
    ;
    return true;
}
function moveRight(){
    if(!canMoveRight(board)){
        return false;
    }
    //moveRight
    for(var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if(board[i][j] != 0){
                for(var k = 3; k > j; k--){
                    if(board[i][k] == 0 && noBlockHorizontal(i, j ,k , board)){
                        //move
                        showMoveAnimation(i , j , i , k );
                        board[i][k] = board[i][j];
                        board[i][j] = 0;

                        continue;
                    }else if(board[i][j] == board[i][k] && noBlockHorizontal(i, j ,k , board) && !hasConflicted[i][k]){
                        showMoveAnimation(i , j , i , k );
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        score += 1;
                        judgeRank();
                        updateScore(score);
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()",200)
    ;
    return true;
}

function moveUp(){
    if(!canMoveUp(board)){
        return false;
    }
    //moveUp
    for(var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if(board[i][j] != 0){
                for(var k = 0; k < i; k++){
                    if(board[k][j] == 0 && noBlockVartical(j, k , i , board) ){
                        //move
                        showMoveAnimation(i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;

                        continue;
                    }else if(board[i][j] == board[k][j] && noBlockVartical(j, k , i , board)&& !hasConflicted[k][j]){
                        showMoveAnimation(i , j , k , j );
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        score += 1;
                        judgeRank();
                        updateScore(score);
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()",200)
    ;
    return true;
}

function moveDown() {
    if (!canMoveDown(board)) {
        return false;
    }
    //moveDown
    for (var i = 2; i >= 0; i--) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 3; k > i; k--) {
                    if (board[k][j] == 0 && noBlockVartical(j, i, k, board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;

                        continue;
                    } else if (board[i][j] == board[k][j] && noBlockVartical(j, i, k, board) && !hasConflicted[k][j]) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        score += 1;
                        judgeRank();
                        updateScore(score);
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);
    return true;
}

function judgeRank(){
    var max = 2;
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
            if(board[i][j] > max){
                max = board[i][j];
            }
        }
    }

    getNumberBackgroundColor(max,$('#rank'));
}