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
      <div>
        <span>View by:</span>
        <select onChange={this.handleDimension}>
          <option value="category">Category</option>
          <option value="country">Country</option>
        </select>
      </div>
    )
  }
})