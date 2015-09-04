import Rcslider from 'rc-slider'
import React from 'react'

export const Year = React.createClass({
  PropTypes:{
    handleYear: React.PropTypes.func.isRequired
  },
  handleSlide(e){
    this.props.handleYear(e.target.value)
  },
  render(){
    let _w = {width: window.innerWidth - 240 + 'px'}
    // return(
    //   <input id="yearBar" style={_w} type="range"
    //     defaultValue="2014" min="1999" max="2014" 
    //     onChange={this.handleSlide}/>
    // )
    return (
      <Rcslider id="yearBar" style={_w}
        defaultValue={2014} min={1999} max={2014} 
        onChange={this.handleSlide}
        tipTransitionName='zoom-down'></Rcslider>
    )
  }
})