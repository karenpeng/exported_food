import React from 'react'
import {Year} from './year.jsx'
import {Cat} from './cat.jsx'
import {Sort} from './sort.jsx'

import {initBar, updateBar} from '../view/bar.js'

export const BigBrother = React.createClass({
  PropTypes:{
    data: React.PropTypes.object.isRequired
  },
  getInitialState(){
    return{
      index: 15,
      cat: "Animals",
      sortBy: 'subCat'
    }
  },
  componentDidMount(){    
    //initBar()
    updateBar(this.props.data[this.state.cat], this.state.index)
  },
  handleYear(year){
    this.setState({
      index: year - 1999
    })
  },
  handleCategory(val){
    this.setState({
      cat: val
    })
  },
  handleSort(val){
    this.setState({
      sortBy: val
    })
  },
  render(){
    updateBar(this.props.data[this.state.cat], this.state.index)
    var keys = Object.keys(this.props.data)
    // console.log(keys)
    return(
      <div id="container">
        <div className="top">
          <Cat options={keys} handleCat={this.handleCategory}></Cat>
          <Sort handleSort={this.handleSort}></Sort>
        </div>
        <div className="main">
          <svg className="chart"></svg>
        </div>
        <section className="bottom">
          <Year handleYear={this.handleYear}></Year>
        </section>
      </div>
    )
  }
})