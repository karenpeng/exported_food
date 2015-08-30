import React from 'react'

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
    let _w = {width: window.innerWidth - 100 + 'px'}
    return(
      <input id="yearBar" style={_w} type="range" value={this.state.year} min="1999" max="2014" step="1" onChange={this.handleSlide}/>
    )
  }
})