import React from 'react'

export const Cat = React.createClass({
  PropTypes:{
    options: React.PropTypes.array.isRequired,
    handleCat: React.PropTypes.func.isRequired
  },
  handleClick(e){
    e.preventDefault()
    this.props.handleCat(e.target.value)
  },
  render(){
    let options = this.props.options.map((d, i) =>{
      return(
        <option key={i} value={d}>{d}</option>
      )
    }) 
    return(
      <select onChange={this.handleClick}>
        {options}
      </select>
    )
  }
})