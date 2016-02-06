var React = require('react')
var LifeBoard = require('../services/LifeBoard');
var Cell = require('./Cell');

var Board = React.createClass({
  getInitialState: function() {
    return {lifeBoard: new LifeBoard(
        this.props.xSize, 
        this.props.ySize, 
        [])
    };
  },
  componentDidMount: function(){
    this.doTick();
  },
  doTick: function(){
    var that = this;
    setTimeout(function(){
        that.doTick();
    }, this.props.period);
    
    if(this.props.shouldTick){
        var lifeBoard = this.state.lifeBoard;
        lifeBoard.tick();
        this.props.registerTick();
        this.setState({lifeBoard: lifeBoard});
    }
  },
  makeAlive: function(coordinates){
    var lifeBoard = this.state.lifeBoard;
    lifeBoard.makeAlive(coordinates);
    this.setState({lifeBoard: lifeBoard});
  },
  render: function() {
    var board = this.state.lifeBoard.getBoard();
    var content = [];
    
    var ySize = board[0].length;
    var xSize = board.length;
    
    for(var y = 0; y < ySize; y++){
        var rowContent = []
        
        for(var x = 0; x < xSize; x++){
           var cell = board[x][y];
           var coordinates = {x: x, y: y};
           var key = "x:" + x + "y:" + y;
           rowContent.push(<Cell cell={cell} coordinates={coordinates} makeAlive={this.makeAlive} key={key}/>);
        }

        content.push(<div className="cellRow" key={y}>{rowContent}</div>);
    }
    
    return (
        <div className="board">
            {content}
        </div>
    );
  }
});

module.exports = Board;