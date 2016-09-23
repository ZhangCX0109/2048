/**
 * Created by a1 on 16/9/22.
 */
function showNumberWithAnimation (i, j, randNumber){
    var numberCell = $('#number-cell-' + i + '-' + j);

    numberCell.css('background-color', getNumberBackgroundColor(randNumber,numberCell));
    numberCell.css('color',getNumberColor(randNumber));
//    numberCell.text(randNumber);

    numberCell.animate({
        width:cellSidelength,
        height:cellSidelength,
        top:getTopDistance(i, j),
        left:getLeftDistance(i, j)
    },50);
}

function showMoveAnimation(fromx, fromy, tox, toy){
    var numberCell = $('#number-cell-' + fromx + '-' + fromy);
    numberCell.animate({
        top:getTopDistance(tox,toy),
        left:getLeftDistance(tox,toy)
    },200);
}
function updateScore(score){
    $('#score').text(score);
}