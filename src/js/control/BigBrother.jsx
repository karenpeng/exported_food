import React from 'react'

//data model
import {getAll} from '../dataModel/getAll.js'
import {getCountry} from '../dataModel/getCountry.js'
import {getDrilldown} from '../dataModel/getDrilldown.js'
import {getCountryMap, getCountryMapJustOne} from '../dataModel/getCountryMap.js'

//control
import {Year} from './year.jsx'
import {Cat} from './cat.jsx'
import {sendData} from './message.js'

//view
import {Line} from '../view/line.jsx'
import {Subline} from '../view/subline.jsx'
import {Bar, updateBar} from '../view/bar.jsx'

let countryData, drilldownData, curCountry
let drilldowned = false

export const BigBrother = React.createClass({
  PropTypes:{
    data: React.PropTypes.object.isRequired,
    cats: React.PropTypes.array.isRequired,
    totals: React.PropTypes.array.isRequired
  },
  getInitialState(){
    return{
      index: 15,
      cat: "All",
      windowWidth: window.innerWidth,
      didMount: false
    }
  },

  //window resize
  handleResize(){
    this.setState({windowWidth: window.innerWidth})
  },
  componentDidMount(){
    window.addEventListener('resize', this.handleResize, false)
    this.setState({
      didMount: true
    })
  },
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize, false)
  },

  //no render when year is being changed
  shouldComponentUpdate(nextProps, nextState){

    if(nextState.cat === 'All') return true

    if(nextState.index !== this.state.index){
      drilldowned ?
      sendData(getCountryMapJustOne(countryData, curCountry, nextState.index)) :
      sendData(getCountryMap(countryData, nextState.index))

      if(this.state.cat !== 'All'){
        updateBar(nextState.index)
      }
    }

    return nextState.cat !== this.state.cat || 
      nextState.windowWidth !== this.state.windowWidth ||
      nextState.didMount !== this.state.didMount
  },

  //user click one line in the 'All' category
  handleDig(year, category){

    countryData = getCountry(this.props.data[category])
    drilldownData = getDrilldown(this.props.data[category], countryData)

    this.setState({
      index: year - 1999,
      cat: category
    })

    //@TODO: figure out how to do this in react way
    document.getElementById('yearBar').value = year
    document.getElementById('catMenu').value = category
    
  },

  //user drag year bar
  handleYear(year){
    this.setState({
      index: year - 1999
    })
  },

  //user change category
  handleCat(val){
    this.setState({
      cat: val
    })
    if(val !== 'All'){
      countryData = getCountry(this.props.data[val])
      drilldownData = getDrilldown(this.props.data[val], countryData)
      drilldowned ?
      sendData(getCountryMapJustOne(countryData, curCountry, this.state.index)) :
      sendData(getCountryMap(countryData, this.state.index))
    }
  },

  //user drill down into one country
  handleDrilldown(country){
    drilldowned = true
    curCountry = country
    sendData(getCountryMapJustOne(countryData, country, this.state.index))
  },

  //user drill up back to countries
  handleDrillup(){
    drilldowned = false
    sendData(getCountryMap(countryData, this.state.index))
  },

  render(){

    let peek1, peek2
    let line, subline, bar

    if(this.state.cat === "All"){
      peek1 = {display :'none'}
      peek2 = {display :'block'}

      if(this.state.didMount){
        line = function(){
          return(
            <Line style={peek2} dig={this.handleDig} arr={this.props.totals}></Line>
          )}.bind(this)()
      }

    }else{
      peek1 = {display :'block'}
      peek2 = {display :'none'}
      
      if(this.state.didMount){
        subline = function(){
          return(
            <Subline style={peek1} totals={this.props.totals} cat={this.state.cat}></Subline>
          )}.bind(this)()

        bar = function(){
          return(
            <Bar style={peek1} arr1={countryData} arr2={drilldownData} index={this.state.index} 
            handleDrilldown={this.handleDrilldown} handleDrillup={this.handleDrillup}></Bar>
          )}.bind(this)()
      }
    }

    const _w = window.innerWidth * 0.4 - 20
    const _h = window.innerHeight - 320

    return(
      <div id="container">
        <div id="top">
          <div id="info">
            Category:
            <Cat options={this.props.cats} handleCat={this.handleCat}></Cat>
          </div>
        </div>
        <div id="main">
          <div className="left" id="left1" style={peek2}>
            {line}
          </div>
          <div className="left" id="left2" style={peek1}>
            {bar}
          </div>
          <div id="right" style={peek1}>
            <iframe id="ifr" src="map.html" width={_w} height={_h} scrolling="no"></iframe>
          </div>
        </div>
        <section id="bottom" style={peek1}>
          {subline}
        </section>
        <section id="above" style={peek1}>
          <Year handleYear={this.handleYear}></Year>
        </section>
      </div>
    )
  }
})