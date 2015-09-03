import React from 'react'

//data model
import {getCntsInOneCatForPie} from '../dataModel/getCntsInOneCatForPie.js'
import {getCntsInOneCatForLine} from '../dataModel/getCntsInOneCatForLine.js'
import {getCntsInOneCatForMap} from '../dataModel/getCntsInOneCatForMap.js'
import {getSubcatsInOneCat} from '../dataModel/getSubcatsInOneCat.js'

//control
import {Year} from './year.js'
import {Cat} from './cat.js'
import {sendData} from './message.js'

//view
import {Line} from '../view/line.js'
import {subline} from '../view/subline.js'
import {Pie, updatePie} from '../view/pie.js'

let countryData

export const BigBrother = React.createClass({
  PropTypes:{
    data: React.PropTypes.object.isRequired,
    cats: React.PropTypes.array.isRequired,
    allCats: React.PropTypes.array.isRequired,
    allCnts: React.PropTypes.array.isRequired
  },
  getInitialState(){
    return{
      index: 15,
      cat: "All",
      subCat: "All",
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

    return nextState.cat !== this.state.cat || 
      nextState.windowWidth !== this.state.windowWidth ||
      nextState.didMount !== this.state.didMount

  },

  //user drag year bar
  handleYear(year){
    this.setState({
      index: year - 1999
    })
    if(this.state.cat !== 'All'){
      updatePie((year-1999))
      sendData(getCntsInOneCatForMap(countryData, (year-1999)))
    }
  },

  //user change category
  handleCat(val){
    this.setState({
      cat: val,
      subCat: getSubcatsInOneCat(this.props.data[val])
    })
    if(val !== 'All'){
      countryData = getCntsInOneCatForPie(this.props.data[val])
      sendData(getCntsInOneCatForMap(countryData, this.state.index))
    }
  },

  handleSubcat(val){
    console.log(val)
  },

  render(){

    let peek1, peek2
    let line, bar //subline
    let pie

    if(this.state.cat === "All"){
      peek1 = {display :'none'}
      peek2 = {display :'block'}

      if(this.state.didMount){
        line = function(){
          return(
            <Line style={peek2} dig={this.handleDig} arr={this.props.allCnts}></Line>
          )}.bind(this)()
      }

    }else{
      peek1 = {display :'block'}
      peek2 = {display :'none'}
      
      if(this.state.didMount){

        subline(getCntsInOneCatForLine(this.props.data[this.state.cat]))
        pie = function(){
          return(
            <Pie style={peek1} arr={countryData} index={this.state.index}></Pie>
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
            <Cat options1={this.props.cats} options2={this.state.cat === 'All'? null : getSubcatsInOneCat(this.props.data[this.state.cat])}
              handleCat={this.handleCat} handleSubcat={this.handleSubcat}></Cat>
          </div>
        </div>

        <div id="main">
          <div className="left" id="left1" style={peek2}>
            {line}
          </div>
          <div className="left" id="left2" style={peek1}>
            {pie}
          </div>
          <div id="right" style={peek1}>
            <iframe id="ifr" src="map.html" width={_w} height={_h} scrolling="no"></iframe>
          </div>
        </div>

        <div id="bottom" style={peek1}></div>

        <div id="above" style={peek1}>
          <Year handleYear={this.handleYear}></Year>
        </div>

      </div>
    )
  }
})