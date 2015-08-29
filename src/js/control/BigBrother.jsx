import React from 'react'
import Year from './year.jsx'
import {Cat} from './cat.jsx'

import map from './../view/map.js'
import {pie} from './../view/pie.js'


let BigBrother = React.createClass({
  PropTypes:{
    data: React.PropTypes.object.isRequired
  },
  getInitialState: function(){
    return{
      index: 14,
      cat: "Animals",
      subCat: "Bovine animals"
    }
  },
  componentDidMount: function(){    
    pie(this.props.data[this.state.cat][this.state.subCat], this.state.index)
  },
  handleYear: function(year){
    this.setState({
      index: year - 1999
    })
  },
  handleCategory: function(cat){
    this.setState({
      cat: cat
    })
  },
  render: function(){

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

module.exports = BigBrother