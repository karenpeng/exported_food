import React from 'react'

export const Cat = React.createClass({
  PropTypes:{
    options1: React.PropTypes.array.isRequired,
    options2: React.PropTypes.array.isRequired,
    handleCat: React.PropTypes.func.isRequired,
    handleSubcat: React.PropTypes.func.isRequired
  },
  handleClick1(e){
    e.preventDefault()
    this.props.handleCat(e.target.value)
  },
  handleClick2(e){
    e.preventDefault()
    this.props.handleSubcat(e.target.value)
  },
  render(){

    let show = this.props.options2 === null ? {display:'none'} : {display: 'inline'}
    let options1, options2

    options1 = this.props.options1.map((d, i) =>{
      return(
        <option value={d}>{d}</option>
      )
    })

    options2 = this.props.options2 === null ? 
    this.props.option2 : this.props.options2.map((d, i) =>{
    return(
      <option value={d}>{d}</option>
      )
    })

    return(
      <div>
        <select id="catMenu1" onChange={this.handleClick1}>
          {options1}
        </select>
        <select style={show} id="catMenu2" onChange={this.handleClick2}>
          {options2}
        </select>
      </div>
    )
  }
})