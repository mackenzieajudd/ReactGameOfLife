var LifeRuleEngine = require('../../src/js/services/LifeRuleEngine.js');
var CellState = require('../../src/js/model/enums/CellState');
var Cell = require('../../src/js/model/Cell');

describe('LifeRuleEngine', function(){
    describe('applyTransition', function(){
        it('should return dead cell - no live neighbours - live cell', function(){
            var engineUnderTest = new LifeRuleEngine();
            var targetCell = new Cell(CellState.alive);
            
            var result = engineUnderTest.applyTransition(createNeighbors(0, 8), targetCell);
            
            expect(result.state).toEqual(CellState.dead);
        });
        
        it('should return dead cell - one live neighbour - live cell', function(){
            var engineUnderTest = new LifeRuleEngine();
            var liveCell = new Cell(CellState.alive);
            
            var result = engineUnderTest.applyTransition(createNeighbors(1, 7), liveCell);
            
            expect(result.state).toEqual(CellState.dead);
        });
        
        it('should return live cell - two live neighbours - live cell', function(){
            var engineUnderTest = new LifeRuleEngine();
            var liveCell = new Cell(CellState.alive);
            
            var result = engineUnderTest.applyTransition(createNeighbors(2, 6), liveCell);
            
            expect(result.state).toEqual(CellState.alive);
        });
        
        it('should return live cell - three live neighbours - live cell', function(){
            var engineUnderTest = new LifeRuleEngine();
            var liveCell = new Cell(CellState.alive);
            
            var result = engineUnderTest.applyTransition(createNeighbors(3, 5), liveCell);
            
            expect(result.state).toEqual(CellState.alive);
        });
        
        it('should return dead cell - four live neighbours - live cell', function(){
            var engineUnderTest = new LifeRuleEngine();
            var liveCell = new Cell(CellState.alive);
            
            var result = engineUnderTest.applyTransition(createNeighbors(4, 4), liveCell);
            
            expect(result.state).toEqual(CellState.dead);
        });
        
        it('should return dead cell - five live neighbours - live cell', function(){
            var engineUnderTest = new LifeRuleEngine();
            var liveCell = new Cell(CellState.alive);
            
            var result = engineUnderTest.applyTransition(createNeighbors(5, 3), liveCell);
            
            expect(result.state).toEqual(CellState.dead);
        });
        
        it('should return dead cell - two live neighbours - dead cell', function(){
            var engineUnderTest = new LifeRuleEngine();
            var deadCell = new Cell(CellState.dead);
            
            var result = engineUnderTest.applyTransition(createNeighbors(2, 6), deadCell);
            
            expect(result.state).toEqual(CellState.dead);
        });
        
        it('should return live cell - three live neighbours - dead cell', function(){
            var engineUnderTest = new LifeRuleEngine();
            var deadCell = new Cell(CellState.dead);
            
            var result = engineUnderTest.applyTransition(createNeighbors(3, 5), deadCell);
            
            expect(result.state).toEqual(CellState.alive);
        });
        
        it('should return dead cell - four live neighbours - dead cell', function(){
            var engineUnderTest = new LifeRuleEngine();
            var deadCell = new Cell(CellState.dead);
            
            var result = engineUnderTest.applyTransition(createNeighbors(4, 4), deadCell);
            
            expect(result.state).toEqual(CellState.dead);
        });
        
        function createNeighbors(aliveCount, deadCount){
            var neighbours = [];
            var i;
            var liveCell = new Cell(CellState.alive);
            var deadCell = new Cell(CellState.dead);
            
            for(i = 0; i < aliveCount; i++){
                neighbours.push(liveCell);
            }
            
            for(i = 0; i < deadCount; i++){
                neighbours.push(deadCell);
            }
            
            return neighbours;
        }
    });
});