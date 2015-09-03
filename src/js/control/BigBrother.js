import React from 'react'

//data model
import {cntsInOneCatForPie} from '../dataModel/cntsInOneCatForPie.js'
import {cntsInOneCatForLine} from '../dataModel/cntsInOneCatForLine.js'
import {cntsInOneCatForMapEachYear} from '../dataModel/cntsInOneCatForMapEachYear.js'
import {subcatsInOneCat} from '../dataModel/subcatsInOneCat.js'
import {cntsInOneCatForPieEachYear, cntsInOneCatForPieEachYearJustY} 
  from '../dataModel/cntsInOneCatForPieEachYear.js'
import {cntsInOneSubcatForPie} from '../dataModel/cntsInOneSubcatForPie.js'
import {cntsInOneSubcatForPieEachYear, cntsInOneSubcatForPieEachYearJustY} 
  from '../dataModel/cntsInOneSubcatForPieEachYear.js'
import {cntsInOneSubcatForMapEachYear} from '../dataModel/cntsInOneSubcatForMapEachYear.js'
import {cntsInOneSubcatForLine} from '../dataModel/cntsInOneSubcatForLine.js'

//control
import {Year} from './year.js'
import {Cat} from './cat.js'
import {sendData} from './message.js'
import {Dimension} from './dimension.js'

//view
import {makeLine} from '../view/line.js'
import {makeSubline} from '../view/subline.js'
import {makePie, updatePie} from '../view/pie.js'

let cntsCatLineData, cntsSubcatLineData

export const BigBrother = React.createClass({
  PropTypes:{
    data: React.PropTypes.object.isRequired,
    cats: React.PropTypes.array.isRequired,
    allCats: React.PropTypes.array.isRequired,
    allCnts: React.PropTypes.array.isRequired,
    allCntsName: React.PropTypes.array.isRequired
  },
  getInitialState(){
    return{
      index: 15,
      cat: "All",
      subCat: null,
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

    if(nextState.subCat === null){
      return nextState.cat !== this.state.cat || 
        nextState.windowWidth !== this.state.windowWidth ||
        nextState.didMount !== this.state.didMount
    }

    return nextState.cat !== this.state.cat || 
      nextState.subCat !== this.state.subCat ||
      nextState.windowWidth !== this.state.windowWidth ||
      nextState.didMount !== this.state.didMount

  },

  handleDimension(val){
    console.log(val)
  },

  //user drag year bar
  handleYear(year){
    this.setState({
      index: year - 1999
    })
    if(this.state.cat !== 'All'){
      if(this.state.subCat === null || this.state.subCat === 'All'){
        updatePie((year-1999), cntsInOneCatForPieEachYearJustY)
        sendData(cntsInOneCatForMapEachYear(cntsCatLineData, (year-1999)))
      }else{
        updatePie((year-1999), cntsInOneSubcatForPieEachYearJustY)
        sendData(cntsInOneSubcatForMapEachYear(cntsSubcatLineData, (year-1999)))
      }
    }
  },

  //user change category
  handleCat(val){
    this.setState({
      cat: val,
      subCat: 'All'
    })
    if(val !== 'All'){
      cntsCatLineData = cntsInOneCatForLine(this.props.data[val])
      sendData(cntsInOneCatForMapEachYear(cntsCatLineData, this.state.index))
      document.getElementById('catMenu2').value = 'All'
    }
  },

  //user change subcategory
  handleSubcat(val){
    this.setState({
      subCat: val
    })
    if(val === 'All'){
      sendData(cntsInOneCatForMapEachYear(cntsCatLineData, this.state.index))
    }else{
      cntsSubcatLineData = cntsInOneSubcatForLine(this.props.data[this.state.cat][val])
      sendData(cntsInOneSubcatForMapEachYear(cntsSubcatLineData, this.state.index))
    }
  },

  render(){

    let peek1, peek2

    let subCats = this.state.cat === 'All'? 
      null : subcatsInOneCat(this.props.data[this.state.cat])

    if(this.state.cat === "All"){
      peek1 = {display :'none'}
      peek2 = {display :'block'}

      if(this.state.didMount){
        makeLine(this.props.allCnts)
      }

    }else{
      peek1 = {display :'block'}
      peek2 = {display :'none'}
      
      if(this.state.didMount){
        if(this.state.subCat === null || this.state.subCat === 'All'){
          makeSubline(cntsInOneCatForLine(this.props.data[this.state.cat]))
          makePie(cntsInOneCatForPie(cntsCatLineData), this.state.index, cntsInOneCatForPieEachYear)
        }else{
          makeSubline(cntsInOneSubcatForLine(this.props.data[this.state.cat][this.state.subCat]))
          makePie(cntsInOneSubcatForPie(cntsSubcatLineData), this.state.index, cntsInOneSubcatForPieEachYear)
        }
      }
    }

    const _w = window.innerWidth * 0.4 - 20
    const _h = window.innerHeight - 320

    return(
      <div id="container">

        <div id="top">
          <div id="info">
            <Dimension handleDimension={this.handleDimension}></Dimension>
            <Cat options1={this.props.cats} options2={subCats}
              handleCat={this.handleCat} handleSubcat={this.handleSubcat}></Cat>
          </div>
        </div>

        <div id="main">
          <div className="left" id="left1" style={peek2}></div>
          <div className="left" id="left2" style={peek1}></div>
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