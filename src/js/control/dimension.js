import React from 'react'

export const Dimension = React.createClass({
  PropTypes:{
    handleDimension : React.PropTypes.func.isRequired
  },
  handleDimension(e){
    e.preventDefault()
    this.props.handleDimension(e.target.value)
  },
  render(){
    return (
      <div className="choose">
        <span>Look at </span>
        <select onChange={this.handleDimension}>
          <option value="Country">Countries</option>
          <option value="Category">Categories</option>
        </select>
      </div>
    )
  }
})