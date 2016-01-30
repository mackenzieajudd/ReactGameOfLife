var CellState = require('../model/enums/CellState');
var Cell = require('../model/Cell');

var LifeRuleEngine = function(){
    
    this.applyTransition = function(neighbours, cell){
        
        var liveNeighbours = countLiveNeighbours(neighbours);
        
        switch (cell.state){
            case CellState.alive:
                return applyLiveCellRules(liveNeighbours);
            case CellState.dead:
                return applyDeadCellRules(liveNeighbours);
        }
        
        return null;
    };
    
    function applyLiveCellRules(liveNeighbours){
        switch(liveNeighbours){
            case 0:
            case 1:
                return new Cell(CellState.dead);
            case 2:
            case 3:
                return new Cell(CellState.alive);
            default:
                return new Cell(CellState.dead); 
        }
    }
    
    function applyDeadCellRules(liveNeighbours){
        if(liveNeighbours === 3){
            return new Cell(CellState.alive);
        }
        return new Cell(CellState.dead);
    }
    
    function countLiveNeighbours(neighbours){
        var liveNeighbourCount = 0;
        
        for(var i = 0; i < neighbours.length; i++){
            if(neighbours[i].state === CellState.alive){
                liveNeighbourCount++;
            }
        }
        
        return liveNeighbourCount;
    }
};

module.exports = LifeRuleEngine;