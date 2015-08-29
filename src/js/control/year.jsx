import React from 'react'
import d3 from 'd3'

let Year = React.createClass({
  PropTypes:{
    handleYear: React.PropTypes.func.isRequired
  },
  getInitialState: function(){
    return {
      year: 2014
    }
  },
  handleSlide: function(e){
    e.preventDefault()
    this.setState({
      year: e.target.value
    })
    this.props.handleYear(e.target.value)
  },
  render: function(){
    return(
      <input className="bottom" type="range" value={this.state.year} min="1999" max="2014" step="1" onChange={this.handleSlide}/>
    )
  }
})

module.exports = Year