var LifeRuleEngine = require('./LifeRuleEngine.js');
var CellState = require('../model/enums/CellState');
var Cell = require('../model/Cell');

var LifeBoard = function(xSize, ySize, liveCoordinates){
    
    var board;
    var liveCell = new Cell(CellState.alive);
    var deadCell = new Cell(CellState.dead);
    
    var rulesEngine = new LifeRuleEngine();
    
    function initializeBoard(){
        board = [];
        for(var x = 0; x < xSize; x++){
            var column = [];
            for(var y = 0; y < ySize; y++){
                column.push(deadCell);
            }
            board.push(column);
        }
        giveBirthAtCoordinates(liveCoordinates);
    }
    
    function giveBirthAtCoordinates(coordinates){
        for(var i = 0; i < coordinates.length; i++){
            board[coordinates[i].x][coordinates[i].y] = liveCell;
        }
    }
    
    function getNeighbours(x, y, board){
        
        var neighbourCoordinates = getNeighbourCoordinates(x, y);
        
        var neighbours = [];
        for(var i = 0; i < neighbourCoordinates.length; i++){
            neighbours.push(board[neighbourCoordinates[i].x][neighbourCoordinates[i].y]);
        }
        
        return neighbours;
    }
    
    function getNeighbourCoordinates(x, y){
        var neighbourCoordinates = [];
        neighbourCoordinates.push({x: x - 1, y: y - 1});
        neighbourCoordinates.push({x: x, y: y - 1});
        neighbourCoordinates.push({x: x + 1, y: y - 1});
        neighbourCoordinates.push({x: x - 1, y: y});
        neighbourCoordinates.push({x: x + 1, y: y});
        neighbourCoordinates.push({x: x - 1, y: y + 1});
        neighbourCoordinates.push({x: x, y: y + 1});
        neighbourCoordinates.push({x: x + 1, y: y + 1});
        return neighbourCoordinates.filter(isValidCoordinate);
    }
    
    function isValidCoordinate(coordinate){
        return coordinate.x >= 0 &&
            coordinate.x < xSize &&
            coordinate.y >= 0 &&
            coordinate.y < ySize;
    }
    
    this.getBoard = function(){
        return copyBoard(board);
    };
    
    this.tick = function(){
        var tempBoard = copyBoard(board);
        for(var x = 0; x < xSize; x++){
            for(var y = 0; y < ySize; y++){
                var cell = board[x][y];
                var neighbours = getNeighbours(x, y, board);
                tempBoard[x][y] = rulesEngine.applyTransition(neighbours, cell);
            }
        }
        board = tempBoard;
    };
    
    this.makeAlive = function(coordinates){
        board[coordinates.x][coordinates.y] = liveCell;
    };
    
    function copyBoard(board){
        var boardCopy = [];
        for(var i = 0; i < board.length; i++){
            boardCopy[i] = board[i].slice();
        }
        return boardCopy;
    }
    
    initializeBoard();
};

module.exports = LifeBoard;