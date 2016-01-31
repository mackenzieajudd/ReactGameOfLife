var React = require('react')
var LifeBoard = require('../services/LifeBoard');
var Cell = require('./Cell');
var Board = require('./Board');
var ControlBar = require('./ControlBar');

var ReactGameOfLife = React.createClass({
  getInitialState: function() {
    return {paused: false, period: 300, ticks: 0};
  },
  play: function(){
      var state = this.state;
      this.setState({paused: false, period: state.period, ticks: state.ticks});
  },
  pause: function(){
      var state = this.state;
      this.setState({paused: true, period: state.period, ticks: state.ticks});
  },
  setPeriod: function(period){
      var state = this.state;
      this.setState({paused: state.paused, period: period, ticks: state.ticks});
  },
  registerTick: function(period){
      var state = this.state;
      var ticks = state.ticks + 1;
      this.setState({paused: state.paused, period: state.period, ticks: ticks});
  },
  render: function() {
    return (
        <div>
            <ControlBar paused={this.state.paused} play={this.play} pause={this.pause} setPeriod={this.setPeriod} ticks={this.state.ticks}/>
            <div id="boardContainer">
                <Board xSize="100" ySize="50" period={this.state.period} shouldTick={!this.state.paused} registerTick={this.registerTick}/>
            </div>
        </div>
    );
  }
});

module.exports = ReactGameOfLife;