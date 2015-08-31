import React from 'react'

//data model
import {getAll} from '../dataModel/getAll.js'
import {getCatForLine} from '../dataModel/getCat.js'
import {getCountryForBar} from '../dataModel/getCountry.js'

//control
import {Year} from './year.jsx'
import {Cat} from './cat.jsx'
import {Sort} from './sort.jsx'

//view
import {registerBar, bar} from '../view/bar.js'
import {line} from '../view/line.js'
import {subline} from '../view/subline.js'

export const BigBrother = React.createClass({
  PropTypes:{
    data: React.PropTypes.object.isRequired,
    cats: React.PropTypes.array.isRequired,
    totals: React.PropTypes.array.isRequired
  },
  getInitialState(){
    return{
      //index: 15,
      cat: "All",
      sortBy: 'subCat'
    }
  },
  componentDidMount(){
    line(this.props.totals)
    registerBar()
  },
  // handleYear(year){
  //   this.setState({
  //     index: year - 1999
  //   })
  // },
  handleCat(val){
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

    let timeMachine

    if(this.state.cat === "All"){
      timeMachine = {display :'none'}
      //line(this.state.main)
    }else{
      timeMachine = {display :'block'}
      subline(getCatForLine(this.props.totals, this.state.cat))
      bar(getCountryForBar(this.props.data[this.state.cat]), null)
    }

    return(
      <div id="container">
        <div id="top">
          <span>
            Category:
            <Cat options={this.props.cats} handleCat={this.handleCat}></Cat>
          </span>
          <span>
            Sorted By:
            <Sort handleSort={this.handleSort}></Sort>
          </span>
        </div>
        <div id="main"></div>
        <section id="bottom"></section>
        <section id="above" style={timeMachine}>
          <Year handleYear={this.handleYear}></Year>
        </section>
      </div>
    )
  }
})