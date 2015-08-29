import React from 'react'
import {Year} from './year.jsx'
import {Cat} from './cat.jsx'

import {map} from './../view/map.js'
import {pie} from './../view/pie.js'

//problem: how to deal with sub category??
export const BigBrother = React.createClass({
  PropTypes:{
    data: React.PropTypes.object.isRequired
  },
  getInitialState(){
    return{
      index: 14,
      cat: "Animals",
      subCat: "Bovine animals"
    }
  },
  componentDidMount(){    
    pie(this.props.data[this.state.cat][this.state.subCat], this.state.index)
  },
  handleYear(year){
    this.setState({
      index: year - 1999
    })
  },
  handleCategory(cat){
    this.setState({
      cat: cat
    })
  },
  render(){
    pie(this.props.data[this.state.cat][this.state.subCat], this.state.index)
    var keys = Object.keys(this.props.data)
    // console.log(keys)
    return(
      <div id="container">
        <div className="sub">
          <Cat options={keys} handleCat={this.handleCategory}></Cat>
        </div>
        <section className="aside">?sdffgdfgdfgsdfds?</section>
        <div className="main">
          <svg></svg>
          <Year handleYear={this.handleYear}></Year>
        </div>
      </div>
    )
  }
})