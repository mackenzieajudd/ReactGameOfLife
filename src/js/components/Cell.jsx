var React = require('react')

var Cell = React.createClass({
  makeAlive: function(){
      this.props.makeAlive(this.props.coordinates);
  },
  render: function() {
    
    var state = this.props.cell.state;
    
    return (
        <div className={"cell " + state} onClick={this.makeAlive}></div>
    );
  }
});

module.exports = Cell;