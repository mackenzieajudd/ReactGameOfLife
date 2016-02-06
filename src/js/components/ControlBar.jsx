var React = require('react')

var ControlBar = React.createClass({
  
  increasePeriod: function(){
      this.props.setPeriod(this.props.period + this.props.periodIncrement);
  },
  decreasePeriod: function(){
      if((this.props.period - this.props.periodIncrement) > 0){
          this.props.setPeriod(this.props.period - this.props.periodIncrement);
      }
  },
  render: function() {
    
    var controlFlowButton;
    
    if(this.props.paused){
        controlFlowButton = <div className="controlButton glyphicon glyphicon-play" onClick={this.props.play}></div>;
    }else{
        controlFlowButton = <div className="controlButton glyphicon glyphicon-pause" onClick={this.props.pause}></div>;
    }
    
    return (
        <div className="controlBar">
            <h1 className="mainTitle">React Game of Life</h1>
            <h3 className="ticksDisplay">Ticks: {this.props.ticks}</h3>
            <div className="periodControl">
                <button onClick={this.decreasePeriod}><i className="glyphicon glyphicon-chevron-left"></i></button>
                <h3 className="periodDisplay">Period (ms): {this.props.period}</h3>
                <button onClick={this.increasePeriod}><i className="glyphicon glyphicon-chevron-right"></i></button>
            </div>
            {controlFlowButton}
        </div>
    );
  }
});

module.exports = ControlBar;