var CellState = require('../../src/js/model/enums/CellState');
var LifeBoard = require('../../src/js/services/LifeBoard.js');

describe('LiveBoard', function(){
    describe('creation', function(){
        it('should create empty board', function(){
            var boardUnderTest = new LifeBoard(0, 0, []);
            var board = boardUnderTest.getBoard();
            
            expect(board.length).toEqual(0);
        });
        
        it('should create 1x1 board with dead cell', function(){
            var boardUnderTest = new LifeBoard(1, 1, []);
            var board = boardUnderTest.getBoard();
            
            expect(board.length).toEqual(1);
            expect(board[0].length).toEqual(1);
            expect(board[0][0].state).toEqual(CellState.dead);
        });
        
        it('should create 2x2 board with dead cells', function(){
            var boardUnderTest = new LifeBoard(2, 2, []);
            var board = boardUnderTest.getBoard();
            
            expect(board.length).toEqual(2);
            expect(board[0].length).toEqual(2);
            expect(board[1].length).toEqual(2);
            expect(board[0][0].state).toEqual(CellState.dead);
            expect(board[0][1].state).toEqual(CellState.dead);
            expect(board[1][0].state).toEqual(CellState.dead);
            expect(board[1][1].state).toEqual(CellState.dead);
        });
        
        it('should create 2x2 board with dead cells - one live cell', function(){
            var boardUnderTest = new LifeBoard(2, 2, [{x: 1, y: 0}]);
            var board = boardUnderTest.getBoard();
            
            expect(board.length).toEqual(2);
            expect(board[0].length).toEqual(2);
            expect(board[1].length).toEqual(2);
            expect(board[0][0].state).toEqual(CellState.dead);
            expect(board[0][1].state).toEqual(CellState.dead);
            expect(board[1][0].state).toEqual(CellState.alive);
            expect(board[1][1].state).toEqual(CellState.dead);
        });
    });
    
    describe('makeAlive', function(){
        it('should make cell alive', function(){
            var boardUnderTest = new LifeBoard(1, 1, []);
            
            boardUnderTest.makeAlive({x: 0, y: 0});
            var board = boardUnderTest.getBoard();
            
            expect(board[0][0].state).toEqual(CellState.alive);
        });
    });
    
    describe('tick', function(){
        it('should bring cell to life', function(){
            
            var liveCoordinates = [
                {x: 1, y: 0},
                {x: 0, y: 0},
                {x: 0, y: 1}
            ];
            
            var boardUnderTest = new LifeBoard(2, 2, liveCoordinates);
            
            boardUnderTest.tick();
            
            var board = boardUnderTest.getBoard();
            
            expect(board[0][0].state).toEqual(CellState.alive);
            expect(board[0][1].state).toEqual(CellState.alive);
            expect(board[1][0].state).toEqual(CellState.alive);
            expect(board[1][1].state).toEqual(CellState.alive);
        });
        
        it('should extinct overpopulated board', function(){
            
            var liveCoordinates = [
                {x: 0, y: 0},
                {x: 0, y: 1},
                {x: 0, y: 2},
                {x: 1, y: 0},
                {x: 1, y: 1},
                {x: 1, y: 2},
                {x: 2, y: 0},
                {x: 2, y: 1},
                {x: 2, y: 2}
            ];
            
            var boardUnderTest = new LifeBoard(3, 3, liveCoordinates);
            
            boardUnderTest.tick();
            
            var board = boardUnderTest.getBoard();
            
            expect(board[0][0].state).toEqual(CellState.alive);
            expect(board[0][1].state).toEqual(CellState.dead);
            expect(board[0][2].state).toEqual(CellState.alive);
            expect(board[1][0].state).toEqual(CellState.dead);
            expect(board[1][1].state).toEqual(CellState.dead);
            expect(board[1][2].state).toEqual(CellState.dead);
            expect(board[2][0].state).toEqual(CellState.alive);
            expect(board[2][1].state).toEqual(CellState.dead);
            expect(board[2][2].state).toEqual(CellState.alive);
            
            boardUnderTest.tick();
            board = boardUnderTest.getBoard();
            
            expect(board[0][0].state).toEqual(CellState.dead);
            expect(board[0][1].state).toEqual(CellState.dead);
            expect(board[0][2].state).toEqual(CellState.dead);
            expect(board[1][0].state).toEqual(CellState.dead);
            expect(board[1][1].state).toEqual(CellState.dead);
            expect(board[1][2].state).toEqual(CellState.dead);
            expect(board[2][0].state).toEqual(CellState.dead);
            expect(board[2][1].state).toEqual(CellState.dead);
            expect(board[2][2].state).toEqual(CellState.dead);
        });
    });
});