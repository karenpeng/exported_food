import React from 'react'

//data model
import {getAll} from '../dataModel/getAll.js'
import {getCategory} from '../dataModel/getCategory.js'
import {getCountry} from '../dataModel/getCountry.js'
import {getDrilldown} from '../dataModel/getDrilldown.js'
import {getCountryMap} from '../dataModel/getCountryMap.js'

//control
import {Year} from './year.jsx'
import {Cat} from './cat.jsx'

//view
import {Line} from '../view/line.jsx'
import {subline} from '../view/subline.js'
import {bar, updateBar} from '../view/bar.js'

function sendData(json){
  let ifr = document.getElementById("ifr")
  let targetOrigin = ifr.src
  ifr.contentWindow.postMessage(JSON.stringify(json), targetOrigin)
}

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
      countryData: null,
      drilldownData: null,
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
    this.setState({didMount: true})
  },
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize, false)
  },


  shouldComponentUpdate(nextProps, nextState){

    if(nextState.cat === 'All') return true

    if(nextState.windowWidth === this.state.windowWidth){
      let countryData = nextState.cat === this.state.cat ? 
        this.state.countryData : getCountry(this.props.data[nextState.cat])
      sendData(getCountryMap(countryData, nextState.index))
    }

    if(nextState.cat === this.state.cat){
      updateBar(nextState.index)
    }

    return nextState.cat !== this.state.cat || nextState.windowWidth !== this.state.windowWidth
  },

  //user click one line in the 'All' category
  handleDig(year, category){

    let countryData = getCountry(this.props.data[category])

    this.setState({
      index: year - 1999,
      cat: category,
      countryData: countryData,
      drilldownData: getDrilldown(this.props.data[category], countryData)
    })
    
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
      let countryData = getCountry(this.props.data[val])
      this.setState({
        countryData: countryData,
        drilldownData: getDrilldown(this.props.data[val], countryData)
      })
    }
  },


  render(){

    let peek1, peek2
    let line

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
      subline(getCategory(this.props.totals, this.state.cat))
      bar(this.state.countryData, this.state.drilldownData, this.state.index)
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
          <div className="left" id="left2" style={peek1}></div>
          <div id="right" style={peek1}>
            <iframe id="ifr" src="map.html" width={_w} height={_h} scrolling="no"></iframe>
          </div>
        </div>
        <section id="bottom" style={peek1}></section>
        <section id="above" style={peek1}>
          <Year handleYear={this.handleYear}></Year>
        </section>
      </div>
    )
  }
})