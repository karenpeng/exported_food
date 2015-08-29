import React from 'react'
import d3 from 'd3'

export const Year = React.createClass({
  PropTypes:{
    handleYear: React.PropTypes.func.isRequired
  },
  getInitialState(){
    return {
      year: 2014
    }
  },
  handleSlide(e){
    e.preventDefault()
    this.setState({
      year: e.target.value
    })
    this.props.handleYear(e.target.value)
  },
  render(){
    return(
      <input className="bottom" type="range" value={this.state.year} min="1999" max="2014" step="1" onChange={this.handleSlide}/>
    )
  }
})