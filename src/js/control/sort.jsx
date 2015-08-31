import React from 'react'

export const Sort = React.createClass({
  PropTypes:{
    handleSort: React.PropTypes.func.isRequired
  },
  handleClick(e){
    e.preventDefault()
    this.props.handleSort(e.target.value)
  },
  render(){ 
    return(
      <select onChange={this.handleClick}>
        <option value="subCategory">subCategory</option>
        <option value="country">country</option>
      </select>
    )
  }
})