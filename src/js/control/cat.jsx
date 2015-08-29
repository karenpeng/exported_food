import React from 'react'

export let Cat = React.createClass({
  PropTypes:{
    options: React.PropTypes.array.isRequired,
    handleCat: React.PropTypes.func.isRequired
  },
  handleClick: function(e){
    e.preventDefault()
    this.props.handleCat(e.target.value)
  },
  render: function(){
    let options = this.props.options.map((d, i) =>{
      return(
        <option key={i} value={d}>{d}</option>
      )
    }.bind(this)) 
    return(
      <select onChange={this.handleClick}>
        {options}
      </select>
    )
  }

})