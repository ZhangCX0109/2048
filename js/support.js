/**
 * Created by a1 on 16/9/22.
 */
documentWidth = window.screen.availWidth;
gridContainerWidth = 0.92 * documentWidth;
cellSidelength = 0.18 * documentWidth;
cellSpace = 0.04 * documentWidth;

function getTopDistance(i, j){
    return cellSpace + i * (cellSpace + cellSidelength);
}
function getLeftDistance(i, j){
    return cellSpace + j * (cellSpace + cellSidelength);
}
function getNumberBackgroundColor(number,cell){
    switch (number){
        case 2:cell.text("列兵"); return "#afeeee";break;
        case 4:cell.text("士官");return "#00bfff";break;
        case 8:cell.text("少尉");return "#6495ed";break;
        case 16:cell.text("中尉");return "#6495ed";break;
        case 32:cell.text("上尉");return "#6495ed";break;
        case 64:cell.text("少校");return "#00004d";break;
        case 128:cell.text("中校");return "#00004d";break;
        case 256:cell.text("上校");return "#00004d";break;
        case 512:cell.text("大校");return "#00004d";break;
        case 1024:cell.text("少将");return "#eeee8aa";break;
        case 2048:cell.text("中将");return "#eeee8aa";break;
        case 4096:cell.text("上将");return "#eeee8aa";break;
        case 8192:cell.text("元帅");return "#ff8c00";break;
    }
    return "black";
}

function getNumberColor(number){
    if(number >= 64 && number < 1024){
        return "#fffacd";
    }else if(number >= 1024){
        return "#9400d3";
    }else if(number < 64){
        return 'black';
    }

}
function noSpace(board){
    var count = 0;
    for(var i = 0; i < 4 ; i++){
        for(var j = 0; j < 4; j++){
            if(board[i][j] == 0){
                hasSpace[count] = new Array();
                for(var k = 0;k < 2; k++){
                    if(k ==0){
                        hasSpace[count][k] = i;
                    }else if(k == 1){
                        hasSpace[count][k] = j;
                    }
                }
                count++;
            }
        }
    }

    if(hasSpace.length == 0){
        return true;
    }
    return false;
}
function canMoveLeft(board){
    for(var i = 0; i < 4; i++){
        for(var j = 1; j < 4; j++){
            if(board[i][j] != 0){
                if(board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}
function canMoveRight(board){
    for(var i = 0; i < 4; i++){
        for(var j = 2; j >= 0; j-- ){
            if(board[i][j] != 0){
                if(board[i][j + 1] == 0 || board[i][j + 1] == board[i][j]){
                    return true;
                }
            }
        }
    }

    return false;
}

function canMoveUp(board){
    for(var i = 1; i < 4; i++){
        for(var j = 0; j < 4; j++ ){
            if(board[i][j] != 0){
                if(board[i - 1][j] == 0 || board[i - 1][j] == board[i][j]){
                    return true;
                }
            }
        }
    }

    return false;
}

function canMoveDown(board){
    for(var i = 2; i >= 0; i--){
        for(var j = 0; j < 4; j++ ){
            if(board[i][j] != 0){
                if(board[i + 1][j] == 0 || board[i + 1][j] == board[i][j]){
                    return true;
                }
            }
        }
    }

    return false;
}


function noBlockHorizontal(row, col1, col2, board){
    for(var i = col1 + 1; i < col2 ; i++){
        if(board[row][i] != 0){
            return false;
        }
    }
    return true;
}

function noBlockVartical(row, col1, col2, board){
    for(var i = col1 + 1; i < col2; i++){
        if(board[i][row] != 0){
            return false;
        }
    }
    return true;
}

function nomove (board){
    if(canMoveLeft(board) ||
        canMoveRight(board)||
        canMoveUp(board)||
        canMoveDown(board)){
        return false;
    }

    return true;
}