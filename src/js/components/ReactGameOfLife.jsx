var React = require('react')
var LifeBoard = require('../services/LifeBoard');
var Cell = require('./Cell');

var ReactGameOfLife = React.createClass({
  getInitialState: function() {
    return {lifeBoard: new LifeBoard(40, 40, [{x: 0, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 2}, {x: 3, y: 3}])};
  },
  componentDidMount: function(){
    var that = this;
    setInterval(function(){
        var lifeBoard = that.state.lifeBoard;
        lifeBoard.tick();
        that.setState({lifeBoard: lifeBoard});
    }, 1000);
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

module.exports = ReactGameOfLife;