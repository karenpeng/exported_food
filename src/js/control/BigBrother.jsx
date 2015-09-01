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
import {line} from '../view/line.js'
import {subline} from '../view/subline.js'
import {bar, updateBar} from '../view/bar.js'

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
    if(nextState.cat === 'All') {
      console.log('T_T') 
      return true
    }
    console.log(nextState.cat)

    if(nextState.cat === this.state.cat && this.state.cat !== 'All'){
      updateBar(nextState.index)

      let ifr = document.getElementById("ifr")
      let targetOrigin = ifr.src
      let info = getCountryMap(this.state.countryData, nextState.index)
      ifr.contentWindow.postMessage(JSON.stringify(info), targetOrigin)
    }

    return nextState.cat !== this.state.cat || nextState.windowWidth !== this.state.windowWidth
  },
  handleYear(year){
    this.setState({
      index: year - 1999
    })
  },
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

      let ifr = document.getElementById("ifr")
      let targetOrigin = ifr.src
      let info = getCountryMap(countryData, this.state.index)
      ifr.contentWindow.postMessage(JSON.stringify(info), targetOrigin)
    }
  },
  render(){

    let peek

    if(this.state.cat === "All"){
      peek = {display :'none'}
      if(this.state.didMount)line(this.props.totals)

    }else{
      peek = {display :'block'}
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
          <div id="left"></div>
          <div id="right" style={peek}>
            <iframe id="ifr" src="map.html" width={_w} height={_h} scrolling="no"></iframe>
          </div>
        </div>
        <section id="bottom" style={peek}></section>
        <section id="above" style={peek}>
          <Year handleYear={this.handleYear}></Year>
        </section>
      </div>
    )
  }
})