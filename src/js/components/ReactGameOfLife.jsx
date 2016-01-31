var React = require('react')
var LifeBoard = require('../services/LifeBoard');
var Cell = require('./Cell');
var Board = require('./Board');
var ControlBar = require('./ControlBar');

var ReactGameOfLife = React.createClass({
  getInitialState: function() {
    return {paused: false};
  },
  play: function(){
      this.setState({paused: false});
  },
  pause: function(){
      this.setState({paused: true});
  },
  render: function() {
    return (
        <div>
            <ControlBar paused={this.state.paused} play={this.play} pause={this.pause}/>
            <Board xSize="100" ySize="40" period="1000" shouldTick={!this.state.paused}/>
        </div>
    );
  }
});

module.exports = ReactGameOfLife;