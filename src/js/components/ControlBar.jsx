var React = require('react')

var ControlBar = React.createClass({
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
            <small className="littleTitle">By MacKenzie Judd</small>
            <h3 className="ticksDisplay">Ticks: {this.props.ticks}</h3>
            {controlFlowButton}
        </div>
    );
  }
});

module.exports = ControlBar;